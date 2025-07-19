# 🚀 部署指南

本專案已設置**選擇性 CI/CD 部署**，不會在每次 `git push` 時自動部署。

## 📋 部署觸發方式

### 1. 🏷️ Commit Message 觸發部署

在 commit message 中包含以下任一關鍵字即可觸發部署：

```bash
# 任一格式都可以觸發部署
git commit -m "feat: 新增功能 [deploy]"
git commit -m "fix: 修復問題 [release]"
git commit -m "docs: 更新文檔 [publish]"
git commit -m "deploy: 發布新版本"
git commit -m "release: v1.0.0"
git commit -m "publish: 更新部落格文章"
```

**支援的關鍵字**（不區分大小寫）：
- `[deploy]` 或 `deploy:`
- `[release]` 或 `release:`
- `[publish]` 或 `publish:`

### 2. ⚡ 手動觸發部署

1. 前往 GitHub Repository
2. 點擊 **Actions** 標籤
3. 選擇 **Deploy to GitHub Pages** workflow
4. 點擊 **Run workflow** 按鈕
5. 選擇是否強制部署（忽略 commit message 檢查）

## 🔄 工作流程建議

### 日常開發
```bash
# 正常開發提交（不會觸發部署）
git add .
git commit -m "feat: 新增功能"
git push

git commit -m "fix: 修復 bug"
git push

git commit -m "docs: 更新文檔"
git push
```

### 準備發布
```bash
# 當您準備好要發布時
git add .
git commit -m "release: v1.2.0 - 新增多項功能並修復問題 [deploy]"
git push  # 這會觸發自動部署
```

### 緊急修復
```bash
# 緊急修復並立即部署
git add .
git commit -m "hotfix: 修復關鍵安全問題 [deploy]"
git push
```

## 📊 部署狀態檢查

1. **GitHub Actions 頁面**：查看部署是否成功
2. **GitHub Pages 設定**：檢查部署狀態
3. **網站連結**：https://lipeijia.github.io/lab/

## 🛠️ 故障排除

### 如果忘記加部署關鍵字
1. 使用 GitHub 手動觸發部署
2. 或者建立新的 commit：
```bash
git commit --allow-empty -m "deploy: 觸發部署"
git push
```

### 如果部署失敗
1. 檢查 GitHub Actions 日誌
2. 確認建置沒有錯誤
3. 檢查 `.gitignore` 設定是否正確

## 💡 使用技巧

### 批量更新後部署
```bash
# 多次更新後一次部署
git add .
git commit -m "feat: 新增 JavaScript 基礎教程"
git push

git add .
git commit -m "feat: 新增 React 進階概念"
git push

git add .
git commit -m "docs: 更新所有文檔格式"
git push

# 最後觸發部署
git commit --allow-empty -m "release: 大量內容更新 [deploy]"
git push
```

### 測試建置但不部署
```bash
# 本地測試建置
npm run build

# 提交但不部署
git commit -m "test: 測試新功能"
git push
```

這樣的設置讓您有完全的控制權，可以：
- ✅ 隨時推送程式碼而不觸發部署
- ✅ 選擇性地觸發部署
- ✅ 緊急情況下強制部署
- ✅ 批量更新後統一部署
