import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './style.scss'


const DropdownMenu = (props) => {
  const {
    linksArray
  } = props


  return (
    <div className="vde dropdown-content">
      {
        linksArray.map(
          (link) => {
            return (
              <DropdownItem 
                key={link.name}
                leftIcon={link.leftIcon}
                url={link.url}
                onClick={link.onClick}>
                {link.name}
              </DropdownItem>
            )
          }
        )
      }
    </div>
  );
}

const DropdownItem = (props) => {
  const children = (
    <div className="level is-mobile" onClick={props.onClick}>
      <span className="vde icon-button level-item dropdown-icon">{props.leftIcon}</span>
      <p className="level-item">{props.children}</p>
    </div>
  )

  if (!props.url)
    return <div className="vde dropdown-item">{children}</div>

  if (props.url.startsWith("http"))
    return <a href={props.url} className="vde dropdown-item">{children}</a>

  return (
    <Link to={props.url} className="vde dropdown-item">{children}</Link>
  );
}

export default DropdownMenu
