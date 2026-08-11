import styles from './Icon.module.css'

type IconProps = {
  name: string
  /** Подпись для иконок, несущих смысл. Без неё иконка декоративная. */
  label?: string
  size?: number
}

export function Icon({ name, label, size = 20 }: IconProps) {
  return (
    <svg
      className={styles.icon}
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <use href={`${import.meta.env.BASE_URL}icons.svg#${name}`} />
    </svg>
  )
}
