import R from 'ramda'
import {
  Age,
  fromLongString,
  fromShortString,
  toLongString,
  toShortString,
} from '../src/age'

describe('Serialize age', () => {
  const fixtures = [
    {
      age: Age.create(),
      longStr: 'Ada, 1 Janumon of 0',
      shortStr: '0000/01/1/1',
    },
    {
      age: Age.create({ year: 1 }),
      longStr: 'Ada, 1 Janumon of 1',
      shortStr: '0001/01/1/1',
    },
    {
      age: Age.create({ day: 2 }),
      longStr: 'Beda, 2 Janumon of 0',
      shortStr: '0000/01/1/2',
    },
    {
      age: Age.create({ day: 500 }),
      longStr: 'Beda, 32 Aprimon of 1',
      shortStr: '0001/04/5/2',
    },
  ]

  describe('Long age string', () => {
    test.each(R.map(R.props(['age', 'longStr']), fixtures))(
      'toAgeString: %o',
      (age, longStr) => {
        expect(toLongString(age)).toEqual(longStr)
      },
    )
    test.each(R.map(R.props(['longStr', 'age']), fixtures))(
      'fromAgeString: "%s"',
      (longStr, age) => {
        expect(fromLongString(longStr)).toMatchObject(age)
      },
    )
    test.each(fixtures)('commutative', ({ age, longStr }) => {
      expect(fromLongString(toLongString(age))).toMatchObject(age)
      expect(toLongString(fromLongString(longStr))).toEqual(longStr)
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
