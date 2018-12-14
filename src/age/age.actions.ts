import { Action } from 'redux'

import { Age } from './age'

export const PASS_TIME = 'PASS_TIME'

export type AgeAction = PassTimeAction
export interface PassTimeAction extends Action<typeof PASS_TIME> {
  value: Partial<Age>
}
export const passTime = (value: Partial<Age>): PassTimeAction => ({
  type: PASS_TIME,
  value,
})
