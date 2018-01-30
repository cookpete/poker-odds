import test from 'ava'
import { calculateEquity } from '../src/calculate'

test('AsAc KsQs', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']])
  t.is(equity.length, 2)
})

test('AsAc KsQs, 100 iterations', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']], [], 100)
  t.is(equity.length, 2)
  t.is(equity[0].count, 100)
})

test('AsAc KsQs, exhaustive', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']], [], undefined, true)
  t.is(equity.length, 2)
  t.is(equity[0].wins, 1426798)
  t.is(equity[0].count, 1712304)
  t.is(equity[0].ties, 7872)
  t.is(equity[0].favourite, true)
  t.is(equity[1].wins, 277634)
  t.is(equity[1].count, 1712304)
  t.is(equity[1].ties, 7872)
  t.is(equity[1].favourite, false)
})

test('AsAc KsQs, board TsJs4d', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']], ['Ts', 'Js', '4d'])
  t.is(equity.length, 2)
  t.is(equity[0].wins, 532)
  t.is(equity[0].count, 990)
  t.is(equity[0].ties, 0)
  t.is(equity[0].favourite, true)
  t.is(equity[1].wins, 458)
  t.is(equity[1].count, 990)
  t.is(equity[1].ties, 0)
  t.is(equity[1].favourite, false)
})

test('AsAc KsQs, board TsJs4dKh', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']], ['Ts', 'Js', '4d', 'Kh'])
  t.is(equity.length, 2)
  t.is(equity[0].wins, 29)
  t.is(equity[0].count, 44)
  t.is(equity[0].ties, 0)
  t.is(equity[0].favourite, true)
  t.is(equity[1].wins, 15)
  t.is(equity[1].count, 44)
  t.is(equity[1].ties, 0)
  t.is(equity[1].favourite, false)
})

test('AsAc KsQs, board TsJs4dKhKc', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs']], ['Ts', 'Js', '4d', 'Kh', 'Kc'])
  t.is(equity.length, 2)
  t.is(equity[0].wins, 0)
  t.is(equity[0].count, 1)
  t.is(equity[0].ties, 0)
  t.is(equity[0].favourite, false)
  t.is(equity[1].wins, 1)
  t.is(equity[1].count, 1)
  t.is(equity[1].ties, 0)
  t.is(equity[1].favourite, true)
})

test('AsAc KsQs 3d5d', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Ks', 'Qs'], ['3d', '5d']])
  t.is(equity.length, 3)
  t.is(equity[0].favourite, true)
})

test('AsAc ....', t => {
  const equity = calculateEquity([['As', 'Ac'], ['..', '..']])
  t.is(equity.length, 2)
})

test('AsAc Kd..', t => {
  const equity = calculateEquity([['As', 'Ac'], ['Kd', '..']])
  t.is(equity.length, 2)
})
