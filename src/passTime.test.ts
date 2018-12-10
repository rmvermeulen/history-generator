import * as R from 'ramda'
import {
  Age,
  DAYS_PER_WEEK,
  MONTHS_PER_YEAR,
  passMonths,
  passYears,
  WEEKS_PER_MONTH,
  passWeeks,
  passDays
} from './age'

const { floor } = Math

describe('Pass Time', () => {
  describe('passYears', () => {
    const range = R.range(0, 10).map(R.multiply(50))
    const age = Age.create()
    it.each(range)('pass %i years', (n) => {
      expect(passYears(n)(age)).toMatchObject({
        years: n
      })
    })
  })
  describe('passMonths', () => {
    const mpy = MONTHS_PER_YEAR

    test('noop', () => {
      const age = Age.create()
      expect(passMonths(0)(age)).toMatchObject({
        months: age.months
      })
    })

    test('simple cases', () => {
      const age = Age.create()
      expect(passMonths(1)(age)).toMatchObject({
        months: age.months + 1
      })
      expect(passMonths(5)(age)).toMatchObject({
        months: age.months + 5
      })
    })

    test('wrap around', () => {
      const age = Age.create()
      expect(passMonths(mpy / 2)(age)).toMatchObject({
        years: age.years,
        months: floor(age.months + mpy / 2)
      })
      expect(passMonths(mpy)(age)).toMatchObject({
        years: age.years + 1,
        months: age.months
      })
      expect(passMonths(mpy * 3)(age)).toMatchObject({
        years: age.years + 3,
        months: age.months
      })
    })
  })

  describe('passWeeks', () => {
    const wpm = WEEKS_PER_MONTH

    test('noop', () => {
      const age = Age.create()
      expect(passWeeks(0)(age)).toMatchObject({
        weeks: age.weeks
      })
    })

    test('simple cases', () => {
      const age = Age.create()
      expect(passWeeks(1)(age)).toMatchObject({
        weeks: age.weeks + 1
      })
      expect(passWeeks(5)(age)).toMatchObject({
        weeks: age.weeks + 5
      })
    })

    test('wrap around', () => {
      const age = Age.create()
      expect(passWeeks(wpm / 2)(age)).toMatchObject({
        months: age.months,
        weeks: floor(age.weeks + wpm / 2)
      })
      expect(passWeeks(wpm)(age)).toMatchObject({
        months: age.months + 1,
        weeks: age.weeks
      })
      expect(passWeeks(wpm * 3)(age)).toMatchObject({
        months: age.months + 3,
        weeks: age.weeks
      })
    })
  })

  describe('passDays', () => {
    const dpw = DAYS_PER_WEEK

    test('noop', () => {
      const age = Age.create()
      expect(passDays(0)(age)).toMatchObject({
        days: age.days
      })
    })

    test('simple cases', () => {
      const age = Age.create()
      expect(passDays(1)(age)).toMatchObject({
        days: age.days + 1
      })
      expect(passDays(5)(age)).toMatchObject({
        days: age.days + 5
      })
    })

    test('wrap around', () => {
      const age = Age.create()
      expect(passDays(dpw / 2)(age)).toMatchObject({
        weeks: age.weeks,
        days: floor(age.days + dpw / 2)
      })
      expect(passDays(dpw)(age)).toMatchObject({
        weeks: age.weeks + 1,
        days: age.days
      })
      expect(passDays(dpw * 3)(age)).toMatchObject({
        weeks: age.weeks + 3,
        days: age.days
      })
    })
  })
})
