/* Время сеансов считаем в Europe/Kaliningrad, а не в локали браузера:
   иначе гость из другого часового пояса увидит сдвинутое расписание.
   Ключ дня — строка 'YYYY-MM-DD' в этой зоне. */

export const TIMEZONE = 'Europe/Kaliningrad'

/** Сколько дней вперёд показывает расписание. */
export const SCHEDULE_DAYS = 7

const dayKeyFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Календарный день события в Калининграде: '2026-08-10'. */
export function toDayKey(instant: Date | string): string {
  const date = typeof instant === 'string' ? new Date(instant) : instant
  return dayKeyFormat.format(date)
}

/** Сегодняшний день в Калининграде, а не в зоне посетителя. */
export function todayKey(): string {
  return toDayKey(new Date())
}

export function addDays(key: string, days: number): string {
  const noon = keyToNoon(key)
  noon.setUTCDate(noon.getUTCDate() + days)
  return noon.toISOString().slice(0, 10)
}

/** Разница в днях: addDays(a, diffInDays(a, b)) === b. */
export function diffInDays(from: string, to: string): number {
  const ms = keyToNoon(to).getTime() - keyToNoon(from).getTime()
  return Math.round(ms / 86_400_000)
}

export function isValidDayKey(value: string | null | undefined): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(keyToNoon(value).getTime())
}

export function isPast(startsAt: string): boolean {
  return new Date(startsAt).getTime() < Date.now()
}

/** Список дней расписания, начиная с сегодняшнего. */
export function scheduleDayKeys(days: number = SCHEDULE_DAYS): string[] {
  const start = todayKey()
  return Array.from({ length: days }, (_, index) => addDays(start, index))
}

/** Полдень UTC выбранной даты: безопасная точка для форматирования дня. */
export function keyToNoon(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1, 12))
}
