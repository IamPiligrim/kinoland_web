/* Внешние точки выхода. Сайт не продаёт билеты и не принимает заказы —
   он доводит до Афиши, агрегатора доставки или телефона.

   TODO перед продакшеном: сверить с заказчиком реальные адреса — страницу
   «Киноленда» на Афише, точки кафе «Марио» в Яндекс Еде и Купере, адрес
   сообщества VK. Ниже — рабочие заглушки на разделы сервисов. */

export const AFISHA_CINEMA_URL = 'https://www.afisha.ru/kaliningrad/cinema/'
export const YANDEX_EDA_URL = 'https://eda.yandex.ru/'
export const KUPER_URL = 'https://kuper.ru/'
export const VK_URL = 'https://vk.com/kinoland39'
export const PUSHKIN_CARD_URL = 'https://www.culture.ru/pushkinskaya-karta'
export const RULES_PDF_URL = '/data/uploads/rules.pdf'

export const YANDEX_MAPS_URL =
  'https://yandex.ru/maps/?text=' + encodeURIComponent('Калининград, Киевская улица, 71')

/** Ссылка на конкретный сеанс в Афише. Пока — переход на страницу кинотеатра
    с пометкой сеанса; заменяется на прямой deeplink вместе с выгрузкой. */
export function ticketUrl(movieSlug: string, startsAt: string): string {
  const params = new URLSearchParams({ movie: movieSlug, session: startsAt })
  return `${AFISHA_CINEMA_URL}?${params.toString()}`
}
