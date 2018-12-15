import R from 'ramda'
import S from 'sanctuary'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'
import { HDate } from './HDate'

const addBounded = S.curry2((mod: number, amount: number) =>
  R.pipe(
    R.dec,
    R.add(amount),
    R.flip(R.modulo)(mod),
    R.inc,
  ),
)
export const passYears = (amount: number): ((age: HDate) => HDate) =>
  R.evolve({
    year: R.add(amount),
  })

export const passMonths = (amount: number): ((age: HDate) => HDate) =>
  R.pipe(
    R.evolve({
      month: addBounded(MONTHS_PER_YEAR)(amount),
    }),
    passYears(Math.floor(amount / MONTHS_PER_YEAR)),
  )

export const passWeeks = (amount: number): ((age: HDate) => HDate) =>
  R.pipe(
    R.evolve({
      week: addBounded(WEEKS_PER_MONTH)(amount),
    }),
    passMonths(Math.floor(amount / WEEKS_PER_MONTH)),
  )

export const passDays = (amount: number): ((age: HDate) => HDate) =>
  R.pipe(
    R.evolve({
      day: addBounded(DAYS_PER_WEEK)(amount),
    }),
    passWeeks(Math.floor(amount / DAYS_PER_WEEK)),
  )
