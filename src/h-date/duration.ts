import { expect } from 'chai'
import R from 'ramda'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'

export interface Duration {
  readonly years?: number
  readonly months?: number
  readonly weeks?: number
  readonly days?: number
}

const { floor, sign, abs } = Math

export const isValid = ({
  years = 0,
  months = 0,
  weeks = 0,
  days = 0,
}: Duration): boolean => years >= 0 && months >= 0 && weeks >= 0 && days >= 0
export const assertValid = ({
  years = 0,
  months = 0,
  weeks = 0,
  days = 0,
}: Duration): void => {
  expect(years, 'years').at.least(0)
  expect(months, 'months').at.least(0)
  expect(weeks, 'weeks').at.least(0)
  expect(days, 'days').at.least(0)
}

const roundTowardZero = (n: number) => sign(n) * floor(abs(n))

// move the overflow of the small value into units of the big value
const overflow = ({ max, big = 0, small = 0 }: { [prop: string]: number }) => ({
  small: R.mathMod(small, max),
  big: big + roundTowardZero(small / max),
})
export const normalize = ({
  days,
  weeks,
  months,
  years,
}: Duration): Duration => {
  // mutable local object
  const output: Duration = {}
  if (typeof days === 'number' && (days < 0 || days >= DAYS_PER_WEEK)) {
    // weeks = (weeks || 0) + Math.floor(days / DAYS_PER_WEEK)
    // days = (days) % DAYS_PER_WEEK
    ;({ big: weeks, small: days } = overflow({
      max: DAYS_PER_WEEK,
      small: days,
      big: weeks,
    }))
    Object.assign(output, { weeks, days })
  }
  if (typeof weeks === 'number' && (weeks < 0 || weeks >= WEEKS_PER_MONTH)) {
    // months = (months || 0) + Math.floor(weeks / WEEKS_PER_MONTH)
    // weeks = weeks % WEEKS_PER_MONTH
    ;({ big: months, small: weeks } = overflow({
      max: WEEKS_PER_MONTH,
      small: weeks,
      big: months,
    }))
    Object.assign(output, { months, weeks })
  }
  if (typeof months === 'number' && (months < 0 || months >= MONTHS_PER_YEAR)) {
    // years = (years || 0) + Math.floor(months / MONTHS_PER_YEAR)
    // months = months % MONTHS_PER_YEAR
    ;({ big: years, small: months } = overflow({
      max: MONTHS_PER_YEAR,
      small: months,
      big: years,
    }))
    Object.assign(output, { years, months })
  }
  if (typeof years === 'number') {
    Object.assign(output, { years: abs(years) })
  }
  return output
}

export const add = (a: Duration) => (b: Duration) =>
  R.pipe(
    R.mergeWith(R.add),
    normalize,
  )(a, b)

export const subtract = (a: Duration) => (b: Duration) => {
  const inverted: Duration = R.map(R.negate, a as any)
  return add(inverted)(b)
}
