import test from 'ava'
import {
  numericalValue,
  numericalSort,
  convertToHex,
  parseCards,
  percent,
  seconds,
  getStraight,
  padStart,
  padEnd
} from '../src/utils'

test('numericalValue', t => {
  t.is(numericalValue('As'), 14)
  t.is(numericalValue('Td'), 10)
  t.is(numericalValue('5c'), 5)
  t.is(numericalValue('2h'), 2)
})

test('numericalSort', t => {
  const input = ['2h', 'Td', '5c', 'As', '5d']
  const expected = ['As', 'Td', '5c', '5d', '2h']
  t.deepEqual(input.sort(numericalSort), expected)
})

test('convertToHex', t => {
  t.is(convertToHex(['2h', 'Td', '5c', 'As', '5d']), '2a5e5')
})

test('parseCards', t => {
  t.deepEqual(parseCards('2hTd'), ['2h', 'Td'])
  t.deepEqual(parseCards('AdAc'), ['Ad', 'Ac'])
  t.deepEqual(parseCards('Ks..'), ['Ks', '..'])
  t.deepEqual(parseCards('....'), ['..', '..'])
  t.deepEqual(parseCards(''), undefined)
  t.deepEqual(parseCards('random string'), undefined)
})

test('percent', t => {
  t.is(percent(0.5), '50.0%')
  t.is(percent(0.12), '12.0%')
  t.is(percent(0.123), '12.3%')
  t.is(percent(0.1234), '12.3%')
  t.is(percent(0.1235), '12.4%')
  t.is(percent(0.001), '0.1%')
  t.is(percent(0.0000001), '0.1%')
  t.is(percent(0), '·')
})

test('seconds', t => {
  t.is(seconds(1), '1ms')
  t.is(seconds(500), '500ms')
  t.is(seconds(999), '999ms')
  t.is(seconds(1000), '1.0s')
  t.is(seconds(1100), '1.1s')
  t.is(seconds(1150), '1.2s')
  t.is(seconds(12345), '12.3s')
})

test('getStraight', t => {
  t.is(getStraight(['A', 'K', 'Q', 'J', 'T', '9', '8']), 'edcba')
  t.is(getStraight(['A', 'J', 'T', '9', '8', '7', '3']), 'ba987')
  t.is(getStraight(['A', '9', '7', '5', '4', '3', '2']), '5432e')
  t.is(getStraight(['A', 'K', 'Q', 'J', '9', '7', '3']), null)
  t.is(getStraight(['9', '8', '7', '5', '4', '3', '2']), null)
})

test('padStart', t => {
  t.is(padStart('hello', 10, 'a'), 'aaaaahello')
  t.is(padStart('hello', 10), '     hello')
  t.is(padStart('hello', 6), ' hello')
  t.is(padStart('hello', 5), 'hello')
  t.is(padStart('hello', 3), 'hello')
})

test('padEnd', t => {
  t.is(padEnd('hello', 10, 'o'), 'helloooooo')
  t.is(padEnd('hello', 10), 'hello     ')
  t.is(padEnd('hello', 6), 'hello ')
  t.is(padEnd('hello', 5), 'hello')
  t.is(padEnd('hello', 3), 'hello')
})
