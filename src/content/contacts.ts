import { KUPER_URL, YANDEX_EDA_URL } from './links.ts'
import type { OrderChannel, Phone } from './types.ts'

/* Контакты центра. Телефоны взяты с оригинального сайта.

   TODO: на оригинале «Информация» указана дважды по-разному — 61-15-69
   в тексте и 97-50-60 в tel:-ссылке (открытый вопрос 6). Здесь оставлен
   номер из текста; верный уточняет заказчик. Номер закрытой чебуречной
   97-52-53 не публикуем. */

export const ADDRESS = {
  city: 'Калининград',
  street: 'ул. Киевская, 71',
  full: 'Калининград, ул. Киевская, 71',
  postalCode: '236006',
}

export const ORG = {
  legalName: 'ООО «Марио»',
  inn: '3906293961',
}

export const phones: Phone[] = [
  {
    label: 'Касса кинотеатра',
    number: '+7 (4012) 97-50-20',
    href: 'tel:+74012975020',
    note: 'билеты, брони, вопросы по сеансам',
  },
  {
    label: 'Кафе «Марио»',
    number: '+7 (4012) 97-52-51',
    href: 'tel:+74012975251',
    note: 'заказ на самовывоз и столик в зале',
  },
  {
    label: 'Банкеты и информация',
    number: '+7 (4012) 61-15-69',
    href: 'tel:+74012611569',
    note: 'бронь зала, праздники, аренда кинозала',
  },
]

export const boxOfficePhone = phones[0]
export const cafePhone = phones[1]
export const banquetPhone = phones[2]

/* Часы работы на оригинальном сайте не указаны (открытый вопрос 5).
   Значения ниже — рабочая гипотеза для вёрстки, подтверждает заказчик. */
export const openingHours = [
  { label: 'Кинотеатр', value: 'ежедневно, с 09:30 до последнего сеанса' },
  { label: 'Кафе «Марио»', value: 'ежедневно, 11:00 — 23:00' },
  { label: 'Касса', value: 'ежедневно, 09:30 — 22:30' },
]

export const orderChannels: OrderChannel[] = [
  {
    id: 'yandex-eda',
    title: 'Яндекс Еда',
    description: 'Доставка по городу',
    href: YANDEX_EDA_URL,
    kind: 'aggregator',
    icon: 'delivery',
  },
  {
    id: 'kuper',
    title: 'Купер',
    description: 'То же меню и те же цены на блюда',
    href: KUPER_URL,
    kind: 'aggregator',
    icon: 'delivery',
  },
  {
    id: 'pickup',
    title: 'Самовывоз',
    description: 'Заказ соберут к вашему приходу',
    href: 'tel:+74012975251',
    kind: 'phone',
    icon: 'phone',
  },
]
