
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
import RatingPreview from './preview'
import List from '../List'
import * as cst from '../../constants'
import "./style.scss"



const RatingListLook = (props) => {
  const {
    ratings,
    user,
    emptyMessage,
    parent,
    count,
    getPage,
    showHeader,
    loadFirstPage,
    title,
    margin,
    buttons
  } = props

  
  const ratingsSort = (ratingA, ratingB) => {
    const ENOUGH_RATINGS = 5
    const sort = (rA, rB) => {
      const dateA = new Date(rA.date)
      const dateB = new Date(rB.date)
      if (rA.median != rB.median) {
        return rA.median > rB.median ? 1 : -1 
      }
      else if (rA.average != rB.average) {
        return rA.average > rB.average ? 1 : -1
      }
      else if (rA.ratingcount != rB.ratingcount) {
        return rA.ratingcount > rB.ratingcount ? 1 : -1 
      }
      else if (dateA != dateB) {
        return dateA < dateB ? 1 : -1
      }
      else {
        return 0
      }
    }
    if (ratingA.ratingcount > ENOUGH_RATINGS) {
      if (ratingB.ratingcount > ENOUGH_RATINGS)
        return sort(ratingA, ratingB)
      else {
        return 1
      }
    }
    else {
      if (ratingB.ratingcount > ENOUGH_RATINGS)
        return -1
      else {
        return sort(ratingA, ratingB)
      }
    }
  }

  return (
    <List
      items={ratings}
      container={(rating) => <div key={`previewrating-${rating.id}`} ><RatingPreview ratingId={rating.id} margin={margin} /></div>}
      user={user}
      emptyMessage={emptyMessage}
      sortFunc={ratingsSort}
      count={count}
      getPage={getPage}
      loadFirstPage={loadFirstPage}
      showHeader={showHeader}
      title={title}
      buttons={buttons}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ratings: state.get("ratings").filter(ownProps.filter),
    user: state.get("user")
  }
}

const RatingList = connect(mapStateToProps)(RatingListLook)

export default RatingList
