# Setup Instructions

## Manual Steps to Complete

Since GitHub CLI is not available, please follow these steps manually:

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `my-blog`
3. Make it public (required for GitHub Pages)
4. Don't initialize with README, .gitignore, or license (we already have these)

### 2. Add Remote and Push

Run these commands in your terminal:

```bash
git remote add origin https://github.com/lipeijia/my-blog.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 4. Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see a deployment workflow running
3. Once complete, your site will be available at: `https://lipeijia.github.io/my-blog/`

### 5. Set up Obsidian

1. Download and install [Obsidian](https://obsidian.md/)
2. Open Obsidian and select "Open folder as vault"
3. Navigate to your project folder and select the `obsidian-notes` folder
4. Start writing your blog posts in `obsidian-notes/blog/`

## Content Workflow

### Writing New Posts

1. Create a new markdown file in `obsidian-notes/blog/`
2. Use the template in `obsidian-notes/templates/blog-post-template.md`
3. When ready to publish, run: `node sync-content.js blog`
4. Commit and push changes: `git add . && git commit -m "Add new blog post" && git push`

### Updating Configuration

If you need to change your GitHub username or other settings:

1. Update `docusaurus.config.js`:
   - Change `organizationName` to your GitHub username
   - Update `url` to match your GitHub Pages URL
   - Update `baseUrl` if needed

2. Update `README.md` with your GitHub username

3. Update the GitHub Actions workflow if needed (`.github/workflows/deploy.yml`)

## Testing Locally

### Start development server:
```bash
npm start
```

### Build for production:
```bash
npm run build
```

### Serve built site:
```bash
npm run serve
```

## Troubleshooting

### Build Errors
- Make sure all authors are defined in `blog/authors.yml`
- Make sure all tags are defined in `blog/tags.yml`
- Use `<!-- truncate -->` markers in blog posts

### GitHub Pages Not Working
- Ensure repository is public
- Check that GitHub Actions are enabled
- Verify the workflow file is in `.github/workflows/deploy.yml`
- Check the Actions tab for error messages

### npm ci Failures
If you encounter `npm ci` errors in GitHub Actions:

1. **Node version mismatch**: The workflow uses Node v22 to match your local environment
2. **Alternative workflow**: Use `.github/workflows/deploy-simple.yml` which uses `npm install` instead
3. **Manual fix**: Delete and recreate `package-lock.json` with `rm package-lock.json && npm install`

### Using the Alternative Workflow
If the main workflow continues to fail, you can:

1. Disable the main workflow:
   - Rename `deploy.yml` to `deploy.yml.disabled`
2. The `deploy-simple.yml` workflow will take over
3. This uses `npm install` instead of `npm ci` (more reliable but slower)

## Next Steps

1. Complete the GitHub setup above
2. Write your first blog post in Obsidian
3. Customize the theme and styling
4. Add more features as needed

Happy blogging! 🎉
