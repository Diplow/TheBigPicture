import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../../utils/pagination'
import BigPicturePreview from '../preview'
import * as cst from '../../../constants'
import "./style.scss"


const bpSort = (results, a, b, key) => {
  // Sort by median first, then average, and then by count.
  const aresult = results.find(elt => elt.target == a.id && elt.author == key)
  const bresult = results.find(elt => elt.target == b.id && elt.author == key)
  if (aresult == null || bresult == null)
    return 1
  if (aresult.value >= bresult.value)
    return 1
  return -1
}

const ratingIndicators = (results, rating, page, author) => {
  if (page.filter(bp => {
    const rslt = results.find(elt => elt.target == bp.id && elt.author == author)
    if (rating == 0)
      return rslt == null || rslt.value == 0
    return rslt != null && rating == rslt.value
  }).length == 0)
    return null
  const baseClass = "tbp-star fa fa-star "
  const possibleRatings = [1, 2, 3, 4, 5]
  return (
    <div className="level is-mobile tbp-star-level">
      <div className="level-item star-rating">
        {
          possibleRatings.map((val) => {
            return (
              <span key={"rating"+val} className={rating >= val ? baseClass + "checked" : baseClass} />
            )
          })
        }
      </div>
    </div>
  )
}

const BigPictureListLook = ({ user, bigPictures, results, buttons, showRatings, ratingUser, bigPictureIds, getBigPicture }) => {
  const pageSize = 15.
  bigPictures.sort((a, b) => bpSort(results, a, b, ratingUser))
  const [pagination, page] = usePagination(bigPictures, pageSize)

  useEffect(() => {
    for (let i = 0; i < bigPictureIds.length; ++i) {
      const bigPictureId = bigPictureIds[i]
      getBigPicture(bigPictureId, ratingUser)
    }
  }, [])


  const getBpByRating = (page, rating) => {
    return (
      <div>
        { showRatings ? ratingIndicators(results, rating, page, ratingUser) : null }
        {
          page.map((bp) => {
            const reslts = results.find(elt => elt.target == bp.id && elt.author == ratingUser)
            if (rating == 0 && reslts == null || (reslts != null && rating == reslts.value)) {
              return (
                <BigPicturePreview
                  key={bp.id}
                  bigPictureId={bp.id}
                  buttons={buttons}
                  margin={0}
                  ratingUser={ratingUser}
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
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratingUser: PropTypes.number,
  getBigPicture: PropTypes.func.isRequired
}

export default BigPictureListLook
