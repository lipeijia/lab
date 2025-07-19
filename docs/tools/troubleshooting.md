---
sidebar_position: 2
---

# Docusaurus 常見問題排除

記錄在使用 Docusaurus 過程中遇到的常見問題和解決方案。

## 🎯 學習目標

- 了解 Docusaurus 常見的配置問題
- 掌握故障排除的基本方法
- 學會解讀錯誤訊息和日誌
- 建立問題解決的思維模式

## 🚨 Page Not Found 問題

### 問題描述
啟動 Docusaurus 開發服務器後，訪問網站出現 "Page Not Found" 錯誤，即使服務器顯示正常啟動。

### 常見原因

#### 1. 路由配置問題
當使用 `routeBasePath: '/'` 將文檔設為根路徑時，需要正確配置首頁文檔。

**錯誤配置：**
```javascript
// docusaurus.config.js
docs: {
  routeBasePath: '/', // 將 docs 設為根路徑
}
```

```markdown
<!-- docs/intro.md -->
---
sidebar_position: 1
---
# 歡迎頁面
```

**正確配置：**
```javascript
// docusaurus.config.js
docs: {
  routeBasePath: '/', // 將 docs 設為根路徑
}
```

```markdown
<!-- docs/intro.md -->
---
sidebar_position: 1
slug: /              # 🔑 關鍵：指定為根路徑
---
# 歡迎頁面
```

#### 2. 頁面檔案衝突
如果同時存在 `src/pages/index.js` 和設定了 `slug: /` 的文檔，會產生路由衝突。

**解決方案：**
- 刪除或重新命名 `src/pages/index.js`
- 或者修改文檔的 slug 配置

#### 3. 配置被註解
部分功能（如 blog）在配置中被註解掉，但導航連結仍然存在。

**檢查項目：**
```javascript
// docusaurus.config.js
presets: [
  [
    'classic',
    {
      // ❌ 如果 blog 被註解，/blog 路由會 404
      // blog: { ... },
      
      // ✅ 確保啟用需要的功能
      blog: {
        showReadingTime: true,
        // ...其他配置
      },
    },
  ],
],
```

### 診斷步驟

#### 1. 檢查服務器狀態
```bash
npm start
```
確認看到：
```
[SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

#### 2. 檢查編譯錯誤
查看終端輸出是否有編譯錯誤或警告：
```
✔ Client
  Compiled successfully in 1.36s
```

#### 3. 檢查路由配置
- 確認 `routeBasePath` 設定
- 檢查首頁文檔的 `slug` 配置
- 驗證沒有路由衝突

#### 4. 檢查檔案結構
```
docs/
├── intro.md          # 需要有 slug: /
├── category-1/
│   └── page.md
└── category-2/
    └── page.md

src/pages/
├── index.js.backup   # 避免衝突，已備份
└── other-page.js
```

### 解決方案模板

#### 步驟 1：檢查配置
```javascript
// docusaurus.config.js
export default {
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // 如果要讓文檔作為首頁
        },
        blog: {
          // 確保沒有被註解掉
          showReadingTime: true,
        },
      },
    ],
  ],
};
```

#### 步驟 2：設定首頁文檔
```markdown
<!-- docs/intro.md -->
---
sidebar_position: 1
slug: /              # 設定為根路徑
---

# 網站首頁
```

#### 步驟 3：檢查頁面衝突
```bash
# 檢查是否有衝突的頁面文件
ls src/pages/index.*

# 如果存在，重新命名避免衝突
mv src/pages/index.js src/pages/index.js.backup
```

#### 步驟 4：重啟服務器
```bash
# 停止現有服務器
Ctrl + C

# 重新啟動
npm start
```

## 🔍 其他常見問題

### MDX 語法錯誤

**問題：** 文檔編譯失敗，出現 MDX 解析錯誤。

**解決方案：**
1. 檢查 front matter 格式是否正確
2. 確認 Markdown 語法無誤
3. 檢查 JSX 組件語法

### 側邊欄不顯示

**問題：** 文檔存在但不在側邊欄中顯示。

**檢查項目：**
- `_category_.json` 文件格式
- 文檔的 `sidebar_position` 設定
- `sidebars.js` 配置

### 圖片載入失敗

**問題：** 文檔中的圖片無法顯示。

**解決方案：**
- 圖片放在 `static/img/` 目錄
- 使用正確的相對路徑
- 檢查檔案名稱和副檔名

## 🛠️ 調試工具

### 瀏覽器開發者工具
- **Network 面板**：檢查 404 請求
- **Console 面板**：查看 JavaScript 錯誤
- **Elements 面板**：檢查路由是否正確載入

### Docusaurus 調試
```bash
# 詳細輸出模式
DEBUG=true npm start

# 檢查建構輸出
npm run build
```

### 常用檢查指令
```bash
# 檢查依賴
npm ls

# 清除快取重新安裝
rm -rf node_modules package-lock.json
npm install

# 檢查配置語法
node -c docusaurus.config.js
```

## 📝 預防措施

### 開發最佳實踐
1. **版本控制**：每次重大變更前先提交
2. **配置備份**：保留可用的配置文件
3. **分步測試**：逐步修改並測試
4. **文檔記錄**：記錄自定義配置的原因

### 配置檢查清單
- [ ] `docusaurus.config.js` 語法正確
- [ ] 路由配置無衝突
- [ ] 必要的功能已啟用
- [ ] Front matter 格式正確
- [ ] 檔案路徑和命名規範
- [ ] 依賴版本相容

## 🔗 相關資源

- [Docusaurus 官方故障排除](https://docusaurus.io/docs/troubleshooting)
- [路由配置文檔](https://docusaurus.io/docs/advanced/routing)
- [配置文件參考](https://docusaurus.io/docs/api/docusaurus-config)
- [MDX 語法指南](https://mdxjs.com/docs/)

## 💡 經驗總結

1. **問題定位**：先確認服務器是否正常啟動
2. **配置檢查**：重點檢查路由相關配置
3. **錯誤解讀**：仔細閱讀終端輸出的錯誤訊息
4. **逐步排除**：從簡單配置開始，逐步添加複雜功能
5. **文檔查詢**：遇到問題先查閱官方文檔

記住：大多數 "Page Not Found" 問題都是配置問題，而不是程式碼錯誤。耐心檢查配置，問題通常很容易解決！🎯
