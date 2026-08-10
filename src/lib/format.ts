import { TIMEZONE, diffInDays, keyToNoon, todayKey } from './time.ts'

/* Форматирование под ru-RU. Время сеансов — 24-часовое и всегда
   в Europe/Kaliningrad; цены — рубли без копеек. */

const timeFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

const dayMonthFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  day: 'numeric',
  month: 'long',
})

const fullDateFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const weekdayShortFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'short',
})

const weekdayLongFormat = new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'UTC',
  weekday: 'long',
})

const priceFormat = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
})

/** '18:40' */
export function formatTime(startsAt: string): string {
  return timeFormat.format(new Date(startsAt))
}

/** '10 августа' */
export function formatDayMonth(dayKey: string): string {
  return dayMonthFormat.format(keyToNoon(dayKey))
}

/** '10 августа 2026' */
export function formatFullDate(isoOrKey: string): string {
  const date = isoOrKey.length > 10 ? new Date(isoOrKey) : keyToNoon(isoOrKey)
  return fullDateFormat.format(shiftToUtcNoon(date))
}

/** 'пт' */
export function formatWeekdayShort(dayKey: string): string {
  return weekdayShortFormat.format(keyToNoon(dayKey))
}

/** 'пятница' */
export function formatWeekdayLong(dayKey: string): string {
  return weekdayLongFormat.format(keyToNoon(dayKey))
}

/** 'Сегодня' · 'Завтра' · 'пт 14' — подпись дня в ленте расписания. */
export function formatDayTab(dayKey: string): string {
  const distance = diffInDays(todayKey(), dayKey)
  if (distance === 0) return 'Сегодня'
  if (distance === 1) return 'Завтра'
  return `${formatWeekdayShort(dayKey)} ${keyToNoon(dayKey).getUTCDate()}`
}

/** 'Сегодня, 10 августа' — заголовок дня. */
export function formatDayHeading(dayKey: string): string {
  const distance = diffInDays(todayKey(), dayKey)
  const dayMonth = formatDayMonth(dayKey)
  if (distance === 0) return `Сегодня, ${dayMonth}`
  if (distance === 1) return `Завтра, ${dayMonth}`
  return `${capitalize(formatWeekdayLong(dayKey))}, ${dayMonth}`
}

/** '350 ₽' */
export function formatPrice(rubles: number): string {
  return priceFormat.format(rubles)
}

/** '1 ч 48 мин' */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (hours === 0) return `${rest} мин`
  if (rest === 0) return `${hours} ч`
  return `${hours} ч ${rest} мин`
}

/** '260 г' */
export function formatWeight(grams: number): string {
  return `${grams} г`
}

/** Склонение по числу: 3 гостя, 5 гостей. */
export function plural(count: number, forms: [string, string, string]): string {
  const abs = Math.abs(count) % 100
  const tail = abs % 10
  if (abs > 10 && abs < 20) return forms[2]
  if (tail > 1 && tail < 5) return forms[1]
  if (tail === 1) return forms[0]
  return forms[2]
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** Даты-строки форматируем в UTC, поэтому момент приводим к полудню того же дня в Калининграде. */
function shiftToUtcNoon(date: Date): Date {
  const key = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
  return keyToNoon(key)
}
