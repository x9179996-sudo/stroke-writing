/**
 * engine.js
 * 筆畫描寫判定引擎與音效核心
 * 純 JavaScript 實作，可同時在 Node.js (自動測試) 與 瀏覽器中運行。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.StrokeEngine = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // 1. 幾何運算工具
  const Math2D = {
    dist: function (p1, p2) {
      const dx = p2[0] - p1[0];
      const dy = p2[1] - p1[1];
      return Math.sqrt(dx * dx + dy * dy);
    },

    // 點到線段的最短距離與投影點
    distToSegment: function (p, a, b) {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const lenSq = dx * dx + dy * dy;
      if (lenSq === 0) return this.dist(p, a);

      let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lenSq;
      t = Math.max(0, Math.min(1, t));
      const proj = [a[0] + t * dx, a[1] + t * dy];
      return this.dist(p, proj);
    },

    // 點到整條折線的最短距離
    distToPolyline: function (p, polyline) {
      let minD = Infinity;
      for (let i = 0; i < polyline.length - 1; i++) {
        const d = this.distToSegment(p, polyline[i], polyline[i + 1]);
        if (d < minD) minD = d;
      }
      return minD;
    },

    // 折線總長度
    length: function (points) {
      if (!points || points.length < 2) return 0;
      let len = 0;
      for (let i = 1; i < points.length; i++) {
        len += this.dist(points[i - 1], points[i]);
      }
      return len;
    },

    // 沿著折線密集插值（每步 step 單位取一點）
    densify: function (points, step = 1.5) {
      if (!points || points.length === 0) return [];
      if (points.length === 1) return [[points[0][0], points[0][1]]];

      const out = [[points[0][0], points[0][1]]];
      for (let i = 1; i < points.length; i++) {
        const p0 = out[out.length - 1];
        const p1 = points[i];
        const segLen = this.dist(p0, p1);
        if (segLen <= 0.0001) continue;

        const count = Math.ceil(segLen / step);
        for (let k = 1; k <= count; k++) {
          const t = k / count;
          out.push([
            p0[0] + (p1[0] - p0[0]) * t,
            p0[1] + (p1[1] - p0[1]) * t
          ]);
        }
      }
      return out;
    },

    // 找出一群點中距離 target 最近的點之索引與距離
    nearest: function (target, pts) {
      let bestIdx = 0, bestDist = Infinity;
      for (let i = 0; i < pts.length; i++) {
        const d = this.dist(target, pts[i]);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      return { index: bestIdx, dist: bestDist };
    }
  };

  // 2. 核心判定器
  const Evaluator = {
    /**
     * 判定使用者筆跡是否合格
     * @param {Array<[number, number]>} rawPoints 使用者繪製原始點列 (0~100 座標系)
     * @param {Object} strokeDef 筆畫定義物件 (含 points, keyPoints, name 等)
     * @param {Object} options 容許值參數
     * @returns {Object} { ok: boolean, reason: string, msg: string, score: number }
     */
    evaluate: function (rawPoints, strokeDef, options = {}) {
      if (!rawPoints || rawPoints.length < 2) {
        return {
          ok: false,
          reason: 'empty',
          msg: '筆劃太短囉，請順著虛線寫完整！'
        };
      }

      const center = strokeDef.points;
      const totalLen = Math2D.length(center);
      const isShort = totalLen < 45; // 點、短橫等

      // 容差設定（座標系為 100x100）
      // 格子寬度 8% 約 8~10，10% 約 10~13
      const startTol = options.startTol || (isShort ? 12.0 : 10.5);
      const endTol = options.endTol || (isShort ? 13.0 : 11.5);
      const trackTol = options.trackTol || (isShort ? 13.0 : 12.5);

      const userStart = rawPoints[0];
      const userEnd = rawPoints[rawPoints.length - 1];
      const strokeStart = center[0];
      const strokeEnd = center[center.length - 1];

      // 檢查一：起筆是否落在起點附近（綠點）
      const startDist = Math2D.dist(userStart, strokeStart);
      const startToEndDist = Math2D.dist(userStart, strokeEnd);

      // 如果從終點反向起筆
      if (startToEndDist < startTol && startDist > startTol) {
        return {
          ok: false,
          reason: 'dir',
          msg: '方向反了，要從綠色圓點開始往箭頭方向寫喔！'
        };
      }

      if (startDist > startTol) {
        return {
          ok: false,
          reason: 'start',
          msg: '要從綠色圓點開始寫喔！'
        };
      }

      // 將使用者筆跡做等距細分插值，確保平滑
      const denseUser = Math2D.densify(rawPoints, 1.2);
      const userLen = Math2D.length(denseUser);

      // 檢查使用者長度是否過短
      if (userLen < totalLen * 0.45) {
        return {
          ok: false,
          reason: 'short',
          msg: '還沒寫完喔，轉彎或終點還沒到！'
        };
      }

      // 檢查二：依順序經過中心線上每一個檢查點（不能跳點，不能倒著走）
      // 對中心線上的每個關鍵檢查點，找出在使用者筆跡中最近的對應點索引
      let prevUserIdx = -1;
      let matchedCount = 0;
      let backwardsCount = 0;

      for (let i = 0; i < center.length; i++) {
        const cp = center[i];
        const res = Math2D.nearest(cp, denseUser);
        if (res.dist <= trackTol * 1.6) {
          matchedCount++;
          if (prevUserIdx !== -1 && res.index < prevUserIdx - 4) {
            backwardsCount++;
          }
          prevUserIdx = Math.max(prevUserIdx, res.index);
        }
      }

      if (backwardsCount >= 2) {
        return {
          ok: false,
          reason: 'dir',
          msg: '方向反了，跟著箭頭的方向寫～'
        };
      }

      // 關鍵轉折點檢查：如果有 turn 或 hook 點，必須被經過
      const turns = (strokeDef.keyPoints || []).filter(k => k.type === 'turn' || k.type === 'hook');
      for (const t of turns) {
        const tNear = Math2D.nearest([t.x, t.y], denseUser);
        if (tNear.dist > trackTol * 1.5) {
          return {
            ok: false,
            reason: 'turn',
            msg: `轉彎的地方「${t.label || ''}」還沒到喔，要沿著虛線轉彎！`
          };
        }
      }

      // 檢查三：全程都在容許的寬度範圍內（不能超出格子太遠）
      let offCount = 0;
      for (let i = 0; i < denseUser.length; i++) {
        const d = Math2D.distToPolyline(denseUser[i], center);
        if (d > trackTol * 1.4) {
          offCount++;
        }
      }
      const offRatio = offCount / denseUser.length;
      if (offRatio > 0.20) {
        return {
          ok: false,
          reason: 'off',
          msg: '超出格子或線條太遠了，沿著虛線慢慢寫～'
        };
      }

      // 檢查四：收筆落在終點附近（紅色圓點）
      const endDist = Math2D.dist(userEnd, strokeEnd);
      if (endDist > endTol) {
        return {
          ok: false,
          reason: 'end',
          msg: '還沒寫完喔，要寫到紅色圓點收筆～'
        };
      }

      // 全部合格！
      // 計算品質評分 (0~100)
      const avgDist = denseUser.reduce((acc, p) => acc + Math2D.distToPolyline(p, center), 0) / denseUser.length;
      const score = Math.max(60, Math.min(100, Math.round(100 - avgDist * 3.5)));

      return {
        ok: true,
        reason: 'ok',
        msg: '太棒了！寫得真漂亮！',
        score: score
      };
    }
  };

  return {
    Math2D,
    Evaluator
  };
});
