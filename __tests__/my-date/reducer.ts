import { passTime } from '../../src/h-date/age.actions'
import { reducer } from '../../src/h-date/age.reducer'
import { createDate } from '../../src/h-date/HDate'

describe('Age reducer', () => {
  it('returns a valid state', () => {
    expect((reducer as any)(undefined, { type: null })).toContainKeys(
      Object.keys(createDate()),
    )
  })
  it('returns equivalent state on irrelevant action', () => {
    const state = createDate()
    const action = {
      type: 'SOME TYPE' as any,
      value: {},
    }
    const result = reducer(state, action)
    expect(result).toEqual(createDate())
  })
  it('applies an action to an age', () => {
    const state = createDate()
    const action = passTime({
      year: 2,
      week: 4,
    })
    const result = reducer(state, action)
    expect(result).toMatchObject({
      week: 5,
      year: 3,
    })
  })
})
