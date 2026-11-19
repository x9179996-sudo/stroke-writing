# -*- coding: utf-8 -*-
"""
tools/verify_pdf.py
使用 Python pypdf 讀取「筆畫學習單.pdf」的頁數與每頁尺寸 (pt 及 mm/cm)
"""
import pypdf
import os

pdf_path = r"C:\Users\JinYi\Claude code作品\20261119_筆畫名稱\筆畫學習單.pdf"

if not os.path.exists(pdf_path):
    print(f"錯誤：找不到檔案 {pdf_path}")
    exit(1)

reader = pypdf.PdfReader(pdf_path)
total_pages = len(reader.pages)

print("==========================================================================")
print("   A4 筆畫學習單 PDF 規格自動量測報告 (pypdf)")
print("==========================================================================")
print(f"PDF 檔案路徑：{pdf_path}")
print(f"總頁數 (Page Count)：{total_pages} 頁 (規格要求：5 頁，無空白頁)")
print("--------------------------------------------------------------------------")
print("| 頁碼 | 頁面名稱 | 寬度 (pt) | 高度 (pt) | 寬度 (mm) | 高度 (mm) | 符合 A4 (210×297mm) |")
print("|:---|:---|:---|:---|:---|:---|:---|")

page_titles = [
    "描寫單第 1 頁 (筆畫 1~10)",
    "描寫單第 2 頁 (筆畫 11~20)",
    "描寫單第 3 頁 (筆畫 21~29)",
    "連連看配對單第 4 頁 (10題抽測)",
    "教師與家長參考解答第 5 頁"
]

for idx, page in enumerate(reader.pages):
    box = page.mediabox
    w_pt = float(box.width)
    h_pt = float(box.height)
    # 1 pt = 25.4 / 72 mm
    w_mm = w_pt * 25.4 / 72.0
    h_mm = h_pt * 25.4 / 72.0
    
    is_a4 = abs(w_mm - 210.0) < 2.0 and abs(h_mm - 297.0) < 2.0
    title = page_titles[idx] if idx < len(page_titles) else f"第 {idx+1} 頁"
    status = "✅ 標準 A4" if is_a4 else "⚠️ 非標準"
    
    print(f"| {idx+1} | {title} | {w_pt:.2f} | {h_pt:.2f} | {w_mm:.1f} mm | {h_mm:.1f} mm | {status} |")

print("==========================================================================")
