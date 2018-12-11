import {
  createAge,
  DAYS_PER_WEEK,
  MONTHS_PER_YEAR,
  WEEKS_PER_MONTH,
} from '../src/age'

describe('createAge', () => {
  const defaultAge = {
    year: 1,
    month: 1,
    week: 1,
    day: 1,
  }
  it('has a default', () => {
    expect(createAge()).toEqual(defaultAge)
  })

  it('can pass time on construction', () => {
    expect(createAge({ year: 5 })).toEqual({
      ...defaultAge,
      year: 6,
    })
    expect(createAge({ month: 5 })).toEqual({
      ...defaultAge,
      month: 6,
    })
    expect(createAge({ week: 5 })).toEqual({
      ...defaultAge,
      week: 6,
    })
    expect(createAge({ day: 5 })).toEqual({
      ...defaultAge,
      day: 6,
    })
  })

  it('returns a valid age from invalid input', () => {
    const validAgeMatcher = {
      year: expect.any(Number),
      month: expect.toBeWithin(1, MONTHS_PER_YEAR + 1),
      week: expect.toBeWithin(1, WEEKS_PER_MONTH + 1),
      day: expect.toBeWithin(1, DAYS_PER_WEEK + 1),
    }

    const day99 = createAge({ day: 99 })
    expect(day99).toEqual(validAgeMatcher)
    expect(day99).toMatchObject({
      day: 4,
      month: 3,
      week: 5,
      year: 1,
    })

    const week99 = createAge({ week: 99 })
    expect(week99).toEqual(validAgeMatcher)
    expect(week99).toMatchObject({
      day: 1,
      month: 7,
      week: 4,
      year: 2,
    })

    const month99 = createAge({ month: 99 })
    expect(month99).toEqual(validAgeMatcher)
    expect(month99).toMatchObject({
      day: 1,
      month: 10,
      week: 1,
      year: 10,
    })

    const overflow = createAge({
      year: 456,
      month: 456,
      week: 456,
      day: 456,
    })
    expect(overflow).toEqual(validAgeMatcher)
    expect(overflow).toEqual({
      day: 1,
      month: 5,
      week: 5,
      year: 510,
    })
  })
})
