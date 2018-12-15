import { combineReducers, createStore } from 'redux'

import { HDate, reducer as ageReducer, toLongString } from './h-date'
import { Place, worldReducer } from './world'

interface GameState {
  age: HDate
  world: Place
}

const rootReducer = combineReducers<GameState>({
  age: ageReducer,
  world: worldReducer as any,
})

const store = createStore(rootReducer, {
  world: { name: 'world' },
})

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
