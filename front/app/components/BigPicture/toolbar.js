
const ToolBar = (props) => {
  const {
    bigPicture,
    ratings,
    showDetails,
    showRatings,
    showChildren,
    showResults,
    toggleDetails,
    toggleRatings,
    toggleChildren,
    toggleResults,
    init,
    setter,
    user
  } = props

  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{bigPicture.creation_date}</p>
      </div>
      <div className="level-right">
        {editButton(init, setter)}
        {ratingButton(bigPicture, user)}
        { bigPicture.body != "" ? toggleDetailsButton(showDetails, toggleDetails) : null}
        {toggleResultsButton(showResults, toggleResults)}
        { bigPicture.children.length != 0 ? toggleChildrenButton(showChildren, toggleChildren) : null}
        { bigPicture.ratingCount != 0 || ratings.length != 0 ? toggleRatingButton(showRatings, toggleRatings) : null}
        {lookButton(bigPicture)}
      </div>
    </div>
  )
}