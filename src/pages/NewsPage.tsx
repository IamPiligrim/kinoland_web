import { getNewsFeed } from '../api/index.ts'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { NewsCard } from '../features/news/NewsCard.tsx'
import styles from './NewsPage.module.css'

export function NewsPage() {
  const posts = getNewsFeed()

  return (
    <Section tight>
      <PageMeta
        title="Новости и акции"
        description="Новости «Киноленда» и действующие акции кинотеатра и кафе."
      />

      <h1 className={styles.title}>Новости и акции</h1>

      <div className={styles.grid}>
        {posts.map((post) => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  )
}
