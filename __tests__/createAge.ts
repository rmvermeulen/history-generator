import {
  Age,
  DAYS_PER_WEEK,
  MONTHS_PER_YEAR,
  WEEKS_PER_MONTH,
} from '../src/age'

describe('Age.create', () => {
  const defaultAge = {
    years: 0,
    months: 1,
    weeks: 1,
    days: 1,
  }
  it('has a default', () => {
    expect(Age.create()).toEqual(defaultAge)
  })

  it('accepts partials', () => {
    expect(Age.create({ years: 5 })).toEqual({
      ...defaultAge,
      years: 5,
    })
    expect(Age.create({ months: 5 })).toEqual({
      ...defaultAge,
      months: 5,
    })
    expect(Age.create({ weeks: 5 })).toEqual({
      ...defaultAge,
      weeks: 5,
    })
    expect(Age.create({ days: 5 })).toEqual({
      ...defaultAge,
      days: 5,
    })
  })

  it('returns a valid age from invalid input', () => {
    const validAgeMatcher = {
      years: expect.any(Number),
      months: expect.toBeWithin(1, MONTHS_PER_YEAR + 1),
      weeks: expect.toBeWithin(1, WEEKS_PER_MONTH + 1),
      days: expect.toBeWithin(1, DAYS_PER_WEEK + 1),
    }

    const days100 = Age.create({ days: 100 })
    expect(days100).toEqual(validAgeMatcher)
    expect(days100).toMatchObject({
      days: 4,
      months: 3,
      weeks: 5,
      years: 0,
    })

    const weeks100 = Age.create({ weeks: 100 })
    expect(weeks100).toEqual(validAgeMatcher)
    expect(weeks100).toMatchObject({
      days: 1,
      months: 7,
      weeks: 4,
      years: 1,
    })

    const months100 = Age.create({ months: 100 })
    expect(months100).toEqual(validAgeMatcher)
    expect(months100).toMatchObject({
      days: 1,
      months: 10,
      weeks: 1,
      years: 9,
    })

    const overflow = Age.create({
      years: 456,
      months: 456,
      weeks: 456,
      days: 456,
    })
    expect(overflow).toEqual(validAgeMatcher)
    expect(overflow).toEqual({
      days: 6,
      months: 3,
      weeks: 3,
      years: 509,
    })
  })
})
