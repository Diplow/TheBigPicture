import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import BigPicturePreview from '../preview'
import { useAuthorCheck } from './index'
import * as cst from '../../../constants'
import "./style.scss"


const bpSort = (a, b) => {
  // Sort by median first, then average, and then by count.
  if (a.results.median > b.results.median)
    return true
  if (a.results.median == b.results.median) {
    if (a.results.average > b.results.average)
      return true
    if (a.results.average == b.results.average)
      return a.results.count > b.results.count
  }
  return false
}

const ratingIndicators = (rating) => {
  const baseClass = "tbp-star fa fa-star "
  return (
    <div className="level is-mobile">
      <div className="level-item star-rating">
        <span className={rating >= 1 ? baseClass + "checked" : baseClass} />
        <span className={rating >= 2 ? baseClass + "checked" : baseClass} />
        <span className={rating >= 3 ? baseClass + "checked" : baseClass} />
        <span className={rating >= 4 ? baseClass + "checked" : baseClass} />
        <span className={rating >= 5 ? baseClass + "checked" : baseClass} />
      </div>
    </div>
  )
}

const BigPictureListLook = ({user, bigPictures, buttons, showRatings }) => {
  const pageSize = 30.
  const orderedBigPictures = bigPictures.sort((a, b) => bpSort(a, b) ? 1 : -1)
  const [pagination, page] = usePagination(bigPictures, pageSize)

  const getBpByRating = (page, rating) => {
    return (

      <div>
        { showRatings ? ratingIndicators(rating) : null }
        {
          page.map((bp) => {
            if (bp.results.median == rating) {
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
  bigPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default BigPictureListLook
