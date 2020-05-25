import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import {
  getBigPicture,
  getRatings
} from '../../actions/index'

import BigPictureModal from './modal'
import Results from './results'
import NewBigPicture from './new'

import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { RatingButton } from '../Rating/buttons'

import EndorsmentPreview from '../Endorsment/preview'
import endorsmentsSort from '../Endorsment/sort'

import AuthorIcon from '../User/authorIcon'

import List, { getPageFormatter } from '../List'

import RadioButton from '../Buttons/radio'
import EditionModalButton from '../Buttons/modal'
import LinkButton from '../Buttons/link'

import * as utils from '../utils'
import * as cst from '../../constants'
import "./style.scss"


const BigPicturePreviewLook = (props) => {
  const {
    bigPicture,
    children,
    user,
    hyperlink,
    ratings,
    bigPictureId,
    getBigPicture,
    getBigPictureRatings
  } = props

  useEffect(() => {
    if (!bigPicture)
      getBigPicture(bigPictureId)
  }, [])

  const [bpDataEditionBuffer, setBpDataEditionBuffer] = useState(bigPicture)

  useEffect(() => {
    setBpDataEditionBuffer(bigPicture)
  }, [bigPicture])

  const [showChildren, toggleChildren] = utils.hooks.useToggle(false)
  const [showRatings, toggleRatings] = utils.hooks.useToggle(false)
  const [showDetails, toggleDetails] = utils.hooks.useToggle(false)
  const [showResults, toggleResults] = utils.hooks.useToggle(false)

  if (!bigPicture) return null

  return (
    <div key={bigPicture.id}>
      <div className={`vde card ${cst.CLASSNAMES[bigPicture.kind]}`}>
        <header
          className="vde card-header level preview-item-level is-mobile"
          onClick={() => toggleDetails()}
        >
          { bpLeftLevel(bigPicture) }
        </header>
        { bpDetails(showDetails, bigPicture.body) }
        {
          toolBar({
            bigPicture,
            ratings,
            showDetails,
            showRatings,
            showChildren,
            showResults,
            toggleDetails,
            toggleRatings,
            toggleChildren,
            toggleResults,
            bpDataEditionBuffer,
            setBpDataEditionBuffer,
            user
          })
        }
      </div>
      {
        showChildren && bigPicture.children.length != 0
        ? bpChildren(bigPicture, children, user)
        : null
      }
      {
        showResults
        ? <Results showHeader={false} bigPictureId={bigPicture.id} />
        : null
      }
      {
        showRatings
        ? bpRatings(bigPicture, ratings, getBigPictureRatings) 
        : null
      }
    </div>
  )
}

const bpLeftLevel = (bigPicture) => {

  const bpFigure = (icon) => {
    return (
      <figure className="vde bp-icons level-item image is-32x32">
        <i className={icon}></i>
      </figure>
    )    
  }

  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/> : null }
      { bigPicture.kind == cst.PROBLEM ? bpFigure(cst.icons.PROBLEM) : null }
      { bigPicture.kind == cst.SOLUTION ? bpFigure(cst.icons.SOLUTION) : null }
      { bigPicture.kind == cst.RESOURCE ? bpFigure(cst.icons.RESOURCE) : null }
      { bigPicture.hyperlink_id != null ? bpFigure(cst.icons.HYPERLINK) : null }
      <p className="vde title">{bigPicture.title}</p>
    </div>
  )
}

const toolBar = (props) => {
  const {
    bigPicture,
    ratings,
    showDetails,
    showRatings,
    showChildren,
    showResults,
    toggleDetails,
    toggleRatings,
    toggleChildren,
    toggleResults,
    bpDataEditionBuffer,
    setBpDataEditionBuffer,
    user
  } = props

  // conditions to display toolbar's buttons
  const resultsCondition = true
  const ratingsCondition = true
  const childrenCondition = bigPicture.children.length != 0
  const detailsCondition = bigPicture.body != ""
  const editCondition = user.id == bigPicture.author

  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{bigPicture.creation_date}</p>
      </div>
      <div className="level-right">
        { editButton(bpDataEditionBuffer, setBpDataEditionBuffer, editCondition) }
        { toggleButton(showDetails, toggleDetails, cst.icons.DETAILS, detailsCondition) }
        { toggleButton(showResults, toggleResults, cst.icons.RESULT, resultsCondition) }
        { toggleButton(showChildren, toggleChildren, cst.icons.CHILDREN, childrenCondition) }
        { toggleButton(showRatings, toggleRatings, cst.icons.RATING_LIST, ratingsCondition) }
        { ratingButton(bigPicture, user) }
        { lookButton(bigPicture) }
      </div>
    </div>
  )
}

const toggleButton = (show, toggle, icon, condition) => {
  if (!condition) return null
  return (
    <RadioButton
      classname="vde toolbar"
      isPushed={show}
      setIsPushed={toggle}
      icon={icon}
    />
  )

}

const editButton = (init, setter, condition) => {
  if (!condition) return null
  return (
    <EditionModalButton
      classname="vde toolbar"
      init={init}
      setter={setter}
      title={cst.labels.EDIT_BP_MODAL_TITLE}
      icon={cst.icons.EDIT}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

const ratingButton = (bigPicture, user) => {
  const initRating = {
    author_id: user.id,
    target_bp: bigPicture.id,
    target_rating: null,
    reason: "",
    subject: bigPicture.subject
  }
  if (initRating.subject == null)
    initRating.subject = bigPicture.id
  return (
    <RatingButton
      initRating={initRating}
      classname="vde toolbar"
      icon={ cst.icons.RATING } />
  )
}

const lookButton = (bigPicture) => {
  const bpSubject = bigPicture.subject || bigPicture.id
  const subjectId = bigPicture.hyperlink ||  bpSubject
  const bpId = bigPicture.hyperlink || bigPicture.id

  return (
    <LinkButton
      icon={ cst.icons.SEARCH }
      to={`/subject/${subjectId}/bigPicture/${bpId}`}
      classname="vde toolbar"
    />
  )
}

const bpDetails = (showDetails, body) => {
  if (!showDetails) return null
  if (body == undefined || body == "") return null

  return (
    <div className="vde card-content">
      <div className="content">
        <ReactMarkdown source={body} />
      </div>
    </div>
  )
}

const bpChildren = (bigPicture, children, user) => {

  return (
    <List
      items={children}
      container={(bp) => <BigPicturePreview key={"preview"+bp.id} bigPictureId={bp.id} />}
      user={user}
      emptyMessage={""}
      sortFunc={(a, b) => a.title > b.title ? 1 : -1}
      count={bigPicture.children.length}
      getPage={null}
      loadFirstPage={true}
    />
  )
}

const bpRatings = (bigPicture, ratings, getPage) => {

  return (
    <RatingList
      target={bigPicture}
      filter={(rating) => rating.target_bp == bigPicture.id}
      loadFirstPage={true}
      emptyMessage={cst.labels.MSG_NO_REASON}
      count={bigPicture.ratingCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        }
      }
    />
  )
}


const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find(bp => bp.id == ownProps.bigPictureId)
  return {
    bigPicture,
    children: bigPicture != null ? state.get("bigpictures").filter(bp => bigPicture.children.indexOf(bp.id) != -1) : [],
    user: state.get("user"),
    hyperlink: bigPicture != null ? state.get("bigpictures").find(bp => bp.id == bigPicture.hyperlink_id) : null,
    ratings: state.get("ratings").filter(rating => rating.target_bp == ownProps.bigPictureId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
    getBigPictureRatings: getPageFormatter(dispatch, getRatings)
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
