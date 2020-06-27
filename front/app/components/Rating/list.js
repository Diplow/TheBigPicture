
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
    sortFunc,
    loadFirstPage,
    title,
    buttons,
    margin,
    name,
    icon
  } = props

  return (
    <List
      name={name}
      items={ratings}
      container={(rating) => <RatingPreview ratingId={rating.id} margin={margin} />}
      user={user}
      emptyMessage={emptyMessage}
      sortFunc={sortFunc || ratingsSort}
      count={count}
      getPage={getPage}
      loadFirstPage={loadFirstPage}
      title={title}
      buttons={buttons}
      margin={margin}
      icon={icon}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  ratings: state.get("ratings").filter(ownProps.filter),
  user: state.get("user")
})

const RatingList = connect(mapStateToProps)(RatingListLook)

export default RatingList
