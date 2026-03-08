import getVisitedList from './getVisitedList'

export default function getOrderSongsRank(array) {
  const visited = getVisitedList(array)
  const map = new Map()
  for (const stop of visited) {
    for (const song of stop.orderSongs) {
      map.set(song, (map.get(song) || 0) + 1)
    }
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
}
