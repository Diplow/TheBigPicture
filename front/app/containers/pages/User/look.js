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
        <div className="vde container section">
          <div className="vde level is-mobile">
            <div style={{maxWidth: "100%"}} className="level-left">
              <span className="level-item author-icon">
                <AuthorIcon userId={user.id}/>
              </span>
              <h1 className="vde title">{user.username}</h1>
            </div>
          </div>
        </div>
      </div>
      { userSubjects(user, getOwnSubjects) }
      { userRatings(user, ratings, getRatedSubjects) }
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
      && bp.private == false
    )
  }
  const loadFirstPage = true
  return subjectsList(bpFilter, user.ownSubjectCount, getPage, "Sujets créés", `Aucun sujet n'a encore été créé publiquement par ${user.username}`, loadFirstPage)
}

const userRatings = (user, ratings, getPage) => {
  const bpFilter = (bp) => {
    return (
      user.ratedSubjects.indexOf(bp.id) != -1
    )
  }
  const loadFirstPage = true
  return subjectsList(bpFilter, user.ratedSubjectCount, getPage, "Sujets évalués", `Aucun sujet n'a encore été évalué publiquement par ${user.username}`, loadFirstPage)
}

const subjectsList = (filter, count, getPage, title, emptyMessage, loadFirstPage) => {
  return (
    <BigPictureList
      filter={filter}
      parent={null}
      count={count}
      getPage={getPage}
      showHeader={true}
      title={title}
      loadFirstPage={loadFirstPage}
      emptyMessage={emptyMessage}
      buttons={[]}
    />
  )
}

export default UserViewLook
