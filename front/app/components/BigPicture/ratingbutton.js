import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import * as cst from '../../constants'
import { postVote as vote } from '../../actions/index'



const RatingButtonLook = ({bigPicture, show, user, vote, ratingUser}) => {
  const [rating, setRating] = useState(0)
  const tooltip = useRef(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    setHidden(!show || user.username == cst.GUEST_NAME || user.id != ratingUser)
  }, [ratingUser, user])


  const hideTooltip = () => {
  	const current = tooltip.current
  	current.tooltipRef = null
  	ReactTooltip.hide()
  }

  const starClass = (rate) => {
  	return (
		<div className="level-item" onClick={() => {vote(bigPicture.id, rate, user.id, bigPicture.subject); hideTooltip()}}>
			<span className="tbp-star tbp-eval fa fa-star" />
		</div>
  	)
  }

  if (hidden)
  	return null
  return (
    <span className="icon is-small">
   	  <a data-tip data-for={'clickme'+bigPicture.id} data-event='click'>
   	  	<span className="icon is-small">
	    	<i className="bp-preview-icon fa fa-star"/>
	    </span>
  	  </a>
	  <ReactTooltip
	  	id={'clickme'+bigPicture.id}
	  	ref={tooltip}
	  	place="top"
	  	type="dark"
	  	effect="float"
	  	clickable={true}>
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
	vote: PropTypes.func.isRequired,
	ratingUser: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.get("user")
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		vote: (bpId, rating, author, subject) => {dispatch(vote(bpId, rating, author, subject))}
	}
}

const RatingButton = connect(mapStateToProps, mapDispatchToProps)(RatingButtonLook)

export default RatingButton
