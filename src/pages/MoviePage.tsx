import { Link, useParams } from 'react-router'
import { getMovie, getMovieSchedule } from '../api/index.ts'
import { Badge } from '../components/Badge/Badge.tsx'
import { Icon } from '../components/Icon/Icon.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { Poster } from '../components/Poster/Poster.tsx'
import { SectionHeading } from '../components/SectionHeading/SectionHeading.tsx'
import { Trailer } from '../features/movie/Trailer.tsx'
import { PushkinLegend, ShowtimeList } from '../features/schedule/ShowtimeList.tsx'
import { formatDayHeading, formatDuration } from '../lib/format.ts'
import { NotFoundPage } from './NotFoundPage.tsx'
import styles from './MoviePage.module.css'

export function MoviePage() {
  const { slug } = useParams()
  const movie = slug ? getMovie(slug) : undefined

  if (!movie) {
    return <NotFoundPage title="Фильм не найден" />
  }

  const days = getMovieSchedule(movie.slug)

  return (
    <Section tight>
      <PageMeta
        title={movie.title}
        description={`${movie.title} — расписание сеансов в «Киноленде», Калининград. ${movie.synopsis.slice(0, 120)}`}
      />

      <Link to="/schedule" className={styles.back}>
        <Icon name="chevron-left" size={16} />
        Расписание
      </Link>

      <div className={styles.hero}>
        <Poster movie={movie} className={styles.poster} eager />

        <div>
          <h1 className={styles.title}>{movie.title}</h1>
          {movie.originalTitle ? <p className={styles.original}>{movie.originalTitle}</p> : null}

          <p className={styles.tags}>
            <Badge variant="age">{movie.ageRating}</Badge>
            <span>{movie.genres.join(', ')}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDuration(movie.durationMin)}</span>
            <span aria-hidden="true">·</span>
            <span>
              {movie.country}, {movie.year}
            </span>
          </p>

          <p className={styles.synopsis}>{movie.synopsis}</p>

          <dl className={styles.credits}>
            <div>
              <dt className={styles.creditTerm}>Режиссёр</dt>
              <dd className={styles.creditValue}>{movie.director}</dd>
            </div>
            <div>
              <dt className={styles.creditTerm}>В ролях</dt>
              <dd className={styles.creditValue}>{movie.cast.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </div>

      {movie.trailerUrl ? (
        <div className={styles.trailer}>
          <Trailer url={movie.trailerUrl} movieTitle={movie.title} />
        </div>
      ) : null}

      <div className={styles.days}>
        <SectionHeading
          title={days.length > 0 ? 'Сеансы' : 'Сеансов на ближайшую неделю нет'}
        />

        {days.length > 0 ? <PushkinLegend /> : null}

        {days.map((day) => (
          <section className={styles.day} key={day.dayKey}>
            <h3 className={styles.dayTitle}>{formatDayHeading(day.dayKey)}</h3>
            <ShowtimeList showtimes={day.items[0].showtimes} movieTitle={movie.title} />
          </section>
        ))}
      </div>
    </Section>
  )
}
