import getVisitedList from './getVisitedList'

export default function getKeywords(array) {
  const visited = getVisitedList(array)
  const set = new Set()
  for (const stop of visited) {
    set.add(stop.specialSong)
    for (const keyword of stop.keywords) {
      set.add(keyword)
    }
  }
  return Array.from(set)
}
