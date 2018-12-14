import { Action } from 'redux'

import { IAge } from './age'

export const PASS_TIME = 'PASS_TIME'

export type AgeAction = IPassTimeAction
export interface IPassTimeAction extends Action<typeof PASS_TIME> {
  value: Partial<IAge>
}
export const passTime = (value: Partial<IAge>): IPassTimeAction => ({
  type: PASS_TIME,
  value,
})
