
import * as cst from '../../constants'


const ratingsSort = (rA, rB) => {
  const dateA = new Date(rA.date)
  const dateB = new Date(rB.date)
  if (rA.basisCount != rB.basisCount)
    return rA.basisCount > rB.basisCount ? -1 : 1
  else if (dateA != dateB)
    return dateA < dateB ? -1 : 1
  else
    return 0
}

export default ratingsSort
