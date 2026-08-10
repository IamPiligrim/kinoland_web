import type { ReactNode } from 'react'
import styles from './Prose.module.css'

export function Prose({ children }: { children: ReactNode }) {
  return <div className={styles.prose}>{children}</div>
}

/** Текст записи хранится абзацами через пустую строку. */
export function ProseText({ text }: { text: string }) {
  return (
    <Prose>
      {text
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
    </Prose>
  )
}
