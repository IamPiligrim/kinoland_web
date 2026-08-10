import { Link, useParams } from 'react-router'
import { getNewsPost, isExpired } from '../api/index.ts'
import { Badge } from '../components/Badge/Badge.tsx'
import { ButtonLink } from '../components/Button/Button.tsx'
import { Icon } from '../components/Icon/Icon.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { ProseText } from '../components/Prose/Prose.tsx'
import { formatFullDate } from '../lib/format.ts'
import { NotFoundPage } from './NotFoundPage.tsx'
import styles from './NewsPostPage.module.css'

export function NewsPostPage() {
  const { slug } = useParams()
  const post = slug ? getNewsPost(slug) : undefined

  if (!post) {
    return <NotFoundPage title="Запись не найдена" />
  }

  const promo = post.type === 'promo'
  const expired = isExpired(post)

  return (
    <Section tight>
      <PageMeta title={post.title} description={post.excerpt} />

      <Link to="/news" className={styles.back}>
        <Icon name="chevron-left" size={16} />
        Новости и акции
      </Link>

      <div className={styles.head}>
        {promo ? <Badge variant="curtain">Акция</Badge> : <Badge variant="quiet">Новость</Badge>}
        <time className={styles.date} dateTime={post.publishedAt}>
          {formatFullDate(post.publishedAt)}
        </time>
      </div>

      <h1 className={styles.title}>{post.title}</h1>

      <div className={styles.body}>
        <ProseText text={post.body} />
      </div>

      {promo && post.validUntil ? (
        <p className={[styles.valid, expired ? styles.expired : ''].filter(Boolean).join(' ')}>
          {expired
            ? `Акция закончилась ${formatFullDate(post.validUntil)}.`
            : `Акция действует до ${formatFullDate(post.validUntil)} включительно.`}
        </p>
      ) : null}

      <div className={styles.actions}>
        <ButtonLink to="/news" variant="outline">
          Вся лента
        </ButtonLink>
      </div>
    </Section>
  )
}
