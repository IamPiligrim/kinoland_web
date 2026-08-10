import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { boxOfficePhone } from '../../content/contacts.ts'
import { AFISHA_CINEMA_URL } from '../../content/links.ts'
import { ButtonExternal } from '../Button/Button.tsx'
import { Icon } from '../Icon/Icon.tsx'
import { Container } from './Container.tsx'
import { primaryNav } from './navigation.ts'
import styles from './Header.module.css'

export function Header() {
  const { pathname } = useLocation()
  /* Меню помнит раздел, в котором его открыли: смена маршрута — в том числе
     кнопкой «назад» — сама закрывает панель, без синхронизации эффектом. */
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const menuOpen = openedAt === pathname
  const setMenuOpen = (open: boolean) => setOpenedAt(open ? pathname : null)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedAt(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.logo}>
          Киноленд
        </Link>

        <nav className={styles.nav} aria-label="Разделы сайта">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [styles.link, isActive ? styles.linkActive : ''].filter(Boolean).join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={`${styles.iconButton} ${styles.phoneButton}`}
            href={boxOfficePhone.href}
            aria-label={`Позвонить в кассу, ${boxOfficePhone.number}`}
          >
            <Icon name="phone" />
          </a>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-expanded={menuOpen}
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>

          <ButtonExternal href={AFISHA_CINEMA_URL} className={styles.cta}>
            Купить билеты
          </ButtonExternal>
        </div>
      </Container>

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </header>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Меню">
      <div className={styles.panelHead}>
        <span className={styles.logo}>Киноленд</span>
        <button
          type="button"
          className={styles.iconButton}
          onClick={onClose}
          aria-label="Закрыть меню"
          autoFocus
        >
          <Icon name="close" />
        </button>
      </div>

      <nav className={styles.panelNav} aria-label="Разделы сайта">
        {primaryNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.panelLink, isActive ? styles.panelLinkActive : ''].filter(Boolean).join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.panelFoot}>
        <a className={styles.panelPhone} href={boxOfficePhone.href}>
          {boxOfficePhone.label}
          <b>{boxOfficePhone.number}</b>
        </a>
        <ButtonExternal href={AFISHA_CINEMA_URL} size="l" full>
          Купить билеты
        </ButtonExternal>
      </div>
    </div>
  )
}
