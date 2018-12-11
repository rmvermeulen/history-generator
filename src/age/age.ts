import { assert } from 'chai'
import R from 'ramda'
import S from 'sanctuary'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'

export interface IAge {
  readonly year: number
  readonly month: number
  readonly week: number
  readonly day: number
}

const baseAge: IAge = {
  year: 1,
  month: 1,
  week: 1,
  day: 1,
}

export const createAge = (passedTime: Partial<IAge> = {}): IAge => {
  type Mod = (age: IAge) => IAge
  const mods: Mod[] = []
  if ('year' in passedTime) {
    assert.isAbove(passedTime.year, 0)
    mods.push(passYears(passedTime.year))
  }
  if ('month' in passedTime) {
    assert.isAbove(passedTime.month, 0)
    mods.push(passMonths(passedTime.month))
  }
  if ('week' in passedTime) {
    assert.isAbove(passedTime.week, 0)
    mods.push(passWeeks(passedTime.week))
  }
  if ('day' in passedTime) {
    assert.isAbove(passedTime.day, 0)
    mods.push(passDays(passedTime.day))
  }
  const applyMods = mods.length
    ? R.pipe(...(mods as [Mod?, Mod?, Mod?, Mod?]))
    : R.identity

  return applyMods(baseAge)
}

const addBounded = S.curry2((mod: number, amount: number) =>
  R.pipe(
    R.dec,
    R.add(amount),
    R.flip(R.modulo)(mod),
    R.inc,
  ),
)

export const passYears = (amount: number): ((age: IAge) => IAge) =>
  R.evolve({
    year: R.add(amount),
  })

export const passMonths = (amount: number): ((age: IAge) => IAge) =>
  R.pipe(
    R.evolve({
      month: addBounded(MONTHS_PER_YEAR)(amount),
    }),
    passYears(Math.floor(amount / MONTHS_PER_YEAR)),
  )

export const passWeeks = (amount: number): ((age: IAge) => IAge) =>
  R.pipe(
    R.evolve({
      week: addBounded(WEEKS_PER_MONTH)(amount),
    }),
    passMonths(Math.floor(amount / WEEKS_PER_MONTH)),
  )

export const passDays = (amount: number): ((age: IAge) => IAge) =>
  R.pipe(
    R.evolve({
      day: addBounded(DAYS_PER_WEEK)(amount),
    }),
    passWeeks(Math.floor(amount / DAYS_PER_WEEK)),
  )

export const passTime = S.curry3(
  (amount: number, unit: TimeUnit, age: IAge): IAge =>
    R.cond([
      [isYear, () => passYears(amount)(age)],
      [isMonth, () => passMonths(amount)(age)],
      [isWeek, () => passWeeks(amount)(age)],
      [isDay, () => passDays(amount)(age)],
    ])(unit),
)

export const isYear: (value: TimeUnit) => value is Year = S.test(
  /^years?$/,
) as any
export const isMonth: (value: TimeUnit) => value is Month = S.test(
  /^months?$/,
) as any
export const isWeek: (value: TimeUnit) => value is Week = S.test(
  /^weeks?$/,
) as any
export const isDay: (value: TimeUnit) => value is Day = S.test(/^days?$/) as any

export type Year = 'year' | 'years'
export type Month = 'month' | 'months'
export type Week = 'week' | 'weeks'
export type Day = 'day' | 'days'
export type TimeUnit = Week | Month | Year | Day

export const totalMonths = (age: IAge) => {
  return age.year * MONTHS_PER_YEAR + age.month
}
export const totalWeeks = (age: IAge) => {
  return totalMonths(age) * WEEKS_PER_MONTH + age.week
}
export const totalDays = (age: IAge) => {
  return totalWeeks(age) * DAYS_PER_WEEK + age.day
}

/** check the second age is _before_ the first age */
export const isBefore = S.curry2(
  (before: IAge, age: IAge) => totalDays(age) < totalDays(before),
)

/** check the second age is _after_ the first age */
export const isAfter = S.curry2(
  (after: IAge, age: IAge) => totalDays(age) > totalDays(after),
)
