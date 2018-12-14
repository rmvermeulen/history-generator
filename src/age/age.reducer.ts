import R from 'ramda'

import { IAge } from './age'
import { AgeAction, PASS_TIME } from './age.actions'
import { passDays, passMonths, passWeeks, passYears } from './passTime'

type Modifier = (age: IAge) => IAge
interface IModMap {
  year: Modifier
  month: Modifier
  week: Modifier
  days: Modifier
}

const passTime = R.pipe<Partial<IAge>, Partial<IModMap>, Modifier[], Modifier>(
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
export const reducer = (state: IAge, action: AgeAction): IAge => {
  switch (action.type) {
    case PASS_TIME: {
      const updateState = passTime(action.value)
      // return updateState
      return updateState(state)
    }
  }
  return state
}
