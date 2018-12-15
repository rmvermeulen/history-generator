import R from 'ramda'

import { add, Duration } from './h-date'

export interface Ageing {
  age: Duration
}

export const makeOlder = <T extends Ageing>(duration: Duration) =>
  R.evolve({ age: add(duration) }) as (target: T) => T
