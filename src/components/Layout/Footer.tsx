import { Link } from 'react-router'
import { ADDRESS, ORG, phones } from '../../content/contacts.ts'
import { RULES_PDF_URL, VK_URL, YANDEX_MAPS_URL } from '../../content/links.ts'
import { Icon } from '../Icon/Icon.tsx'
import { Container } from './Container.tsx'
import { primaryNav } from './navigation.ts'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <span className={styles.title}>Адрес</span>
            <address className={styles.address}>
              {ADDRESS.city},
              <br />
              {ADDRESS.street}
            </address>
            <a
              className={styles.mapLink}
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="pin" size={18} />
              Открыть на карте
            </a>
          </div>

          <div>
            <span className={styles.title}>Телефоны</span>
            <div className={styles.phones}>
              {phones.map((phone) => (
                <a key={phone.href} className={styles.phone} href={phone.href}>
                  <span className={styles.phoneNumber}>{phone.number}</span>
                  <span className={styles.phoneLabel}>{phone.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className={styles.title}>Разделы</span>
            <nav className={styles.links} aria-label="Разделы сайта в подвале">
              {primaryNav.map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <span className={styles.title}>Документы</span>
            <div className={styles.links}>
              <a href={RULES_PDF_URL} target="_blank" rel="noopener noreferrer">
                Правила посещения (PDF)
              </a>
              <Link to="/privacy">Обработка персональных данных</Link>
              <Link to="/cookies">Использование cookie</Link>
            </div>
            <a className={styles.social} href={VK_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="vk" size={18} />
              Мы во ВКонтакте
            </a>
          </div>
        </div>

        <div className={styles.legal}>
          <span>
            © {year} {ORG.legalName}
          </span>
          <span>ИНН {ORG.inn}</span>
          <span>Билеты продаёт Афиша.ру, доставку везут Яндекс Еда и Купер</span>
        </div>
      </Container>
    </footer>
  )
}
