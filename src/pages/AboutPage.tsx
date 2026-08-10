import { Link } from 'react-router'
import { Icon } from '../components/Icon/Icon.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { SectionHeading } from '../components/SectionHeading/SectionHeading.tsx'
import { directions, legalDocs, venueParts } from '../content/about.ts'
import { ADDRESS, ORG, openingHours, phones } from '../content/contacts.ts'
import { RULES_PDF_URL, YANDEX_MAPS_URL } from '../content/links.ts'
import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <Section tight>
      <PageMeta
        title="О центре и контакты"
        description="«Киноленд»: адрес, телефоны, часы работы и как добраться. Калининград, ул. Киевская, 71."
      />

      <h1 className={styles.title}>О центре</h1>
      <p className={styles.lead}>
        «Киноленд» — семейный развлекательный центр на Киевской: три зала кинотеатра, кафе «Марио»
        и банкетный зал.
      </p>

      <div className={styles.block}>
        <SectionHeading title="Что внутри" />
        <div className={styles.cards}>
          {venueParts.map((part) => (
            <div className={styles.card} key={part.title}>
              <h3 className={styles.cardTitle}>{part.title}</h3>
              <p className={styles.cardText}>{part.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Телефоны" />
        <div className={styles.phones}>
          {phones.map((phone) => (
            <div className={styles.phone} key={phone.href}>
              <span className={styles.phoneLabel}>{phone.label}</span>
              <a className={styles.phoneNumber} href={phone.href}>
                {phone.number}
              </a>
              {phone.note ? <p className={styles.phoneNote}>{phone.note}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Часы работы" />
        <div className={styles.hours}>
          {openingHours.map((row) => (
            <div className={styles.hoursRow} key={row.label}>
              <span className={styles.hoursLabel}>{row.label}</span>
              <span className={styles.hoursValue}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Как добраться" />
        <address className={styles.address}>
          {ADDRESS.city}, {ADDRESS.street}
        </address>
        <a
          className={styles.mapLink}
          href={YANDEX_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="pin" size={18} />
          Построить маршрут в Яндекс Картах
        </a>

        <div className={`${styles.cards} ${styles.cardsSpaced}`}>
          {directions.map((item) => (
            <div className={styles.card} key={item.title}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Реквизиты и документы" />
        <dl className={styles.requisites}>
          <dt>Юридическое лицо</dt>
          <dd>{ORG.legalName}</dd>
          <dt>ИНН</dt>
          <dd>{ORG.inn}</dd>
          <dt>Адрес</dt>
          <dd>
            {ADDRESS.postalCode}, {ADDRESS.full}
          </dd>
        </dl>
        <div className={styles.docs}>
          <a className={styles.doc} href={RULES_PDF_URL} target="_blank" rel="noopener noreferrer">
            Правила посещения
            <span className={styles.docNote}>PDF</span>
          </a>
          {legalDocs.map((doc) => (
            <Link className={styles.doc} to={doc.href} key={doc.href}>
              {doc.title}
              <span className={styles.docNote}>Страница</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
