# poker-odds

[![Latest npm version](https://img.shields.io/npm/v/poker-odds.svg)](https://www.npmjs.com/package/poker-odds)
[![Node version required](https://img.shields.io/node/v/poker-odds.svg)](https://www.npmjs.com/package/poker-odds)
[![Build Status](https://img.shields.io/travis/CookPete/poker-odds/master.svg)](https://travis-ci.org/CookPete/poker-odds)
[![Test Coverage](https://img.shields.io/codecov/c/github/cookpete/poker-odds.svg)](https://codecov.io/gh/CookPete/poker-odds)
[![Donate](https://img.shields.io/badge/donate-PayPal-blue.svg)](https://paypal.me/ckpt)

A lightweight command line tool for calculating poker hand probabilities. No dependencies. No huge data files.

### Installation

```bash
# yarn
yarn global add poker-odds

# npm
npm install -g poker-odds
```

### Usage

```bash
poker-odds AcKh KdQs   # any number of hands supported
                       # use .. for random cards, .... for a random hand

# options
-b, --board Td7s8d     # community cards
-i, --iterations 1000  # number of preflop simulations to run, default: 100000
-e, --exhaustive       # run all preflop simulations
-p, --possibilities    # show individual hand possibilities
-n, --no-color         # disable color output
-v, --version          # show version
-h, --help             # show help
```

Use `--board` or `-b` to define community cards.

![--board example](https://user-images.githubusercontent.com/1926029/35532782-5de9aaa0-0533-11e8-8bf0-2864f2bf0a9c.png)

Use `--exhaustive` or `-e` to run all preflop simulations. Note that this will take some time.

![--exhaustive example](https://user-images.githubusercontent.com/1926029/35533275-eaea7690-0534-11e8-88c9-15c993916e89.png)

Use `--possibilities` or `-p` to show all possible hand outcomes. Hand possibilities are shown by default if only one hand is defined.

![--possibilities example](https://user-images.githubusercontent.com/1926029/35532961-e73f5d18-0533-11e8-86f0-22c17c2d2dda.png)

### API

The method used to calculate probabilities can be imported and used directly in a JS/node project:

```js
import { calculateEquity } from 'poker-odds'

const hands = [['As', 'Kh'], ['Kd', 'Qs']]
const board = ['Td', '7s', '8d']
const iterations = 100000 // optional
const exhaustive = false // optional

calculateEquity(hands, board, iterations, exhaustive)
```

`calculateEquity()` returns an array of hands with the results of the simulations:

```json
[
  {
    "hand": [
      "Ac",
      "Kh"
    ],
    "count": 990,
    "wins": 803,
    "ties": 15,
    "handChances": [
      { "name": "high card", "count": 376 },
      { "name": "one pair", "count": 479 },
      { "name": "two pair", "count": 78 },
      { "name": "three of a kind", "count": 13 },
      { "name": "straight", "count": 44 },
      { "name": "flush", "count": 0 },
      { "name": "full house", "count": 0 },
      { "name": "four of a kind", "count": 0 },
      { "name": "straight flush", "count": 0 },
      { "name": "royal flush", "count": 0 }
    ],
    "favourite": true
  },
  {
    "hand": [
      "Kd",
      "Qs"
    ],
    "count": 990,
    "wins": 172,
    "ties": 15,
    "handChances": [
      { "name": "high card", "count": 351 },
      { "name": "one pair", "count": 463 },
      { "name": "two pair", "count": 77 },
      { "name": "three of a kind", "count": 13 },
      { "name": "straight", "count": 41 },
      { "name": "flush", "count": 45 },
      { "name": "full house", "count": 0 },
      { "name": "four of a kind", "count": 0 },
      { "name": "straight flush", "count": 0 },
      { "name": "royal flush", "count": 0 }
    ],
    "favourite": false
  }
]
```
