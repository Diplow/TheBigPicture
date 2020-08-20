
import * as cst from '../../constants'


const ratingsSort = (rA, rB) => {
  const dateA = new Date(rA.date)
  const dateB = new Date(rB.date)
  if (rA.new) {
    if (!rB.new)
      return -1
    return dateA < dateB ? 1 : -1
  }
  if (rB.new)
    return 1
  if (rA.basisCount != rB.basisCount)
    return rA.basisCount > rB.basisCount ? -1 : 1
  else if (dateA != dateB)
    return dateA < dateB ? -1 : 1
  else
    return rA.body < rB.body ? -1 : 1
}

export default ratingsSort
