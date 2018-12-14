import { assert } from 'chai'
import R from 'ramda'
import S from 'sanctuary'

import { DAYS_PER_WEEK, MONTHS_PER_YEAR, WEEKS_PER_MONTH } from './constants'
import { passDays, passMonths, passWeeks, passYears } from './passTime'

export interface Age {
  readonly year: number
  readonly month: number
  readonly week: number
  readonly day: number
}

const baseAge: Age = {
  year: 1,
  month: 1,
  week: 1,
  day: 1,
}

export const createAge = (passedTime: Partial<Age> = {}): Age => {
  type Mod = (age: Age) => Age
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
