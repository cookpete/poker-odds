#!/usr/bin/env node

import { writeFile } from 'fs'
import { CARD_VALUES, CARD_SUITS } from '../utils'
import { rankValues, getFlush } from '../rank'

const output = process.argv[2]
const data = JSON.stringify({
  rank: generateRankData(),
  flush: generateFlushData()
})

writeFile(output, data, 'utf8', err => {
  if (err) throw err
  console.log(`${(data.length / 1024 / 1024).toFixed(2)}mb written to ${output}`)
})

export function generateRankData () {
  const data = {}
  for (let a = 0; a !== CARD_VALUES.length; a++) {
    for (let b = 0; b !== CARD_VALUES.length; b++) {
      for (let c = 0; c !== CARD_VALUES.length; c++) {
        for (let d = 0; d !== CARD_VALUES.length; d++) {
          for (let e = 0; e !== CARD_VALUES.length; e++) {
            for (let f = 0; f !== CARD_VALUES.length; f++) {
              for (let g = 0; g !== CARD_VALUES.length; g++) {
                if (a < b || b < c || c < d || d < e || e < f || f < g) {
                  continue
                }
                const values = [
                  CARD_VALUES[a],
                  CARD_VALUES[b],
                  CARD_VALUES[c],
                  CARD_VALUES[d],
                  CARD_VALUES[e],
                  CARD_VALUES[f],
                  CARD_VALUES[g]
                ]
                data[values.join('')] = rankValues(values)
              }
            }
          }
        }
      }
    }
  }
  return data
}

export function generateFlushData () {
  const data = {}
  for (let a = 0; a !== CARD_SUITS.length; a++) {
    for (let b = 0; b !== CARD_SUITS.length; b++) {
      for (let c = 0; c !== CARD_SUITS.length; c++) {
        for (let d = 0; d !== CARD_SUITS.length; d++) {
          for (let e = 0; e !== CARD_SUITS.length; e++) {
            for (let f = 0; f !== CARD_SUITS.length; f++) {
              for (let g = 0; g !== CARD_SUITS.length; g++) {
                const key = [
                  CARD_SUITS[a],
                  CARD_SUITS[b],
                  CARD_SUITS[c],
                  CARD_SUITS[d],
                  CARD_SUITS[e],
                  CARD_SUITS[f],
                  CARD_SUITS[g]
                ].sort().join('')
                data[key] = getFlush(key)
              }
            }
          }
        }
      }
    }
  }
  return data
}
