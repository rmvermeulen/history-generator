import { createDate } from '../../src/h-date/HDate'

export const fixtures = [
  {
    age: createDate({}),
    long: 'Ada, 1 Janumon of 1',
    short: '0001/01/1/1',
  },
  {
    age: createDate({ years: 1 }),
    long: 'Ada, 1 Janumon of 2',
    short: '0002/01/1/1',
  },
  {
    age: createDate({ years: 1003 }),
    long: 'Ada, 1 Janumon of 1004',
    short: '1004/01/1/1',
  },
  {
    age: createDate({ months: 3 }),
    long: 'Ada, 1 Aprimon of 1',
    short: '0001/04/1/1',
  },
  {
    age: createDate({ months: 1003 }),
    long: 'Ada, 1 Aprimon of 101',
    short: '0101/04/1/1',
  },
  {
    age: createDate({ weeks: 3 }),
    long: 'Ada, 19 Janumon of 1',
    short: '0001/01/4/1',
  },
  {
    age: createDate({ weeks: 1003 }),
    long: 'Ada, 7 Oktomon of 17',
    short: '0017/08/2/1',
  },
  {
    age: createDate({ days: 3 }),
    long: 'Doda, 4 Janumon of 1',
    short: '0001/01/1/4',
  },
  {
    age: createDate({ days: 1003 }),
    long: 'Beda, 32 Oktomon of 3',
    short: '0003/08/6/2',
  },
]
