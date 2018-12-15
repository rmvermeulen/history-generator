import R from 'ramda'

import { HDate } from '../../h-date'

export interface Creature {
  species: string
  daysRemaining: number
  readonly created: HDate
}

export const passTime = R.curry((days: number, creature: Creature) =>
  R.evolve({
    daysRemaining: (life) => Math.max(0, life - days),
  })(creature),
)

export const createCreature = R.pipe(
  R.defaultTo({}),
  R.evolve({
    daysRemaining: Math.round,
  }),
  R.merge({
    species: 'creature',
    daysRemaining: 0,
  }),
)
