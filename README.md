# My Blog

A personal blog built with Docusaurus and integrated with Obsidian for content creation. Automatically deployed to GitHub Pages.

## Features

- **Docusaurus** - Modern static site generator
- **Obsidian Integration** - Write content in Obsidian vault
- **GitHub Pages** - Automatic deployment
- **GitHub Actions** - CI/CD pipeline

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
4. When ready to publish, copy files to the main `blog/` or `docs/` folders
5. Commit and push to GitHub

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

### GitHub Pages Setup

1. Create a new repository on GitHub named `my-blog`
2. Push this code to the repository
3. Go to repository Settings > Pages
4. Set Source to "GitHub Actions"
5. The site will be available at `https://lipeijia.github.io/my-blog/`

### Manual Deployment

```bash
npm run deploy
```

## Project Structure

```
my-blog/
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
