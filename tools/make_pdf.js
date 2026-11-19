/**
 * tools/make_pdf.js
 * 使用 Playwright 自動生成高品質向量 A4 學習單 PDF (筆畫學習單.pdf)
 */
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  console.log('====================================================');
  console.log('   正在生成 A4 筆畫學習單 PDF (tools/make_pdf.js)...');
  console.log('====================================================\n');

  const printHtmlPath = path.resolve(__dirname, '..', 'print.html');
  const pdfOutputPath = path.resolve(__dirname, '..', '筆畫學習單.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log(`載入網頁：file:///${printHtmlPath.replace(/\\/g, '/')}`);
  await page.goto('file:///' + printHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

  // 等待字型完全載入
  await page.evaluate(async () => {
    if (document.fonts) {
      await document.fonts.ready;
    }
  });

  console.log('正在匯出 A4 PDF...');
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      bottom: '0mm',
      left: '0mm',
      right: '0mm'
    }
  });

  console.log(`✅ 成功產生 PDF 檔案：${pdfOutputPath}\n`);
  await browser.close();
})();
