const HAND_PATTERN = /^([AKQJT2-9.]|10)[schd.]([AKQJT2-9.]|10)[schd.]$/
const CONSOLE_COLORS = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  grey: '90'
}

export function color (string, color) {
  if (!color || !CONSOLE_COLORS[color] || hasOption('--no-color')) {
    return string
  }
  return `\x1b[${CONSOLE_COLORS[color]}m${string}\x1b[0m`
}

export function colorCards (cards) {
  return cards.map(colorCard).join(' ')
}

function colorCard (card) {
  if (/^.[sc]$/.test(card)) {
    return color(card, 'blue')
  }
  if (/^.[dh]$/.test(card)) {
    return color(card, 'red')
  }
  if (card === '..') {
    return color(card, 'yellow')
  }
  return card
}

export function getHands (argv = process.argv) {
  return argv.filter(string => HAND_PATTERN.test(string))
}

export function hasOption (option, argv = process.argv) {
  return argv.includes(option) || argv.includes('-' + option[2])
}

export function getOption (option, argv = process.argv) {
  const index = argv.indexOf(option)
  if (index === -1) {
    if (option.length !== 2) {
      return getOption('-' + option[2], argv)
    }
    return undefined
  }
  const value = argv[index + 1]
  if (/^\d+$/.test(value)) {
    return parseInt(value)
  }
  return value
}
