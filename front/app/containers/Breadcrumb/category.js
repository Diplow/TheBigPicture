
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import * as cst from '../../constants'
import './style.scss'


const CategoryBreadcrumbLook = ({ category }) => {
  if (!category) return null
  return (
    <li>
      <Link to={`/categories/${category.label}`}>      
        {category.title}
      </Link>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => ({
  category: state.get("categories").find((elt) => elt.label == ownProps.label)
})

const CategoryBreadcrumb = connect(mapStateToProps)(CategoryBreadcrumbLook)

export default CategoryBreadcrumb
