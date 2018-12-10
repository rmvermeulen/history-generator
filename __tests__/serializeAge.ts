import R from 'ramda'
import {
  Age,
  fromAgeString,
  fromShortString,
  toAgeString,
  toShortString,
} from '../src/age'

describe.only('Serialize age', () => {
  const fixtures = [
    {
      age: Age.create(),
      longStr: 'Ada, 1 Janumon of 0',
      shortStr: '0000/01/1/1',
    },
    {
      age: Age.create({ years: 1 }),
      longStr: 'Ada, 1 Janumon of 1',
      shortStr: '0001/01/1/1',
    },
    {
      age: Age.create({ days: 2 }),
      longStr: 'Beda, 2 Janumon of 0',
      shortStr: '0000/01/1/2',
    },
    {
      age: Age.create({ days: 500 }),
      longStr: 'Beda, 32 Aprimon of 1',
      shortStr: '0001/04/6/2',
    },
  ]

  describe('Long age string', () => {
    test.each(R.map(R.props(['age', 'longStr']), fixtures))(
      'toAgeString: %o',
      (age, longStr) => {
        expect(toAgeString(age)).toEqual(longStr)
      },
    )
    test.each(R.map(R.props(['longStr', 'age']), fixtures))(
      'fromAgeString: "%s"',
      (longStr, age) => {
        expect(fromAgeString(longStr)).toEqual(age)
      },
    )
    test.each(fixtures)('commutative', ({ age, longStr }) => {
      expect(fromShortString(toShortString(age))).toEqual(age)
      expect(toShortString(fromShortString(longStr))).toEqual(longStr)
    })
  })

  describe('Short age string', () => {
    test.each(R.map(R.props(['age', 'shortStr']), fixtures))(
      'toShortString: %o',
      (age, shortStr) => {
        expect(toShortString(age)).toEqual(shortStr)
      },
    )
    test.each(R.map(R.props(['shortStr', 'age']), fixtures))(
      'fromShortString: "%s"',
      (shortStr, age) => {
        expect(fromShortString(shortStr)).toEqual(age)
      },
    )
    test.each(fixtures)('commutative', ({ age, shortStr }) => {
      expect(fromShortString(toShortString(age))).toEqual(age)
      expect(toShortString(fromShortString(shortStr))).toEqual(shortStr)
    })
  })
})
