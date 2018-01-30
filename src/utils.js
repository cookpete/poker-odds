export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
export const CARD_SUITS = ['s', 'c', 'h', 'd']
export const RANK_NAMES = [
  'high card',
  'one pair',
  'two pair',
  'three of a kind',
  'straight',
  'flush',
  'full house',
  'four of a kind',
  'straight flush',
  'royal flush'
]
const NUMERICAL_VALUES = {
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}
const STRAIGHTS = [
  'AKQJT',
  'KQJT9',
  'QJT98',
  'JT987',
  'T9876',
  '98765',
  '87654',
  '76543',
  '65432',
  '5432A'
]

export function numericalValue (card) {
  return NUMERICAL_VALUES[card[0]] || parseInt(card[0])
}

export function numericalSort (a, b) {
  return numericalValue(b) - numericalValue(a)
}

export function convertToHex (input) {
  input = typeof input === 'string' ? input.split('') : input
  return input
    .map(c => numericalValue(c).toString(16))
    .join('')
}

export function parseCards (string) {
  if (!string) {
    return undefined
  }
  return string.match(/[AKQJT2-9.][schd.]/g) || undefined
}

export function percent (number) {
  if (number === 0) {
    return '·'
  }
  if (number > 0 && number < 0.001) {
    return '0.1%'
  }
  return `${round(number * 100)}%`
}

export function seconds (ms) {
  if (ms >= 1000) {
    return `${round(ms / 1000)}s`
  }
  return `${ms}ms`
}

export function getStraight (hand) {
  const values = hand.join('')
  const suffix = values[0] === 'A' ? 'A' : '' // Append A to capture 5432A
  for (let i = 0; i !== STRAIGHTS.length; i++) {
    if (`${values}${suffix}`.includes(STRAIGHTS[i])) {
      return convertToHex(STRAIGHTS[i])
    }
  }
  return null
}

export function padStart (string, length, padString = ' ') {
  if (string.length >= length) {
    return string
  }
  return padString.repeat(length - string.length) + string
}

export function padEnd (string, length, padString = ' ') {
  if (string.length >= length) {
    return string
  }
  return string + padString.repeat(length - string.length)
}

function round (number, dp = 1) {
  const multiplier = dp * 10
  return (Math.round(number * multiplier) / multiplier).toFixed(dp)
}
