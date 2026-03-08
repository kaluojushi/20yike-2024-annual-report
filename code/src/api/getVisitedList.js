import concertList from '../db/concert-list.json'

export default function getVisitedList(array) {
  return concertList.filter(item => array.includes(item.index))
}
