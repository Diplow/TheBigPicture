import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AuthorIcon from '../User/authorIcon'
import * as cst from '../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useToggle } from '../utils/hooks'
import "./style.scss"
import { getRatingRatings } from '../../actions'
import { RatingButton, EditRatingButton } from './buttons'
import List from '../List'
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
      { showRatings ? ratingChildren(rating, ratings, margin, user, getPage) : null }
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

const staticStorage = "https://vde-staticfiles.s3.eu-west-3.amazonaws.com/static/icons/"
const valueIcons = {
  0: "information.svg",
  1: "star-for-number-one.svg",
  2: "star-with-number-two.svg",
  3: "star-number-3.svg",
  4: "star-with-number-4.svg",
  5: "star-number-five.svg"
}

const ratingLeftLevel = (rating) => {
	return (
    <div className="level-left">
      <figure className="vde rating-image level-item image is-48x48">
        <img src={staticStorage + valueIcons[rating.value]} />
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
        <EditRatingButton initRating={rating} classname="vde toolbar" />
        <RatingButton initRating={initRating} />
        { rating.ratingCount != 0 ? <RadioButton
          classname="vde toolbar"
          isPushed={showRatings}
          setIsPushed={toggleRatings}
          icon={"fas fa-comments"}
        /> : null }
        <RadioButton
          classname="vde toolbar"
          isPushed={showResults}
          setIsPushed={toggleResults}
          icon={"far fa-chart-bar"} />
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

const ratingChildren = (rating, children, parentMargin, user, getPage) => {

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
      user={user}
      emptyMessage={""}
      sortFunc={ratingsSort}
      count={rating.ratingCount}
      getPage={(page) => getPage(page, rating.id)}
      loadFirstPage={true}
      showHeader={false}
      title={""}
      buttons={[]}
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
    getPage: (page, ratingId) => dispatch(getRatingRatings(page, ratingId))
  }
}

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
