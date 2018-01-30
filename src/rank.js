import lookup from '../lookup.json'
import { numericalSort, convertToHex, getStraight } from './utils'

export function rankValues (values) {
  let total = 0
  const cardMatches = {}
  for (let i = 0; i !== values.length; i++) {
    cardMatches[values[i]] = 0
    for (let j = 0; j !== values.length; j++) {
      if (i === j) continue // TODO: Could this be i <= j?
      if (values[i][0] === values[j][0]) {
        cardMatches[values[i]]++
        total++
      }
    }
  }
  const matches = total / 2
  const max = Math.max(...Object.values(cardMatches))
  const straight = getStraight(dedupe(values)) // Dedupe to match straights like AKKKQJT
  const kickers = convertToHex(values.sort((a, b) => cardMatches[b] - cardMatches[a]))

  if (max > 3) {
    return undefined
  }
  if (max === 3) {
    return '7' + kickers.slice(0, 4) + getHighestKicker(kickers.slice(4)) // four of a kind
  }
  if (max === 2 && matches > 3) {
    return '6' + kickers.slice(0, 5) // full house
  }
  if (straight) {
    return '4' + straight // straight
  }
  if (max === 2) {
    return '3' + kickers.slice(0, 5) // three of a kind
  }
  if (max === 1 && matches > 1) {
    return '2' + kickers.slice(0, 4) + getHighestKicker(kickers.slice(4)) // two pair
  }
  if (max === 1) {
    return '1' + kickers.slice(0, 5) // one pair
  }
  return '0' + kickers.slice(0, 5) // high card
}

export function rankHand (input) {
  const hand = input.slice(0).sort(numericalSort)
  const values = hand.map(c => c[0]).join('')
  const suits = hand.map(c => c[1]).sort().join('')

  const rank = lookup.rank[values]
  const flush = lookup.flush[suits]

  if (!rank) {
    throw Error(`Invalid hand: ${hand.join(' ')}`)
  }

  const straight = rank[0] === '4'

  if (straight && flush) {
    const flushed = hand.filter(c => c[1] === flush).map(c => c[0])
    const kickers = getStraight(flushed)
    if (kickers) {
      // royal or straight flush
      return (kickers[0] === 'e' ? '9' : '8') + kickers
    }
  }
  if (flush) {
    // Fix kickers for flush
    // ie the highest cards of the flush suit
    const kickers = convertToHex(hand.filter(c => c[1] === flush).slice(0, 5))
    return '5' + kickers // flush
  }
  return rank
}

export function getFlush (string) {
  const match = string.match(/(s{5}|c{5}|d{5}|h{5})/)
  return match ? match[0][0] : undefined
}

function getHighestKicker (string) {
  return string.split('').sort().reverse()[0]
}

function dedupe (array) {
  return array.filter(function (item, index, array) {
    return array.indexOf(item) === index
  })
}
