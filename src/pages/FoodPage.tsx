import { Link } from 'react-router'
import { getFoodPromo, getMenu } from '../api/index.ts'
import { Badge } from '../components/Badge/Badge.tsx'
import { Section } from '../components/Layout/Container.tsx'
import { PageMeta } from '../components/PageMeta/PageMeta.tsx'
import { OrderChannels } from '../features/food/OrderChannels.tsx'
import { formatFullDate, formatPrice, formatWeight } from '../lib/format.ts'
import styles from './FoodPage.module.css'

export function FoodPage() {
  const menu = getMenu()
  const promo = getFoodPromo()

  return (
    <Section tight>
      <PageMeta
        title="Кафе «Марио» и доставка"
        description="Меню кафе «Марио» в «Киноленде»: пицца, паста, супы и попкорн. Доставка через Яндекс Еду и Купер, самовывоз по телефону."
      />

      <h1 className={styles.title}>Кафе «Марио»</h1>
      <p className={styles.lead}>
        Пицца, паста и горячее — в зале до сеанса, на вынос или домой.
      </p>

      <div className={styles.channels}>
        <OrderChannels />
      </div>

      {promo ? (
        <aside className={styles.promo}>
          <span className={styles.promoTitle}>{promo.title}</span>
          {promo.validUntil ? (
            <span className={styles.promoValid}>до {formatFullDate(promo.validUntil)}</span>
          ) : null}
          <Link to={`/news/${promo.slug}`} className={styles.promoLink}>
            Подробнее
          </Link>
        </aside>
      ) : null}

      <nav className={styles.categories} aria-label="Категории меню">
        <ul className={styles.categoryList}>
          {menu.map(({ category }) => (
            <li key={category.slug}>
              <a className={styles.categoryLink} href={`#${category.slug}`}>
                {category.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {menu.map(({ category, items }) => (
        <section className={styles.section} id={category.slug} key={category.slug}>
          <h2 className={styles.sectionTitle}>{category.title}</h2>
          <div className={styles.items}>
            {items.map((item) => (
              <article className={styles.item} key={`${category.slug}-${item.title}`}>
                <div className={styles.itemBody}>
                  <h3 className={styles.itemTitle}>
                    {item.title}
                    {item.tags && item.tags.length > 0 ? (
                      <span className={styles.itemTags}>
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant={tag === 'новинка' ? 'beam' : 'age'}>
                            {tag}
                          </Badge>
                        ))}
                      </span>
                    ) : null}
                  </h3>
                  {item.description ? (
                    <p className={styles.itemDescription}>{item.description}</p>
                  ) : null}
                </div>
                {item.weightG ? (
                  <span className={styles.itemWeight}>{formatWeight(item.weightG)}</span>
                ) : null}
                <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className={styles.disclaimer}>
        Цены и состав уточняйте на кассе: у агрегаторов доставки бывает своя наценка.
      </p>
    </Section>
  )
}
