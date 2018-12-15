import * as R from 'ramda'

import {
  DAYS_PER_WEEK,
  MONTHS_PER_YEAR,
  WEEKS_PER_MONTH,
} from '../../src/h-date/constants'
import { createDate } from '../../src/h-date/HDate'
import {
  passDays,
  passMonths,
  passWeeks,
  passYears,
} from '../../src/h-date/passTime'

const { floor } = Math

describe('Pass Time', () => {
  describe('passYears', () => {
    const range = R.range(0, 10).map(R.multiply(50))
    const age = createDate()
    it.each(range)('pass %i year', (n) => {
      expect(passYears(n)(age)).toMatchObject({
        year: n + 1,
      })
    })
  })
  describe('passMonths', () => {
    const mpy = MONTHS_PER_YEAR

    test('noop', () => {
      const age = createDate()
      expect(passMonths(0)(age)).toMatchObject({
        month: age.month,
      })
    })

    test('simple cases', () => {
      const age = createDate()
      expect(passMonths(1)(age)).toMatchObject({
        month: age.month + 1,
      })
      expect(passMonths(5)(age)).toMatchObject({
        month: age.month + 5,
      })
    })

    test('wrap around', () => {
      const age = createDate()
      expect(passMonths(mpy / 2)(age)).toMatchObject({
        year: age.year,
        month: floor(age.month + mpy / 2),
      })
      expect(passMonths(mpy)(age)).toMatchObject({
        year: age.year + 1,
        month: age.month,
      })
      expect(passMonths(mpy * 3)(age)).toMatchObject({
        year: age.year + 3,
        month: age.month,
      })
    })
  })

  describe('passWeeks', () => {
    const wpm = WEEKS_PER_MONTH

    test('noop', () => {
      const age = createDate()
      expect(passWeeks(0)(age)).toMatchObject({
        week: age.week,
      })
    })

    test('simple cases', () => {
      const age = createDate()
      expect(passWeeks(1)(age)).toMatchObject({
        week: age.week + 1,
      })
      expect(passWeeks(5)(age)).toMatchObject({
        week: age.week + 5,
      })
    })

    test('wrap around', () => {
      const age = createDate()
      expect(passWeeks(wpm / 2)(age)).toMatchObject({
        month: age.month,
        week: floor(age.week + wpm / 2),
      })
      expect(passWeeks(wpm)(age)).toMatchObject({
        month: age.month + 1,
        week: age.week,
      })
      expect(passWeeks(wpm * 3)(age)).toMatchObject({
        month: age.month + 3,
        week: age.week,
      })
    })
  })

  describe('passDays', () => {
    const dpw = DAYS_PER_WEEK

    test('noop', () => {
      const age = createDate()
      expect(passDays(0)(age)).toMatchObject({
        day: age.day,
      })
    })

    test('simple cases', () => {
      const age = createDate()
      expect(passDays(1)(age)).toMatchObject({
        day: age.day + 1,
      })
      expect(passDays(5)(age)).toMatchObject({
        day: age.day + 5,
      })
    })

    test('wrap around', () => {
      const age = createDate()
      expect(passDays(dpw / 2)(age)).toMatchObject({
        week: age.week,
        day: floor(age.day + dpw / 2),
      })
      expect(passDays(dpw)(age)).toMatchObject({
        week: age.week + 1,
        day: age.day,
      })
      expect(passDays(dpw * 3)(age)).toMatchObject({
        week: age.week + 3,
        day: age.day,
      })
    })
  })
})
