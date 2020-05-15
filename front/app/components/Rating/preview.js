import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthorIcon from '../User/authorIcon'
import * as cst from '../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useToggle } from '../utils/hooks'
import "./style.scss"
import { getRatings } from '../../actions'
import { RatingButton } from './buttons'
import List, { getPageFormatter } from '../List'
import RadioButton from '../Buttons/radio'
import ReactMarkdown from 'react-markdown'
import RatingResults from './results'


const RatingPreviewLook = ({ rating, ratings, user, ratingId, margin, getPage }) => {
  const [showRatings, toggleRatings] = useToggle(false)
  const [showResults, toggleResults] = useToggle(false)

  if (rating == undefined || rating == null)
    return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}} key={`ratingpreview${rating.id}`}>
      <div className="vde card reason">
        <header className="vde card-header level preview-item-level is-mobile">
          { ratingLeftLevel(rating) }
        </header>
        { toolBar(rating, ratings, showRatings, toggleRatings, showResults, toggleResults, user) }
      </div>
      { showResults ? <RatingResults ratingId={rating.id} /> : null }
      { showRatings ? ratingChildren(rating, ratings, margin, getPage) : null }
    </div>
  )
}

RatingPreviewLook.propTypes = {
  ownRating: PropTypes.object, 
  rating: PropTypes.object,
  ratings: PropTypes.arrayOf(PropTypes.object),
  ratingId: PropTypes.number.isRequired, // used by connect
  ratingUser: PropTypes.number,
  margin: PropTypes.number, // leftmargin in case of rating / bp nesting
}

const ratingLeftLevel = (rating) => {
  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      <figure className="vde rating-image level-item image is-48x48">
        <img src={cst.STATIC_STORAGE + cst.VALUE_ICONS[rating.value]} />
      </figure>
      <div className="vde card-content vde-preview-content">
        <div className="content">
          <ReactMarkdown source={rating.reason} />
        </div>
      </div>
    </div>
  )
}

const toolBar = (rating, ratings, showRatings, toggleRatings, showResults, toggleResults, user) => {
  const initRating = {
    value: 0,
    target_bp: null,
    target_rating: rating.id,
    author_id: user.id,
    reason: "",
    subject: rating.subject
  }
  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{rating.date}</p>
      </div>
      <div className="level-right">
        <RatingButton
          initRating={rating}
          classname="vde toolbar"
          icon="fas fa-edit" />
        <RatingButton
          initRating={initRating}
          classname="vde toolbar"
          icon="fas fa-star" />
        <RadioButton
          classname="vde toolbar"
          isPushed={showRatings}
          setIsPushed={toggleRatings}
          icon="fas fa-comments" />
        <RadioButton
          classname="vde toolbar"
          isPushed={showResults}
          setIsPushed={toggleResults}
          icon="far fa-chart-bar" />
      </div>
    </div>
  )
}


const toggleResults = (showResults, toggleResults) => {
  return (
    <RadioButton
      classname={""}
      isPushed={showResults}
      setIsPushed={toggleResults}
      icon={"fas fa-chart-bar"}
    />
  )
}

const ratingChildren = (rating, children, parentMargin, getPage) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )
  
  const ratingsSort = (ratingA, ratingB) => {
    return ratingA.median >= ratingB.median ? 1 : -1
  }

  return (
    <List
      items={children}
      container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} margin={margin} />}
      emptyMessage={"Cette raison n'a pas encore été raisonnée..."}
      sortFunc={ratingsSort}
      count={rating.ratingCount}
      getPage={
        (page, options, reqId) => {
          getPage(page, { ...options, rating: rating.id }, reqId)
        }
      }
      loadFirstPage={true}
    />
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    rating: state.get("ratings").find(rating => rating.id == ownProps.ratingId),
    ratings: state.get("ratings").filter(rating => rating.target_rating == ownProps.ratingId),
    user: state.get("user")
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPage: getPageFormatter(dispatch, getRatings)
  }
}

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
