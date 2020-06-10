import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import Context from '../../../components/Context'
import Loader from '../../../components/Loader'
import EndorsmentPreview from '../../../components/Endorsment/preview'
import RatingList from '../../../components/Rating/list'
import Results from '../../../components/Rating/results'
import List from '../../../components/List'
import * as utils from '../../../utils'
import { RatingButton } from '../../../components/Rating/buttons'
import HideAndShowButton from '../../../components/Buttons/hideandshow'

import * as cst from '../../../constants'
import "./style.scss"


const RatingViewLook = (props) => {
  const {
    user,
    match,
    rating,
    ratings,
    endorsments,
    getRating,
    getRatingsPage,
    getEndorsmentsPage
  } = props

  const [init, setter] = useState(rating)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!rating)
      getRating(match.params.ratingId)
  }, [match])

  useEffect(() => {
    if (rating)
      setter(rating)
  }, [rating])

  return (
    <div className="vde-bigpicture-page">
      <Loader condition={!rating}>
        { header(init) }
        <div className="vde container section">
          { context(init) }
          { comments(init, getRatingsPage, user) }
          { results(init) }
          { endorsmentsList(init, endorsments, getEndorsmentsPage) }
        </div>
      </Loader>
    </div>
  )
}


const header = (rating) => {
  if (!rating) return null

  return (
    <div className="hero rating">
      <div className="vde container section">
        <div className="level is-mobile">
          <div style={{maxWidth: "100%"}} className="level-left">
            <h1 className="vde subtitle reason">
              {rating.body}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

const context = (rating) => {
  const [hidden, setHidden] = utils.hooks.useToggle(false)
  if (!rating) return null

  return (
    <div className="container vde section section-field">
      <div className="level is-mobile">
        <div className="level-left">
          <HideAndShowButton hidden={hidden} setHidden={setHidden} />
          <p className="vde subtitle level-item">{cst.labels.CONTEXT_TITLE}</p>
          { backButton(rating) }
        </div>
      </div>
      {
        !hidden 
          ? <Context classname="vde rating-page" ratingId={rating.target_rating} bpId={rating.target_bp} />
          : null
      }
    </div>
  )
}


const backButton = (rating) => {
  let to = "/"
  if (rating.target_bp)
    to = `/subject/${rating.subject}/bigPicture/${rating.target_bp}`
  if (rating.target_rating)
    to = `/subject/${rating.subject}/rating/${rating.target_rating}`
  return (
    <div className="button tbp-radio title-button is-narrow" key={`back${rating.id}`}>
      <Link to={to}>
        <span className="icon is-small"><i className={cst.icons.BACK}></i></span>
      </Link>
    </div>
  )
}


const comments = (rating, getRatingsPage, user) => {
  if (!rating) return null

  return (
    <RatingList
      name={`rating-page-${rating.id}-ratings-list`}
      target={rating}
      filter={(rtg) => rtg.target_rating == rating.id}
      loadFirstPage={false}
      count={rating.ratingCount}
      getPage={
        (page, options, requestId) => {
          return getRatingsPage(page, { ...options, rating: rating.id }, requestId)
        }
      }
      title={cst.labels.REASON_LIST_TITLE}
      emptyMessage={cst.labels.MSG_NO_REASON}
      buttons={[() => addRatingButton(rating, user)]}
      margin={0}
    />
  )
}


const addRatingButton = (rating, user) => {
  const initRating = {
    value: 0,
    target_bp: null,
    target_rating: rating.id,
    author_id: user.id,
    reason: "",
    subject: rating.subject
  }
  return (
    <RatingButton
      initRating={initRating}
      classname="button tbp-radio title-button"
      icon={cst.icons.PLUS}
    />
  )
}



const endorsmentsList = (rating, endorsments, getPage) => {
  if (!rating) return null

  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      name={`rating-page-${rating.id}-endorsments-list`}
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} />}
      emptyMessage={cst.labels.RATING_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={rating.endorsmentCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, rating: rating.id }, reqId)
        }
      }
      loadFirstPage={false}
      title={cst.labels.ENDORSMENT_LIST_TITLE}
      margin={0}
    />
  )
}

const results = (rating) => {
  if (!rating) return null

  return (
    <Results showHeader={true} ratingId={rating.id} margin={0} />
  )
}


export default RatingViewLook
