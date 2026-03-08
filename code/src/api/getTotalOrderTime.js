import getVisitedList from './getVisitedList'

export default function getTotalOrderTime(array) {
  const visited = getVisitedList(array)
  const timeList = visited.map(v => v.orderTime)
  const totalSec = getTotalTime(timeList)
  return totalSec
}

function getTime(t) {
  const [min, sec, msec] = t.split(':').map(Number)
  return min * 60 + sec
}

function getTotalTime(ta) {
  let total = 0
  for (const t of ta) {
    total += getTime(t)
  }
  return total
}
