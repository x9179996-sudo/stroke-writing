/**
 * strokes.js
 * 國小一年級「基本筆畫名稱與寫法」完整資料檔 (共 30 個筆畫)
 * 嚴格依據國小基本筆畫表順序、名稱與教育部標準字體。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.STROKES_DATA = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const STROKES = [
    // Zone 1: 基本六筆
    {
      id: "1", name: "橫", bpmf: "ㄏㄥˊ", examples: ["木", "二", "三"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "平平橫", avatar: "🐉", color: "#2B6CB0", title: "青龍小使者" },
      speechText: "這是橫，由左往右平平地寫。",
      hint: "從綠點起筆，由左往右平平地寫過去，到紅點停筆收尾。",
      points: [[18, 50], [38, 50], [60, 50], [82, 50]],
      keyPoints: [
        { x: 18, y: 50, type: "start", label: "起筆" },
        { x: 82, y: 50, type: "end", label: "收筆" }
      ],
      centerD: "M 18,50 L 82,50",
      outlineD: "M 18,48 C 17,45 22,43 28,45 L 72,45 C 79,43 83,47 83,50 C 83,54 78,56 72,55 L 28,55 C 22,57 17,54 18,48 Z"
    },
    {
      id: "2", name: "豎", bpmf: "ㄕㄨˋ", examples: ["十", "中", "千"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "直直豎", avatar: "🎋", color: "#2F855A", title: "青竹精靈" },
      speechText: "這是豎，由上往下直直地寫。",
      hint: "從綠點起筆，像站直直的竹子一樣，由上往下寫到紅點。",
      points: [[50, 16], [50, 38], [50, 62], [50, 84]],
      keyPoints: [
        { x: 50, y: 16, type: "start", label: "起筆" },
        { x: 50, y: 84, type: "end", label: "收筆" }
      ],
      centerD: "M 50,16 L 50,84",
      outlineD: "M 48,16 C 45,15 45,20 46,26 L 46,74 C 44,80 48,84 50,85 C 52,84 56,80 54,74 L 54,26 C 55,20 55,15 52,16 Z"
    },
    {
      id: "3", name: "點", bpmf: "ㄉㄧㄢˇ", examples: ["主", "冬", "六"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "跳跳點", avatar: "💧", color: "#319795", title: "雨滴精靈" },
      speechText: "這是點，由上往右下輕頓。",
      hint: "從綠點輕輕落下，往右下方滑動稍停，像一顆小水滴。",
      points: [[40, 36], [48, 48], [58, 62]],
      keyPoints: [
        { x: 40, y: 36, type: "start", label: "起筆" },
        { x: 58, y: 62, type: "end", label: "收筆" }
      ],
      centerD: "M 40,36 L 58,62",
      outlineD: "M 40,36 C 44,34 50,38 52,44 C 55,50 62,56 62,61 C 61,65 55,64 50,60 C 44,54 38,42 40,36 Z"
    },
    {
      id: "4", name: "撇", bpmf: "ㄆㄧㄝˇ", examples: ["戈", "人", "戶"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "溜溜撇", avatar: "🛝", color: "#DD6B20", title: "滑梯精靈" },
      speechText: "這是撇，由右上往左下彎出鋒。",
      hint: "從綠點起筆，像溜滑梯一樣往左下順順滑出尖尖的尾巴。",
      points: [[68, 18], [56, 36], [40, 56], [20, 78]],
      keyPoints: [
        { x: 68, y: 18, type: "start", label: "起筆" },
        { x: 20, y: 78, type: "end", label: "收筆" }
      ],
      centerD: "M 68,18 Q 50,45 20,78",
      outlineD: "M 67,18 C 72,17 73,21 68,26 C 54,44 40,60 19,79 C 25,72 45,46 59,25 C 63,20 62,18 67,18 Z"
    },
    {
      id: "5", name: "捺", bpmf: "ㄋㄚˋ", examples: ["木", "大", "人"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "穩穩捺", avatar: "🐾", color: "#C53030", title: "健步精靈" },
      speechText: "這是捺，由左上往右下，由輕到重再平出鋒。",
      hint: "由輕入筆，往右下越來越粗，在拐彎處慢慢平平地送出尖角。",
      points: [[24, 26], [42, 42], [62, 65], [82, 72]],
      keyPoints: [
        { x: 24, y: 26, type: "start", label: "起筆" },
        { x: 62, y: 65, type: "turn", label: "轉折/重頓" },
        { x: 82, y: 72, type: "end", label: "收筆" }
      ],
      centerD: "M 24,26 Q 48,46 62,65 L 82,72",
      outlineD: "M 24,26 C 26,24 29,26 33,32 C 45,48 56,58 64,68 C 71,69 77,71 83,72 C 77,74 68,76 59,73 C 49,67 36,49 24,26 Z"
    },
    {
      id: "6", name: "挑", bpmf: "ㄊㄧㄠˇ", examples: ["冰", "河", "打"],
      zone: 1, zoneTitle: "筆起綠洲",
      spirit: { name: "飛飛挑", avatar: "🪁", color: "#805AD5", title: "飛鳶精靈" },
      speechText: "這是挑，由左下往右上快速挑起。",
      hint: "從綠點用力頓一下，往右上方向像放風箏一樣俐落挑起！",
      points: [[25, 75], [42, 60], [60, 46], [78, 32]],
      keyPoints: [
        { x: 25, y: 75, type: "start", label: "起筆" },
        { x: 78, y: 32, type: "end", label: "收筆" }
      ],
      centerD: "M 25,75 L 78,32",
      outlineD: "M 24,73 C 22,76 25,79 30,76 L 79,32 C 75,37 54,55 36,68 C 29,73 25,72 24,73 Z"
    },

    // Zone 2: 轉折山丘
    {
      id: "7", name: "橫折", bpmf: "ㄏㄥˊ ㄓㄜˊ", examples: ["己", "五", "真"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "拐角橫折", avatar: "📐", color: "#2B6CB0", title: "直角小兵" },
      speechText: "這是橫折，橫過去後停一下，轉彎往下直直寫。",
      hint: "橫到右上角先停一下，轉出尖尖的角，再筆直向下！",
      points: [[20, 26], [45, 26], [76, 26], [76, 55], [76, 84]],
      keyPoints: [
        { x: 20, y: 26, type: "start", label: "起筆" },
        { x: 76, y: 26, type: "turn", label: "轉折" },
        { x: 76, y: 84, type: "end", label: "收筆" }
      ],
      centerD: "M 20,26 L 76,26 L 76,84",
      outlineD: "M 19,26 C 18,22 23,21 30,22 L 72,22 C 78,21 82,24 82,28 L 82,82 C 81,86 73,86 72,82 L 72,30 L 28,30 C 22,31 18,29 19,26 Z"
    },
    {
      id: "8", name: "豎折", bpmf: "ㄕㄨˋ ㄓㄜˊ", examples: ["匠", "叫"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "尖角豎折", avatar: "🪑", color: "#2F855A", title: "石椅精靈" },
      speechText: "這是豎折，直直往下，尖角轉彎往右寫。",
      hint: "注意轉角是直直的尖角喔！往下到底轉折往右平平橫過來。",
      points: [[25, 18], [25, 48], [25, 78], [52, 78], [80, 78]],
      keyPoints: [
        { x: 25, y: 18, type: "start", label: "起筆" },
        { x: 25, y: 78, type: "turn", label: "轉折(尖角)" },
        { x: 80, y: 78, type: "end", label: "收筆" }
      ],
      centerD: "M 25,18 L 25,78 L 80,78",
      outlineD: "M 23,18 C 22,14 28,14 29,18 L 29,74 L 78,74 C 82,73 84,77 82,81 C 80,84 76,83 72,83 L 23,83 C 20,83 20,77 20,74 L 20,22 C 20,18 22,18 23,18 Z"
    },
    {
      id: "8-1", name: "豎曲", bpmf: "ㄕㄨˋ ㄑㄩ", examples: ["匹", "忙"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "圓圓豎曲", avatar: "🥣", color: "#319795", title: "弧線精靈" },
      speechText: "這是豎曲，往下圓潤彎過來，不要寫出尖角喔！",
      hint: "和豎折不一樣！轉彎處要像小船肚子一樣圓圓彎過去，不是尖角喔！",
      points: [[25, 18], [25, 48], [28, 64], [38, 75], [54, 78], [80, 78]],
      keyPoints: [
        { x: 25, y: 18, type: "start", label: "起筆" },
        { x: 38, y: 75, type: "turn", label: "圓弧轉彎" },
        { x: 80, y: 78, type: "end", label: "收筆" }
      ],
      centerD: "M 25,18 L 25,52 Q 26,78 50,78 L 80,78",
      outlineD: "M 23,18 C 23,14 28,14 29,18 L 29,52 Q 30,73 52,73 L 78,73 C 82,73 83,77 81,81 C 79,83 74,83 72,83 L 50,83 Q 21,83 20,54 L 20,22 C 20,18 22,18 23,18 Z"
    },
    {
      id: "9", name: "橫鉤", bpmf: "ㄏㄥˊ ㄍㄡ", examples: ["家", "也", "他"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "屋簷橫鉤", avatar: "🦅", color: "#D69E2E", title: "小鷹精靈" },
      speechText: "這是橫鉤，橫過去後，往左下方鉤出來。",
      hint: "橫到右上角稍停，往左下內側小鉤一下，像屋簷的燕子回頭！",
      points: [[18, 30], [45, 30], [78, 30], [64, 48]],
      keyPoints: [
        { x: 18, y: 30, type: "start", label: "起筆" },
        { x: 78, y: 30, type: "turn", label: "轉折" },
        { x: 64, y: 48, type: "hook", label: "鉤尖(朝左下)" }
      ],
      centerD: "M 18,30 L 78,30 L 64,48",
      outlineD: "M 18,30 C 17,26 22,25 28,26 L 74,26 C 81,25 83,28 82,32 L 63,49 C 61,51 59,49 61,46 L 72,33 L 26,33 C 21,34 17,33 18,30 Z"
    },
    {
      id: "10", name: "豎鉤", bpmf: "ㄕㄨˋ ㄍㄡ", examples: ["小", "可", "丁"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "踢踢豎鉤", avatar: "🦿", color: "#E53E3E", title: "踢腿精靈" },
      speechText: "這是豎鉤，筆直往下，在底部向左上方踢起小鉤！",
      hint: "由上直直寫到最下面，稍微頓一下，向左上方俐落踢鉤！",
      points: [[50, 16], [50, 50], [50, 84], [34, 70]],
      keyPoints: [
        { x: 50, y: 16, type: "start", label: "起筆" },
        { x: 50, y: 84, type: "turn", label: "拐點" },
        { x: 34, y: 70, type: "hook", label: "鉤尖(朝左上)" }
      ],
      centerD: "M 50,16 L 50,84 L 34,70",
      outlineD: "M 48,16 C 45,15 46,20 47,26 L 47,76 L 35,68 C 32,66 32,69 35,72 L 48,85 C 50,86 53,84 53,80 L 53,26 C 54,20 54,15 51,16 Z"
    },
    {
      id: "11", name: "斜鉤", bpmf: "ㄒㄧㄝˊ ㄍㄡ", examples: ["武", "我"],
      zone: 2, zoneTitle: "轉折山丘",
      spirit: { name: "彎弓斜鉤", avatar: "🏹", color: "#805AD5", title: "長弓精靈" },
      speechText: "這是斜鉤，斜斜往右下微彎，底部向上直鉤！",
      hint: "像一把拉開的弓，斜斜往右下延伸，到底停住朝正上方鉤出！",
      points: [[30, 16], [42, 38], [58, 60], [74, 82], [74, 64]],
      keyPoints: [
        { x: 30, y: 16, type: "start", label: "起筆" },
        { x: 74, y: 82, type: "turn", label: "拐點" },
        { x: 74, y: 64, type: "hook", label: "鉤尖(朝正上)" }
      ],
      centerD: "M 30,16 Q 50,50 74,82 L 74,64",
      outlineD: "M 29,15 C 31,14 34,16 35,21 Q 54,54 75,82 C 76,83 78,82 78,79 L 78,63 C 78,61 74,61 74,64 L 73,76 Q 50,47 31,18 C 29,15 28,15 29,15 Z"
    },

    // Zone 3: 鉤鉤深潭
    {
      id: "12", name: "臥鉤", bpmf: "ㄨㄛˋ ㄍㄡ", examples: ["心", "想", "惠"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "搖籃臥鉤", avatar: "🌙", color: "#3182CE", title: "彎月精靈" },
      speechText: "這是臥鉤，像彎彎的月牙躺著，尾巴向左上挑鉤。",
      hint: "從綠點順順斜下，貼著底部圓潤兜過來，向上朝左上心窩鉤去！",
      points: [[20, 46], [36, 68], [58, 74], [78, 64], [66, 44]],
      keyPoints: [
        { x: 20, y: 46, type: "start", label: "起筆" },
        { x: 78, y: 64, type: "turn", label: "仰起處" },
        { x: 66, y: 44, type: "hook", label: "鉤尖(朝左上)" }
      ],
      centerD: "M 20,46 Q 44,82 78,64 L 66,44",
      outlineD: "M 19,45 C 22,43 25,47 27,51 Q 48,82 78,65 C 80,64 80,62 77,59 L 66,43 C 64,41 63,43 65,46 L 73,59 Q 47,74 24,49 C 20,44 18,46 19,45 Z"
    },
    {
      id: "13", name: "橫折鉤", bpmf: "ㄏㄥˊ ㄓㄜˊ ㄍㄡ", examples: ["同", "的", "雨"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "門框橫折鉤", avatar: "🚪", color: "#38A169", title: "方門精靈" },
      speechText: "這是橫折鉤，橫過去折角向下，到底向左上鉤起！",
      hint: "橫到右上頓筆轉彎，豎直到最下面，朝左上踢出尖鉤！",
      points: [[20, 26], [50, 26], [76, 26], [76, 55], [76, 84], [58, 70]],
      keyPoints: [
        { x: 20, y: 26, type: "start", label: "起筆" },
        { x: 76, y: 26, type: "turn", label: "折角" },
        { x: 76, y: 84, type: "turn", label: "拐點" },
        { x: 58, y: 70, type: "hook", label: "鉤尖" }
      ],
      centerD: "M 20,26 L 76,26 L 76,84 L 58,70",
      outlineD: "M 19,25 C 20,22 25,22 30,22 L 72,22 C 78,21 82,24 82,28 L 82,82 L 59,69 C 56,67 56,70 59,73 L 73,85 C 76,87 78,86 78,81 L 78,28 L 28,28 C 22,29 18,28 19,25 Z"
    },
    {
      id: "14", name: "橫撇", bpmf: "ㄏㄥˊ ㄆㄧㄝˇ", examples: ["發", "友", "又"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "折扇橫撇", avatar: "🪭", color: "#DD6B20", title: "秋風精靈" },
      speechText: "這是橫撇，短橫過去折角，向左下順順撇出。",
      hint: "橫到轉彎處稍停，向左下方劃出一道優美的長撇！",
      points: [[20, 28], [50, 28], [76, 28], [60, 48], [42, 66], [20, 82]],
      keyPoints: [
        { x: 20, y: 28, type: "start", label: "起筆" },
        { x: 76, y: 28, type: "turn", label: "折角" },
        { x: 20, y: 82, type: "end", label: "收筆" }
      ],
      centerD: "M 20,28 L 76,28 Q 55,55 20,82",
      outlineD: "M 19,27 C 20,24 25,24 30,25 L 72,25 C 78,24 81,27 80,31 C 70,53 50,71 19,83 C 25,78 51,57 73,31 L 28,31 C 21,32 18,30 19,27 Z"
    },
    {
      id: "15", name: "撇頓點", bpmf: "ㄆㄧㄝˇ ㄉㄨㄣˋ ㄉㄧㄢˇ", examples: ["女", "經", "安"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "舞姿撇頓點", avatar: "💃", color: "#D53F8C", title: "仙女精靈" },
      speechText: "這是撇頓點，撇到中間用力頓住，再往右下寫長點。",
      hint: "女字的第一筆！先向左下撇，在轉彎處用力按一下，再向右下壓出長點！",
      points: [[58, 16], [42, 34], [30, 52], [46, 64], [64, 74], [78, 80]],
      keyPoints: [
        { x: 58, y: 16, type: "start", label: "起筆" },
        { x: 30, y: 52, type: "turn", label: "轉折/重頓" },
        { x: 78, y: 80, type: "end", label: "收筆" }
      ],
      centerD: "M 58,16 L 30,52 L 78,80",
      outlineD: "M 58,15 C 61,15 62,18 58,22 L 34,51 C 32,53 34,57 37,59 L 77,80 C 80,81 78,84 74,83 L 31,57 C 28,55 27,51 29,48 L 54,17 C 56,15 57,15 58,15 Z"
    },
    {
      id: "16", name: "長頓點", bpmf: "ㄔㄤˊ ㄉㄨㄣˋ ㄉㄧㄢˇ", examples: ["小", "不", "美"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "穩重長點", avatar: "🪵", color: "#805AD5", title: "磐石精靈" },
      speechText: "這是長頓點，比一般點更長，斜斜向右下用力按壓。",
      hint: "小字右邊的那一筆！由輕入筆，往右下方漸漸加粗，穩穩按住停筆。",
      points: [[36, 24], [46, 40], [56, 58], [66, 76]],
      keyPoints: [
        { x: 36, y: 24, type: "start", label: "起筆" },
        { x: 66, y: 76, type: "end", label: "收筆" }
      ],
      centerD: "M 36,24 L 66,76",
      outlineD: "M 35,23 C 38,21 42,24 44,28 L 69,72 C 71,76 67,80 62,79 C 58,78 54,73 52,69 L 34,28 C 33,25 34,24 35,23 Z"
    },
    {
      id: "17", name: "豎撇", bpmf: "ㄕㄨˋ ㄆㄧㄝˇ", examples: ["風", "青", "麼"],
      zone: 3, zoneTitle: "鉤鉤深潭",
      spirit: { name: "楊柳豎撇", avatar: "🌾", color: "#38A169", title: "綠柳精靈" },
      speechText: "這是豎撇，先直直往下走，後半段才輕輕向左彎撇。",
      hint: "上半段要直直站好，到了肚子中間才優雅地向左下方飄出去！",
      points: [[54, 16], [54, 38], [52, 54], [42, 68], [24, 82], [14, 86]],
      keyPoints: [
        { x: 54, y: 16, type: "start", label: "起筆" },
        { x: 52, y: 54, type: "turn", label: "轉弧點" },
        { x: 14, y: 86, type: "end", label: "收筆" }
      ],
      centerD: "M 54,16 L 54,45 Q 52,75 14,86",
      outlineD: "M 52,16 C 53,13 57,14 58,18 L 58,45 Q 56,72 14,87 C 22,82 50,68 52,45 L 52,19 C 52,16 51,16 52,16 Z"
    },

    // Zone 4: 挑折秘境
    {
      id: "18", name: "豎挑", bpmf: "ㄕㄨˋ ㄊㄧㄠˇ", examples: ["民", "長", "滾"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "彈跳豎挑", avatar: "🦘", color: "#3182CE", title: "袋鼠精靈" },
      speechText: "這是豎挑，直直往下到底，尖角轉向右上挑起！",
      hint: "先筆直向下到底停筆，往右上方像彈簧一樣俐落挑上去！",
      points: [[28, 16], [28, 48], [28, 82], [48, 64], [72, 46]],
      keyPoints: [
        { x: 28, y: 16, type: "start", label: "起筆" },
        { x: 28, y: 82, type: "turn", label: "折角" },
        { x: 72, y: 46, type: "end", label: "收筆" }
      ],
      centerD: "M 28,16 L 28,82 L 72,46",
      outlineD: "M 26,16 C 27,13 32,14 33,18 L 33,78 L 73,45 C 75,44 76,47 73,50 L 31,84 C 27,87 24,84 24,80 L 24,20 C 24,16 25,16 26,16 Z"
    },
    {
      id: "19", name: "撇橫", bpmf: "ㄆㄧㄝˇ ㄏㄥˊ", examples: ["母", "互", "充"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "折平撇橫", avatar: "🚤", color: "#D69E2E", title: "平舟精靈" },
      speechText: "這是撇橫，往左下撇，在轉彎處平平橫過去。",
      hint: "母字的中間！先向左下斜斜撇，停一下轉折，由左往右平平橫過去。",
      points: [[66, 20], [50, 36], [32, 54], [52, 54], [78, 54]],
      keyPoints: [
        { x: 66, y: 20, type: "start", label: "起筆" },
        { x: 32, y: 54, type: "turn", label: "折角" },
        { x: 78, y: 54, type: "end", label: "收筆" }
      ],
      centerD: "M 66,20 L 32,54 L 78,54",
      outlineD: "M 66,19 C 69,18 70,22 66,26 L 36,51 L 76,51 C 80,51 81,55 79,58 C 76,60 72,58 68,58 L 29,58 C 26,58 26,53 29,50 L 61,19 C 63,18 64,18 66,19 Z"
    },
    {
      id: "20", name: "撇挑", bpmf: "ㄆㄧㄝˇ ㄊㄧㄠˇ", examples: ["能", "紅", "綠"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "揚旗撇挑", avatar: "🚩", color: "#E53E3E", title: "彩旗精靈" },
      speechText: "這是撇挑，斜斜往左下，折彎後往右上挑出尖角！",
      hint: "注意和撇橫不同！轉彎後要往右上斜斜挑上去，不是平平的喔！",
      points: [[62, 20], [46, 38], [30, 60], [48, 50], [72, 36]],
      keyPoints: [
        { x: 62, y: 20, type: "start", label: "起筆" },
        { x: 30, y: 60, type: "turn", label: "折角" },
        { x: 72, y: 36, type: "end", label: "收筆" }
      ],
      centerD: "M 62,20 L 30,60 L 72,36",
      outlineD: "M 62,19 C 65,18 66,22 62,26 L 34,57 L 73,35 C 76,34 77,37 74,40 L 32,63 C 28,65 26,62 28,58 L 57,19 C 59,18 60,18 62,19 Z"
    },
    {
      id: "21", name: "橫折橫", bpmf: "ㄏㄥˊ ㄓㄜˊ ㄏㄥˊ", examples: ["凹", "朵"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "階梯橫折橫", avatar: "🪜", color: "#38A169", title: "小梯精靈" },
      speechText: "這是橫折橫，橫、折、橫，像走兩級小階梯！",
      hint: "橫過去，直直折下，再橫過去！共有兩個折角喔。",
      points: [[18, 30], [48, 30], [48, 52], [48, 70], [65, 70], [82, 70]],
      keyPoints: [
        { x: 18, y: 30, type: "start", label: "起筆" },
        { x: 48, y: 30, type: "turn", label: "折角1" },
        { x: 48, y: 70, type: "turn", label: "折角2" },
        { x: 82, y: 70, type: "end", label: "收筆" }
      ],
      centerD: "M 18,30 L 48,30 L 48,70 L 82,70",
      outlineD: "M 18,30 C 18,26 23,26 28,26 L 45,26 C 50,25 53,28 53,33 L 53,66 L 79,66 C 83,66 84,70 82,74 C 80,76 76,75 72,75 L 45,75 C 41,75 41,70 41,66 L 41,34 L 26,34 C 21,34 18,33 18,30 Z"
    },
    {
      id: "22", name: "豎橫折", bpmf: "ㄕㄨˋ ㄏㄥˊ ㄓㄜˊ", examples: ["吳", "誤"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "門栓豎橫折", avatar: "🪛", color: "#DD6B20", title: "鐵門栓精靈" },
      speechText: "這是豎橫折，豎、橫、折，直下折右再直下。",
      hint: "由上直下，右轉橫出，再轉折直直向下，像個工整的曲尺。",
      points: [[26, 20], [26, 48], [48, 48], [74, 48], [74, 68], [74, 84]],
      keyPoints: [
        { x: 26, y: 20, type: "start", label: "起筆" },
        { x: 26, y: 48, type: "turn", label: "折角1" },
        { x: 74, y: 48, type: "turn", label: "折角2" },
        { x: 74, y: 84, type: "end", label: "收筆" }
      ],
      centerD: "M 26,20 L 26,48 L 74,48 L 74,84",
      outlineD: "M 25,20 C 26,17 31,17 31,21 L 31,44 L 70,44 C 76,43 79,46 79,51 L 79,81 C 78,85 71,85 70,81 L 70,52 L 28,52 C 24,52 23,48 23,45 L 23,23 C 23,20 24,20 25,20 Z"
    },
    {
      id: "23", name: "橫曲鉤", bpmf: "ㄏㄥˊ ㄑㄩ ㄍㄡ", examples: ["乙", "吃", "九"],
      zone: 4, zoneTitle: "挑折秘境",
      spirit: { name: "游魚橫曲鉤", avatar: "🐟", color: "#319795", title: "錦鯉精靈" },
      speechText: "這是橫曲鉤，短橫過去順順圓彎向下，底部向上鉤起！",
      hint: "九字和乙字的筆畫！橫過去圓圓拐彎滑到底，朝正上方鉤起！",
      points: [[20, 28], [54, 28], [50, 48], [54, 68], [66, 78], [78, 76], [80, 56]],
      keyPoints: [
        { x: 20, y: 28, type: "start", label: "起筆" },
        { x: 54, y: 28, type: "turn", label: "轉折" },
        { x: 78, y: 76, type: "turn", label: "拐點" },
        { x: 80, y: 56, type: "hook", label: "鉤尖(朝正上)" }
      ],
      centerD: "M 20,28 L 54,28 Q 45,55 58,74 Q 68,82 78,76 L 80,56",
      outlineD: "M 20,27 C 22,24 26,24 30,25 L 53,25 C 57,25 58,28 55,32 Q 47,56 60,73 Q 69,79 78,75 L 81,56 C 82,54 84,55 83,58 L 81,77 C 76,84 64,83 54,75 Q 41,56 50,31 L 28,31 C 23,32 19,30 20,27 Z"
    },

    // Zone 5: 蜿蜒神峰
    {
      id: "24", name: "豎曲鉤", bpmf: "ㄕㄨˋ ㄑㄩ ㄍㄡ", examples: ["乳", "北", "包"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "白天鵝豎曲鉤", avatar: "🦢", color: "#2B6CB0", title: "天鵝精靈" },
      speechText: "這是豎曲鉤，直直往下，圓圓轉右，最後向上小鉤。",
      hint: "兒字和包字的漂亮身形！直直到下半部，圓圓滑向右邊，再朝天小鉤！",
      points: [[28, 16], [28, 48], [32, 68], [44, 82], [62, 82], [76, 82], [76, 62]],
      keyPoints: [
        { x: 28, y: 16, type: "start", label: "起筆" },
        { x: 44, y: 82, type: "turn", label: "圓弧底部" },
        { x: 76, y: 82, type: "turn", label: "拐點" },
        { x: 76, y: 62, type: "hook", label: "鉤尖(朝正上)" }
      ],
      centerD: "M 28,16 L 28,52 Q 29,82 60,82 L 76,82 L 76,62",
      outlineD: "M 26,16 C 27,13 32,13 33,17 L 33,52 Q 34,78 60,78 L 74,78 L 74,62 C 74,59 78,59 78,63 L 78,82 C 77,85 74,86 70,86 L 58,86 Q 25,86 24,52 L 24,19 C 24,16 25,16 26,16 Z"
    },
    {
      id: "25", name: "彎鉤", bpmf: "ㄨㄢ ㄍㄡ", examples: ["豕", "手", "狗"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "靈狐彎鉤", avatar: "🦊", color: "#DD6B20", title: "巧狐精靈" },
      speechText: "這是彎鉤，肚子微凸圓圓向下彎，到底向左上鉤起！",
      hint: "狗字偏旁（反犬旁）那一筆！不是直直的豎喔，肚子要像吃飽一樣微微凸出再鉤！",
      points: [[46, 16], [54, 34], [56, 52], [52, 70], [45, 84], [30, 70]],
      keyPoints: [
        { x: 46, y: 16, type: "start", label: "起筆" },
        { x: 45, y: 84, type: "turn", label: "拐點" },
        { x: 30, y: 70, type: "hook", label: "鉤尖(朝左上)" }
      ],
      centerD: "M 46,16 Q 60,50 45,84 L 30,70",
      outlineD: "M 45,15 C 48,14 51,17 52,22 Q 63,52 48,83 L 32,69 C 29,66 31,63 34,66 L 46,78 C 53,60 52,40 45,21 C 43,17 43,16 45,15 Z"
    },
    {
      id: "26", name: "橫斜鉤", bpmf: "ㄏㄥˊ ㄒㄧㄝˊ ㄍㄡ", examples: ["風", "氣"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "乘風橫斜鉤", avatar: "🌪️", color: "#3182CE", title: "烈風精靈" },
      speechText: "這是橫斜鉤，短橫過去折彎，斜斜向右下滑，再向上鉤起！",
      hint: "風字外面的右半邊！橫過去微頓，斜斜大弧度彎向右下方，底部向上鉤起！",
      points: [[20, 26], [56, 26], [62, 44], [70, 62], [78, 82], [80, 62]],
      keyPoints: [
        { x: 20, y: 26, type: "start", label: "起筆" },
        { x: 56, y: 26, type: "turn", label: "折角" },
        { x: 78, y: 82, type: "turn", label: "拐點" },
        { x: 80, y: 62, type: "hook", label: "鉤尖(朝正上)" }
      ],
      centerD: "M 20,26 L 56,26 Q 68,54 78,82 L 80,62",
      outlineD: "M 19,25 C 21,22 26,22 30,23 L 54,23 C 60,23 62,26 61,31 Q 70,56 79,81 L 82,62 C 82,59 85,60 84,64 L 81,83 C 80,86 77,86 75,83 Q 63,53 54,29 L 28,29 C 23,30 19,28 19,25 Z"
    },
    {
      id: "27", name: "橫撇橫折鉤", bpmf: "ㄏㄥˊ ㄆㄧㄝˇ ㄏㄥˊ ㄓㄜˊ ㄍㄡ", examples: ["奶", "乃", "秀"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "神龍五折鉤", avatar: "🐲", color: "#805AD5", title: "紫龍精靈" },
      speechText: "這是橫撇橫折鉤，名字最長但最帥氣！一筆畫出好多轉折喔！",
      hint: "乃字的第一筆！橫、撇、橫、折、鉤，全程要一筆連續寫完不能停筆喔！",
      points: [[20, 24], [58, 24], [44, 40], [32, 52], [54, 52], [74, 52], [74, 68], [74, 84], [56, 72]],
      keyPoints: [
        { x: 20, y: 24, type: "start", label: "起筆" },
        { x: 58, y: 24, type: "turn", label: "折角1" },
        { x: 32, y: 52, type: "turn", label: "折角2" },
        { x: 74, y: 52, type: "turn", label: "折角3" },
        { x: 74, y: 84, type: "turn", label: "折角4" },
        { x: 56, y: 72, type: "hook", label: "鉤尖" }
      ],
      centerD: "M 20,24 L 58,24 L 32,52 L 74,52 L 74,84 L 56,72",
      outlineD: "M 19,23 C 21,21 26,21 30,22 L 56,22 C 61,22 63,25 58,29 L 38,50 L 71,50 C 76,49 78,52 78,56 L 78,82 L 57,71 C 54,69 54,72 57,75 L 72,86 C 75,88 77,86 76,82 L 76,55 L 30,55 C 26,55 25,50 28,47 L 48,26 L 28,26 C 22,27 19,25 19,23 Z"
    },
    {
      id: "28", name: "豎橫折鉤", bpmf: "ㄕㄨˋ ㄏㄥˊ ㄓㄜˊ ㄍㄡ", examples: ["焉", "第", "號"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "方鼎豎橫折鉤", avatar: "🏰", color: "#2F855A", title: "城堡精靈" },
      speechText: "這是豎橫折鉤，豎下、橫過、折下、到底朝左上鉤起！",
      hint: "第字和號字下半部！由上直下，右轉橫過，折角直下到底踢起帥氣小鉤！",
      points: [[26, 20], [26, 44], [48, 44], [72, 44], [72, 66], [72, 84], [54, 72]],
      keyPoints: [
        { x: 26, y: 20, type: "start", label: "起筆" },
        { x: 26, y: 44, type: "turn", label: "折角1" },
        { x: 72, y: 44, type: "turn", label: "折角2" },
        { x: 72, y: 84, type: "turn", label: "拐點" },
        { x: 54, y: 72, type: "hook", label: "鉤尖" }
      ],
      centerD: "M 26,20 L 26,44 L 72,44 L 72,84 L 54,72",
      outlineD: "M 25,20 C 26,17 31,17 31,21 L 31,40 L 68,40 C 74,39 77,42 77,47 L 77,82 L 55,71 C 52,69 52,72 55,75 L 70,86 C 73,88 75,86 75,81 L 75,47 L 29,47 C 24,47 23,43 23,40 L 23,23 C 23,20 24,20 25,20 Z"
    },
    {
      id: "29", name: "橫折橫折", bpmf: "ㄏㄥˊ ㄓㄜˊ ㄏㄥˊ ㄓㄜˊ", examples: ["凸"],
      zone: 5, zoneTitle: "蜿蜒神峰",
      spirit: { name: "積木橫折橫折", avatar: "🧱", color: "#C53030", title: "積木精靈" },
      speechText: "這是橫折橫折，橫、折、橫、折，像走下兩層大階梯！",
      hint: "凸字的神奇筆畫！注意和橫折橫不同，最後還要再轉折往下直直收筆喔！",
      points: [[16, 28], [44, 28], [44, 56], [76, 56], [76, 84]],
      keyPoints: [
        { x: 16, y: 28, type: "start", label: "起筆" },
        { x: 44, y: 28, type: "turn", label: "折角1" },
        { x: 44, y: 56, type: "turn", label: "折角2" },
        { x: 76, y: 56, type: "turn", label: "折角3" },
        { x: 76, y: 84, type: "end", label: "收筆" }
      ],
      centerD: "M 16,28 L 44,28 L 44,56 L 76,56 L 76,84",
      outlineD: "M 16,28 C 16,24 21,24 26,24 L 41,24 C 46,24 49,27 49,31 L 49,52 L 72,52 C 77,52 80,55 80,60 L 80,82 C 79,86 72,86 71,82 L 71,61 L 41,61 C 37,61 37,56 37,52 L 37,32 L 23,32 C 18,32 16,30 16,28 Z"
    }
  ];

  const ZONES = [
    { id: 1, name: "筆起綠洲", range: "1–6", icon: "🌱", color: "#2B6CB0", desc: "橫、豎、點、撇、捺、挑 基本六筆" },
    { id: 2, name: "轉折山丘", range: "7–11 (含 8-1)", icon: "⛰️", color: "#2F855A", desc: "橫折、豎折、豎曲、橫鉤、豎鉤、斜鉤" },
    { id: 3, name: "鉤鉤深潭", range: "12–17", icon: "🌊", color: "#319795", desc: "臥鉤、橫折鉤、橫撇、撇頓點、長頓點、豎撇" },
    { id: 4, name: "挑折秘境", range: "18–23", icon: "🌲", color: "#DD6B20", desc: "豎挑、撇橫、撇挑、橫折橫、豎橫折、橫曲鉤" },
    { id: 5, name: "蜿蜒神峰", range: "24–29", icon: "⭐", color: "#805AD5", desc: "豎曲鉤、彎鉤、橫斜鉤、橫撇橫折鉤、豎橫折鉤、橫折橫折" }
  ];

  return {
    STROKES,
    ZONES,
    getById: function (id) {
      return STROKES.find(s => s.id === String(id));
    },
    getByZone: function (zoneId) {
      return STROKES.filter(s => s.zone === Number(zoneId));
    }
  };
});
