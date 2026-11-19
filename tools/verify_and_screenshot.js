/**
 * tools/verify_and_screenshot.js
 * 執行完整的自動化驗證與截圖產生：
 * 1. 測量 index.html 與 print.html 的實際最小字級 (Computed font-size)
 * 2. 截取 debug.html 完整截圖
 * 3. 截取 index.html 平板尺寸 (1024×768) 四大畫面
 * 4. 截取 學習單 PDF 每頁獨立截圖 (pdf_page_1.png ~ pdf_page_5.png)
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

(async () => {
  console.log('================================================================');
  console.log('   開始執行自動化驗證與平板截圖 (tools/verify_and_screenshot.js)');
  console.log('================================================================\n');

  const baseDir = path.resolve(__dirname, '..');
  const screenshotDir = path.join(baseDir, 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

  const browser = await chromium.launch();

  // -------------------------------------------------------------
  // 1. 測量網頁 (index.html) 的實際最小字級
  // -------------------------------------------------------------
  console.log('【驗證 1】測量 index.html 實際計算字級 (Computed Font Sizes)...');
  const pageIndex = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await pageIndex.goto('file:///' + path.join(baseDir, 'index.html').replace(/\\/g, '/'));
  await pageIndex.waitForLoadState('networkidle');

  // 切換至練習畫面以量測描寫區實際渲染尺寸
  await pageIndex.evaluate(() => App.openStroke('1'));
  await pageIndex.waitForTimeout(300);

  const indexFontStats = await pageIndex.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('body, p, span, div, h1, h2, h3, button, ruby, rt, input, td, th'));
    const sizes = [];

    allEls.forEach(el => {
      if (!el.offsetParent && el.tagName !== 'BODY') return; // 略過隱藏元素
      const style = window.getComputedStyle(el);
      const fs = parseFloat(style.fontSize);
      if (fs > 0) sizes.push(fs);
    });

    const bodyFs = parseFloat(window.getComputedStyle(document.body).fontSize);
    const strokeTitleFs = parseFloat(window.getComputedStyle(document.querySelector('.stroke-title') || document.body).fontSize);
    
    // 量測畫面上所有可見按鈕的最小高度
    const btns = Array.from(document.querySelectorAll('button.btn, a.btn'));
    const btnHeights = btns.map(b => parseFloat(window.getComputedStyle(b).minHeight || b.offsetHeight));
    const minBtnHeight = Math.min(...btnHeights);

    const canvasWrap = document.querySelector('.canvas-wrapper');
    const canvasRect = canvasWrap ? { width: canvasWrap.offsetWidth, height: canvasWrap.offsetHeight } : null;

    return {
      minFontSize: Math.min(...sizes),
      bodyFontSize: bodyFs,
      strokeTitleFontSize: strokeTitleFs,
      buttonMinHeight: minBtnHeight,
      canvasRect
    };
  });

  console.log(`  - 網頁 Body 基礎字級：${indexFontStats.bodyFontSize}px (規格要求 >= 24px) -> ${indexFontStats.bodyFontSize >= 24 ? '✅ 合格' : '❌ 不合格'}`);
  console.log(`  - 筆畫名稱標題字級：${indexFontStats.strokeTitleFontSize}px (規格要求 >= 36px) -> ${indexFontStats.strokeTitleFontSize >= 36 ? '✅ 合格' : '❌ 不合格'}`);
  console.log(`  - 主要按鈕最小高度：${indexFontStats.buttonMinHeight}px (規格要求 >= 64px) -> ${indexFontStats.buttonMinHeight >= 64 ? '✅ 合格' : '❌ 不合格'}`);
  if (indexFontStats.canvasRect) {
    console.log(`  - 平板書寫描寫區尺寸：${indexFontStats.canvasRect.width}×${indexFontStats.canvasRect.height}px (規格要求 >= 320×320px) -> ${indexFontStats.canvasRect.width >= 320 && indexFontStats.canvasRect.height >= 320 ? '✅ 合格' : '❌ 不合格'}`);
  }

  // -------------------------------------------------------------
  // 2. 測量學習單 (print.html) 的實際字級與格子尺寸
  // -------------------------------------------------------------
  console.log('\n【驗證 2】測量 print.html 學習單實際字級與格子尺寸...');
  const pagePrint = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await pagePrint.goto('file:///' + path.join(baseDir, 'print.html').replace(/\\/g, '/'));
  await pagePrint.waitForLoadState('networkidle');

  const printStats = await pagePrint.evaluate(() => {
    const rubies = Array.from(document.querySelectorAll('.stroke-name-ruby'));
    const rubySizes = rubies.map(r => parseFloat(window.getComputedStyle(r).fontSize));
    const grids = Array.from(document.querySelectorAll('.tian-grid'));
    const gridRects = grids.map(g => ({ width: g.getBoundingClientRect().width, height: g.getBoundingClientRect().height }));

    // 取得 1mm 在螢幕上的像素值以換算 cm
    const testDiv = document.createElement('div');
    testDiv.style.width = '10mm';
    document.body.appendChild(testDiv);
    const pxPer10mm = testDiv.getBoundingClientRect().width;
    testDiv.remove();

    const minGridMm = gridRects.length > 0 ? (gridRects[0].width / pxPer10mm) * 10 : 0;

    return {
      minRubyFontSizePt: rubySizes.length > 0 ? (Math.min(...rubySizes) * 0.75).toFixed(1) : 0, // px to pt
      gridSizeMm: minGridMm.toFixed(1),
      gridSizeCm: (minGridMm / 10).toFixed(2)
    };
  });

  console.log(`  - 學習單名稱字級：約 ${printStats.minRubyFontSizePt}pt (規格要求 >= 16pt) -> ${parseFloat(printStats.minRubyFontSizePt) >= 16 ? '✅ 合格' : '❌ 不合格'}`);
  console.log(`  - 學習單田字格/米字格實際尺寸：約 ${printStats.gridSizeCm} cm 見方 (${printStats.gridSizeMm} mm，規格要求 >= 2.2cm) -> ${parseFloat(printStats.gridSizeCm) >= 2.2 ? '✅ 合格' : '❌ 不合格'}`);

  // -------------------------------------------------------------
  // 3. 截圖：debug.html
  // -------------------------------------------------------------
  console.log('\n【截圖 1】截取 debug.html 全貌截圖...');
  const pageDebug = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await pageDebug.goto('file:///' + path.join(baseDir, 'debug.html').replace(/\\/g, '/'));
  await pageDebug.waitForLoadState('networkidle');
  const debugShotPath = path.join(screenshotDir, 'debug.png');
  await pageDebug.screenshot({ path: debugShotPath, fullPage: true });
  console.log(`  ✅ 已儲存：${debugShotPath}`);
  await pageDebug.close();

  // -------------------------------------------------------------
  // 4. 截圖：平板尺寸 (1024×768) 四大畫面
  // -------------------------------------------------------------
  console.log('\n【截圖 2】截取 index.html 平板尺寸 (1024×768) 四大畫面...');
  const ipadPage = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await ipadPage.goto('file:///' + path.join(baseDir, 'index.html').replace(/\\/g, '/'));
  await ipadPage.waitForLoadState('networkidle');

  // 1) 首頁冒險地圖
  const shotHome = path.join(screenshotDir, 'tablet_1_home.png');
  await ipadPage.screenshot({ path: shotHome });
  console.log(`  ✅ 已儲存首頁地圖截圖：${shotHome}`);

  // 2) 關卡描寫畫面 (開啟橫折鉤 #13)
  await ipadPage.evaluate(() => App.openStroke('13'));
  await ipadPage.waitForTimeout(400);
  const shotPractice = path.join(screenshotDir, 'tablet_2_practice.png');
  await ipadPage.screenshot({ path: shotPractice });
  console.log(`  ✅ 已儲存關卡練習截圖：${shotPractice}`);

  // 3) 小測驗畫面 (第 1 區小測驗)
  await ipadPage.evaluate(() => App.startZoneQuiz(1));
  await ipadPage.waitForTimeout(400);
  const shotQuiz = path.join(screenshotDir, 'tablet_3_quiz.png');
  await ipadPage.screenshot({ path: shotQuiz });
  console.log(`  ✅ 已儲存小測驗截圖：${shotQuiz}`);

  // 4) 家長專區畫面
  await ipadPage.evaluate(() => App.showView('parent'));
  await ipadPage.waitForTimeout(400);
  const shotParent = path.join(screenshotDir, 'tablet_4_parent.png');
  await ipadPage.screenshot({ path: shotParent });
  console.log(`  ✅ 已儲存家長專區截圖：${shotParent}`);

  // -------------------------------------------------------------
  // 5. 截圖：學習單 PDF 全 5 頁個別截圖
  // -------------------------------------------------------------
  console.log('\n【截圖 3】截取學習單 PDF 全 5 頁獨立畫面...');
  const sheetPages = await pagePrint.$$('.sheet-page');
  console.log(`  找到 ${sheetPages.length} 個學習單頁面`);
  for (let i = 0; i < sheetPages.length; i++) {
    const shotPagePath = path.join(screenshotDir, `pdf_page_${i + 1}.png`);
    await sheetPages[i].screenshot({ path: shotPagePath });
    console.log(`  ✅ 已儲存學習單第 ${i + 1} 頁截圖：${shotPagePath}`);
  }

  await ipadPage.close();
  await pageIndex.close();
  await pagePrint.close();
  await browser.close();

  console.log('\n================================================================');
  console.log('🎉 自動化驗證、平板截圖與 PDF 頁面截圖全數完成！');
  console.log('================================================================\n');
})();
