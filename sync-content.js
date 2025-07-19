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

  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcPath = path.join(src, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      // Recursively sync subdirectories
      const subSrc = srcPath;
      const subDest = path.join(dest, file);
      syncDirectory(subSrc, subDest, filePrefix);
    } else if (file.endsWith('.md')) {
      const destFile = filePrefix ? `${filePrefix}-${file}` : file;
      const destPath = path.join(dest, destFile);
      
      // Read the source file
      const content = fs.readFileSync(srcPath, 'utf8');
      
      // Write to destination
      fs.writeFileSync(destPath, content);
      console.log(`Synced: ${file} -> ${destFile}`);
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node sync-content.js [blog|docs|all]');
    console.log('  blog - Sync blog posts from obsidian-notes/blog to blog/');
    console.log('  docs - Sync documentation from obsidian-notes/docs to docs/');
    console.log('  all  - Sync both blog and docs');
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'blog':
      console.log('Syncing blog posts...');
      syncDirectory(OBSIDIAN_BLOG_DIR, DOCUSAURUS_BLOG_DIR, getTodayDatePrefix());
      break;
    case 'docs':
      console.log('Syncing documentation...');
      syncDirectory(OBSIDIAN_DOCS_DIR, DOCUSAURUS_DOCS_DIR);
      break;
    case 'all':
      console.log('Syncing all content...');
      syncDirectory(OBSIDIAN_BLOG_DIR, DOCUSAURUS_BLOG_DIR, getTodayDatePrefix());
      syncDirectory(OBSIDIAN_DOCS_DIR, DOCUSAURUS_DOCS_DIR);
      break;
    default:
      console.log('Unknown command:', command);
      break;
  }
}

function getTodayDatePrefix() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

main();
