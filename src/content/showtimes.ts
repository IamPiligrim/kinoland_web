import { SCHEDULE_DAYS, addDays, keyToNoon, todayKey } from '../lib/time.ts'
import { ticketUrl } from './links.ts'
import type { Showtime } from './types.ts'

/* Демо-сеансы. Сетка задана относительно сегодняшнего дня, чтобы расписание
   не протухало: реальный источник (касса или выгрузка Афиши) подставляется
   вместо buildShowtimes() без правок в компонентах.

   Калининград — UTC+2 круглый год, поэтому смещение в ISO пишем литералом. */

const OFFSET = '+02:00'

type Slot = {
  movieSlug: string
  hall: string
  format: '2D' | '3D'
  /** 'HH:MM' по калининградскому времени */
  time: string
  basePrice: number
  pushkinCard: boolean
  /** Только пятница—воскресенье */
  weekendOnly?: boolean
}

const grid: Slot[] = [
  { movieSlug: 'hvostatyy-ekspress', hall: 'Зал 2', format: '2D', time: '10:00', basePrice: 280, pushkinCard: true },
  { movieSlug: 'lunnyy-smotritel', hall: 'Зал 3', format: '3D', time: '11:20', basePrice: 340, pushkinCard: true },
  { movieSlug: 'hvostatyy-ekspress', hall: 'Зал 2', format: '2D', time: '12:10', basePrice: 280, pushkinCard: true },
  { movieSlug: 'veter-s-baltiki', hall: 'Зал 1', format: '2D', time: '12:30', basePrice: 320, pushkinCard: true },
  { movieSlug: 'dom-na-dyunah', hall: 'Зал 3', format: '2D', time: '13:50', basePrice: 320, pushkinCard: true, weekendOnly: true },
  { movieSlug: 'hvostatyy-ekspress', hall: 'Зал 2', format: '2D', time: '14:20', basePrice: 300, pushkinCard: true },
  { movieSlug: 'yantarnaya-koroleva', hall: 'Зал 1', format: '2D', time: '14:50', basePrice: 350, pushkinCard: true },
  { movieSlug: 'lunnyy-smotritel', hall: 'Зал 3', format: '3D', time: '16:10', basePrice: 380, pushkinCard: true },
  { movieSlug: 'snezhnyy-desant', hall: 'Зал 2', format: '2D', time: '16:40', basePrice: 320, pushkinCard: false },
  { movieSlug: 'veter-s-baltiki', hall: 'Зал 1', format: '2D', time: '17:30', basePrice: 380, pushkinCard: true },
  { movieSlug: 'snezhnyy-desant', hall: 'Зал 2', format: '2D', time: '18:50', basePrice: 340, pushkinCard: false },
  { movieSlug: 'yantarnaya-koroleva', hall: 'Зал 1', format: '2D', time: '19:20', basePrice: 420, pushkinCard: true },
  { movieSlug: 'lunnyy-smotritel', hall: 'Зал 3', format: '3D', time: '19:40', basePrice: 440, pushkinCard: true },
  { movieSlug: 'dom-na-dyunah', hall: 'Зал 2', format: '2D', time: '21:10', basePrice: 380, pushkinCard: true },
  { movieSlug: 'veter-s-baltiki', hall: 'Зал 1', format: '2D', time: '21:50', basePrice: 400, pushkinCard: true },
  { movieSlug: 'polnoch-v-tanzhere', hall: 'Зал 3', format: '2D', time: '22:10', basePrice: 400, pushkinCard: false },
]

function isWeekend(dayKey: string): boolean {
  const weekday = keyToNoon(dayKey).getUTCDay()
  return weekday === 0 || weekday === 5 || weekday === 6
}

function priceFor(slot: Slot, dayKey: string): number {
  const hour = Number(slot.time.slice(0, 2))
  const evening = hour >= 17 ? 60 : 0
  const weekend = isWeekend(dayKey) ? 60 : 0
  return slot.basePrice + evening + weekend
}

function buildShowtimes(): Showtime[] {
  const start = todayKey()
  const result: Showtime[] = []

  for (let offset = 0; offset < SCHEDULE_DAYS; offset += 1) {
    const dayKey = addDays(start, offset)

    for (const slot of grid) {
      if (slot.weekendOnly && !isWeekend(dayKey)) continue

      const startsAt = `${dayKey}T${slot.time}:00${OFFSET}`
      result.push({
        movieSlug: slot.movieSlug,
        startsAt,
        hall: slot.hall,
        format: slot.format,
        priceFrom: priceFor(slot, dayKey),
        pushkinCard: slot.pushkinCard,
        ticketUrl: ticketUrl(slot.movieSlug, startsAt),
      })
    }
  }

  return result
}

export const showtimes: Showtime[] = buildShowtimes()
