import { ButtonExternal } from '../components/Button/Button.tsx'
import { Icon } from '../components/Icon/Icon.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { SectionHeading } from '../components/SectionHeading/SectionHeading.tsx'
import { banquet, banquetCinemaOption, banquetIncludes, banquetOccasions } from '../content/banquets.ts'
import { banquetPhone } from '../content/contacts.ts'
import { VK_URL } from '../content/links.ts'
import { formatPrice, plural } from '../lib/format.ts'
import styles from './BanquetsPage.module.css'

export function BanquetsPage() {
  return (
    <Section tight>
      <PageMeta
        title="Банкетный зал"
        description={`Банкетный зал «Киноленда», Калининград: до ${banquet.capacityMax} гостей, меню от ${banquet.priceFrom} ₽ с человека, возможна аренда кинозала.`}
      />

      <h1 className={styles.title}>Банкетный зал</h1>
      <p className={styles.lead}>
        День рождения, выпускной или корпоратив. Меню готовит кухня кафе «Марио».
      </p>

      <div className={styles.facts}>
        <div className={styles.fact}>
          <span className={styles.factValue}>до {banquet.capacityMax}</span>
          <span className={styles.factLabel}>
            {plural(banquet.capacityMax, ['гость', 'гостя', 'гостей'])}, комфортно —{' '}
            {banquet.capacityComfort}
          </span>
        </div>
        <div className={styles.fact}>
          <span className={styles.factValue}>от {formatPrice(banquet.priceFrom)}</span>
          <span className={styles.factLabel}>с человека, меню под повод</span>
        </div>
        <div className={styles.fact}>
          <span className={styles.factValue}>за {banquet.leadTimeDays} дня</span>
          <span className={styles.factLabel}>
            бронь заранее, от {banquet.minGuests}{' '}
            {plural(banquet.minGuests, ['гостя', 'гостей', 'гостей'])}
          </span>
        </div>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Что входит в стоимость" />
        <div className={styles.list}>
          {banquetIncludes.map((item) => (
            <div className={styles.listItem} key={item.title}>
              <h3 className={styles.listTitle}>{item.title}</h3>
              <p className={styles.listText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.option}>
        <h2 className={styles.optionTitle}>{banquetCinemaOption.title}</h2>
        <p className={styles.optionText}>{banquetCinemaOption.description}</p>
      </div>

      <div className={styles.block}>
        <SectionHeading title="Поводы" />
        <div className={styles.list}>
          {banquetOccasions.map((item) => (
            <div className={styles.listItem} key={item.title}>
              <h3 className={styles.listTitle}>{item.title}</h3>
              <p className={styles.listText}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.contact}>
        <div>
          <a className={styles.contactPhone} href={banquetPhone.href}>
            {banquetPhone.number}
          </a>
          <p className={styles.contactNote}>
            Онлайн-заявку пока не принимаем: дату, меню и смету администратор считает по телефону.
          </p>
        </div>
        <div className={styles.contactActions}>
          <ButtonExternal href={banquetPhone.href} target="_self" size="l">
            Позвонить
          </ButtonExternal>
          <ButtonExternal href={VK_URL} variant="outline" size="l">
            <Icon name="vk" size={18} />
            Написать во ВКонтакте
          </ButtonExternal>
        </div>
      </div>
    </Section>
  )
}
