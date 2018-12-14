import { createAge } from '../src/age'
import { passTime } from '../src/age/age.actions'
import { reducer } from '../src/age/age.reducer'

describe('Age reducer', () => {
  it('returns a valid state', () => {
    expect((reducer as any)(undefined, { type: null })).toContainKeys(
      Object.keys(createAge()),
    )
  })
  it('returns equivalent state on irrelevant action', () => {
    const state = createAge()
    const action = {
      type: 'SOME TYPE' as any,
      value: {},
    }
    const result = reducer(state, action)
    expect(result).toEqual(createAge())
  })
  it('applies an action to an age', () => {
    const state = createAge()
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
