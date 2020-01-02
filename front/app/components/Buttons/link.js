import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


const LinkButton = ({icon, to}) => {
  return (
  	<span className="level-item vde-button is-narrow">
	    <Link
	      to={to}
	    >
		    <span className="icon is-small">
		      <i className={icon + " bp-preview-icon "}></i>
		    </span>
	    </Link>
	</span>
  )
}

LinkButton.propTypes = {
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkButton
