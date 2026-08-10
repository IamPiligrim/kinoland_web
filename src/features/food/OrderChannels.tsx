import { Icon } from '../../components/Icon/Icon.tsx'
import { orderChannels } from '../../content/contacts.ts'
import styles from './OrderChannels.module.css'

export function OrderChannels() {
  return (
    <>
      <div className={styles.grid}>
        {orderChannels.map((channel) => {
          const external = channel.kind === 'aggregator'
          return (
            <a
              key={channel.id}
              className={styles.channel}
              href={channel.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.head}>
                <Icon name={channel.icon} size={22} />
                <span className={styles.title}>{channel.title}</span>
              </span>
              <span className={styles.description}>{channel.description}</span>
            </a>
          )
        })}
      </div>
      <p className={styles.note}>Стоимость и сроки доставки назначает агрегатор.</p>
    </>
  )
}
