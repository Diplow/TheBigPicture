
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as cst from '../../constants'
import "./style.scss"

const Loader = (props) => {
  if (props.condition) {
    return (
      <div className="container vde section section-field">
        <div className="loader" />
      </div>
    )
  }
  return props.children
}

export default Loader
