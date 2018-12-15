import { Ageing, Identity } from '../interfaces'

export interface Building extends Ageing, Identity {
  type: string
}
