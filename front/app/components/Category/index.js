import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import LinkButton from '../Buttons/link'

import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'

import { AbstractContent, hooks } from '../../utils'
import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const CategoryLook = ({ data, user }) => {

  const link = (label) => (
    <LinkButton
      icon={ <LookIcon className="vde header-icon icon lookicon" /> }
      to={`/categories/${label}`}
      classname="vde is-narrow header-button icon-button"
    />
  )

  const image = (img_src) => (
    <div className="category-image is-narrow level-item">
      <figure className="level-item image is-128x128">
        <img src={img_src} />
      </figure>
    </div>
  )

  const title = (data) => (
    <div className="category-title level is-mobile">
      <div className="level is-mobile">
        <p className="title is-2">{data.title}</p>
      </div>
    </div>
  )

  const description = (data) => (
    <p className="subtitle is-6">{data.description}</p>
  )

  return (
    <Link
      className="card category vde child"
      to={`/categories/${data.label}`}>
      <div className="level is-mobile">      
        <div style={{ width: "100%"}} className="level-left">
          { image(data.image) }
          <div className="category title-section">
            { title(data) }
            { description(data) }
          </div>
        </div>
      </div>
    </Link>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.get("user")
})

const Category = connect(mapStateToProps)(CategoryLook)

export default Category
