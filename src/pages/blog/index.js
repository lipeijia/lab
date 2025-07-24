import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function BlogHome() {
  // 這裡可用靜態列表或未來可自動化抓取 blog 文章
  const posts = [
    {
      title: '歡迎來到我的部落格',
      date: '2025-07-19',
      link: '/blog/2025-07-19-welcome-to-my-blog',
      summary: '這是我的第一篇部落格文章，分享網站架構與內容規劃。',
    },
    // 可持續新增更多文章
  ];

  return (
    <Layout title="技術部落格">
      <main style={{maxWidth: 800, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>技術部落格</h1>
        <p>這裡會分享我的技術心得、踩坑紀錄、專案回顧等內容。</p>
        <ul style={{listStyle: 'none', padding: 0}}>
          {posts.map(post => (
            <li key={post.link} style={{marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem'}}>
              <Link to={post.link} style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{post.title}</Link>
              <div style={{color: '#888', fontSize: '0.95rem', margin: '0.3rem 0'}}>{post.date}</div>
              <div>{post.summary}</div>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
} 