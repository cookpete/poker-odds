import { RANK_NAMES } from './utils'
import { rankHand } from './rank'
import { createDeck, deal } from './deck'

export function calculateEquity (hands, board = [], iterations = 100000, exhaustive = false) {
  let results = hands.map(hand => ({
    hand,
    count: 0,
    wins: 0,
    ties: 0,
    handChances: RANK_NAMES.map(name => ({ name, count: 0 }))
  }))
  if (board.length === 5) {
    results = analyse(results, board)
  } else if (board.length >= 3) {
    const deck = createDeck(board.concat(...hands))
    for (let i = 0; i !== deck.length; i++) {
      if (board.length === 4) {
        results = analyse(results, board.concat(deck[i]))
        continue
      }
      for (let j = 0; j !== deck.length; j++) {
        if (i >= j) continue
        results = analyse(results, board.concat([ deck[i], deck[j] ]))
      }
    }
  } else if (exhaustive) {
    const deck = createDeck(board.concat(...hands))
    for (let a = 0; a !== deck.length; a++) {
      for (let b = 0; b !== deck.length; b++) {
        if (a <= b) continue
        for (let c = 0; c !== deck.length; c++) {
          if (b <= c) continue
          for (let d = 0; d !== deck.length; d++) {
            if (c <= d) continue
            for (let e = 0; e !== deck.length; e++) {
              if (d <= e) continue
              results = analyse(results, [deck[a], deck[b], deck[c], deck[d], deck[e]])
            }
          }
        }
      }
    }
  } else {
    for (let i = 0; i !== iterations; i++) {
      const randomCards = deal([].concat(...hands), 5 - board.length)
      results = analyse(results, board.concat(randomCards))
    }
  }
  const maxWins = Math.max(...results.map(hand => hand.wins))
  return results.map(hand => ({
    ...hand,
    favourite: hand.wins === maxWins
  }))
}

function analyse (results, board) {
  const ranks = results.map(result => {
    if (result.hand.includes('..')) {
      const randomCards = deal(board.concat(...results.map(r => r.hand)), 4)
      const hand = result.hand.map((card, index) => {
        if (card === '..') {
          return randomCards[index]
        }
        return card
      })
      return rankHand(hand.concat(board))
    }
    return rankHand(result.hand.concat(board))
  })
  const bestRank = ranks.slice(0).sort().reverse()[0]
  const tie = ranks.filter(rank => rank === bestRank).length > 1
  for (let i = 0; i !== results.length; i++) {
    if (ranks[i] === bestRank) {
      if (tie) {
        results[i].ties++
      } else {
        results[i].wins++
      }
    }
    results[i].count++
    results[i].handChances[parseInt(ranks[i][0])].count++
  }
  return results
}
