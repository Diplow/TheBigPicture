
import * as cst from '../../constants'


const ratingsSort = (ratingA, ratingB) => {
  const ENOUGH_ENDORSMENTS = 5
  const sort = (rA, rB) => {
    const dateA = new Date(rA.date)
    const dateB = new Date(rB.date)
    if (rA.endorsmentCount != rB.endorsmentCount)
      return rA.endorsmentCount > rB.endorsmentCount ? -1 : 1 
    else if (rA.ratingCount != rB.ratingCount)
      return rA.ratingCount > rB.ratingCount ? -1 : 1 
    else if (dateA != dateB)
      return dateA < dateB ? -1 : 1
    else
      return 0
  }
  if (ratingA.endorsmentCount > ENOUGH_ENDORSMENTS) {
    if (ratingB.endorsmentCount > ENOUGH_ENDORSMENTS)
      return sort(ratingA, ratingB)
    else {
      return 1
    }
  }
  else {
    if (ratingB.endorsmentCount > ENOUGH_ENDORSMENTS)
      return -1
    else {
      return sort(ratingA, ratingB)
    }
  }
}

export default ratingsSort
