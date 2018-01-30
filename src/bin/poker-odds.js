#!/usr/bin/env node

import { version } from '../../package.json'
import { calculateEquity } from '../calculate'
import { RANK_NAMES, parseCards, percent, seconds, padStart, padEnd } from '../utils'
import { getHands, hasOption, getOption, color, colorCards } from '../console'

if (hasOption('--version')) {
  log()
  log('version', 'grey')
  log(version)
  log()
  process.exit()
}

if (hasOption('--help')) {
  log()
  log('usage', 'grey')
  log(`poker-odds ${color('AsTd Qh8c', 'yellow')}`)
  log()
  log('options', 'grey')
  log(`-b, --board ${color('Ts3s6d', 'yellow')}     ${color('community cards', 'grey')}`)
  log(`-i, --iterations ${color('1000', 'yellow')}  ${color('number of preflop simulations to run, default: 100000', 'grey')}`)
  log(`-e, --exhaustive       ${color('run all preflop simulations', 'grey')}`)
  log(`-p, --possibilities    ${color('show individual hand possibilities', 'grey')}`)
  log(`-n, --no-color         ${color('disable color output', 'grey')}`)
  log(`-v, --version          ${color('show version', 'grey')}`)
  log(`-h, --help             ${color('show help', 'grey')}`)
  log()
  process.exit()
}

const hands = getHands()

if (hands.length === 0) {
  console.error('You must pass in at least one valid hand eg AsAc')
  process.exit(1)
}

const board = getOption('--board')
const iterations = getOption('--iterations')
const exhaustive = hasOption('--exhaustive')
const start = +new Date()
const equity = calculateEquity(hands.map(parseCards), parseCards(board), iterations, exhaustive)
const end = +new Date()

console.log(JSON.stringify(equity, null, 2))

log()

if (board) {
  log('board', 'grey')
  log(colorCards(parseCards(board)))
  log()
}
const hasTie = equity.filter(hand => hand.ties).length !== 0

log(`hand      ${hands.length > 1 ? 'win' : ''}     ${hasTie ? 'tie' : ''}`, 'grey')

equity.forEach((hand, index) => {
  let string = colorCards(hand.hand)
  if (hands.length > 1) {
    const winColor = hand.favourite ? 'green' : (hand.wins === 0 ? 'grey' : null)
    string += color(padStart(percent(hand.wins / hand.count), 8), winColor)
  }
  if (hand.ties) {
    string += color(padStart(percent(hand.ties / hand.count), 8), 'yellow')
  }
  log(string)
})

if (hands.length === 1 || hasOption('--possibilities')) {
  const maxes = equity.map(hand => {
    return Math.max(...hand.handChances.map(rank => rank.count))
  })
  log()
  if (hands.length > 1) {
    let header = ' '.repeat(15)
    equity.forEach(hand => {
      header += '   ' + colorCards(hand.hand)
    })
    log(header)
  }
  for (let i = 0; i !== RANK_NAMES.length; i++) {
    let string = color(padEnd(RANK_NAMES[i], 15), null)
    equity.forEach((hand, index) => {
      const { count } = hand.handChances[i]
      const countColor = count === 0 ? 'grey' : (count === maxes[index] ? 'green' : null)
      string += color(padStart(percent(count / hand.count), 8), countColor)
    })
    log(string)
  }
}

log()
log(`${equity[0].count} iterations in ${seconds(end - start)}`, 'grey')
log()

function log (string, colorName) {
  if (!string) {
    return console.log('')
  }
  if (colorName) {
    return console.log(`  ${color(string, colorName)}`)
  }
  console.log(`  ${string}`)
}
