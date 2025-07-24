---
title: 前端架構與優化
description: 如何根據能力回答問題
sidebar_position: 3
---


我在某個面試被問到的問題，回來問chatGPT，什麼樣的產業與程度，該有怎麼樣的回答，順便看看自己還缺少哪些能力。

- **多模板專案架構設計**
- **API 串接設計**
- **前端效能優化問題與解法**
- **CDN 資源處理**

### 一、可能的產業推測

這些問題通常出現在以下幾種產業：
#### 1. **SaaS 平台（軟體即服務）**

- 多模板通常代表有「客製化需求」或「多租戶（multi-tenant）」系統。
- 高度仰賴 API，強調系統模組化、維護性。
- 對效能與資源傳遞非常敏感（使用者遍佈全球，因此需使用 CDN）。
- 
#### 2. **電商平台**

- 前端模板多樣：不同活動頁、品牌頁、甚至分國家語系版本。
- API 串接密集：商品、庫存、金流、推薦系統等。
- 效能優化直接關係到轉換率，CDN 常用於圖片、靜態資源加速。
- 
#### 3. **內容管理平台（CMS）/ 入口網站 / 媒體服務**

- 多模板對應不同頻道、內容型態。
- API 結構需支援彈性內容呼叫。
- 前端效能與 SEO 密切相關；CDN 用於快取靜態內容。

---

### 二、該職缺可能重視工程師哪種面向？

根據這些技術議題，推測該職缺會特別重視以下能力與素養：

- 系統架構設計能力：能規劃有彈性且可維護的「多模板系統」，涉及 component 設計、路由、樣式隔離等。

- API 設計與協作能力：需要能與後端協作 API 規格（REST 或 GraphQL），處理串接錯誤、快取策略與 loading 狀態。

- 前端效能調校經驗：熟悉 Core Web Vitals（如 LCP、FID、CLS），有使用 Lighthouse、Chrome DevTools 的經驗。

- DevOps/部署優化知識：
	- 瞭解 CDN 的原理與配置，例如 Cloudflare、Fastly 或 AWS CloudFront。
	- 對建置流程（如 CI/CD）有概念，知道怎麼壓縮資源、設定快取 header。

#### 💼 能力等級對照表

| 能力面向               | 所需技能                                                                   | 等級落點                  | 對應的能力描述                                               |
| ------------------ | ---------------------------------------------------------------------- | --------------------- | ----------------------------------------------------- |
| **1. 多模板專案架構設計**   | - 可重用的 UI component- 動態路由、樣式隔離- 模板參數化與維護性設計                            | **Mid ~ Senior**      | Mid：能理解並延伸既有架構Senior：可主導架構規劃，考量 scalability 與後續維運     |
| **2. API 串接設計與協作** | - 熟悉 REST/GraphQL- 串接策略（loading/error/cache）- API 設計參與與契約定義（swagger 等） | **Mid ~ Senior**      | Mid：能穩定串接並處理例外狀況Senior：可主導前後端 API 協作流程、優化 API 結構      |
| **3. 前端效能優化問題與解法** | - 掌握 Core Web Vitals- lazy load, tree-shaking- Lighthouse 實測與優化        | **Senior**            | 能主動發現效能瓶頸並提出量化改善；懂資源加載順序與 bundle size 控制              |
| **4. CDN 資源處理**    | - 瞭解 CDN cache 設計與 header 控制- 資源版本控管、CDN purging- 靜態與動態資源分離策略          | **Mid ~ Senior（偏架構）** | Mid：懂基本 cache 機制與資源路徑規劃Senior：能設計整體資源部署策略、解決 cache 問題 |

---

> 如果我是候選人，針對這四個技術問題，我會以**具體實作經驗 + 技術原則 + 思考過程**的方式回答。這樣能展現深度、廣度與實戰能力。


#### 1. **多模板專案架構設計，你會怎麼做？**

> **回答方向：模組化、配置化、可維護性**

我曾在某個多品牌的電商平台專案中，處理過「多模板」的需求，當時採用的是 React + TypeScript 架構。  
我們的策略是將每個模板當作一種「配置驅動」的應用（configuration-driven rendering），透過：

- **共用 UI component library**
- **每個模板對應一份 JSON 設定檔**，決定佈局、顏色、模組順序
- **Route-based lazy loading** 搭配 webpack code splitting，避免初始載入過大
- 把樣式與主題用 styled-components / Tailwind 的 theme plugin 做樣式切換

這樣可以支援上百個模板，但又不會 codebase 過於耦合。

---

#### 2. **API 串接你會怎麼設計？**

> **回答方向：解耦、型別安全、快取與錯誤處理策略**

我通常會根據使用場景設計 API 串接層。以 React 專案為例：

- 使用 `axios` 或 `fetch` 包一層共用 API client，處理 token、自動重試、錯誤轉譯
    
- 配合 TypeScript interface 建立嚴謹的型別系統
    
- 把 API 分層，例如：
``` ts
// /api/user.ts
export const getUser = (id: string) => http.get<User>(`/api/user/${id}`)
```

- 若是資料可快取，我會搭配 SWR / React Query：
    
    - 自動重試與 revalidation
    - 配合 localStorage or CDN fallback（尤其在弱網路環境）
        
- 若後端支援，我也使用 GraphQL 串接 + fragment 避免 over-fetching

我也會與後端協商 API 設計，例如使用 pagination token、status code 約定。

---
#### 3. **前端效能優化會遇到什麼問題？怎麼解？**

> **回答方向：遇過的瓶頸、指標、實作經驗**

我處理過幾個核心的效能問題，像是：

- **LCP（Largest Contentful Paint）延遲**
    
    - 解法：使用 `<link rel="preload">` 預載大圖，避免 lazy loading 太晚出現
    - 圖片切割：針對不同裝置給 WebP、小尺寸圖

- **First Input Delay 高**
    
    - 分析原因是 JS bundle 太大 + 首頁某些 animation 導致主執行緒卡頓

    - 解法：
        - 使用 `webpack splitChunks` 拆分 bundle
        - 第三方套件 lazy load（如 Chart.js、moment）
        - 用 `requestIdleCallback` 處理非必要 JS
        
- **使用 Lighthouse、WebPageTest 測量指標**
    
    - 對照 Core Web Vitals
    - 真實設備測試，觀察 time-to-interactive、CLS（layout shift）

---

#### 4. **CDN 資源處理的策略？**

> **回答方向：快取策略、版本控管、靜動態分離**

我設計過前端部署到 Cloudflare CDN 的流程，重點會在：

- **資源版本控制（hash-based filenames）**
    
    - 每次部署時產出 `/assets/app.abcd123.js`
    - 搭配 CDN 的長時間快取（`Cache-Control: max-age=31536000, immutable`）
        
- **HTML 不快取，API 有效期設計**
    
    - HTML 為 SSR 回傳動態內容，設為 `no-cache`
    - API 可設 `stale-while-revalidate`，提升體驗但保持資料新鮮度
        
- **錯誤處理（fallback）**
    
    - 若 CDN 有 cache miss，或使用離線資源 fallback，會設 Service Worker 作為支援（進階場景）
        
- **資源 Purge**
    
    - 發布重大版本會使用 API 清除舊快取

---

#### ✅ 總結（如果我是面試官也會想聽到）：

我不會只講技術名詞，而是會：

- 用真實場景舉例
- 解釋為什麼這樣設計（tradeoff 思維）
- 展現我「有能力處理 scale 大、效能要求高」的系統


### 面試解題思路

#### 📌 1. 多模板專案架構設計

#### 💡 解法思路
- 使用「配置驅動」方式（configuration-driven rendering）
- 每個模板為一個設定檔：決定佈局、顏色、模組順序
- 共用 UI component library
- 路由與頁面模組使用 Lazy loading（React.lazy + Suspense）
- 樣式隔離：CSS Modules / Tailwind / styled-components 的 theme
- 支援白標／多品牌開發（如 multi-tenant 系統）

### 🛠️ 技術實作
- `React + TypeScript`
- Webpack `splitChunks` 拆包
- Vite + 動態 import

---

#### 📌 2. API 串接設計

#### 💡 解法思路
- 封裝 API client，處理共用 headers、錯誤轉譯、token 自動刷新
- TypeScript 型別設計，定義好資料契約
- 分模組維護 API interface（每個 domain 一個檔案）
- 支援快取、重試、loading 狀態處理
- 使用 SWR / React Query 處理資料同步

#### 🛠️ 技術實作
```ts
// /api/user.ts
export const getUser = (id: string) => http.get<User>(`/api/user/${id}`)
```

- REST / GraphQL
- 結合 Swagger / Postman API doc
- 設計 Pagination、Search、Error Code 約定

---

#### 📌 3. 前端效能優化問題與解法

### 💡 常見問題

- 首頁載入慢（LCP 差）
- JS bundle 太大（TTI 高）
- Layout Shift（CLS 過高）
- API 資料延遲

#### ✅ 解法清單

- 預載重要圖片：`<link rel="preload">`
- Lazy load：圖片、component、JS 模組
- Tree-shaking + 拆分大套件（如 moment）
- 使用 `requestIdleCallback` 排程非必要邏輯
- 壓縮資源：gzip / brotli
- 長期快取靜態資源，短期快取 API
- 使用 Lighthouse / WebPageTest 測量指標

#### 🛠️ 工具

- Chrome DevTools
- PageSpeed Insights
- Web Vitals metrics：LCP / FID / CLS
    

---

#### 📌 4. CDN 資源處理策略

#### 🎯 目標

- 快取命中率高、避免更新資源載入錯誤
- 支援靜態與動態資源分離

#### ✅ 策略要點

- 資源檔名加 hash，避免舊版資源混用
- Cache-Control 設定：
    - HTML → `no-cache`
    - assets → `max-age=31536000, immutable`

- 版本控管與 CDN Purge（重大更新時）
- 搭配 Service Worker fallback（進階）
- 靜態內容上傳至 CDN（如 Cloudflare、AWS CloudFront）

---

#### 📘 延伸準備（建議複習）

- Core Web Vitals：LCP / FID / CLS
- React 組件架構設計
- API schema 設計原則（RESTful / GraphQL）
- DevOps / CI/CD 知識（如 GitHub Actions）