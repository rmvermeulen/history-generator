import { Action } from 'redux'

import { Duration } from './duration'

export const PASS_TIME = 'PASS_TIME'

export type AgeAction = PassTimeAction
export interface PassTimeAction extends Action<typeof PASS_TIME> {
  value: Duration
}
export const passTime = (value: Duration): PassTimeAction => ({
  type: PASS_TIME,
  value,
})
