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
    // 取得 1mm 像素
    const div = document.createElement('div');
    div.style.width = '10mm';
    document.body.appendChild(div);
    const pxPerMm = div.getBoundingClientRect().width / 10;
    div.remove();

    const rows = Array.from(document.querySelectorAll('.practice-table tbody tr'));
    return rows.map((tr, index) => {
      const tdId = tr.querySelector('.col-id');
      const tdEx = tr.querySelector('.col-examples');
      const spanEx = tdEx.querySelector('.example-text');
      
      const idText = tdId ? tdId.innerText.trim() : String(index + 1);
      const exText = spanEx ? spanEx.innerText.trim() : '';

      const tdRect = tdEx.getBoundingClientRect();
      const spanRect = spanEx.getBoundingClientRect();

      const compFsPx = parseFloat(window.getComputedStyle(spanEx).fontSize);
      const fsPt = (compFsPx * 0.75).toFixed(1);

      const rightDistancePx = tdRect.right - spanRect.right;
      const rightDistanceMm = (rightDistancePx / pxPerMm).toFixed(2);

      return {
        row: index + 1,
        id: idText,
        examples: exText,
        fontPt: parseFloat(fsPt),
        rightMarginMm: parseFloat(rightDistanceMm),
        passFont: parseFloat(fsPt) >= 20.0,
        passMargin: parseFloat(rightDistanceMm) >= 2.0
      };
    });
  });

  console.log('=======================================================================================================');
  console.log('   【完成定義 2】例字 computed font-size 與右緣留白距離 (mm) 逐列檢驗');
  console.log('=======================================================================================================');
  console.log('| 列號 | 編號 | 例字內容 | Computed 字級 (pt) | 規格要求 (>=20pt) | 右緣留白 (mm) | 規格要求 (>=2mm) | 判定結果 |');
  console.log('|:---|:---|:---|:---|:---|:---|:---|:---|');

  let allPass = true;
  results.forEach(r => {
    const pass = r.passFont && r.passMargin;
    if (!pass) allPass = false;
    console.log(`| ${r.row} | ${r.id} | ${r.examples} | ${r.fontPt} pt | ${r.passFont ? '✅ 合格' : '❌ 不合格'} | ${r.rightMarginMm} mm | ${r.passMargin ? '✅ 合格' : '❌ 不合格'} | ${pass ? '✅ PASS' : '❌ FAIL'} |`);
  });

  console.log('=======================================================================================================');
  console.log(`總列數：${results.length} 列，通過列數：${results.filter(r => r.passFont && r.passMargin).length} 列 -> ${allPass ? '🎉 全部 30 列 100% 通過（字級 >= 20pt 且右側留白 >= 2mm）' : '❌ 未全數通過'}`);
  console.log('=======================================================================================================\n');

  await browser.close();
})();
