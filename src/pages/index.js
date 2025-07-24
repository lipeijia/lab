import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Hi, 我叫 Peja</h1>
          <p>這裡是我的技術知識主頁，記錄學習、專案、教學與 AI 日常。</p>
          <p>最壞的時代，也可能是最好的時代——讓我們一起活下來、長出自己的樣子。🌱</p>
        </section>
        <section className={styles.cards}>
          {/* <Link className={styles.card} to="/about/">
            <h2>About</h2>
            <p>自我介紹、職涯方向、語言能力</p>
          </Link> */}
          <Link className={styles.card} to="/blog/">
            <h2>Blog</h2>
            <p>技術心得、踩坑紀錄、專案回顧</p>
          </Link>
          <Link className={styles.card} to="/docs/">
            <h2>Docs</h2>
            <p>技術知識筆記、常用整理、圖解</p>
          </Link>
          <Link className={styles.card} to="/projects/">
            <h2>Projects</h2>
            <p>Side Project 實作、Demo、架構圖</p>
          </Link>
          {/* <Link className={styles.card} to="/speaking/">
            <h2>Speaking / 教學筆記</h2>
            <p>分享、教學、課程筆記</p>
          </Link> */}
          <Link className={styles.card} to="/ai-diary/">
            <h2>AI 日記</h2>
            <p>每天問 AI 的學習紀錄</p>
          </Link>
        </section>
      </main>
    </Layout>
  );
} 