import { menuCategories, menuItems } from '../content/menu.ts'
import { movies } from '../content/movies.ts'
import { newsPosts } from '../content/news.ts'
import { showtimes } from '../content/showtimes.ts'
import type { MenuCategory, MenuItem, Movie, NewsPost, Showtime } from '../content/types.ts'
import { scheduleDayKeys, toDayKey } from '../lib/time.ts'

/* Единственный слой доступа к контенту. Сейчас за ним статика; когда появится
   CMS или выгрузка из Афиши, меняется только этот файл. Все функции
   синхронные — компоненты не знают, откуда приходят данные. */

export type MovieWithShowtimes = {
  movie: Movie
  showtimes: Showtime[]
}

export type DaySchedule = {
  dayKey: string
  items: MovieWithShowtimes[]
}

export type MenuSection = {
  category: MenuCategory
  items: MenuItem[]
}

const bySlug = new Map(movies.map((movie) => [movie.slug, movie]))

const byStartTime = (a: Showtime, b: Showtime): number => a.startsAt.localeCompare(b.startsAt)

/** Дни, на которые есть расписание: сегодня и ближайшая неделя. */
export function getScheduleDays(): string[] {
  return scheduleDayKeys()
}

/** Расписание одного дня: фильмы в порядке первого сеанса. */
export function getDaySchedule(dayKey: string): DaySchedule {
  const grouped = new Map<string, Showtime[]>()

  for (const showtime of showtimes) {
    if (toDayKey(showtime.startsAt) !== dayKey) continue
    const list = grouped.get(showtime.movieSlug)
    if (list) list.push(showtime)
    else grouped.set(showtime.movieSlug, [showtime])
  }

  const items: MovieWithShowtimes[] = []
  for (const [slug, list] of grouped) {
    const movie = bySlug.get(slug)
    if (!movie) continue
    items.push({ movie, showtimes: [...list].sort(byStartTime) })
  }

  items.sort((a, b) => byStartTime(a.showtimes[0], b.showtimes[0]))

  return { dayKey, items }
}

/** Ближайший день, в котором есть сеансы, начиная с заданного. */
export function getNextDayWithShowtimes(fromDayKey: string): string | undefined {
  return getScheduleDays().find(
    (dayKey) => dayKey > fromDayKey && getDaySchedule(dayKey).items.length > 0,
  )
}

export function getMovie(slug: string): Movie | undefined {
  return bySlug.get(slug)
}

export function getMovies(): Movie[] {
  return movies
}

/** Все сеансы фильма, сгруппированные по дням. */
export function getMovieSchedule(slug: string): DaySchedule[] {
  return getScheduleDays()
    .map((dayKey) => ({
      dayKey,
      items: getDaySchedule(dayKey).items.filter((item) => item.movie.slug === slug),
    }))
    .filter((day) => day.items.length > 0)
}

export function getMenu(): MenuSection[] {
  return [...menuCategories]
    .sort((a, b) => a.order - b.order)
    .map((category) => ({
      category,
      items: menuItems.filter((item) => item.categorySlug === category.slug),
    }))
    .filter((section) => section.items.length > 0)
}

/** Лента новостей и акций: свежие сверху, просроченные акции скрыты. */
export function getNewsFeed(): NewsPost[] {
  const now = Date.now()
  return [...newsPosts]
    .filter((post) => !isExpired(post, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getLatestNews(limit: number): NewsPost[] {
  return getNewsFeed().slice(0, limit)
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug)
}

/** Действующая акция для плашки над меню кафе. */
export function getFoodPromo(): NewsPost | undefined {
  return getNewsFeed().find((post) => post.type === 'promo')
}

export function isExpired(post: NewsPost, now: number = Date.now()): boolean {
  return post.validUntil !== undefined && new Date(post.validUntil).getTime() < now
}
