import R from 'ramda'
import S from 'sanctuary'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'

export class Age {
  public static create(options: Partial<Age> = {}): Age {
    return R.pipe(
      // years are 0 indexed
      passYears(options.year || 0),
      // months are 1 indexed
      passMonths((options.month || 1) - 1),
      // weeks are 1 indexed
      passWeeks((options.week || 1) - 1),
      // days are 1 indexed
      passDays((options.day || 1) - 1),
    )(new Age())
  }
  public year: number = 0
  public month: number = 1
  public week: number = 1
  public day: number = 1
  protected constructor() {}
}

const addBounded = S.curry2((mod: number, amount: number) =>
  R.pipe(
    R.dec,
    R.add(amount),
    R.flip(R.modulo)(mod),
    R.inc,
  ),
)

export const passYears = (amount: number): ((age: Age) => Age) =>
  R.evolve({
    year: R.add(amount),
  })

export const passMonths = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      month: addBounded(MONTHS_PER_YEAR)(amount),
    }),
    passYears(Math.floor(amount / MONTHS_PER_YEAR)),
  )

export const passWeeks = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      week: addBounded(WEEKS_PER_MONTH)(amount),
    }),
    passMonths(Math.floor(amount / WEEKS_PER_MONTH)),
  )

export const passDays = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      day: addBounded(DAYS_PER_WEEK)(amount),
    }),
    passWeeks(Math.floor(amount / DAYS_PER_WEEK)),
  )

export const passTime = S.curry3(
  (amount: number, unit: TimeUnit, age: Age): Age =>
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

export const totalMonths = (age: Age) => {
  return age.year * MONTHS_PER_YEAR + age.month
}
export const totalWeeks = (age: Age) => {
  return totalMonths(age) * WEEKS_PER_MONTH + age.week
}
export const totalDays = (age: Age) => {
  return totalWeeks(age) * DAYS_PER_WEEK + age.day
}

/** check the second age is _before_ the first age */
export const isBefore = S.curry2(
  (before: Age, age: Age) => totalDays(age) < totalDays(before),
)

/** check the second age is _after_ the first age */
export const isAfter = S.curry2(
  (after: Age, age: Age) => totalDays(age) > totalDays(after),
)
