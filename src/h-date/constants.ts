import { assert } from 'chai'

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
  'decemon',
}
export const getMonthIndex = (input: string) => {
  const name = input.toLowerCase().trim()
  const result = MONTH_NAMES[name]
  assert(result, `Invalid month name: '${input}'`)
  return result
}

export enum DAY_NAMES {
  'ada' = 1,
  'beda',
  'ceda',
  'doda',
  'eda',
  'goda',
}

export const getDayIndex = (input: string) => {
  const name = input.toLowerCase().trim()
  const result = DAY_NAMES[name]
  assert(result, `Invalid day name: '${input}'`)
  return result
}
