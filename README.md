# next-day-at
Node.js module to get the timestamp for the next week day at a specific hour + minute

## Usage

`getNextDayAt(dayName, hourUTC, minuteUTC)`

```js
const getNextDayAt = require('next-day-at')
const fridayTimestamp = getNextDayAt('friday', 13, 0)
console.log(fridayTimestamp)
```
