import * as dateFns from 'date-fns'


export function debounce(callback, duration=500) {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, duration)
  }
}

export function localeDate(date, options) {
  if (!date) return date
  return dateFns.parse(date).toLocaleDateString(navigator.language, options)
}

export function localeDatetime(date, options) {
  if (!date) return date
  return dateFns.parse(date).toLocaleString(navigator.language, options)
}

export function localeNumber(number, decimals = 0) {
  if (!isFinite(number)) return number
  return (+number).toLocaleString(navigator.language, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function relativeTime(date, compareTo = new Date) {
  if (!date) return date
  return dateFns.distanceInWordsStrict(date, compareTo)
}

export function capitalize(str) {
  if (typeof str != 'string') return str
  str = str.trim()
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function truncate(str, length = 15, ellipsis = '…') {
  if (typeof str != 'string') return str
  if (str.length <= length) return str
  const words = str.trim().split(' ')
  let result = words.shift()
  while (words[0] && result.length + 1 + words[0].length < length) {
    result += ' ' + words.shift()
  }
  return result.slice(0, length - 1) + ellipsis
}
