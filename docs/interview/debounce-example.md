---
title: 白板題範例：debounce
description: JavaScript debounce 函數的實作與面試技巧
---


``` js
export default function debounce(func, wait) {
  let timerId = null;
  
  return function(...args) {
    const context = this;
    
    // 如果之前有定時器，就清除
    clearTimeout(timerId);
    
    // 設定新的定時器
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
```

#### 1. 確認需求（跟面試官對齊）

可以開頭這樣說：
> **「我理解 debounce 的需求是：持續觸發事件時，我不會立即執行函數，而是等最後一次觸發後的 `wait` 毫秒才執行它。這樣可以避免像 resize、keypress 這類高頻事件造成資源浪費。請問這是正確的理解嗎？」**

---

#### 2. 宣告基本結構與狀態變數

開始寫 function 時，清楚解釋你在幹嘛：
```js
function debounce(func, wait) {   let timerId = null;
```

> **「我先定義一個 `timerId`，用來記錄 setTimeout 的 ID，這樣每次觸發都可以清除上一次的 timer。」**

---

#### 3. 回傳一個 closure function（debounced function）

```js
  return function(...args) {
    const context = this;
```

> 「我要回傳一個包住原始函數的 closure，這樣可以重複調用，並保持對 `timerId` 的存取。我也保留 `this` 和傳入參數，讓 `func` 執行時上下文不會被改變。」

---
#### 4. 清除前一個 timer，並設定新的 timer

```js
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  }
}
```

> 「這裡是 debounce 的核心邏輯：我會先清除上一個 timer，然後設一個新的 timer。只有當等待時間內沒有新的呼叫，這個 timer 才會真的觸發，然後執行原本的 `func`。」

✅ 最終完整程式碼（白板手寫）

---
### 🧠 面試亮點加分建議

- **提問確認**：「這題希望我實作 trailing edge debounce（最後一次觸發後才執行），還是也要支援 leading edge（第一次就執行）？」
- **主動舉例**：你可以說「例如用這個 debounce function 來處理 `input` 事件，可以避免每次 keydown 都發 API。」
- **可選擇進一步擴充**：想加分可以提：「如果需要支援立即執行（leading: true），我可以額外加入選項參數來控制。」