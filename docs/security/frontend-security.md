---
sidebar_position: 1
---

# 前端安全基礎

網頁安全是前端開發者必須掌握的重要知識，了解常見的安全威脅和防護措施。

## 🎯 學習目標

- 了解常見的前端安全威脅
- 掌握基本的安全防護措施
- 學會安全的開發實踐
- 建立安全意識和思維

## 🛡️ 常見安全威脅

### 1. 跨站腳本攻擊 (XSS)
- **反射型 XSS**：透過 URL 參數注入
- **儲存型 XSS**：惡意腳本儲存在資料庫
- **DOM 型 XSS**：透過 DOM 操作注入

**防護措施：**
- 輸入驗證與過濾
- 輸出編碼 (HTML Escape)
- Content Security Policy (CSP)
- 使用安全的框架特性

### 2. 跨站請求偽造 (CSRF)
- 利用用戶身份執行非授權操作
- 透過惡意網站發送請求

**防護措施：**
- CSRF Token 驗證
- SameSite Cookie 屬性
- 驗證 Referer 標頭
- 雙重送出 Cookie

### 3. 點擊劫持 (Clickjacking)
- 透過 iframe 嵌入網頁
- 誘導用戶點擊隱藏元素

**防護措施：**
- X-Frame-Options 標頭
- frame-ancestors CSP 指令
- JavaScript 檢查 frame 狀態

## 🔒 安全實踐

### 認證與授權
- 安全的密碼處理
- JWT Token 最佳實踐
- OAuth 2.0 實作
- 多因素認證 (2FA)

### 數據保護
- HTTPS 強制使用
- 敏感數據加密
- 安全的本地儲存
- API 安全設計

### 前端特定安全
- 依賴套件安全檢查
- Source Map 保護
- 環境變數管理
- 建構時安全檢查

## 🛠️ 安全工具

### 檢測工具
- **OWASP ZAP**：自動化安全測試
- **Burp Suite**：網頁應用安全測試
- **npm audit**：檢查依賴套件漏洞
- **Snyk**：開源安全監控

### 開發工具
- **ESLint Security Plugin**：靜態代碼分析
- **Helmet.js**：Express 安全中介軟體
- **DOMPurify**：DOM 清理函式庫

## 📊 安全檢查清單

### 開發階段
- [ ] 輸入驗證與清理
- [ ] 輸出編碼處理
- [ ] 安全的 Cookie 設定
- [ ] CSP 政策配置
- [ ] HTTPS 重導向

### 部署階段
- [ ] 安全標頭設定
- [ ] 敏感文件保護
- [ ] 錯誤頁面處理
- [ ] 監控與日誌記錄

## 🔗 學習資源

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/docs/Web/Security)
- [Web 安全色彩](https://websec.readthedocs.io/)
- [前端安全系列文章](https://tech.meituan.com/tags/%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8.html)
