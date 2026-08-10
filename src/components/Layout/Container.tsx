import type { ComponentPropsWithoutRef, ElementType } from 'react'
import styles from './Container.module.css'

type ContainerProps = {
  as?: ElementType
  className?: string
} & ComponentPropsWithoutRef<'div'>

export function Container({ as: Tag = 'div', className, ...rest }: ContainerProps) {
  return <Tag className={[styles.container, className].filter(Boolean).join(' ')} {...rest} />
}

type SectionProps = ContainerProps & {
  /** Отделить секцию волосяной линией сверху. */
  divided?: boolean
  /** Уменьшенный отступ сверху — для страниц разделов. */
  tight?: boolean
}

/** Секция страницы: вертикальный ритм плюс общая сетка. */
export function Section({
  as: Tag = 'section',
  className,
  divided,
  tight,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={[
        styles.container,
        styles.section,
        divided ? styles.divided : '',
        tight ? styles.tight : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}
