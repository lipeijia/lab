# Pei Jia's Lab

A personal knowledge base built with Docusaurus and integrated with Obsidian for content creation. Features selective CI/CD deployment to GitHub Pages.

## Features

- **Docusaurus** - Modern static site generator
- **Obsidian Integration** - Write content in Obsidian vault
- **Selective Deployment** - Deploy only when ready with commit keywords
- **GitHub Pages** - Automatic deployment when triggered
- **GitHub Actions** - Smart CI/CD pipeline

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

This opens `http://localhost:3000` in your browser.

### 3. Build for Production

```bash
npm run build
```

## Content Creation Workflow

### Using Obsidian

1. Open the `obsidian-notes/` folder in Obsidian as a vault
2. Create new blog posts in `obsidian-notes/blog/`
3. Create documentation in `obsidian-notes/docs/`
4. When ready to publish, sync content using: `node sync-content.js docs`
5. Commit with deployment keywords to trigger deployment

### Blog Post Format

Blog posts should include front matter:

```yaml
---
title: "Your Post Title"
date: 2024-01-01
authors: [lipeijia]
tags: [tag1, tag2]
description: "Brief description"
---
```

## Deployment

The site uses **selective deployment** - it won't deploy on every push. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

```bash
# Deploy by including keywords in commit message
git commit -m "feat: new content [deploy]"
git push

# Or trigger manually via GitHub Actions
```

**Deployment triggers:**
- Commit messages containing: `[deploy]`, `[release]`, `[publish]`, `deploy:`, `release:`, `publish:`
- Manual triggering via GitHub Actions

### GitHub Pages Setup

1. Create a new repository on GitHub named `lab`
2. Push this code to the repository
3. Go to repository Settings > Pages
4. Set Source to "GitHub Actions"
5. The site will be available at `https://lipeijia.github.io/lab/`

### Manual Deployment

```bash
npm run deploy
```

## Project Structure

```
lab/
├── blog/                    # Published blog posts
├── docs/                    # Published documentation
├── src/                     # React components and pages
├── static/                  # Static assets
├── obsidian-notes/          # Obsidian vault for content creation
│   ├── blog/               # Draft blog posts
│   ├── docs/               # Draft documentation
│   ├── assets/             # Images and media
│   └── templates/          # Content templates
├── .github/workflows/       # GitHub Actions
└── docusaurus.config.js     # Docusaurus configuration
```

## Configuration

Update `docusaurus.config.js` with your GitHub username:

- Change `organizationName` to your GitHub username
- Update `url` to your GitHub Pages URL
- Modify `baseUrl` if needed

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
