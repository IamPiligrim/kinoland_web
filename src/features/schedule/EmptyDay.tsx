import { getNextDayWithShowtimes } from '../../api/index.ts'
import { ButtonExternal, ButtonLink } from '../../components/Button/Button.tsx'
import { boxOfficePhone } from '../../content/contacts.ts'
import { formatDayHeading } from '../../lib/format.ts'
import styles from './EmptyDay.module.css'

/** Сеансов на выбранный день нет. */
export function EmptyDay({ dayKey }: { dayKey: string }) {
  const nextDay = getNextDayWithShowtimes(dayKey)

  return (
    <div className={styles.empty}>
      <p className={styles.title}>На этот день сеансов нет</p>
      <p className={styles.text}>
        Расписание открывается на неделю вперёд. Что будет дальше — скажут на кассе.
      </p>
      <div className={styles.actions}>
        {nextDay ? (
          <ButtonLink to={`/schedule?date=${nextDay}`} variant="outline">
            {formatDayHeading(nextDay)}
          </ButtonLink>
        ) : null}
        <ButtonExternal href={boxOfficePhone.href} variant="outline" target="_self">
          {boxOfficePhone.number}
        </ButtonExternal>
      </div>
    </div>
  )
}
