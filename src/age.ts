import S from 'sanctuary'
import R from 'ramda'

export class Age {
  years: number = 0
  months: number = 1
  weeks: number = 1
  days: number = 1
  protected constructor() {}
  static create(options: Partial<Age> = {}): Age {
    const age = new Age()
    age.years = options.years || 0
    age.months = options.months || 1
    age.weeks = options.weeks || 1
    age.days = options.days || 1
    return age
  }
}

export const MONTHS_PER_YEAR = 10
export const WEEKS_PER_MONTH = 6
export const DAYS_PER_WEEK = 6
export const WEEKS_PER_YEAR = WEEKS_PER_MONTH * MONTHS_PER_YEAR
export const DAYS_PER_MONTH = DAYS_PER_WEEK * WEEKS_PER_MONTH
export const DAYS_PER_YEAR = DAYS_PER_MONTH * MONTHS_PER_YEAR
export const enum MONTH_NAMES {
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

export const enum DAYS_NAMES {
  'ada' = 1,
  'beda',
  'ceda',
  'doda',
  'eda',
  'goda'
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

export const passYears = S.curry2((amount: number, age: Age) => ({
  ...age,
  years: age.years + amount
}))

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
