import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from './modal'
import RatingButton from './ratingbutton'
import { getBigPicture } from '../../actions/index'
import AuthorIcon from '../User/authorIcon'
import * as cst from '../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { TrashButton, LookButton, EditButton, RateButton } from './previewbuttons'
import { useToggle } from '../utils/hooks'
import "./looks/style.scss"


const BigPicturePreviewLook = ({ bigPicture, bigPictureId, getBigPicture, buttons, ratingUser, margin }) => {

  useEffect(() => {
    if (bigPicture == undefined)
      getBigPicture(bigPictureId, ratingUser)
  }, [])

  const [ratingUsr, setRatingUsr] = useState(ratingUser)
  const [showChildren, toggleChildren] = useToggle(false)
  const [showDetails, toggleDetails] = useToggle(false)
  const [createBPisActive, setCreateBPisActive] = useState(false)

  if (bigPicture == undefined || bigPicture == null)
    return null

  return (
    <div style={margin == undefined ? {} : {marginLeft:margin+"%"}}>
      <div className={cst.CLASSNAMES[bigPicture.kind] + " card bp-tile"}>
        <header className="card-header level preview-item-level is-mobile">
          { bpLeftLevel(bigPicture, toggleChildren, toggleDetails) }
          { bpRightLevel(bigPicture, buttons, ratingUsr, createBPisActive, setCreateBPisActive) }
        </header>
        { bpDetails(showDetails, bigPicture.body) }
      </div>
      { bpChildren(showChildren, bigPicture, ratingUsr, margin) }
    </div>
  )
}

BigPicturePreviewLook.propTypes = {  
  bigPicture: PropTypes.object,
  bigPictureId: PropTypes.number.isRequired, // used by connect
  getBigPicture: PropTypes.func.isRequired, // action to trigger if the bigpicture to preview is not loaded yet
  buttons: PropTypes.arrayOf(PropTypes.string), // buttons displayed on the bigpicture preview
  ratingUser: PropTypes.number, // user evaluating the bigpicture
  margin: PropTypes.number, // leftmargin in case of a child bppreview
}


const bpLeftLevel = (bigPicture, toggleChildren, toggleDetails) => {
	return (
    <div className="level-left">
      { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author.id} clickable={true}/> : null }
      <p
        className="card-header-title"
        onClick={toggleChildren}>
        {bigPicture.title}
      </p>
      { bigPicture.body != "" ? <span className="level-item" onClick={toggleDetails}>...</span> : null}
    </div>
	)
}

const bpRightLevel = (bigPicture, buttons, ratingUser, createBPisActive, setCreateBPisActive) => {
	const hasButton = (button) => { return buttons.indexOf(button) != -1 } 

	return (
      <div className="level-right">
        {editButton(bigPicture, hasButton("edit"), createBPisActive, setCreateBPisActive)}
        {ratingButton(bigPicture, hasButton("rate"), ratingUser)}
        {lookButton(bigPicture, hasButton("look"), ratingUser)}
      </div>
	)
}

const editButton = (bigPicture, show, createBPisActive, setCreateBPisActive) => {
  return (
    <div>
      <EditButton
      data={bigPicture}
      action={() => setCreateBPisActive(true)}
      icon="fas fa-edit "
      show={show}
      isAuthorized={(user, data) => { return user.id == data.author.id }}
      />
      <BigPictureModal
      active={createBPisActive}
      setActive={setCreateBPisActive}
      initBp={bigPicture}
      />
    </div>
  )
}

const ratingButton = (bigPicture, show, ratingUser) => {
  return (
    <RatingButton
      bigPicture={bigPicture}
      show={show}
      ratingUser={ratingUser}
    />
  )
}

const lookButton = (bigPicture, show, ratingUser) => {
  const ratingUserUrl = ratingUser != null ? "/" + ratingUser + "/" : ""
  return (
    <LookButton
      data={bigPicture}
      icon="fas fa-search "
      show={show}
      isAuthorized={(user, data) => { return true }}
      to={(id) => { return "/bigPicture/" + id + ratingUserUrl}} />
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

const bpChildren = (showChildren, bigPicture, ratingUser, parentMargin) => {
	if (!showChildren)
		return null

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
	      			ratingUser={ratingUser}
	      			bigPictureId={bp}
	      			margin={margin}
	      		/>
	      	)
	      })
	    }
    	</div>
	)

}


const mapStateToProps = (state, ownProps) => {
  return {
    bigPicture: state.get("bigpictures").find(bp => bp.id == ownProps.bigPictureId),
    bigPictures: state.get("bigpictures")
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getBigPicture: (bpId, userId) => { dispatch(getBigPicture(bpId, userId)) }
  }
}

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
