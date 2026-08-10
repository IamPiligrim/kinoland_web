import { ButtonLink } from '../components/Button/Button.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import styles from './NotFoundPage.module.css'

type NotFoundPageProps = {
  title?: string
}

export function NotFoundPage({ title = 'Страница не найдена' }: NotFoundPageProps) {
  return (
    <Section>
      <PageMeta title={title} />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>Такой страницы нет — возможно, ссылка устарела.</p>
      <div className={styles.actions}>
        <ButtonLink to="/schedule">Смотреть расписание</ButtonLink>
        <ButtonLink to="/" variant="outline">
          На главную
        </ButtonLink>
      </div>
    </Section>
  )
}
