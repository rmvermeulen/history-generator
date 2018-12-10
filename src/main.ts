import * as R from 'ramda'
import { createStore } from 'redux'
import * as S from 'sanctuary'
import { Age, passTime, TimeUnit, toAgeString } from './age'

interface State {
  age: Age
}

const initialState: State = {
  age: Age.create()
}

type MyAction = { type: 'PASS TIME'; value: [number, TimeUnit] }

const checkType: <T>(
  fn: (value: T) => boolean
) => (data: Record<'type', T>) => boolean = R.flip(R.propSatisfies)(
  'type'
) as any

const rootReducer = (state: State = initialState, action: MyAction): State =>
  R.cond([
    [
      checkType(S.equals('PASS TIME')),
      ({ value: [amount, unitType] }) =>
        R.evolve({
          age: passTime(amount)(unitType)
        })
    ],
    // do nothing
    [R.T, () => R.identity]
  ])(action)(state)

const store = createStore(rootReducer)

// do something I guess

store.dispatch({
  type: 'PASS TIME',
  value: [25e5, 'days']
})
console.log(toAgeString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [1238, 'years']
})
console.log(toAgeString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [123, 'months']
})
console.log(toAgeString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [4, 'weeks']
})
console.log(toAgeString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [7463, 'days']
})
console.log(toAgeString(store.getState().age))
