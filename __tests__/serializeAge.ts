import R from 'ramda'

import {
  fromLongString,
  fromShortString,
  toLongString,
  toShortString,
} from '../src/age'

import { fixtures } from './serialize.fixtures'

describe('Serialize age', () => {
  const json = JSON.stringify

  const plucks = (props, xs) => R.map(R.props(props), xs)

  describe.each(plucks(['age', 'long'], fixtures))(
    'Long age string: %o & "%s"',
    (age, long) => {
      test(`toLongString: ${json(age)} -> "${long}"`, () => {
        expect(toLongString(age)).toEqual(long)
      })
      test(`fromLongString: "${long}" -> ${json(age)}`, () => {
        expect(fromLongString(long)).toMatchObject(age)
      })
      test(`commutative`, () => {
        expect(fromLongString(toLongString(age))).toMatchObject(age)
        expect(toLongString(fromLongString(long))).toEqual(long)
      })
    },
  )

  describe.each(plucks(['age', 'short'], fixtures))(
    'Short age string: %o & "%s"',
    (age, short) => {
      test(`toShortString: ${json(age)} -> "${short}"`, () => {
        expect(toShortString(age)).toEqual(short)
      })
      test(`fromShortString: "${short}" -> ${json(age)}`, () => {
        expect(fromShortString(short)).toMatchObject(age)
      })
      test(`commutative`, () => {
        expect(fromShortString(toShortString(age))).toMatchObject(age)
        expect(toShortString(fromShortString(short))).toEqual(short)
      })
    },
  )
})
