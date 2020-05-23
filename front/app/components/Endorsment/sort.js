
const endorsmentsSort = (endorsmentA, endorsmentB) => {
  const dateA = new Date(endorsmentA.date)
  const dateB = new Date(endorsmentB.date)
  return dateA >= dateB ? 1 : -1
}

export default endorsmentsSort
