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
      const rubyBox = tdName.querySelector('.stroke-name-ruby');
      
      const idText = tdId ? tdId.innerText.trim() : String(index + 1);
      const nameText = tdName ? tdName.innerText.replace(/\s+/g, ' ').trim() : '';

      return {
        row: index + 1,
        id: idText,
        name: nameText,
        scrollWidth: tdName.scrollWidth,
        clientWidth: tdName.clientWidth,
        scrollHeight: tdName.scrollHeight,
        clientHeight: tdName.clientHeight,
        rubyScrollW: rubyBox ? rubyBox.scrollWidth : 0,
        rubyClientW: rubyBox ? rubyBox.clientWidth : 0,
        overflowW: tdName.scrollWidth > tdName.clientWidth,
        overflowH: tdName.scrollHeight > tdName.clientHeight,
        status: (tdName.scrollWidth <= tdName.clientWidth && tdName.scrollHeight <= tdName.clientHeight) ? 'PASS' : 'FAIL'
      };
    });
  });

  console.log('=======================================================================================================');
  console.log('   【完成定義 1】名稱格 scrollWidth／clientWidth 與 scrollHeight／clientHeight 逐列檢驗');
  console.log('=======================================================================================================');
  console.log('| 列號 | 編號 | 筆畫名稱 | scrollWidth | clientWidth | scrollHeight | clientHeight | 寬度溢出 | 高度溢出 | 判定結果 |');
  console.log('|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|');

  let allPass = true;
  results.forEach(r => {
    if (r.status !== 'PASS') allPass = false;
    console.log(`| ${r.row} | ${r.id} | ${r.name} | ${r.scrollWidth}px | ${r.clientWidth}px | ${r.scrollHeight}px | ${r.clientHeight}px | ${r.overflowW ? '⚠️ 溢出' : '無'} | ${r.overflowH ? '⚠️ 溢出' : '無'} | ${r.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} |`);
  });

  console.log('=======================================================================================================');
  console.log(`總列數：${results.length} 列，通過列數：${results.filter(r => r.status === 'PASS').length} 列 -> ${allPass ? '🎉 全部 30 列 100% 通過（無任何截斷與溢出）' : '❌ 存在溢出未通過'}`);
  console.log('=======================================================================================================\n');

  await browser.close();
})();
