import { createAge, isAfter, isBefore } from '../../src/age/age'

describe('Compare ages', () => {
  test('isAfter', () => {
    const cmp = isAfter(createAge({ year: 10 }))
    expect(cmp(createAge({ year: 10 }))).toBe(false)
    expect(cmp(createAge({ year: 9 }))).toBe(false)
    expect(cmp(createAge({ year: 10, day: 2 }))).toBe(true)
  })
  test('isBefore', () => {
    const cmp = isBefore(createAge({ year: 10 }))
    expect(cmp(createAge({ year: 10 }))).toBe(false)
    expect(cmp(createAge({ year: 10, day: 2 }))).toBe(false)
    expect(cmp(createAge({ year: 9 }))).toBe(true)
  })
})
