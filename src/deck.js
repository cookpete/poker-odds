import { CARD_VALUES, CARD_SUITS } from './utils'

const FULL_DECK = createDeck()

export function createDeck (withoutCards = []) {
  const deck = []
  for (let i = 0; i !== CARD_VALUES.length; i++) {
    for (let j = 0; j !== CARD_SUITS.length; j++) {
      const card = CARD_VALUES[i] + CARD_SUITS[j]
      if (!withoutCards.includes(card)) {
        deck.push(card)
      }
    }
  }
  return deck
}

export function deal (withoutCards, count) {
  const cards = []
  while (cards.length !== count) {
    const index = Math.floor(Math.random() * FULL_DECK.length)
    const card = FULL_DECK[index]
    if (!cards.includes(card) && !withoutCards.includes(card)) {
      cards.push(card)
    }
  }
  return cards
}
