---
title: 白標方案
description: 何謂白標方案？應用場景與實作
---


### 🎰 博弈業需要的能力

#### 1. **多模板專案架構設計**

- **使用情境：**
    - 同一平台會針對不同市場、品牌（如台灣、香港、東南亞）推出不同風格的皮膚與模板。
    - 通常會有「白標方案」或「多品牌營運」，需快速複製模板並進行客製化。

- **工程需求：**
    - 模板抽象化、樣式主題切換、模組化設計是必要的。
    - 通常還需要「後台可視化配置模板」。

#### 2. **API 串接設計**

- **使用情境：**
    - 串接遊戲商（如 Evolution、PG、AG）、支付商、會員系統、優惠活動等。
        
- **工程需求：**
    - 多來源、多協議（REST / WebSocket）的資料串接。
    - API 輸入輸出格式不一致，要進行轉換與封裝。
    - 高併發情境需設計 retry、failover。

#### 3. **前端效能優化**

- **使用情境：**
    - 玩家進站希望快速看到熱門遊戲與錢包餘額。
    - 遊戲列表、輪播圖、真人直播介面都需要快速呈現。

- **工程需求：**
    - 第一屏體驗極為重要（LCP 優化）
    - 結合懸浮式導覽列、聊天機器人、彈窗等動態元件，要做好資源載入順序與 lazy load。


#### 4. **CDN 資源處理**

- **使用情境：**
    - 全球市場、地區敏感（如中國地區需特殊網路處理）。
    - 有些 CDN 需支援遊戲 iframe 加速、圖示快取、熱更新資源。

- **工程需求：**
    - CDN 配合地區性分流（如雲端加速、Anycast）
    - 快取控制，避免玩家看到舊版 UI 或活動頁。

### 博弈業特別重視的工程面向
|面向|說明|
|---|---|
|**高效能渲染**|玩家進站速度直接影響留存與下注|
|**多品牌系統維護性**|多模板系統維護與快速複製需求|
|**高穩定串接能力**|串接遊戲商與金流商穩定性關鍵|
|**風險與監控意識**|避免資料洩漏或攻擊，有資安與流量控管意識|

### 💬 小補充：博弈業的技術門檻不低

很多人誤以為博弈只是換皮的系統，但實際上：
- 技術團隊常需處理 **高併發 + 高穩定性 + 國際化 + 模板擴展性**
- 前端、後端、DevOps 都有一定要求
- 有時還結合即時聊天室、直播串流、WebSocket 遊戲通知等複雜互動功能


---

### 🏷️ 什麼是白標方案（White-label Solution）？

**白標方案**是指一種**「可被快速客製化品牌化」的產品架構**。

##### 📘 定義：
> 一套由某公司開發的完整系統，**允許其他公司（客戶）貼上自己的品牌（Logo、風格、設定）進行銷售或營運**，而不需從頭開發。

---
#### 🎯 舉例說明（以博弈業為例）

假設你公司開發了一個線上娛樂城平台（含會員、錢包、遊戲、客服、活動等），你可以把這平台包裝成「白標方案」，讓不同的客戶快速建立自己的品牌站：

| 客戶A         | 客戶B       | 客戶C       |
| ----------- | --------- | --------- |
| LOGO：紅色風格   | LOGO：藍色風格 | LOGO：黑色風格 |
| 模板：九宮格遊戲    | 模板：輪播式首頁  | 模板：直欄式清單  |
| 名稱：Happy777 | 名稱：快樂娛樂   | 名稱：極速博弈   |
👉 背後其實都是同一套系統，只是「外觀與設定不同」。

#### 🛠️ 工程面對應

##### 前端要做的事：

- **支援主題樣式切換（theme）**
    - 用 CSS Variables / Tailwind theme / styled-components theme
        
- **支援模組開關與排序**
    - 各模板配置檔控制：要不要顯示輪播？哪個模組排第一？
        
- **可配置欄位與內容**
    - 例如首頁區塊（熱門遊戲、最新活動），後台可開關或改順序

---

#### 🖥️ 後台可視化配置模板是什麼意思？

白標系統通常會提供「管理者後台」，讓非工程師（如 PM、營運端）也能快速建立品牌站：

#### ✨ 後台能做的功能：

- 上傳 LOGO、背景圖、favicon
- 選擇模板樣式（layoutA、layoutB）
- 自訂首頁模組的順序、開關（拖曳式排序）
- 修改顏色、字體、標語
- 設定每一區塊的內容（文案、連結、活動 ID）

#### 🛠️ 技術上可這樣做：

- 儲存在 DB 的 `template_config.json`
- 前端讀入後做條件渲染與樣式切換
- 透過 CMS 或 Visual Editor 管理這些設定


#### ✅ 總結

| 概念    | 說明                         |
| ----- | -------------------------- |
| 白標方案  | 一套可快速客製成不同品牌的系統            |
| 可視化配置 | 後台提供 UI 讓使用者自由調整樣式與內容      |
| 技術挑戰  | 抽象化程度要夠高、可配置性要強、又不能讓維護變困難  |
| 產業常見  | 博弈、電商、教育、SaaS、直播平台、CMS 系統等 |

--- 

## 🏷️ 白標方案實作概要（以 React 為主）

### 🧱 1. 架構設計總覽

```bash
📁 src/
├── components/        # 可重用的 UI 元件
├── templates/         # 各模板的版型組件
├── themes/            # 不同主題風格（樣式設定）
├── config/            # 模板配置資料（可能由後端提供）
├── hooks/             # 自訂 Hook，如 useTemplate()
├── pages/             # 各個頁面（如 Home, Login, GameList）
└── App.tsx            # 根組件，根據配置決定要渲染哪一種模板
```

### 🧩 2. Template 設計與選擇

#### 🧠 核心邏輯：
根據後台提供的設定（例如 JSON 或 DB 資料），決定要渲染哪一個模板組件，與其主題樣式。
```tsx
// App.tsx
import { useTemplateConfig } from './hooks/useTemplate'
import TemplateA from './templates/TemplateA'
import TemplateB from './templates/TemplateB'

function App() {
  const config = useTemplateConfig()

  const Template = {
    A: TemplateA,
    B: TemplateB,
  }[config.templateType]

  return (
    <ThemeProvider theme={config.theme}>
      <Template config={config} />
    </ThemeProvider>
  )
}
```


### 🎨 3. Theme 主題樣式切換

- 使用 **styled-components** 或 **Tailwind with CSS Variables**：
    - 每個品牌可定義一組 `theme` JSON（字體、色系、按鈕樣式）
##### styled-components example:
```tsx
<ThemeProvider theme={{
  primaryColor: '#ff6600',
  fontFamily: 'Noto Sans TC'
}}>
  <App />
</ThemeProvider>
```

##### Tailwind 可用 `:root` 變數配合 theme class：
```css
/* tailwind.config.js */
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)'
    }
  }
}
```


### ⚙️ 4. 模組配置與條件渲染

- 白標頁面常需要根據配置控制「是否顯示某模組」、「順序」、「內容」。

##### JSON 例子（後台設定）：
```json
{
  "templateType": "A",
  "modules": [
    { "type": "Banner", "enabled": true },
    { "type": "GameList", "enabled": true },
    { "type": "Announcement", "enabled": false }
  ]
}

```

##### 前端渲染：
``` tsx
config.modules.map((mod, i) => {
  if (!mod.enabled) return null
  const Component = ModuleMap[mod.type]
  return <Component key={i} config={mod} />
})
```


### 🖥️ 5. 後台可視化配置（串接 API）

##### 後台設計功能：
- 設定模板類型（Template A / B）
- 調整模組順序（拖拉式）
- 設定每個模組開關
- 選擇品牌主題樣式（色系、Logo）

##### API 範例：
```ts
GET /api/template-config/:siteId

// 回傳：
{
  templateType: 'B',
  theme: { primaryColor: '#0044cc' },
  modules: [...]
}

```

- 前端初始化時抓取此設定
- 支援多品牌：每個 siteId 有獨立配置


### 🧪 6. 常見挑戰與對策

|問題|解法|
|---|---|
|模板差異過大難以共用 component|抽象核心 component，把 UI 細節透過 config 傳入|
|顏色切換困難|使用 ThemeProvider 或 CSS Variables|
|不同語系、國家支援|加入 i18n 多語系處理，與 config 整合|
|開發時模板太多難以測試|用 `.env` 控制預設載入模板，或加 dev switch|
|後台改動即時預覽|支援 config hot reload（WebSocket 或 polling）|

### 總結

|模組|實作建議|
|---|---|
|Template 切換|route-based lazy loading，或 config-based 組件載入|
|Theme 主題|styled-components / Tailwind + CSS Variables|
|模組開關|modules 配置 JSON + 條件渲染|
|後台串接|每個品牌讀取自己的 config，支援版本控管|
|Component 設計|高度模組化，支援 props 傳入內容與樣式|
