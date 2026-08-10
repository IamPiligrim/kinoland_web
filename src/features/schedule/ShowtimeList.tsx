import type { Showtime } from '../../content/types.ts'
import { formatPrice, formatTime } from '../../lib/format.ts'
import { isPast } from '../../lib/time.ts'
import styles from './ShowtimeList.module.css'

type ShowtimeListProps = {
  showtimes: Showtime[]
  /** Компактный ряд — только время, для полки на главной. */
  compact?: boolean
  /** Название фильма попадает в подпись ссылки для скринридера. */
  movieTitle: string
}

export function ShowtimeList({ showtimes, compact, movieTitle }: ShowtimeListProps) {
  return (
    <ul className={[styles.list, compact ? styles.compact : ''].filter(Boolean).join(' ')}>
      {showtimes.map((showtime) => (
        <ShowtimeItem
          key={showtime.startsAt + showtime.hall}
          showtime={showtime}
          compact={compact}
          movieTitle={movieTitle}
        />
      ))}
    </ul>
  )
}

function ShowtimeItem({
  showtime,
  compact,
  movieTitle,
}: {
  showtime: Showtime
  compact?: boolean
  movieTitle: string
}) {
  const time = formatTime(showtime.startsAt)
  const price = formatPrice(showtime.priceFrom)
  const passed = isPast(showtime.startsAt)

  const itemClass = [styles.item, showtime.pushkinCard ? styles.pushkin : '']
    .filter(Boolean)
    .join(' ')

  if (passed) {
    return (
      <li>
        <span className={`${itemClass} ${styles.past}`}>
          <span className={styles.time}>{time}</span>
          <span className={styles.meta}>{compact ? showtime.hall : `${showtime.hall} · сеанс прошёл`}</span>
        </span>
      </li>
    )
  }

  const label = [
    `${movieTitle}, сеанс в ${time}`,
    showtime.hall,
    showtime.format,
    `билет от ${price}`,
    showtime.pushkinCard ? 'можно оплатить Пушкинской картой' : '',
    'купить на Афише',
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <li>
      <a
        className={itemClass}
        href={showtime.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <span className={styles.time}>{time}</span>
        <span className={styles.meta}>
          {compact ? showtime.hall : `${showtime.hall} · от ${price}`}
        </span>
      </a>
    </li>
  )
}

/** Расшифровка полосы занавеса. Ставится один раз на страницу. */
export function PushkinLegend() {
  return (
    <p className={styles.legend}>
      <span className={styles.legendMark} aria-hidden="true" />
      можно оплатить Пушкинской картой
    </p>
  )
}
