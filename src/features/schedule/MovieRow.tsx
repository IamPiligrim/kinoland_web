import { Link } from 'react-router'
import type { MovieWithShowtimes } from '../../api/index.ts'
import { Badge } from '../../components/Badge/Badge.tsx'
import { Poster } from '../../components/Poster/Poster.tsx'
import { formatDuration } from '../../lib/format.ts'
import { ShowtimeList } from './ShowtimeList.tsx'
import styles from './MovieRow.module.css'

/** Строка расписания: фильм и все его сеансы выбранного дня. */
export function MovieRow({ movie, showtimes }: MovieWithShowtimes) {
  return (
    <article className={styles.row}>
      <Link to={`/movies/${movie.slug}`} className={styles.poster} tabIndex={-1} aria-hidden="true">
        <Poster movie={movie} />
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link to={`/movies/${movie.slug}`} className={styles.titleLink}>
            {movie.title}
          </Link>
        </h3>
        <p className={styles.facts}>
          <Badge variant="age">{movie.ageRating}</Badge>
          <span>{movie.genres.join(', ')}</span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span>{formatDuration(movie.durationMin)}</span>
        </p>
      </div>

      <div className={styles.times}>
        <ShowtimeList showtimes={showtimes} movieTitle={movie.title} />
      </div>
    </article>
  )
}
