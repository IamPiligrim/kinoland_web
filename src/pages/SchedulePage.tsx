import { useSearchParams } from 'react-router'
import { getDaySchedule, getScheduleDays } from '../api/index.ts'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { DayStrip } from '../features/schedule/DayStrip.tsx'
import { EmptyDay } from '../features/schedule/EmptyDay.tsx'
import { MovieRow } from '../features/schedule/MovieRow.tsx'
import { PushkinLegend } from '../features/schedule/ShowtimeList.tsx'
import { formatDayHeading, plural } from '../lib/format.ts'
import { isValidDayKey, todayKey } from '../lib/time.ts'
import styles from './SchedulePage.module.css'

export function SchedulePage() {
  const [searchParams] = useSearchParams()
  const days = getScheduleDays()

  const requested = searchParams.get('date')
  const selected =
    isValidDayKey(requested) && days.includes(requested) ? requested : todayKey()

  const { items } = getDaySchedule(selected)
  const sessionCount = items.reduce((total, item) => total + item.showtimes.length, 0)

  return (
    <Section tight>
      <PageMeta
        title={`Расписание на ${formatDayHeading(selected).toLowerCase()}`}
        description="Расписание сеансов кинотеатра «Киноленд» в Калининграде на неделю вперёд."
      />

      <h1 className={styles.heading}>{formatDayHeading(selected)}</h1>
      {sessionCount > 0 ? (
        <p className={styles.lead}>
          {sessionCount} {plural(sessionCount, ['сеанс', 'сеанса', 'сеансов'])}. Выбор мест и оплата
          — на Афише.
        </p>
      ) : null}

      <DayStrip days={days} selected={selected} />

      {items.length > 0 ? (
        <>
          <div className={styles.legend}>
            <PushkinLegend />
          </div>
          <div className={styles.list}>
            {items.map((item) => (
              <MovieRow key={item.movie.slug} {...item} />
            ))}
            <div className={styles.listEnd} />
          </div>
        </>
      ) : (
        <EmptyDay dayKey={selected} />
      )}
    </Section>
  )
}
