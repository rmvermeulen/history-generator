import { combineReducers, createStore } from 'redux'

import { Age, reducer as ageReducer, toLongString } from './age'

interface GameState {
  age: Age
}

const rootReducer = combineReducers<GameState>({
  age: ageReducer,
})

const store = createStore(rootReducer)

// do something I guess

console.log(toLongString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [25e3, 'days'],
})
console.log(toLongString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [1238, 'years'],
})
console.log(toLongString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [123, 'months'],
})
console.log(toLongString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [4, 'weeks'],
})
console.log(toLongString(store.getState().age))
store.dispatch({
  type: 'PASS TIME',
  value: [7463, 'days'],
})
console.log(toLongString(store.getState().age))
