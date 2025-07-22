來源：[web.dev: Security Headers](https://web.dev/articles/security-headers)

HTTP 安全標頭（Security Headers）提供一種簡單方式來增強網站的安全性，防止常見攻擊如 XSS、點擊劫持、MIME 偽裝等。

 7 個常見 HTTP 安全標頭：
1. HSTS (`Strict-Transport-Security`)
2. CSP (`Content-Security-Policy`)
3. COEP (`Cross-Origin-Embedder-Policy`)
4. CORP (`Cross-Origin-Resource-Policy`)
5. Permissions Policy (`Permissions-Policy`)
6. X-Content-Type-Options
7. X-Frame-Options

---

## 1️⃣ HSTS（Strict-Transport-Security）

強制瀏覽器使用 HTTPS，防止中間人攻擊及 SSL 剝奪攻擊。

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

- `max-age`: 記憶使用 HTTPS 的秒數
- `includeSubDomains`: 套用至所有子網域
- `preload`: 可將站點加入瀏覽器內建 preload 清單

🔗 [Preload 提交入口](https://hstspreload.org/)

---

## 2️⃣ CSP（Content-Security-Policy）

防止 XSS 攻擊，限制網頁可以載入哪些資源（如 JS、CSS、圖片等）。

```http
Content-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com
```

##### 常見指令

| 指令            | 功能                 |
| ------------- | ------------------ |
| `default-src` | 所有資源預設來源           |
| `script-src`  | 限制 JS 來源           |
| `style-src`   | 限制 CSS 來源          |
| `img-src`     | 限制圖片來源             |
| `object-src`  | 限制 `<object>` 元素來源 |

📌 可搭配 nonce/hash 強化 inline script 管控。

---

## 3️⃣ COEP（Cross-Origin-Embedder-Policy）

限制跨來源資源的嵌入方式，提升隔離安全性，是啟用跨執行緒 JS（如 SharedArrayBuffer）必要條件。

```http
Cross-Origin-Embedder-Policy: require-corp
```

- 僅允許具備 CORS 或 CORP 的外部資源被載入。
    

---

### 4️⃣ CORP（Cross-Origin-Resource-Policy）

告訴瀏覽器此資源是否允許其他來源載入。

```http
Cross-Origin-Resource-Policy: same-origin
```

選項：

- `same-origin`: 僅限同源載入
- `same-site`: 同站點載入（包含子網域）
- `cross-origin`: 允許任何來源載入

📌 搭配 COEP 使用最有效。

---

### 5️⃣ Permissions-Policy（舊名 Feature-Policy）

控制哪些 Web API 可被使用，如攝影機、地理位置、全螢幕等功能。

```http
Permissions-Policy: geolocation=(), microphone=(), camera=("self")
```

- 空括號 `()`：禁用此功能
- `("self")`: 僅允許本站使用

🔒 可防止第三方 iframe 濫用權限。

---

### 6️⃣ X-Content-Type-Options

防止瀏覽器 MIME 偵測錯誤，避免 JS 被錯誤執行。

```http
X-Content-Type-Options: nosniff
```

- 指示瀏覽器嚴格遵守 `Content-Type` 標頭。

---

## 7️⃣ X-Frame-Options

防止點擊劫持攻擊（Clickjacking），限制網站是否可被嵌入在 iframe 中。

```http
X-Frame-Options: DENY
```

選項：
- `DENY`: 禁止任何 iframe 嵌入
- `SAMEORIGIN`: 僅允許同源頁面嵌入

📌 新版建議使用 `Content-Security-Policy: frame-ancestors`。

---

## ✅ 小結：建議的安全標頭組合


``` http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload Content-Security-Policy: default-src 'self' X-Content-Type-Options: nosniff X-Frame-Options: DENY Permissions-Policy: camera=(), microphone=(), geolocation=() Cross-Origin-Embedder-Policy: require-corp Cross-Origin-Resource-Policy: same-origin
```
---

## 🔧 測試工具

- [securityheaders.com](https://securityheaders.com/)
- [hstspreload.org](https://hstspreload.org/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
