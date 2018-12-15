import R from 'ramda'
import { Action, combineReducers } from 'redux'

import { HDate, PassTimeAction, reducer as ageReducer } from '../h-date'

export interface Creature {
  species: string
  lifeRemaining: HDate
}

export interface Content {
  id: number
  content: Content[]
  creatures: Creature[]
}

const applyReducerWith = (() => {
  type Reducer<S = any, A = any> = (state: S, action: A) => S
  const map = new WeakMap<Reducer, any>()

  return <S, A extends Action>(reducer: Reducer<S, A>) => {
    if (map.has(reducer)) {
      return map.get(reducer)
    }
    const fn = R.curry(R.flip(reducer))
    map.set(reducer, fn)
    return fn
  }
})()

type ContentAction = Action | PassTimeAction

const reduceAgeWith = applyReducerWith(ageReducer)
export const contentReducer = (
  content: Content[] = [],
  action: ContentAction,
) => {
  switch (action.type) {
    case 'PASS_TIME':
      const time = action as PassTimeAction
      return content.map(
        R.evolve({
          ...bindAction(action, { content: contentReducer }),
          creatures: R.map(
            R.when(
              R.has('species'),
              R.evolve({
                lifeRemaining: reduceAgeWith(time),
              }),
            ),
          ),
        }),
      )
  }

  return content
}

export interface Place extends Content {
  name: string
  places: Place[]
}

const cachedReducer = R.memoizeWith(
  R.pipe(
    R.keys,
    R.join(''),
  ),
  combineReducers,
)

interface SetPlaceNameAction extends Action {
  type: 'SET_PLACE_NAME'
  value: {
    id: number
    name: string
  }
}

const bindAction = <T>(action: Action, map) => (item: T) =>
  cachedReducer(map)(item, action)

type PlaceAction = SetPlaceNameAction | PassTimeAction

const reduceContentWith = applyReducerWith(contentReducer)

const placeReducer = (places: Place[] = [], action: PlaceAction) => {
  const reducePlaceWith = applyReducerWith(placeReducer)

  switch (action.type) {
    case 'PASS_TIME': {
      const updated = places.map(
        R.evolve({
          content: reduceContentWith(action),
          places: reducePlaceWith(action),
        }),
      )
      return updated
    }
    case 'SET_PLACE_NAME': {
      const { id, name } = action.value
      return places.map(R.when(R.whereEq({ id }), R.merge({ name })))
    }
  }
  return places
}

export const worldReducer = combineReducers({
  places: placeReducer,
  content: contentReducer,
})
