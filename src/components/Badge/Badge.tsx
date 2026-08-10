import type { ReactNode } from 'react'
import styles from './Badge.module.css'

type BadgeProps = {
  children: ReactNode
  variant?: 'age' | 'curtain' | 'beam' | 'quiet'
  title?: string
}

export function Badge({ children, variant = 'quiet', title }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`} title={title}>
      {children}
    </span>
  )
}
