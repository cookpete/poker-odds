import test from 'ava'
import { rankHand, rankValues, getFlush } from '../src/rank'

test('high card', t => {
  t.is(rankHand(['As', '8d', '3d', '6s', '2c', 'Qd', '5h']), '0ec865')
  t.is(rankValues(['A', 'Q', '8', '6', '5', '3', '2']), '0ec865')
})

test('one pair', t => {
  t.is(rankHand(['As', 'Ad', '3d', '6s', '2c', 'Qd', '5h']), '1eec65')
  t.is(rankValues(['A', 'A', 'Q', '6', '5', '3', '2']), '1eec65')
})

test('two pair', t => {
  t.is(rankHand(['As', 'Ad', '3d', '3s', '2c', 'Qd', '5h']), '2ee33c')
  t.is(rankValues(['A', 'A', 'Q', '5', '3', '3', '2']), '2ee33c')
})

test('three of a kind', t => {
  t.is(rankHand(['As', 'Ad', 'Ad', '3s', '2c', 'Qd', '5h']), '3eeec5')
  t.is(rankValues(['A', 'A', 'A', 'Q', '5', '3', '2']), '3eeec5')
})

test('straight', t => {
  t.is(rankHand(['As', 'Qd', 'Kd', 'Js', 'Tc', 'Qd', '5h']), '4edcba')
  t.is(rankHand(['As', '4d', 'Ad', '3s', '2c', 'Qd', '5h']), '45432e')
  t.is(rankValues(['A', 'K', 'Q', 'Q', 'J', 'T', '5']), '4edcba')
  t.is(rankValues(['A', 'A', 'Q', '5', '4', '3', '2']), '45432e')
})

test('flush', t => {
  t.is(rankHand(['Ad', 'Qd', 'Kd', 'Js', 'Td', 'Qc', '5d']), '5edca5')
})

test('full house', t => {
  t.is(rankHand(['As', 'Ad', '3d', '6s', 'Ac', 'Qd', '3h']), '6eee33')
  t.is(rankValues(['A', 'A', 'A', 'Q', '6', '3', '3']), '6eee33')
})

test('four of a kind', t => {
  t.is(rankHand(['As', 'Ad', 'Ah', '6s', 'Ac', 'Qd', '3h']), '7eeeec')
  t.is(rankValues(['A', 'A', 'A', 'A', 'Q', '6', '3']), '7eeeec')
})

test('straight flush', t => {
  t.is(rankHand(['As', '3d', '4d', '6d', 'Ac', '5d', '7d']), '876543')
})

test('royal flush', t => {
  t.is(rankHand(['As', 'Ts', '4d', 'Js', 'Ks', '5d', 'Qs']), '9edcba')
})

test('invalid hand', t => {
  t.throws(() => rankHand(['As', 'Ad', 'Ah', 'Ac', 'Ac', 'Qd', '3h']))
  t.is(rankValues(['A', 'A', 'A', 'A', 'A', '6', '3']), undefined)
})

test('getFlush', t => {
  t.is(getFlush('ccddhhs'), undefined)
  t.is(getFlush('cddddds'), 'd')
  t.is(getFlush('ccccccc'), 'c')
})
