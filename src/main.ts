import { createStore } from 'redux'
import * as S from 'sanctuary'
import * as R from 'ramda'
import { passTime, Age, TimeUnit } from './age'

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
  value: [100, 'days']
})
