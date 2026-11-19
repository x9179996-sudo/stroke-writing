const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const fileUrl = 'file:///' + path.resolve(__dirname, '..', 'print.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  
  if (document => document.fonts) {
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
  }

  const results = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.practice-table tbody tr'));
    return rows.map((tr, index) => {
      const tdId = tr.querySelector('.col-id');
      const tdName = tr.querySelector('.col-name');
      const tdDemo = tr.querySelector('.col-demo');
      const svg = tdDemo.querySelector('svg');
      
      const idText = tdId ? tdId.innerText.trim() : String(index + 1);
      const nameText = tdName ? tdName.innerText.replace(/\s+/g, ' ').trim() : '';

      // 取得示範格內所有筆畫元素 (g transform 中的 path, circle, arrows)
      const strokeG = svg.querySelector('g');
      
      // 量測相對於 SVG viewBox (100×100) 的座標範圍
      const localBox = strokeG.getBBox();
      
      // 計算縮放 transform (translate(50, 50) scale(0.85) translate(-50, -50)) 後的實際邊界
      const minX = 50 + 0.85 * (localBox.x - 50);
      const maxX = 50 + 0.85 * (localBox.x + localBox.width - 50);
      const minY = 50 + 0.85 * (localBox.y - 50);
      const maxY = 50 + 0.85 * (localBox.y + localBox.height - 50);

      const leftMarginPercent = Number(minX.toFixed(2));
      const topMarginPercent = Number(minY.toFixed(2));
      const rightMarginPercent = Number((100 - maxX).toFixed(2));
      const bottomMarginPercent = Number((100 - maxY).toFixed(2));

      const minMarginPercent = Number(Math.min(leftMarginPercent, topMarginPercent, rightMarginPercent, bottomMarginPercent).toFixed(2));

      return {
        row: index + 1,
        id: idText,
        name: nameText,
        left: leftMarginPercent,
        top: topMarginPercent,
        right: rightMarginPercent,
        bottom: bottomMarginPercent,
        minMargin: minMarginPercent,
        pass: minMarginPercent >= 8.0
      };
    });
  });

  console.log('=======================================================================================================');
  console.log('   【完成定義 4】30 個示範格中筆畫 Bounding Box 到格子四邊距離（佔格寬 %）逐列檢驗');
  console.log('=======================================================================================================');
  console.log('| 列號 | 編號 | 筆畫名稱 | 左邊距 (%) | 上邊距 (%) | 右邊距 (%) | 下邊距 (%) | 最小邊距 (%) | 規格要求 (>=8%) | 判定結果 |');
  console.log('|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|');

  let allPass = true;
  results.forEach(r => {
    if (!r.pass) allPass = false;
    console.log(`| ${r.row} | ${r.id} | ${r.name} | ${r.left}% | ${r.top}% | ${r.right}% | ${r.bottom}% | ${r.minMargin}% | ${r.pass ? '✅ 合格' : '❌ 不合格'} | ${r.pass ? '✅ PASS' : '❌ FAIL'} |`);
  });

  console.log('=======================================================================================================');
  console.log(`總列數：${results.length} 列，通過列數：${results.filter(r => r.pass).length} 列 -> ${allPass ? '🎉 全部 30 列 100% 通過（四邊距離皆至少留有 8% 邊距，絕不貼頂或被切）' : '❌ 未全數通過'}`);
  console.log('=======================================================================================================\n');

  await browser.close();
})();
