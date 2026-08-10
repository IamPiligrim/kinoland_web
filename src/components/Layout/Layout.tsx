import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { boxOfficePhone } from '../../content/contacts.ts'
import { AFISHA_CINEMA_URL } from '../../content/links.ts'
import { ButtonExternal } from '../Button/Button.tsx'
import { Icon } from '../Icon/Icon.tsx'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <MobileDock />
    </>
  )
}

/** Переход по разделу начинается сверху; якоря внутри страницы не трогаем. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function MobileDock() {
  return (
    <div className={styles.dock}>
      <ButtonExternal href={AFISHA_CINEMA_URL} className={styles.dockCta} size="l">
        Купить билеты
      </ButtonExternal>
      <a
        className={styles.dockPhone}
        href={boxOfficePhone.href}
        aria-label={`Позвонить в кассу, ${boxOfficePhone.number}`}
      >
        <Icon name="phone" />
      </a>
    </div>
  )
}
