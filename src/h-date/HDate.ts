import R from 'ramda'
import S from 'sanctuary'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'
import { Duration } from './duration'
import { passDays, passMonths, passWeeks, passYears } from './passTime'

export interface HDate {
  readonly year: number
  readonly month: number
  readonly week: number
  readonly day: number
}

/** history date */
const baseAge: HDate = {
  year: 1,
  month: 1,
  week: 1,
  day: 1,
}

export const createDate = (passedTime: Duration = {}): HDate => {
  type Mod = (age: HDate) => HDate
  const mods: Mod[] = []
  if ('years' in passedTime && passedTime.years > 0) {
    mods.push(passYears(passedTime.years))
  }
  if ('months' in passedTime && passedTime.months > 0) {
    mods.push(passMonths(passedTime.months))
  }
  if ('weeks' in passedTime && passedTime.weeks > 0) {
    mods.push(passWeeks(passedTime.weeks))
  }
  if ('days' in passedTime && passedTime.days > 0) {
    mods.push(passDays(passedTime.days))
  }
  const applyMods = mods.length
    ? R.pipe(...(mods as [Mod?, Mod?, Mod?, Mod?]))
    : R.identity

  return applyMods(baseAge)
}

export const fromDays = (createDate.fromDays = (days: number) =>
  createDate({ days: days - 1 }))

export const totalYears = (age: HDate) => {
  return age.year - 1
}
export const totalMonths = (age: HDate) => {
  return (age.year - 1) * MONTHS_PER_YEAR + (age.month - 1)
}
export const totalWeeks = (age: HDate) => {
  return totalMonths(age) * WEEKS_PER_MONTH + (age.week - 1)
}
export const totalDays = (age: HDate) => {
  return totalWeeks(age) * DAYS_PER_WEEK + (age.day - 1)
}

/** check the second age is _before_ the first age */
export const isBefore = S.curry2(
  (before: HDate, age: HDate) => totalDays(age) < totalDays(before),
)

/** check the second age is _after_ the first age */
export const isAfter = S.curry2(
  (after: HDate, age: HDate) => totalDays(age) > totalDays(after),
)
