import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import "./style.scss"


const tbpIcon = (icon) => {
  return (
    <span className="icon is-small">
      <i className={icon}></i>
    </span>
  )
}

const showButton = (show, isAuthorized, user, data, item) => {
  if (show && isAuthorized(user, data))
    return item
  return null
}

export const PreviewButtonLook = ({data, show, icon, user, action, isAuthorized}) => {
  const item = (
    <a
      className="level-item"
      onClick={() => action(data)}
    >
      {tbpIcon(icon + " bp-preview-icon ")}
    </a>
  )
  return showButton(show, isAuthorized, user, data, item)
}

PreviewButtonLook.propTypes = {
  data: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  action: PropTypes.func,
  isAuthorized: PropTypes.func.isRequired,
}

export const PreviewLinkLook = ({data, show, icon, user, isAuthorized, to}) => {
  const item = (
    <Link
      className="level-item"
      to={to(data.id)}
    >
      {tbpIcon(icon + " bp-preview-icon")}
    </Link>
  )
  return showButton(show, isAuthorized, user, data, item)
}

PreviewLinkLook.propTypes = {
  data: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  to: PropTypes.func.isRequired,
}
