
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import RatingPreview from './preview'
import List from '../List'
import ratingsSort from './sort'
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
    buttons,
    margin,
    reference
  } = props

  return (
    <List
      reference={reference}
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
      margin={margin}
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
