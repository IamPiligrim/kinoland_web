import { getDaySchedule, getFoodPromo, getLatestNews } from '../api/index.ts'
import { ButtonExternal, ButtonLink } from '../components/Button/Button.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { SectionHeading } from '../components/SectionHeading/SectionHeading.tsx'
import { banquet } from '../content/banquets.ts'
import { banquetPhone } from '../content/contacts.ts'
import { KUPER_URL, YANDEX_EDA_URL } from '../content/links.ts'
import { EmptyDay } from '../features/schedule/EmptyDay.tsx'
import { PushkinLegend } from '../features/schedule/ShowtimeList.tsx'
import { TodayShelf } from '../features/schedule/TodayShelf.tsx'
import { NewsCard } from '../features/news/NewsCard.tsx'
import { formatDayHeading, formatPrice, formatTime, plural } from '../lib/format.ts'
import { isPast, todayKey } from '../lib/time.ts'
import styles from './HomePage.module.css'

export function HomePage() {
  const today = todayKey()
  const { items } = getDaySchedule(today)
  const news = getLatestNews(3)
  const promo = getFoodPromo()

  const nextShowtime = items
    .flatMap((item) => item.showtimes)
    .filter((showtime) => !isPast(showtime.startsAt))
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]

  return (
    <>
      <PageMeta
        title="Кино, кафе и банкеты"
        description="Расписание сеансов на сегодня, меню кафе «Марио» с доставкой и банкетный зал. Калининград, ул. Киевская, 71."
      />

      <Section aria-labelledby="today">
        <h1 className={styles.heroTitle} id="today">
          {formatDayHeading(today)}
        </h1>

        <p className={styles.heroLead}>
          {nextShowtime ? (
            <>
              <span>Ближайший сеанс в</span>
              <b>{formatTime(nextShowtime.startsAt)}</b>
              <span aria-hidden="true">·</span>
              <span>
                {items.length} {plural(items.length, ['фильм', 'фильма', 'фильмов'])} в прокате
              </span>
            </>
          ) : (
            <span>Сеансы на сегодня закончились — посмотрите завтрашний день.</span>
          )}
        </p>

        {items.length > 0 ? (
          <>
            <TodayShelf items={items} />
            <div className={styles.shelfFoot}>
              <PushkinLegend />
              <ButtonLink to="/schedule" variant="outline">
                Всё расписание
              </ButtonLink>
            </div>
          </>
        ) : (
          <EmptyDay dayKey={today} />
        )}
      </Section>

      <Section divided aria-labelledby="doors">
        <SectionHeading id="doors" title="Кафе и банкетный зал" />

        <div className={styles.doors}>
          <article className={styles.door}>
            <h3 className={styles.doorTitle}>Кафе и доставка</h3>
            <p className={styles.doorText}>
              Пицца, паста, супы и попкорн — в зале, на самовывоз или домой.
            </p>
            {promo ? <p className={styles.doorPrice}>{promo.title}</p> : null}
            <div className={styles.doorActions}>
              <ButtonLink to="/food" variant="outline">
                Смотреть меню
              </ButtonLink>
              <ButtonExternal href={YANDEX_EDA_URL} variant="outline">
                Яндекс Еда
              </ButtonExternal>
              <ButtonExternal href={KUPER_URL} variant="outline">
                Купер
              </ButtonExternal>
            </div>
          </article>

          <article className={styles.door}>
            <h3 className={styles.doorTitle}>Банкетный зал</h3>
            <p className={styles.doorText}>
              Дни рождения, выпускные и корпоративы до {banquet.capacityMax} гостей. К банкету можно
              арендовать кинозал.
            </p>
            <p className={styles.doorPrice}>от {formatPrice(banquet.priceFrom)} с человека</p>
            <div className={styles.doorActions}>
              <ButtonLink to="/banquets" variant="outline">
                Что входит
              </ButtonLink>
              <ButtonExternal href={banquetPhone.href} target="_self" variant="outline">
                {banquetPhone.number}
              </ButtonExternal>
            </div>
          </article>
        </div>
      </Section>

      <Section divided aria-labelledby="news">
        <SectionHeading
          id="news"
          title="Акции и новости"
          action={
            <ButtonLink to="/news" variant="quiet">
              Вся лента
            </ButtonLink>
          }
        />
        <div className={styles.newsGrid}>
          {news.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  )
}
