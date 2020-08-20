
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
    <span className={classname}>
      <Link
        to={to}
        className="icon-button"
      >
        {
          typeof(icon) === "string"
            ? (
              <span className={`icon is-small ${classname}`}>
                <i className={icon + " bp-preview-icon "}></i>
              </span>
            )
            : icon
        }
      </Link>
    </span>
  )
}

export default LinkButton
