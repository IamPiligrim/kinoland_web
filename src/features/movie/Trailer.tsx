import { useState } from 'react'
import { Icon } from '../../components/Icon/Icon.tsx'
import styles from './Trailer.module.css'

type TrailerProps = {
  url: string
  movieTitle: string
}

export function Trailer({ url, movieTitle }: TrailerProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={styles.frame}>
      {playing ? (
        <iframe
          className={styles.iframe}
          src={`${url}?autoplay=1`}
          title={`Трейлер фильма «${movieTitle}»`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.button} onClick={() => setPlaying(true)}>
          <Icon name="play" size={28} />
          Смотреть трейлер
        </button>
      )}
    </div>
  )
}
