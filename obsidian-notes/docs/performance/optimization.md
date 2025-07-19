---
sidebar_position: 1
---

# 前端效能優化

網站效能優化是提升使用者體驗的關鍵，涵蓋載入速度、互動響應和視覺穩定性。

## 🎯 效能目標

- **載入效能**：減少首次載入時間
- **互動效能**：提高響應速度
- **視覺穩定**：避免版面位移
- **網路效能**：優化資源傳輸

## 📊 效能指標

### Core Web Vitals
- **LCP (Largest Contentful Paint)**：最大內容繪製 < 2.5s
- **FID (First Input Delay)**：首次輸入延遲 < 100ms
- **CLS (Cumulative Layout Shift)**：累積版面位移 < 0.1

### 其他重要指標
- **FCP (First Contentful Paint)**：首次內容繪製
- **TTI (Time to Interactive)**：可互動時間
- **TBT (Total Blocking Time)**：總阻塞時間
- **SI (Speed Index)**：速度指數

## 🚀 載入優化

### 資源優化
- **圖片優化**
  - WebP 格式使用
  - 響應式圖片 (`srcset`)
  - 延遲載入 (Lazy Loading)
  - 圖片壓縮與適當尺寸

- **字體優化**
  - 字體預載入 (`font-display: swap`)
  - 子集字體 (Font Subsetting)
  - 本地字體回退

- **CSS 優化**
  - 關鍵 CSS 內聯
  - 非關鍵 CSS 延遲載入
  - CSS 壓縮與合併
  - 移除未使用的 CSS

### JavaScript 優化
- **代碼分割 (Code Splitting)**
  - 路由層級分割
  - 動態 import()
  - Vendor 分離

- **Tree Shaking**
  - 移除死代碼
  - ES6 模組化
  - 側邊效應標記

- **壓縮與混淆**
  - UglifyJS / Terser
  - Gzip / Brotli 壓縮

## 🎨 渲染優化

### 關鍵渲染路徑
- 減少 HTML 檔案大小
- 最小化 CSS 阻塞
- 優化 JavaScript 執行
- 避免渲染阻塞資源

### 瀏覽器渲染
- **重排與重繪**
  - 批次 DOM 操作
  - 使用 CSS Transform
  - 避免強制同步版面

- **圖層合成**
  - 合理使用 `will-change`
  - GPU 加速 (`transform3d`)
  - 避免圖層爆炸

## 📡 網路優化

### HTTP 優化
- **HTTP/2**
  - 多路復用
  - 伺服器推送
  - 標頭壓縮

- **快取策略**
  - 瀏覽器快取設定
  - CDN 快取配置
  - Service Worker 快取

### 資源載入
- **預載入技術**
  - `<link rel="preload">`：高優先級資源
  - `<link rel="prefetch">`：未來可能需要的資源
  - `<link rel="dns-prefetch">`：DNS 預解析

- **資源提示**
  - `<link rel="preconnect">`：預連接
  - `<link rel="modulepreload">`：ES 模組預載入

## ⚡ 運行時優化

### React 效能優化
- **避免不必要的重新渲染**
  - React.memo()
  - useMemo() / useCallback()
  - 狀態結構優化

- **虛擬化**
  - react-window
  - react-virtualized
  - 大列表渲染優化

### 狀態管理優化
- 避免過度訂閱
- 精確的狀態更新
- 正規化狀態結構

## 🔧 效能監控

### 監控工具
- **Lighthouse**：綜合效能評估
- **WebPageTest**：詳細分析報告
- **Chrome DevTools**：即時效能分析
- **Real User Monitoring (RUM)**：真實使用者監控

### 效能預算
- 設定效能目標
- 自動化效能測試
- CI/CD 整合
- 效能回歸檢測

## 🛠️ 優化工具

### 建構時優化
- **Webpack 優化**
  - Bundle 分析
  - 壓縮設定
  - Tree Shaking

- **Vite 優化**
  - 預建構依賴
  - 動態導入
  - 建構優化

### 分析工具
- **Bundle Analyzer**：打包分析
- **Source Map Explorer**：來源映射分析
- **Speed Measure Plugin**：建構速度分析

## 📈 優化策略

### 漸進式優化
1. **測量基準**：建立效能基線
2. **找出瓶頸**：識別主要問題
3. **優先級排序**：ROI 最高的優化
4. **實作優化**：逐步改進
5. **驗證結果**：測量改進效果

### 效能檢查清單
- [ ] 圖片格式與大小優化
- [ ] 關鍵 CSS 內聯
- [ ] JavaScript 代碼分割
- [ ] 字體載入策略
- [ ] 快取策略設定
- [ ] 預載入關鍵資源
- [ ] 監控設定

## 🔗 學習資源

- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Performance 最佳實踐](https://web.dev/performance/)
- [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist)
