import R from 'ramda'
import S from 'sanctuary'
import capitalize = require('capitalize')

export class Age {
  years: number = 0
  months: number = 1
  weeks: number = 1
  days: number = 1
  protected constructor() {}
  static create(options: Partial<Age> = {}): Age {
    return R.pipe(
      // years are 0 indexed
      passYears(options.years || 0),
      // months are 1 indexed
      passMonths((options.months || 1) - 1),
      // weeks are 1 indexed
      passWeeks((options.weeks || 1) - 1),
      // days are 1 indexed
      passDays((options.days || 1) - 1)
    )(new Age())
  }
}

export const MONTHS_PER_YEAR = 10
export const WEEKS_PER_MONTH = 6
export const DAYS_PER_WEEK = 6
export const WEEKS_PER_YEAR = WEEKS_PER_MONTH * MONTHS_PER_YEAR
export const DAYS_PER_MONTH = DAYS_PER_WEEK * WEEKS_PER_MONTH
export const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR
export enum MONTH_NAMES {
  'janumon' = 1,
  'febumon',
  'marmon',
  'aprimon',
  'sunmon',
  'augumon',
  'septemon',
  'oktomon',
  'novemon',
  'decemon'
}

export enum DAY_NAMES {
  'ada' = 1,
  'beda',
  'ceda',
  'doda',
  'eda',
  'goda'
}

export const toAgeString = (age: Age) => {
  const day = capitalize(DAY_NAMES[age.days])
  const month = capitalize(MONTH_NAMES[age.months])
  const monthDays = age.days + age.weeks * WEEKS_PER_MONTH
  return `${day}, ${monthDays} ${month} of ${age.years}`
}

export const fromAgeString = (_age: Age) => {
  throw new Error('Not implemented')
}

const { floor } = Math

const addBounded = S.curry2((mod: number, amount: number) =>
  R.pipe(
    R.dec,
    R.add(amount),
    R.flip(R.modulo)(mod),
    R.inc
  )
)

export const passYears = (amount: number): ((age: Age) => Age) =>
  R.evolve({
    years: R.add(amount)
  })

export const passMonths = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      months: addBounded(MONTHS_PER_YEAR)(amount)
    }),
    passYears(floor(amount / MONTHS_PER_YEAR))
  )

export const passWeeks = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      weeks: addBounded(WEEKS_PER_MONTH)(amount)
    }),
    passMonths(floor(amount / WEEKS_PER_MONTH))
  )

export const passDays = (amount: number): ((age: Age) => Age) =>
  R.pipe(
    R.evolve({
      days: addBounded(DAYS_PER_WEEK)(amount)
    }),
    passWeeks(floor(amount / DAYS_PER_WEEK))
  )

export const passTime = S.curry3(
  (amount: number, unit: TimeUnit, age: Age): Age =>
    R.cond([
      [isYear, () => passYears(amount)(age)],
      [isMonth, () => passMonths(amount)(age)],
      [isWeek, () => passWeeks(amount)(age)],
      [isDay, () => passDays(amount)(age)]
    ])(unit)
)

export const isYear: (value: TimeUnit) => value is Year = S.test(
  /^years?$/
) as any
export const isMonth: (value: TimeUnit) => value is Month = S.test(
  /^months?$/
) as any
export const isWeek: (value: TimeUnit) => value is Week = S.test(
  /^weeks?$/
) as any
export const isDay: (value: TimeUnit) => value is Day = S.test(/^days?$/) as any

export type Year = 'year' | 'years'
export type Month = 'month' | 'months'
export type Week = 'week' | 'weeks'
export type Day = 'day' | 'days'
export type TimeUnit = Week | Month | Year | Day

export const totalMonths = (age: Age) => {
  return age.years * MONTHS_PER_YEAR + age.months
}
export const totalWeeks = (age: Age) => {
  return totalMonths(age) * WEEKS_PER_MONTH + age.weeks
}
export const totalDays = (age: Age) => {
  return totalWeeks(age) * DAYS_PER_WEEK + age.days
}

/** check the second age is _before_ the first age */
export const isBefore = S.curry2(
  (before: Age, age: Age) => totalDays(age) < totalDays(before)
)

/** check the second age is _after_ the first age */
export const isAfter = S.curry2(
  (after: Age, age: Age) => totalDays(age) > totalDays(after)
)
