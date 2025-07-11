# Chatbot_GLM2

## 專案簡介
本專案是一個基於 Django 的網頁聊天機器人平台，結合 LangChain 架構與 ChatGLM2-6B 語言模型，支援多知識庫管理、文件上傳、知識問答、以及多裝置自適應的網頁介面。後端與本地大語言模型服務（如 ChatGLM2-6B）進行串接，並可根據不同知識庫進行問答。

## 主要功能
- 支援多個知識庫的切換與管理。
- 可上傳文件至指定知識庫，並自動建立向量索引。
- 聊天機器人可根據知識庫內容進行問答，並回傳資料來源。
- 支援知識庫與文件的刪除功能。
- 前端介面美觀，支援多裝置自適應。
- 具備新手常見問題預設按鈕（針對特定知識庫）。
- 使用者註冊（雛形）。

## 技術棧
- Python 3.x
- Django 3.2.x
- 前端：HTML、CSS（Bootstrap 5）、JavaScript
- 向量資料儲存：FAISS
- 語言模型：ChatGLM2-6B（本地 API 服務）
- 其他：requests、json、codecs

## 專案結構
- `chatbot_app/views.py`：主要業務邏輯（聊天、知識庫管理、檔案上傳/刪除等）
- `chatbot_app/templates/chatbot.html`：主網頁模板
- `chatbot_app/static/`：前端靜態資源（JS、CSS、圖片、知識庫資料）
- `chatbot_project/settings.py`：Django 設定
- `chatbot_project/urls.py`：URL 路由設定

## 安裝與啟動方式

1. **安裝依賴套件**
   ```bash
   pip install django requests
   ```
2. **啟動 Django 伺服器**
   ```bash
   python manage.py runserver
   ```
3. **（選用）啟動本地語言模型 API 服務**  
   請確保 ChatGLM2-6B 或相關 API 已於本地 192.168.1.106:7860 運行。

4. **瀏覽器開啟**
   ```
   http://127.0.0.1:8000/
   ```

## 使用說明
- 進入首頁後可選擇知識庫，或自行上傳文件建立新知識庫。
- 於聊天視窗輸入問題，機器人會根據知識庫內容回覆。
- 可於側邊欄上傳/刪除知識庫文件，或刪除整個知識庫。
- 支援多裝置瀏覽，介面自適應。

## 注意事項
- 本專案預設知識庫與向量資料存於 `chatbot_app/static/knowledge_base/` 目錄下。
- 若需跨平台部署，請注意路徑與換行符號（LF/CRLF）設定。
- 本專案僅供內部測試與學術研究，請勿用於商業用途。
