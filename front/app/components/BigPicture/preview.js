import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from './modal'
import Results from './results'
import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import { getBigPicture, getRatings } from '../../actions/index'
import AuthorIcon from '../User/authorIcon'
import NewBigPicture from './new'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { RatingButton } from '../Rating/buttons'
import { useToggle } from '../utils/hooks'
import List from '../List'
import RadioButton from '../Buttons/radio'
import EditionModalButton from '../Buttons/modal'
import LinkButton from '../Buttons/link'
import "./style.scss"
import * as cst from '../../constants'


const BigPicturePreviewLook = (props) => {

  const {
    bigPicture,
    children,
    user,
    hyperlink,
    ratings,
    bigPictureId,
    getBigPicture,
    getBigPictureRatings,
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

  if (bigPicture == undefined || bigPicture == null)
    return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}} key={bigPicture.id}>
      <div className={`vde card ${cst.CLASSNAMES[bigPicture.kind]}`}>
        <header className="vde card-header level preview-item-level is-mobile" onClick={() => toggleDetails()}>
          { bpLeftLevel(bigPicture) }
        </header>
        { bpDetails(showDetails, bigPicture.body) }
        { toolBar(
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
            user) }
      </div>
      {
        showResults
        ? <Results showHeader={false} bigPictureId={bigPicture.id} />
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

const toolBar = (bigPicture, ratings, showDetails, showRatings, showChildren, showResults, toggleDetails, toggleRatings, toggleChildren, toggleResults, init, setter, user) => {
  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{bigPicture.creation_date}</p>
      </div>
      <div className="level-right">
        {editButton(init, setter)}
        {ratingButton(bigPicture, user)}
        { bigPicture.body != "" ? toggleDetailsButton(showDetails, toggleDetails) : null}
        {toggleResultsButton(showResults, toggleResults)}
        { bigPicture.children.length != 0 ? toggleChildrenButton(showChildren, toggleChildren) : null}
        { bigPicture.ratingCount != 0 || ratings.length != 0 ? toggleRatingButton(showRatings, toggleRatings) : null}
        {lookButton(bigPicture)}
      </div>
    </div>
  )
}

const toggleRatingButton = (showRatings, toggleRatings) => {
  return (
    <RadioButton
      classname={"vde toolbar"}
      isPushed={showRatings}
      setIsPushed={toggleRatings}
      icon={"fas fa-comments"}
    />
  )
}

const toggleChildrenButton = (showChildren, toggleChildren) => {
  return (
    <RadioButton
      classname={"vde toolbar"}
      isPushed={showChildren}
      setIsPushed={toggleChildren}
      icon={"fas fa-eye"}
    />
  )
}

const toggleDetailsButton = (showDetails, toggleDetails) => {
  return (
    <RadioButton
      classname={"vde toolbar"}
      isPushed={showDetails}
      setIsPushed={toggleDetails}
      icon={"fas fa-file"}
    />
  )
}

const toggleResultsButton = (showResults, toggleResults) => {
  return (
    <RadioButton
      classname={"vde toolbar"}
      isPushed={showResults}
      setIsPushed={toggleResults}
      icon={"far fa-chart-bar"}
    />
  )
}

const editButton = (init, setter) => {
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
      classname={"vde toolbar"} />
  )
}

const lookButton = (bigPicture) => {
  let bp = bigPicture
  if (bp.hyperlink != null) {
    if (bp.hyperlink.id != undefined)
      bp = bp.hyperlink
    else
      bp = { id: bp.hyperlink, subject: null }
  }
  return (
    <LinkButton
      icon="fas fa-search "
      to={
        `/subject/${bp.subject == null ? bp.id : bp.subject}/bigPicture/${bp.id}`
      }
      classname="vde toolbar" />
  )
}

const bpDetails = (showDetails, body) => {
  if (!showDetails)
    return null
  
  if (body == undefined || body == "")
    return null

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
      showHeader={false}
      title={""}
      buttons={[]}
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
      showHeader={false}
      loadFirstPage={true}
      emptyMessage={"Cette vue d'ensemble n'a pas encore été raisonnée."}
      count={bigPicture.ratingCount}
      title={""}
      getPage={(page) => getPage(page, bigPicture.id)}
      buttons={[]}
      margin={margin}
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
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
    getBigPictureRatings: (page, bpId) => { dispatch(getRatings(page, { bigpicture: bpId })) }
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
