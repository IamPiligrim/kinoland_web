import { Link } from 'react-router'
import type { MovieWithShowtimes } from '../../api/index.ts'
import { Poster } from '../../components/Poster/Poster.tsx'
import { formatDuration } from '../../lib/format.ts'
import { ShowtimeList } from './ShowtimeList.tsx'
import styles from './TodayShelf.module.css'

/** Горизонтальная полка фильмов дня с рядом кнопок-времён под каждым. */
export function TodayShelf({ items }: { items: MovieWithShowtimes[] }) {
  return (
    <ul className={styles.shelf}>
      {items.map(({ movie, showtimes }, index) => (
        <li className={styles.card} key={movie.slug}>
          <Link
            to={`/movies/${movie.slug}`}
            className={styles.posterLink}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Poster movie={movie} eager={index < 4} />
          </Link>

          <h3 className={styles.title}>
            <Link to={`/movies/${movie.slug}`} className={styles.titleLink}>
              {movie.title}
            </Link>
          </h3>

          <p className={styles.facts}>
            <span>{movie.ageRating}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDuration(movie.durationMin)}</span>
          </p>

          <div className={styles.times}>
            <ShowtimeList showtimes={showtimes} movieTitle={movie.title} compact />
          </div>
        </li>
      ))}
    </ul>
  )
}
