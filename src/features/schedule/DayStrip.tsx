import { Link } from 'react-router'
import { formatDayHeading, formatDayTab } from '../../lib/format.ts'
import styles from './DayStrip.module.css'

type DayStripProps = {
  days: string[]
  selected: string
}

/** Выбранный день живёт в URL — ссылкой на конкретный день можно поделиться. */
export function DayStrip({ days, selected }: DayStripProps) {
  return (
    <nav className={styles.wrap} aria-label="Дни расписания">
      <ul className={styles.strip}>
        {days.map((day) => {
          const current = day === selected
          return (
            <li key={day}>
              <Link
                to={`/schedule?date=${day}`}
                className={[styles.day, current ? styles.current : ''].filter(Boolean).join(' ')}
                aria-current={current ? 'page' : undefined}
                title={formatDayHeading(day)}
              >
                {formatDayTab(day)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
