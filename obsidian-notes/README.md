# Obsidian Notes 使用指南

這個目錄包含了所有用於創建 Docusaurus 內容的 Obsidian 筆記。

## 📁 目錄結構

```
obsidian-notes/
├── docs/           # 文檔筆記（會同步到 docs/）
│   ├── javascript/
│   ├── react/
│   ├── security/
│   ├── tools/
│   ├── performance/
│   ├── design/
│   └── frontend-frameworks/
├── blog/           # 部落格文章（會同步到 blog/）
└── templates/      # 範本文件
```

## ✍️ 寫作流程

### 1. 建立新文檔
- 在對應的分類目錄下創建 `.md` 文件
- 使用 `templates/docs-template.md` 作為起始範本
- 確保文件包含正確的 front matter

### 2. 撰寫內容
- 使用 Markdown 語法
- 適當使用表情符號增強可讀性
- 包含程式碼範例和實際案例

### 3. 同步到 Docusaurus
```bash
# 同步文檔
node sync-content.js docs

# 同步部落格
node sync-content.js blog

# 同步全部
node sync-content.js all
```
└── templates/      # Templates for new posts
```

## Tips for Obsidian + Docusaurus

- Use standard markdown formatting
- Keep image references relative
- Use front matter for blog posts:
  ```yaml
  ---
  title: "Your Post Title"
  date: 2024-01-01
  authors: [your-name]
  tags: [tag1, tag2]
  ---
  ```

## Getting Started

1. Open this folder in Obsidian as a vault
2. Create your first blog post in the `blog/` folder
3. When ready to publish, copy the file to `../blog/`
4. Commit and push to GitHub
