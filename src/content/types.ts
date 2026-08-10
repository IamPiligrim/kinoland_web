/* Контент-модель «Киноленда». Компоненты не импортируют модули content/
   напрямую — только через слой src/api/. */

export type AgeRating = '0+' | '6+' | '12+' | '16+' | '18+'

export type Movie = {
  slug: string
  title: string
  originalTitle?: string
  ageRating: AgeRating
  genres: string[]
  country: string
  year: number
  durationMin: number
  director: string
  cast: string[]
  synopsis: string
  /* Постеров от заказчика пока нет (открытый вопрос 7): при отсутствии
     ссылки компонент Poster рисует типографический вариант. */
  posterUrl?: string
  backdropUrl?: string
  trailerUrl?: string
  releaseDate: string
}

export type Showtime = {
  movieSlug: string
  startsAt: string
  hall: string
  format: '2D' | '3D'
  priceFrom: number
  pushkinCard: boolean
  ticketUrl: string
}

export type MenuCategory = {
  slug: string
  title: string
  order: number
}

export type MenuItemTag = 'новинка' | 'детское' | 'острое' | 'вегетарианское'

export type MenuItem = {
  categorySlug: string
  title: string
  description?: string
  weightG?: number
  price: number
  imageUrl?: string
  tags?: MenuItemTag[]
}

export type NewsPost = {
  slug: string
  type: 'news' | 'promo'
  publishedAt: string
  validUntil?: string
  title: string
  excerpt: string
  body: string
  imageUrl?: string
}

export type Phone = {
  label: string
  number: string
  href: string
  note?: string
}

export type OrderChannel = {
  id: string
  title: string
  description: string
  href: string
  kind: 'aggregator' | 'phone'
  icon: string
}
