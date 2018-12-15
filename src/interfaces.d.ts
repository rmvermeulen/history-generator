import { Ageing } from './age'
import { Duration } from './h-date'

declare interface Identity {
  id: number
}

declare interface Individual extends Identity, Ageing {
  name: string
}
