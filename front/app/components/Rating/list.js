
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
    return ratingA.median >= ratingB.median ? 1 : -1
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
