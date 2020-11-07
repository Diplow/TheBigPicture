
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as cst from '../../constants'
import "./style.scss"

const Loader = (props) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(props.condition)
  }, [props.condition])

  if (props.condition) {
    return (
      <div className="container vde section section-field">
        <div className="loader" />
      </div>
    )
  }
  else {
    return props.children
  }
}

export default Loader
