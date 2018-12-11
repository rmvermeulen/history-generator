import capitalize = require('capitalize')
import { Age } from './age'
import {
  DAY_NAMES,
  DAYS_PER_WEEK,
  getDayIndex,
  getMonthIndex,
  MONTH_NAMES,
} from './constants'

export const toLongString = (age: Age) => {
  const day = capitalize(DAY_NAMES[age.days])
  const month = capitalize(MONTH_NAMES[age.months])
  const monthDays = age.days + (age.weeks - 1) * DAYS_PER_WEEK
  return `${day}, ${monthDays} ${month} of ${age.years}`
}
export const fromLongString = (ageString: string): Age => {
  const [day, monthDays, monthName, , yearStr] = ageString.split(/\s+/)
  return Age.create({
    years: Number(yearStr),
    months: getMonthIndex(monthName),
    weeks: Math.floor(Number(monthDays) / DAYS_PER_WEEK),
    days: getDayIndex(day.split(',')[0]),
  })
}

export const toShortString = ({ years, months, weeks, days }: Age): string => {
  return [
    String(years).padStart(4, '0'),
    String(months).padStart(2, '0'),
    String(weeks).padStart(1, '0'),
    String(days).padStart(1, '0'),
  ].join('/')
}

export const fromShortString = (ageString: string): Age => {
  const [years, months, weeks, days] = ageString.split('/').map(Number)

  return Age.create({
    years,
    months,
    weeks,
    days,
  })
}
