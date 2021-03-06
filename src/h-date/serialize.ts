import capitalize = require('capitalize')

import {
  DAY_NAMES,
  DAYS_PER_WEEK,
  getDayIndex,
  getMonthIndex,
  MONTH_NAMES,
} from './constants'
import { HDate } from './HDate'

export const toLongString = (age: HDate) => {
  const day = capitalize(DAY_NAMES[age.day])
  const month = capitalize(MONTH_NAMES[age.month])
  const monthDays = age.day + (age.week - 1) * DAYS_PER_WEEK
  return `${day}, ${monthDays} ${month} of ${age.year}`
}
export const fromLongString = (ageString: string): HDate => {
  const [day, monthDays, monthName, , yearStr] = ageString.split(/\s+/)
  return {
    year: Number(yearStr),
    month: getMonthIndex(monthName),
    week: Math.floor((Number(monthDays) - 1) / DAYS_PER_WEEK) + 1,
    day: getDayIndex(day.split(',')[0]),
  }
}

export const toShortString = ({ year, month, week, day }: HDate): string => {
  return [
    String(year).padStart(4, '0'),
    String(month).padStart(2, '0'),
    String(week).padStart(1, '0'),
    String(day).padStart(1, '0'),
  ].join('/')
}

export const fromShortString = (ageString: string): HDate => {
  const [year, month, week, day] = ageString.split('/').map(Number)

  return {
    year,
    month,
    week,
    day,
  }
}
