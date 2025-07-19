---
sidebar_position: 3
---

# Obsidian 到 Docusaurus 工作流程

詳細介紹如何使用 Obsidian 作為內容創作工具，並無縫同步到 Docusaurus 網站的完整工作流程。

## 🎯 學習目標

- 理解 Obsidian + Docusaurus 的工作流程
- 掌握內容創作和發布的最佳實踐
- 學會使用自動化同步工具
- 建立高效的知識管理系統

## 🤔 為什麼選擇這個組合？

### Obsidian 的優勢
- **強大的編輯體驗**：支援實時預覽、雙向連結、圖表
- **靈活的組織方式**：標籤、資料夾、連結網路
- **豐富的外掛生態**：模板、日曆、圖表等
- **本地儲存**：數據安全，離線可用

### Docusaurus 的優勢
- **專業的網站外觀**：現代化設計、響應式布局
- **強大的搜尋功能**：全文搜尋、分類導航
- **SEO 友善**：靜態網站生成、快速載入
- **部署簡單**：GitHub Pages、Netlify 等

### 組合效益
1. **創作體驗**：在 Obsidian 中專注寫作
2. **發布效果**：在 Docusaurus 中專業展示
3. **版本控制**：Git 管理所有變更
4. **自動化**：一鍵同步和部署

## 📁 專案結構設計

```
my-blog/
├── obsidian-notes/           # 📝 Obsidian 工作區
│   ├── docs/                 # 文檔筆記
│   │   ├── intro.md
│   │   ├── javascript/
│   │   ├── react/
│   │   ├── security/
│   │   ├── tools/
│   │   ├── performance/
│   │   └── design/
│   ├── blog/                 # 部落格文章
│   │   └── welcome-post.md
│   ├── templates/            # 範本文件
│   │   ├── docs-template.md
│   │   └── blog-post-template.md
│   └── assets/               # 圖片和附件
├── docs/                     # 🌐 Docusaurus 文檔
├── blog/                     # 🌐 Docusaurus 部落格
├── sync-content.js           # 🔄 同步腳本
└── docusaurus.config.js      # ⚙️ 網站配置
```

## ✍️ 內容創作流程

### 步驟 1：設定 Obsidian Vault

1. **開啟 Obsidian**
2. **選擇資料夾**：選擇 `obsidian-notes` 作為 vault
3. **基本設定**：
   ```
   設定 → 編輯器 → 預設新檔案位置：在指定資料夾中
   設定 → 檔案與連結 → 新連結格式：相對路徑
   設定 → 檔案與連結 → 使用 Wiki 連結：關閉
   ```

### 步驟 2：創建新文檔

#### 使用範本創建文檔
1. 複製 `templates/docs-template.md`
2. 重新命名為目標檔名（如 `react-hooks.md`）
3. 放在對應的分類資料夾中

#### Front Matter 設定
```yaml
---
sidebar_position: 2          # 側邊欄順序
title: "React Hooks 深入解析"  # 可選：自訂標題
---
```

#### 內容撰寫範例
```markdown
# React Hooks 深入解析

Hooks 是 React 16.8 引入的新特性，讓你可以在函數組件中使用狀態和其他 React 特性。

## 🎯 學習目標

- 理解 Hooks 的設計原理
- 掌握常用 Hooks 的使用方法
- 學會自定義 Hooks

## 📚 基礎 Hooks

### useState
管理組件的本地狀態：

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>點擊了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        點擊
      </button>
    </div>
  );
}
\`\`\`

### useEffect
處理副作用操作：

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // 依賴陣列
  
  return user ? <div>{user.name}</div> : <div>載入中...</div>;
}
\`\`\`

## 💡 最佳實踐

1. **遵循 Hooks 規則**：
   - 只在最頂層呼叫 Hooks
   - 只在 React 函數中呼叫 Hooks

2. **合理使用依賴陣列**：
   - 包含所有使用的變數
   - 使用 ESLint 外掛檢查

3. **自定義 Hooks**：
   - 複用狀態邏輯
   - 保持組件簡潔

## 🔗 延伸閱讀

- [React Hooks 官方文檔](https://react.dev/reference/react)
- [Hooks FAQ](https://react.dev/reference/react/hooks)
```

### 步驟 3：部落格文章創作

#### 使用部落格範本
```yaml
---
title: "我的第一篇技術文章"
date: 2025-07-19
authors: [lipeijia]
tags: [react, javascript, 學習筆記]
description: "分享 React 學習心得和實戰經驗"
---

# 我的第一篇技術文章

今天想分享一些 React 開發的心得...

<!-- truncate -->

## 學習過程

在學習 React 的過程中，我發現...

## 實戰經驗

在實際專案中應用時，遇到了以下挑戰...

## 總結

通過這次學習，我體會到...
```

## 🔄 同步到 Docusaurus

### 自動同步腳本

我們的專案包含一個自動同步腳本 `sync-content.js`：

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const OBSIDIAN_BLOG_DIR = './obsidian-notes/blog';
const DOCUSAURUS_BLOG_DIR = './blog';
const OBSIDIAN_DOCS_DIR = './obsidian-notes/docs';
const DOCUSAURUS_DOCS_DIR = './docs';

function syncDirectory(src, dest, filePrefix = '') {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }

  // 遞歸同步子目錄
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      const subDest = path.join(dest, file);
      syncDirectory(srcPath, subDest, filePrefix);
    } else if (file.endsWith('.md')) {
      const destFile = filePrefix ? `${filePrefix}-${file}` : file;
      const destPath = path.join(dest, destFile);
      
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, content);
      console.log(`Synced: ${file} -> ${destFile}`);
    }
  });
}
```

### 使用同步指令

```bash
# 同步所有文檔
node sync-content.js docs

# 同步部落格文章
node sync-content.js blog

# 同步全部內容
node sync-content.js all
```

### 同步流程詳解

1. **文檔同步**：
   ```
   obsidian-notes/docs/javascript/basics.md
   → docs/javascript/basics.md
   ```

2. **部落格同步**（會自動加日期前綴）：
   ```
   obsidian-notes/blog/my-post.md
   → blog/2025-07-19-my-post.md
   ```

3. **保持目錄結構**：
   - 子資料夾會自動創建
   - 檔案路徑關係保持一致

## 🖼️ 圖片處理工作流程

### 在 Obsidian 中
```markdown
# 使用相對路徑引用
![示意圖](../assets/react-lifecycle.png)

# 或使用 Obsidian 語法（需要轉換）
![[react-lifecycle.png]]
```

### 同步到 Docusaurus
1. **手動複製圖片**：
   ```bash
   cp obsidian-notes/assets/*.png static/img/
   ```

2. **更新 Markdown 引用**：
   ```markdown
   # Docusaurus 格式
   ![示意圖](/img/react-lifecycle.png)
   ```

3. **批次處理腳本**（可選）：
   ```bash
   # 創建圖片同步腳本
   #!/bin/bash
   cp -r obsidian-notes/assets/* static/img/
   echo "圖片同步完成"
   ```

## 🚀 發布流程

### 本地預覽
```bash
# 1. 同步內容
node sync-content.js all

# 2. 啟動開發服務器
npm start

# 3. 瀏覽器查看
open http://localhost:3000/lab/
```

### 部署到 GitHub Pages
```bash
# 1. 確保內容已同步
node sync-content.js all

# 2. 提交變更
git add .
git commit -m "新增：React Hooks 學習筆記"

# 3. 推送到 GitHub
git push origin main

# 4. GitHub Actions 自動部署
# 等待幾分鐘後可在以下網址查看：
# https://lipeijia.github.io/lab/
```

## 📝 最佳實踐

### 內容組織
1. **分類明確**：每個主題使用獨立資料夾
2. **命名規範**：使用英文檔名，避免空格
3. **標籤統一**：建立標籤分類系統
4. **連結管理**：使用相對路徑，避免絕對路徑

### 寫作技巧
1. **結構化內容**：使用清晰的標題層級
2. **視覺元素**：適當使用表情符號和程式碼區塊
3. **實用性**：包含實際範例和操作步驟
4. **可維護性**：定期更新和修正內容

### 版本控制
1. **頻繁提交**：完成一個主題就提交一次
2. **清晰訊息**：使用有意義的提交訊息
3. **分支管理**：大型修改使用功能分支
4. **備份重要**：定期備份 Obsidian vault

## 🛠️ 進階技巧

### 自動化工作流程
```bash
# 創建一鍵發布腳本 publish.sh
#!/bin/bash
echo "開始發布流程..."

# 同步內容
node sync-content.js all

# 檢查是否有變更
if [[ `git status --porcelain` ]]; then
  # 提交變更
  git add .
  read -p "請輸入提交訊息: " commit_message
  git commit -m "$commit_message"
  
  # 推送到遠端
  git push origin main
  
  echo "發布完成！"
else
  echo "沒有變更需要發布。"
fi
```

### Git Hooks 自動同步
```bash
# .git/hooks/pre-commit
#!/bin/bash
node sync-content.js all
git add docs/ blog/
```

### Obsidian 外掛推薦
1. **Templater**：進階範本功能
2. **Calendar**：日期管理
3. **Tag Wrangler**：標籤管理
4. **Advanced Tables**：表格編輯
5. **Excalidraw**：手繪圖表

## 🔍 故障排除

### 常見問題
1. **同步失敗**：檢查檔案路徑和權限
2. **圖片不顯示**：確認圖片路徑正確
3. **格式錯誤**：檢查 Front Matter 語法
4. **連結失效**：使用相對路徑而非 Wiki 連結

### 除錯技巧
```bash
# 檢查檔案結構
tree obsidian-notes/

# 驗證 Markdown 語法
markdownlint obsidian-notes/**/*.md

# 測試同步腳本
node sync-content.js docs --dry-run
```

## 💡 經驗分享

### 工作流程優化
1. **定期整理**：每週整理一次筆記結構
2. **標籤規範**：建立並遵循標籤規範
3. **模板利用**：善用模板提高一致性
4. **自動化投資**：花時間設定自動化腳本

### 內容策略
1. **學習筆記**：記錄學習過程和心得
2. **專案經驗**：分享實作中的解決方案
3. **工具介紹**：評測和推薦有用的工具
4. **最佳實踐**：總結和分享最佳實踐

## 🔗 相關資源

- [Obsidian 官方文檔](https://help.obsidian.md/)
- [Docusaurus 官方指南](https://docusaurus.io/docs)
- [Markdown 語法參考](https://www.markdownguide.org/)
- [Git 工作流程](https://www.atlassian.com/git/tutorials/comparing-workflows)

## 🎯 總結

這個工作流程的核心優勢在於：

1. **分離關注點**：寫作時專注內容，發布時專注展示
2. **工具專業化**：用最適合的工具做最適合的事
3. **自動化減負**：減少重複性工作，提高效率
4. **版本控制**：完整的變更歷史和協作支援

通過這套工作流程，你可以享受 Obsidian 的強大編輯功能，同時獲得 Docusaurus 的專業網站效果。開始你的知識管理和分享之旅吧！🚀
