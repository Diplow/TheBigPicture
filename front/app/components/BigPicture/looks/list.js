import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import BigPicturePreview from '../preview'
import { useAuthorCheck } from './index'
import * as cst from '../../../constants'
import "./style.scss"


const bpSort = (a, b, key) => {
  // Sort by median first, then average, and then by count.
  if (a.results[key] > b.results[key])
    return true
  if (a.results[key] == b.results[key]) {
    if (key == "median" && a.results.average > b.results.average)
      return true
    if (key == "own" || a.results.average == b.results.average)
      return a.results.count > b.results.count
  }
  return false
}

const ratingIndicators = (rating) => {
  const baseClass = "tbp-star fa fa-star "
  const possibleRatings = [1, 2, 3, 4, 5]
  return (
    <div className="level is-mobile tbp-star-level">
      <div className="level-item star-rating">
        {
          possibleRatings.map((val) => {
            return (
              <span key={"rating"+val}className={rating >= val ? baseClass + "checked" : baseClass} />
            )
          })
        }
      </div>
    </div>
  )
}

const BigPictureListLook = ({user, bigPictures, buttons, showRatings, ownRating }) => {
  const pageSize = 30.
  const sortKey = ownRating ? "own" : "median"
  const orderedBigPictures = bigPictures.sort((a, b) => bpSort(a, b, sortKey) ? 1 : -1)
  const [pagination, page] = usePagination(bigPictures, pageSize)

  const getBpByRating = (page, rating) => {
    return (

      <div>
        { showRatings ? ratingIndicators(rating) : null }
        {
          page.map((bp) => {
            if (rating == bp.results[sortKey]) {
              return (
                <BigPicturePreview
                  key={bp.id}
                  bpId={bp.id}
                  buttons={buttons}
                />
              )
            }
            return null
          })
        }
      </div>
    )
  }

  return (
    <div className="section">
      { pagination }
      { getBpByRating(page, 5) }
      { getBpByRating(page, 4) }
      { getBpByRating(page, 3) }
      { getBpByRating(page, 2) }
      { getBpByRating(page, 1) }
      { getBpByRating(page, 0) }
    </div>
  )
}

BigPictureListLook.propTypes = {
  user: PropTypes.object.isRequired,
  showRatings: PropTypes.bool.isRequired,
  ownRating: PropTypes.bool.isRequired,
  bigPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default BigPictureListLook
