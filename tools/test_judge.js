/**
 * tools/test_judge.js
 * 使用 Playwright 在瀏覽器環境中自動對 30 個筆畫各跑 3 種模擬：
 * 1. 沿中心線正確書寫（要過 ok: true）
 * 2. 反方向書寫（要失敗 ok: false）
 * 3. 從錯誤起點開始（要失敗 ok: false）
 * 輸出 30×3 原始結果表。
 */
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  console.log('========================================================================================');
  console.log('   國小一年級「基本筆畫名稱與寫法」描寫判定自動化測試 (Playwright 30×3 測試)');
  console.log('========================================================================================\n');

  const debugHtmlPath = path.resolve(__dirname, '..', 'debug.html');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file:///' + debugHtmlPath.replace(/\\/g, '/'));
  await page.addScriptTag({ path: path.resolve(__dirname, '..', 'engine.js') });

  const testResults = await page.evaluate(() => {
    const STROKES = window.STROKES_DATA.STROKES;
    const Evaluator = window.StrokeEngine.Evaluator;
    const Math2D = window.StrokeEngine.Math2D;

    const rows = [];
    let passCount = 0;
    let totalCount = 0;

    for (let i = 0; i < STROKES.length; i++) {
      const s = STROKES[i];
      const pts = s.points;

      // 1. 正向筆跡：中心線密集取樣
      const forwardPts = Math2D.densify(pts, 1.0);
      const resFwd = Evaluator.evaluate(forwardPts, s);

      // 2. 反向筆跡：中心線反轉
      const reversePts = [...forwardPts].reverse();
      const resRev = Evaluator.evaluate(reversePts, s);

      // 3. 錯誤起點：起筆偏離 35 單位
      const wrongStartPts = forwardPts.map((p, idx) => {
        if (idx === 0) return [p[0] + 35, p[1] + 35];
        return [p[0], p[1]];
      });
      const resWrong = Evaluator.evaluate(wrongStartPts, s);

      const fwdOk = (resFwd.ok === true);
      const revFail = (resRev.ok === false);
      const wrongFail = (resWrong.ok === false);

      if (fwdOk) passCount++;
      if (revFail) passCount++;
      if (wrongFail) passCount++;
      totalCount += 3;

      rows.push({
        num: i + 1,
        id: s.id,
        name: s.name,
        bpmf: s.bpmf,
        fwdResult: fwdOk ? 'PASS (通過)' : `FAIL (${resFwd.reason}: ${resFwd.msg})`,
        revResult: revFail ? 'PASS (正確擋下)' : `FAIL (誤判通過)`,
        wrongResult: wrongFail ? 'PASS (正確擋下)' : `FAIL (誤判通過)`,
        allPass: fwdOk && revFail && wrongFail
      });
    }

    return { rows, passCount, totalCount };
  });

  await browser.close();

  // 印出 30×3 完整原始結果表
  console.log('| 編號 | 代號 | 筆畫名稱 | 注音 | 測試 1：標準中心線正向 (應通過) | 測試 2：反方向書寫 (應擋下) | 測試 3：錯誤起點偏差 (應擋下) | 綜合結論 |');
  console.log('|:---|:---|:---|:---|:---|:---|:---|:---|');

  testResults.rows.forEach(r => {
    const status = r.allPass ? '✅ 合格' : '❌ 失敗';
    console.log(`| ${r.num} | ${r.id} | ${r.name} | ${r.bpmf} | ${r.fwdResult} | ${r.revResult} | ${r.wrongResult} | ${status} |`);
  });

  console.log('\n========================================================================================');
  console.log(`測試結果統計：總測試項數 ${testResults.totalCount} 項，通過 ${testResults.passCount} 項，通過率 ${(testResults.passCount / testResults.totalCount * 100).toFixed(1)}%`);
  if (testResults.passCount === testResults.totalCount) {
    console.log('🎉 30 個筆畫 30×3 全數通過！判定邏輯嚴格且完全符合規格！');
  } else {
    console.error('❌ 有未通過項目，請檢查容許值或中心線設定！');
    process.exit(1);
  }
  console.log('========================================================================================\n');
})();
