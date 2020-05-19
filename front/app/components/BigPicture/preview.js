import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from './modal'
import Results from './results'
import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import { getBigPicture, getRatings, getEndorsments } from '../../actions/index'
import AuthorIcon from '../User/authorIcon'
import NewBigPicture from './new'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { RatingButton } from '../Rating/buttons'
import { useToggle } from '../utils/hooks'
import List, { getPageFormatter } from '../List'
import RadioButton from '../Buttons/radio'
import EditionModalButton from '../Buttons/modal'
import LinkButton from '../Buttons/link'
import EndorsmentPreview from '../Endorsment/preview'
import "./style.scss"
import * as cst from '../../constants'


const BigPicturePreviewLook = (props) => {

  const {
    bigPicture,
    children,
    endorsments,
    user,
    hyperlink,
    ratings,
    bigPictureId,
    getBigPicture,
    getBigPictureRatings,
    getBigPictureEndorsments,
    // all children of a given BP share the same margin,
    // larger than their parent
    margin
  } = props

  useEffect(() => {
    if (bigPicture == undefined)
      getBigPicture(bigPictureId)
  }, [])

  const [bpDataEditionBuffer, setBpDataEditionBuffer] = useState(bigPicture)

  useEffect(() => {
    setBpDataEditionBuffer(bigPicture)
  }, [bigPicture])

  const [showChildren, toggleChildren] = useToggle(false)
  const [showRatings, toggleRatings] = useToggle(false)
  const [showDetails, toggleDetails] = useToggle(false)
  const [showResults, toggleResults] = useToggle(false)
  const [showEndorsments, toggleEndorsments] = useToggle(false)

  if (!bigPicture) return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}} key={bigPicture.id}>
      <div className={`vde card ${cst.CLASSNAMES[bigPicture.kind]}`}>
        <header className="vde card-header level preview-item-level is-mobile" onClick={() => toggleDetails()}>
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
            showEndorsments,
            toggleDetails,
            toggleRatings,
            toggleChildren,
            toggleResults,
            toggleEndorsments,
            bpDataEditionBuffer,
            setBpDataEditionBuffer,
            user
          })
        }
      </div>
      {
        showResults
        ? <Results showHeader={false} bigPictureId={bigPicture.id} />
        : null
      }
      {
        showEndorsments
        ? bpEndorsments(bigPicture, endorsments, margin, getBigPictureEndorsments)
        : null
      }
      {
        showRatings
        ? bpRatings(bigPicture, ratings, margin, getBigPictureRatings) 
        : null
      }
      {
        showChildren && bigPicture.children.length != 0
        ? bpChildren(bigPicture, children, margin, user)
        : null
      }
    </div>
  )
}

const bpLeftLevel = (bigPicture) => {

  const bpFigure = (icon) => {
    return (
      <figure className="vde bp-icons level-item image is-32x32">
        <i className={`fas ${icon}`}></i>
      </figure>
    )    
  }

  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/> : null }
      { bigPicture.kind == cst.PROBLEM ? bpFigure("fa-exclamation-circle") : null }
      { bigPicture.kind == cst.SOLUTION ? bpFigure("fa-lightbulb") : null }
      { bigPicture.kind == cst.RESOURCE ? bpFigure("fa-folder") : null }
      { bigPicture.hyperlink_id != null ? bpFigure("fa-directions") : null }
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
    showEndorsments,
    toggleDetails,
    toggleRatings,
    toggleChildren,
    toggleResults,
    toggleEndorsments,
    bpDataEditionBuffer,
    setBpDataEditionBuffer,
    user
  } = props

  // conditions to display toolbar's buttons
  const endorsmentCondition = true
  const resultsCondition = true
  const ratingsCondition = bigPicture.ratingCount != 0 || ratings.length != 0
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
        { toggleButton(showDetails, toggleDetails, "fas fa-eye", detailsCondition) }
        { toggleButton(showChildren, toggleChildren, "fas fa-sitemap", childrenCondition) }
        { toggleButton(showResults, toggleResults, "far fa-chart-bar", resultsCondition) }
        { toggleButton(showEndorsments, toggleEndorsments, "fas fa-medal", endorsmentCondition) }
        { toggleButton(showRatings, toggleRatings, "fas fa-comments", ratingsCondition) }
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
      classname={"vde toolbar"}
      init={init}
      setter={setter}
      icon={"fas fa-edit"}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

const ratingButton = (bigPicture, user) => {
  const initRating = {
    value: 0,
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
      icon="far fa-comment" />
  )
}

const lookButton = (bigPicture) => {
  const bpSubject = bigPicture.subject || bigPicture.id
  const subjectId = bigPicture.hyperlink ||  bpSubject
  const bpId = bigPicture.hyperlink || bigPicture.id

  return (
    <LinkButton
      icon="fas fa-search "
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

const bpChildren = (bigPicture, children, parentMargin, user) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )

  const sortBigPictures = (a, b) => {
    // Sort by modif date
    const aModifDate = new Date(a.modification_date)
    const bModifDate = new Date(b.modification_date)
    return aModifDate>bModifDate ? -1 : aModifDate<bModifDate ? 1 : 0
  }

  return (
    <List
      items={children}
      container={(bp) => <BigPicturePreview key={"preview"+bp.id} bigPictureId={bp.id} margin={margin}/>}
      user={user}
      emptyMessage={""}
      sortFunc={sortBigPictures}
      count={bigPicture.children.length}
      getPage={null}
      loadFirstPage={true}
    />
  )
}

const bpRatings = (bigPicture, ratings, parentMargin, getPage) => {
  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )

  return (
    <RatingList
      target={bigPicture}
      filter={(rating) => rating.target_bp == bigPicture.id}
      loadFirstPage={true}
      emptyMessage={cst.MSG_NO_REASON}
      count={bigPicture.ratingCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        }
      }
      margin={margin}
    />
  )
}


const bpEndorsments = (bigPicture, endorsments, parentMargin, getPage) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )
  
  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} margin={margin} />}
      emptyMessage={cst.BP_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={bigPicture.endorsmentCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        }
      }
      loadFirstPage={true}
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
    ratings: state.get("ratings").filter(rating => rating.target_bp == ownProps.bigPictureId),
    endorsments: bigPicture ? state.get("endorsments").filter(endorsment => endorsment.bigPicture == bigPicture.id) : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
    getBigPictureRatings: getPageFormatter(dispatch, getRatings),
    getBigPictureEndorsments: getPageFormatter(dispatch, getEndorsments)
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
