import { Link } from 'react-router'
import { Badge } from '../../components/Badge/Badge.tsx'
import type { NewsPost } from '../../content/types.ts'
import { formatFullDate } from '../../lib/format.ts'
import styles from './NewsCard.module.css'

/** Карточка ленты: акция и новость различаются типом записи, а не блоком. */
export function NewsCard({ post }: { post: NewsPost }) {
  const promo = post.type === 'promo'

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        {promo ? <Badge variant="curtain">Акция</Badge> : <Badge variant="quiet">Новость</Badge>}
        <time className={styles.date} dateTime={post.publishedAt}>
          {formatFullDate(post.publishedAt)}
        </time>
      </div>

      <h3 className={styles.title}>
        <Link to={`/news/${post.slug}`} className={styles.titleLink}>
          {post.title}
        </Link>
      </h3>

      <p className={styles.excerpt}>{post.excerpt}</p>

      {promo && post.validUntil ? (
        <p className={styles.valid}>Действует до {formatFullDate(post.validUntil)}</p>
      ) : null}
    </article>
  )
}
