import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import * as cst from '../../../constants'
import { postVote as vote } from '../../../actions/index'



const RatingButtonLook = ({bigPicture, show, user, vote}) => {
  const [rating, setRating] = useState(bigPicture.results.median)

  if (!show || user.username == cst.GUEST_NAME)
  	return null

  const starClass = (rate) => {
  	if (rating >= rate)
  		return (
			<div className="level-item" onClick={() => {vote(bigPicture.id, rate)}}>
				<span className="tbp-star fa fa-star checked" />
			</div>
  		)
  	return (
		<div className="level-item" onClick={() => {vote(bigPicture.id, rate)}}>
			<span className="tbp-star fa fa-star" />
		</div>
  	)
  }

  return (
    <span className="icon is-small">
   	  <a data-tip={bigPicture.id} data-for={'clickme'+bigPicture.id} data-event='click'>
   	  	<span className="icon is-small">
	    	<i className="bp-preview-icon fa fa-star"/>
	    </span>
  	  </a>
	  <ReactTooltip id={'clickme'+bigPicture.id} place="top" type="dark" effect="float" clickable={true}>
	  	<div className="level is-mobile">
			{starClass(1)}
			{starClass(2)}
			{starClass(3)}
			{starClass(4)}
			{starClass(5)}
		</div>
	  </ReactTooltip>
    </span>

  )
}

RatingButtonLook.propTypes = {
	user: PropTypes.object,
	bigPicture: PropTypes.object.isRequired,
	vote: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.get("user").user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		vote: (bpId, rating) => {dispatch(vote(bpId, rating))}
	}
}

const RatingButton = connect(mapStateToProps, mapDispatchToProps)(RatingButtonLook)

export default RatingButton
