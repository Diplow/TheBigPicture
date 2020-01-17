import React from 'react'
import PropTypes from 'prop-types'
import "./style.scss"


const RefreshButton = ({ refresh }) => {
  return (
	<div className="button tbp-radio vde-add-comment is-narrow">
		  <a onClick={refresh}>
			<span className="icon is-small"><i className="fas fa-sync-alt"></i></span>
		  </a>
	</div>
  )
}

RefreshButton.propTypes = {
	refresh: PropTypes.func.isRequired
}

export default RefreshButton
