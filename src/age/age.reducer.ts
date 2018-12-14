import R from 'ramda'

import { Age, createAge } from './age'
import { AgeAction, PASS_TIME } from './age.actions'
import { passDays, passMonths, passWeeks, passYears } from './passTime'

type Modifier = (age: Age) => Age
interface ModMap {
  year: Modifier
  month: Modifier
  week: Modifier
  days: Modifier
}

const passTime = R.pipe<Partial<Age>, Partial<ModMap>, Modifier[], Modifier>(
  // create a function from each value
  R.evolve({
    year: passYears,
    month: passMonths,
    week: passWeeks,
    days: passDays,
  }),
  // strip those functions
  R.values,
  // create a pipe of them
  R.apply(R.pipe) as (fns: Modifier[]) => Modifier,
)
export const reducer = (state: Age = createAge(), action: AgeAction): Age => {
  switch (action.type) {
    case PASS_TIME: {
      const updateState = passTime(action.value)
      // return updateState
      return updateState(state)
    }
  }
  return state
}
