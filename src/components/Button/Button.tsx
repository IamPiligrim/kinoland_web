import type { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router'
import styles from './Button.module.css'

type Variant = 'beam' | 'outline' | 'quiet'
type Size = 'm' | 'l'

type Shared = {
  variant?: Variant
  size?: Size
  full?: boolean
  className?: string
}

function cx({ variant = 'beam', size = 'm', full, className }: Shared): string {
  return [styles.root, styles[variant], styles[size], full ? styles.full : '', className]
    .filter(Boolean)
    .join(' ')
}

export function Button({
  variant,
  size,
  full,
  className,
  ...rest
}: Shared & ComponentPropsWithoutRef<'button'>) {
  return <button type="button" className={cx({ variant, size, full, className })} {...rest} />
}

/** Внутренняя навигация. */
export function ButtonLink({
  to,
  variant,
  size,
  full,
  className,
  ...rest
}: Shared & { to: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  return <Link to={to} className={cx({ variant, size, full, className })} {...rest} />
}

/** Точка выхода наружу: Афиша, агрегаторы доставки, VK. */
export function ButtonExternal({
  variant,
  size,
  full,
  className,
  ...rest
}: Shared & ComponentPropsWithoutRef<'a'>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cx({ variant, size, full, className })}
      {...rest}
    />
  )
}
