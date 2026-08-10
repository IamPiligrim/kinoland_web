import type { Movie } from '../../content/types.ts'
import styles from './Poster.module.css'

type PosterProps = {
  movie: Pick<Movie, 'slug' | 'title' | 'originalTitle' | 'ageRating' | 'posterUrl'>
  /** Постер первого экрана грузим сразу, остальные — лениво. */
  eager?: boolean
  className?: string
}

/** Оттенок типографического постера выбирается по slug — один и тот же
    фильм всегда выглядит одинаково, полка не мигает между переходами. */
function toneOf(slug: string): string {
  let sum = 0
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i)
  return `tone${sum % 3}`
}

export function Poster({ movie, eager, className }: PosterProps) {
  const rootClass = [styles.poster, className].filter(Boolean).join(' ')

  if (movie.posterUrl) {
    return (
      <div className={rootClass}>
        <img
          className={styles.image}
          src={movie.posterUrl}
          alt={`Постер фильма «${movie.title}»`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className={styles.frame} />
      </div>
    )
  }

  return (
    <div className={`${rootClass} ${styles[toneOf(movie.slug)]}`}>
      <div className={styles.fallback}>
        <span className={styles.rating} aria-hidden="true">
          {movie.ageRating}
        </span>
        <p className={styles.title}>{movie.title}</p>
        {movie.originalTitle ? <p className={styles.original}>{movie.originalTitle}</p> : null}
      </div>
      <span className={styles.frame} />
    </div>
  )
}
