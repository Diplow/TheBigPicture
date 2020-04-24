import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


const LinkButton = (props) => {

  const {
    icon,
    to,
    classname
  } = props

  return (
    <span className={`level-item is-narrow ${classname}`}>
      <Link
        to={to}
      >
        <span className={`icon is-small ${classname}`}>
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
