import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { createList } from '../../../components/BigPicture/list'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import AuthorIcon from '../../../components/User/authorIcon'
import "./style.scss"


const UserViewLook = ({ user, visitor, ratings, getUser, getOwnSubjects, getRatedSubjects, match }) => {

  useEffect(() => {
    const userId = parseInt(match.params.id)
    if (user == undefined)
      getUser(userId)
    getOwnSubjects(userId)
    getRatedSubjects(userId)
  }, [match])

  if (user == undefined)
    return null

  return (
    <div>
      <div className="hero subject">
        <div className="container tbp-section">
          <div className="level is-mobile">
            <span className="level-item author-icon">
              <AuthorIcon userId={user.id}/>
            </span>
            <h1 className="title">{user.username}</h1>
          </div>
        </div>
      </div>
      <div className="container tbp-section">
        <div className="subtitle user">Sujets créés par {user.username}</div>
        { userSubjects(user.id) }
        <div className="subtitle user">Sujets évalués par {user.username}</div>
        { userRatings(user, ratings) }
      </div>
    </div>
  )
}

UserViewLook.propTypes = {
  visitor: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
  getOwnSubjects: PropTypes.func.isRequired,
  getRatedSubjects: PropTypes.func.isRequired
}

const userSubjects = (userId) => {
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.SUBJECT
      && bp.author == userId
    )
  }
  return subjectsList(bpFilter, 0, [])
}

const userRatings = (user, ratings) => {
  const ratedsubjects = computeRatedSubjects(ratings)
  const bpFilter = (bp) => {
    return (
      ratedsubjects.indexOf(bp.id) != -1
      && bp.author != user.id
    )
  }
  return subjectsList(bpFilter, user.id, ratedsubjects)
}

const computeRatedSubjects = (ratings) => {
  let res = []
  for (let i = 0; i < ratings.length; ++i) {
    const rating = ratings[i]
    if (res.indexOf(rating.subject) == -1 && rating.value != 0)
      res.push(rating.subject)
  }
  return res
}

const subjectsList = (filter, ratingUser, ratedsubjects) => {
  const bigPicture = null
  const buttons = ["look"]
  const showRatings = false
  return createList(bigPicture, filter, buttons, showRatings, ratingUser, ratedsubjects)

}

export default UserViewLook
