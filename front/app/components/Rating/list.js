
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
    const ENOUGH_ENDORSMENTS = 5
    const sort = (rA, rB) => {
      const dateA = new Date(rA.date)
      const dateB = new Date(rB.date)
      if (rA.endorsmentCount != rB.endorsmentCount)
        return rA.endorsmentCount > rB.endorsmentCount ? 1 : -1 
      else if (rA.ratingCount != rB.ratingCount)
        return rA.ratingCount > rB.ratingCount ? 1 : -1 
      else if (dateA != dateB)
        return dateA < dateB ? 1 : -1
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
