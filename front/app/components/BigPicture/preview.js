import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from './modal'
import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import { getBigPicture } from '../../actions/index'
import AuthorIcon from '../User/authorIcon'
import NewBigPicture from './new'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { RatingButton } from '../Rating/buttons'
import { useToggle } from '../utils/hooks'
import RadioButton from '../Buttons/radio'
import EditionModalButton from '../Buttons/modal'
import LinkButton from '../Buttons/link'
import "./style.scss"
import * as cst from '../../constants'


const BigPicturePreviewLook = ({ bigPicture, hyperlink, ratings, bigPictureId, getBigPicture, margin }) => {

  useEffect(() => {
    if (bigPicture == undefined)
      getBigPicture(bigPictureId)
    if (bigPicture != undefined && bigPicture.hyperlink_id != null && hyperlink == null)
      getBigPicture(bigPicture.hyperlink_id)
  }, [])

  const [init, setter] = useState(bigPicture)

  useEffect(() => {
    setter(bigPicture)
  }, [bigPicture])

  const [showChildren, toggleChildren] = useToggle(false)
  const [showRatings, toggleRatings] = useToggle(false)
  const [showDetails, toggleDetails] = useToggle(false)

  if (bigPicture == undefined || bigPicture == null)
    return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}}>
      <div className={cst.CLASSNAMES[bigPicture.kind] + " card bp-tile"}>
        <header className="card-header level preview-item-level is-mobile">
          { bpLeftLevel(bigPicture) }
        </header>
        { bpDetails(showDetails, bigPicture.body) }
        { toolBar(
            bigPicture,
            ratings,
            showDetails,
            showRatings,
            showChildren,
            toggleDetails,
            toggleRatings,
            toggleChildren,
            init,
            setter) }
      </div>
      {
        showRatings && ratings.length != 0
        ? bpRatings(bigPicture, ratings, margin) 
        : null
      }
      {
        showChildren && bigPicture.children.length != 0
        ? bpChildren(bigPicture, margin)
        : null
      }
    </div>
  )
}

BigPicturePreviewLook.propTypes = {  
  bigPicture: PropTypes.object,
  ratings: PropTypes.arrayOf(PropTypes.object),
  bigPictureId: PropTypes.number.isRequired, // used by connect
  getBigPicture: PropTypes.func.isRequired, // action to trigger if the bigpicture to preview is not loaded yet
  margin: PropTypes.number, // leftmargin in case of a child bppreview
}


const bpLeftLevel = (bigPicture) => {
	return (
    <div className="level-left">
      { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/> : null }
      <p className="card-header-title">{bigPicture.title}</p>
    </div>
	)
}

const toolBar = (bigPicture, ratings, showDetails, showRatings, showChildren, toggleDetails, toggleRatings, toggleChildren, init, setter) => {
  return (
    <div className="level is-mobile vde-toolbar">
      <div className="level-left">
        <p>{bigPicture.creation_date}</p>
      </div>
      <div className="level-right">
        {editButton(init, setter)}
        {ratingButton(bigPicture)}
        { bigPicture.body != "" ? toggleDetailsButton(showDetails, toggleDetails) : null}
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
      classname={""}
      isPushed={showRatings}
      setIsPushed={toggleRatings}
      icon={"fas fa-comments"}
    />
  )
}

const toggleChildrenButton = (showChildren, toggleChildren) => {
  return (
    <RadioButton
      classname={""}
      isPushed={showChildren}
      setIsPushed={toggleChildren}
      icon={"fas fa-eye"}
    />
  )
}

const toggleDetailsButton = (showDetails, toggleDetails) => {
  return (
    <RadioButton
      classname={""}
      isPushed={showDetails}
      setIsPushed={toggleDetails}
      icon={"fas fa-file"}
    />
  )
}

const editButton = (init, setter) => {
  return (
    <EditionModalButton
      init={init}
      setter={setter}
      icon={"fas fa-edit"}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

const ratingButton = (bigPicture) => {
  const initRating = {
    value: 0,
    target_bp: bigPicture.id,
    target_rating: null,
    reason: "",
    subject: bigPicture.subject
  }
  if (initRating.subject == null)
    initRating.subject = bigPicture.id
  return (
    <RatingButton initRating={initRating} />
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
      } />
  )
}

const bpDetails = (showDetails, body) => {
	if (!showDetails)
		return null
	
	if (body == undefined || body == "")
		return null

	return (
		<div className="card-content">
			<div className="content">
				<ReactMarkdown source={body} />
			</div>
		</div>
	)
}

const bpChildren = (bigPicture, parentMargin) => {

  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )

  return (
    <div>
      {
        bigPicture.children.map(bp => {
          return (
            <BigPicturePreview
              key={"preview"+bp}
              buttons={["look"]}
              bigPictureId={bp}
              margin={margin}
            />
          )
        })
      }
      </div>
  )

}

const bpRatings = (bigPicture, ratings, parentMargin) => {
  const margin = (
    parentMargin == 0
    ? cst.SUBMARGIN 
    : (1+cst.SUBMARGIN/100)*parentMargin
  )

  return (
    <RatingList
      target={bigPicture}
      ratingsFilter={(rating) => rating.target_bp == bigPicture.id}
      showHeader={false}
      loadFirstPage={true}
      margin={margin}
    />
  )
}


const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find(bp => bp.id == ownProps.bigPictureId)
  return {
    bigPicture,
    hyperlink: bigPicture != null ? state.get("bigpictures").find(bp => bp.id == bigPicture.hyperlink_id) : null,
    ratings: state.get("ratings").filter(rating => rating.target_bp == ownProps.bigPictureId),
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) }
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
