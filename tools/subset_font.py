# -*- coding: utf-8 -*-
import os
import re
import subprocess

base_dir = r"C:\Users\JinYi\Claude code作品\20261119_筆畫名稱"
strokes_file = os.path.join(base_dir, "strokes.js")
kai_ttf = os.path.join(base_dir, "fonts", "TW-Kai-98_1.ttf")
subset_woff2 = os.path.join(base_dir, "fonts", "TW-Kai-Subset.woff2")
chars_file = os.path.join(base_dir, "fonts", "subset_chars.txt")

with open(strokes_file, "r", encoding="utf-8") as f:
    text = f.read()

chars = set()

# 收集所有例字 (相容 examples: [ ... ] 與 "examples": [ ... ])
examples_matches = re.findall(r'examples\s*:\s*\[(.*?)\]', text)
for ex in examples_matches:
    for c in re.findall(r'"([^"]+)"', ex):
        chars.update(list(c))

# 收集筆畫名稱
names = re.findall(r'name\s*:\s*"([^"]+)"', text)
for n in names:
    chars.update(list(n))

# 學習單、首頁例字、練習格常備字
extra = "一二三四五六七八九十百千萬基本筆畫名稱與寫法練習單常用例字班級座號姓名得分說明解答"
chars.update(list(extra))

char_list = sorted(list(chars))
print(f"共收集 {len(char_list)} 個楷書字元：{''.join(char_list)}")

with open(chars_file, "w", encoding="utf-8") as f:
    f.write("".join(char_list))

# 呼叫 fontTools.subset 進行子集化並輸出 woff2
cmd = [
    "python", "-m", "fontTools.subset",
    kai_ttf,
    f"--text-file={chars_file}",
    f"--output-file={subset_woff2}",
    "--flavor=woff2"
]

print("執行子集化指令...")
res = subprocess.run(cmd, capture_output=True, text=True)
if os.path.exists(subset_woff2):
    orig_size = os.path.getsize(kai_ttf)
    new_size = os.path.getsize(subset_woff2)
    print(f"✅ 子集化成功！原大小: {orig_size:,} bytes ({orig_size/1024/1024:.2f} MB) -> 子集大小: {new_size:,} bytes ({new_size/1024:.1f} KB)")
    print(f"壓縮率: 省略了 {(1 - new_size/orig_size)*100:.2f}% 的體積！")
else:
    print("❌ 子集化失敗！", res.stderr)
