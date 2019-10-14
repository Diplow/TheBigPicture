import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { getUser } from '../../actions'


export const AuthorIconLook = ({ user, getUser, userId, clickable }) => {

  useEffect(() => {
  	if (user == null || user == undefined || user.id != userId)
	  	getUser(userId)
  }, [userId])

  if (user == null)
  	return null

  const img = (
	<figure className="level-item image is-48x48">
      <img src={user.image} className="login-image is-rounded"/>
  	</figure>
  )

  return (
  	<div>
  	  {
  	  	clickable
  	  	? (
		    <Link
		      className="level-item"
		      to={"/user/"+user.id}
		    >
			 {img}      
		    </Link>
  	  	) : img
  	  }
	</div>
  )
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.get("users").find(usr => usr.id == ownProps.userId)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (id) => { dispatch(getUser(id)) },
	}
}

const AuthorIcon = connect(mapStateToProps, mapDispatchToProps)(AuthorIconLook)

export default AuthorIcon
