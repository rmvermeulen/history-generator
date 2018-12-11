import { Age, isAfter, isBefore } from '../src/age/age'

describe('Compare ages', () => {
  test('isAfter', () => {
    const cmp = isAfter(Age.create({ years: 10 }))
    expect(cmp(Age.create({ years: 10 }))).toBe(false)
    expect(cmp(Age.create({ years: 9 }))).toBe(false)
    expect(cmp(Age.create({ years: 10, days: 2 }))).toBe(true)
  })
  test('isBefore', () => {
    const cmp = isBefore(Age.create({ years: 10 }))
    expect(cmp(Age.create({ years: 10 }))).toBe(false)
    expect(cmp(Age.create({ years: 10, days: 2 }))).toBe(false)
    expect(cmp(Age.create({ years: 9 }))).toBe(true)
  })
})
