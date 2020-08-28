
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import * as cst from '../../constants'
import './style.scss'


const UserBreadcrumbLook = ({ user }) => {
  if (!user) return null
  return (
    <React.Fragment>
      <li>
        <Link to={`/user/${user.id}`}>      
          {user.username}
        </Link>
      </li>
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.get("users").find((elt) => elt.id == ownProps.userId)
})

const UserBreadcrumb = connect(mapStateToProps)(UserBreadcrumbLook)

export default UserBreadcrumb
