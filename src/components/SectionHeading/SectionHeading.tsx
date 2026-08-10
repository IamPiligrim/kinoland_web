import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  title: ReactNode
  lead?: ReactNode
  /** Ссылка «дальше по разделу» справа от заголовка. */
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  id?: string
}

export function SectionHeading({ title, lead, action, as: Tag = 'h2', id }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <div className={styles.text}>
        <Tag id={id}>{title}</Tag>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  )
}
