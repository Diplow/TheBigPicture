import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BigPictureList from '../../../components/BigPicture/list'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import AuthorIcon from '../../../components/User/authorIcon'
import "./style.scss"


const UserViewLook = ({ user, visitor, ratings, getUser, getOwnSubjects, getRatedSubjects, match }) => {

  useEffect(() => {
    const userId = parseInt(match.params.id)
    if (user == undefined)
      getUser(userId)
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
        { userSubjects(user, getOwnSubjects) }
        { userRatings(user, ratings, getRatedSubjects) }
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

const userSubjects = (user, getPage) => {
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.SUBJECT
      && bp.author == user.id
    )
  }
  const loadFirstPage = true
  return subjectsList(bpFilter, user.ownSubjectCount, getPage, "Sujets créés", `Aucun sujet n'a encore été créé publiquement par ${user.username}`, loadFirstPage)
}

const userRatings = (user, ratings, getPage) => {
  const bpFilter = (bp) => {
    return (
      user.ratedSubjects.indexOf(bp.id) != -1
      && bp.author != user.id
    )
  }
  const loadFirstPage = false
  return subjectsList(bpFilter, user.ratedSubjectCount, getPage, "Sujets évalués", `Aucun sujet n'a encore été évalué publiquement par ${user.username}`, loadFirstPage)
}

const subjectsList = (filter, count, getPage, title, emptyMessage, loadFirstPage) => {
  return (
    <BigPictureList
      parent={null}
      count={count}
      getPage={getPage}
      title={title}
      emptyMessage={emptyMessage}
      loadFirstPage={loadFirstPage}
      buttons={[]}
      filter={filter}
    />
  )
}

export default UserViewLook