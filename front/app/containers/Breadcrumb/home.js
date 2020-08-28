
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import * as cst from '../../constants'
import './style.scss'


const HomeBreadcrumb = ({}) => (
  <li>
    <Link to="/">
      <span className="icon is-small">
        <i className="fas fa-home" aria-hidden="true"></i>
      </span>
      { cst.labels.HOME }
    </Link>
  </li>
)

export default HomeBreadcrumb
