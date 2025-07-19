import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '技術分享',
    icon: '💻',
    description: (
      <>
        分享程式開發經驗、技術心得與最新趨勢，
        包含前端、後端、DevOps 等各領域知識。
      </>
    ),
  },
  {
    title: '學習筆記',
    icon: '📚',
    description: (
      <>
        記錄學習過程中的重點整理、問題解決方案，
        以及各種工具和框架的使用心得。
      </>
    ),
  },
  {
    title: '專案展示',
    icon: '🚀',
    description: (
      <>
        展示個人或團隊專案，分享開發過程、
        技術選型與實作細節。
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon} role="img">{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
