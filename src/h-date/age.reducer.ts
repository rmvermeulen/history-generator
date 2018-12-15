import R from 'ramda'

import { Duration } from '.'
import { AgeAction, PASS_TIME } from './age.actions'
import { createDate, HDate } from './HDate'
import { passDays, passMonths, passWeeks, passYears } from './passTime'

type Modifier = (age: HDate) => HDate
interface ModMap {
  year: Modifier
  month: Modifier
  week: Modifier
  days: Modifier
}

const passTime = R.pipe<Duration, Partial<ModMap>, Modifier[], Modifier>(
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
export const reducer = (
  state: HDate = createDate(),
  action: AgeAction,
): HDate => {
  switch (action.type) {
    case PASS_TIME: {
      const updateState = passTime(action.value)
      // return updateState
      return updateState(state)
    }
  }
  return state
}
