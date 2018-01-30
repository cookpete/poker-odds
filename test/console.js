import test from 'ava'
import {
  color,
  colorCards,
  getHands,
  hasOption,
  getOption
} from '../src/console'

test('color', t => {
  t.is(color('hello', 'green'), '\x1b[32mhello\x1b[0m')
  t.is(color('hello', 'grey'), '\x1b[90mhello\x1b[0m')
  t.is(color('hello', 'beige'), 'hello')
  t.is(color('hello', null), 'hello')
})

test('colorCards', t => {
  t.is(colorCards(['As', 'Ad']), '\x1b[34mAs\x1b[0m \x1b[31mAd\x1b[0m')
  t.is(colorCards(['..', '..']), '\x1b[33m..\x1b[0m \x1b[33m..\x1b[0m')
  t.is(colorCards(['random', 'string']), 'random string')
})

test('getHands', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '--iterations', '100']
  t.deepEqual(getHands(argv), ['AsAd', 'KdQd'])
})

test('hasOption', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '--iterations', '100']
  t.is(hasOption('--iterations', argv), true)
})

test('getOption returns integer', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '--iterations', '100']
  t.is(getOption('--iterations', argv), 100)
})

test('getOption returns string', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '--board', '4s7d8c']
  t.is(getOption('--board', argv), '4s7d8c')
})

test('getOption returns undefined', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '--iterations', '100']
  t.is(getOption('--board', argv), undefined)
})

test('getOption supports shorthand option', t => {
  const argv = ['node', 'script.js', 'AsAd', 'KdQd', '-i', '100']
  t.is(getOption('--iterations', argv), 100)
})
