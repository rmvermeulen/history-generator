import { createDate, isAfter, isBefore } from '../../src/h-date/HDate'

describe('Compare dates', () => {
  test('isAfter', () => {
    const cmp = isAfter(createDate({ years: 10 }))
    expect(cmp(createDate({ years: 10 }))).toBe(false)
    expect(cmp(createDate({ years: 9 }))).toBe(false)
    expect(cmp(createDate({ years: 10, days: 2 }))).toBe(true)
  })
  test('isBefore', () => {
    const cmp = isBefore(createDate({ years: 10 }))
    expect(cmp(createDate({ years: 10 }))).toBe(false)
    expect(cmp(createDate({ years: 10, days: 2 }))).toBe(false)
    expect(cmp(createDate({ years: 9 }))).toBe(true)
  })
})
