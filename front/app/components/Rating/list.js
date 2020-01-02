import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
import RatingPreview from './preview'
import { RatingButton } from './buttons'
import { getBigPictureRatings } from '../../actions'
import * as cst from '../../constants/index'
import "./style.scss"


const RatingListLook = ({ user, ratings, target, getPage, ratingsFilter }) => {
  ratings.sort(ratingsSort)
  const [pagination, page] = usePagination(ratings, target.ratingCount, getPage, cst.PAGE_SIZE)

  return (
    <div className="section">
      <div className="level is-mobile">
        <div className="level-left">
          <p className="subtitle level-item vde-subtitle-bp-page">Commentaires</p>
          { user.id !== 0 ? addRatingButton(target) : null }
        </div>
        <div className="level-right">
          { pagination }
        </div>
      </div>
      { ratings.length == 0 ? <p className="vde-no-comment subtitle">Il n'y a pas encore de commentaires.</p> : null }
      {
        page.map((rating) => {
          return (
            <RatingPreview
              key={`ratingpreview-${rating.id}`}
              ratingId={rating.id}
              margin={0}
            />
          )
        })
      }
    </div>
  )
}

RatingListLook.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  getPage: PropTypes.func.isRequired,
  ratingsFilter: PropTypes.func.isRequired,
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
    <div className="button tbp-radio vde-add-comment is-narrow">
      <RatingButton initRating={initRating} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.get("results").filter(ownProps.ratingsFilter),
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
