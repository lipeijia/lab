# My Blog - Obsidian Notes

This folder contains your Obsidian vault for writing blog posts and documentation. The content here will be processed and deployed to your Docusaurus blog.

## Workflow

1. **Write in Obsidian**: Use this folder as your Obsidian vault to write blog posts and documentation
2. **Organize content**: 
   - Put blog posts in `blog/` folder
   - Put documentation in `docs/` folder
3. **Sync to Docusaurus**: Copy/move your markdown files to the appropriate Docusaurus folders when ready to publish
4. **Deploy**: Push changes to GitHub to trigger automatic deployment

## Folder Structure

```
obsidian-notes/
├── blog/           # Blog posts (copy to ../blog/ when ready)
├── docs/           # Documentation (copy to ../docs/ when ready)
├── assets/         # Images and other assets
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
