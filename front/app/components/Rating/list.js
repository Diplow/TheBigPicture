import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
import RatingPreview from './preview'
import { RatingButton } from './buttons'
import { getBigPictureRatings } from '../../actions'
import * as cst from '../../constants/index'
import "./style.scss"


const RatingListLook = ({ user, ratings, margin, showHeader, loadFirstPage, target, getPage }) => {
  ratings.sort(ratingsSort)
  const [pagination, page] = usePagination(ratings, target.ratingCount, getPage, cst.PAGE_SIZE, loadFirstPage)
  const [hidden, setHidden] = useState(false)

  return (
    <div>
      { showHeader ? header(user, target, hidden, setHidden) : null }
      {
        !hidden
        ? <div>
          { ratings.length == 0 ? <p className="vde-no-comment subtitle">Il n'y a pas encore de commentaires.</p> : null }
          {
            page.map((rating) => {
              return (
                <RatingPreview
                  key={`ratingpreview-${rating.id}`}
                  ratingId={rating.id}
                  margin={margin}
                />
              )
            })
          }
          { pagination }
          </div>
        : null
      }
    </div>
  )
}

RatingListLook.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  margin: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  loadFirstPage: PropTypes.bool.isRequired,
  target: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  ratingsFilter: PropTypes.func.isRequired,
}

const header = (user, target, hidden, setHidden) => {
  return (
    <div className="level is-mobile vde-header">
      <div className="level-left">
        { hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-plus"></i></figure> : null }
        { !hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-minus"></i></figure> : null }
        <p className="subtitle level-item vde-subtitle-bp-page">Commentaires</p>
        { user.id !== cst.GUEST_ID ? addRatingButton(target) : null }
      </div>
    </div>
  )
}
const ratingsSort = (ratingA, ratingB) => {
  return ratingA.median >= ratingB.median ? 1 : -1
}

const addRatingButton = (bigPicture) => {
  const initRating = {
    value: 0,
    target_bp: bigPicture.id,
    target_rating: null,
    reason: "",
    subject: bigPicture.subject
  }
  if (initRating.subject == null)
    initRating.subject = bigPicture.id
  return (
    <div className="tbp-radio vde-add-comment">
      <RatingButton initRating={initRating} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.get("ratings").filter(ownProps.ratingsFilter),
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPage: (page) => { dispatch(getBigPictureRatings(page, ownProps.target.id)) }
  }
}

const RatingList = connect(mapStateToProps, mapDispatchToProps)(RatingListLook)

export default RatingList
