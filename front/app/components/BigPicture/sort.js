
const sortBigPictures = (a, b) => {
  // Sort by modif date
  if (a.pin !== b.pin)
    return a.pin ? -1 : 1
  const aModifDate = new Date(a.modification_date)
  const bModifDate = new Date(b.modification_date)
  return aModifDate>bModifDate ? -1 : aModifDate<bModifDate ? 1 : 0
}

export default sortBigPictures
