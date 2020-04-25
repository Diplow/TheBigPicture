import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import BigPictureList from '../../../components/BigPicture/list'
import RatingList from '../../../components/Rating/list'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import AddBigPictureButton from '../../../components/Buttons/add'
import "./style.scss"


const UserViewLook = (props) => {

  const {
    user,
    visitor,
    ratings,
    getUser,
    getOwnSubjects,
    getSubjects,
    getOwnRatings,
    getRatings,
    match
  } = props

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
      { subjectsList(user, visitor, getOwnSubjects, getSubjects) }
      { ratingsList(user, visitor, getOwnRatings, getRatings) }
    </div>
  )
}

UserViewLook.propTypes = {
  visitor: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object,
  getUser: PropTypes.func.isRequired,
  getOwnSubjects: PropTypes.func.isRequired,
  getSubjects: PropTypes.func.isRequired,
  getOwnRatings: PropTypes.func.isRequired,
  getRatings: PropTypes.func.isRequired
}

const subjectsList = (user, visitor, getOwnSubjects, getSubjects) => {
  return (
    <BigPictureList
      filter={(bp) => bp.kind == cst.SUBJECT && bp.author == user.id}
      parent={null}
      count={user.ownSubjectCount}
      getPage={visitor.id == user.id ? getOwnSubjects : getSubjects}
      showHeader={true}
      title={"Sujets créés"}
      loadFirstPage={false}
      emptyMessage={`Aucun sujet n'a encore été créé publiquement par ${user.username}`}
      buttons={visitor.id == user.id ? [addBigPictureButton] : []}
    />
  )
}

const ratingsList = (user, visitor, getOwnRatings, getRatings) => {
  return (
    <RatingList
      filter={(rating) => rating.author == user.id}
      parent={null}
      count={user.ownRatingCount}
      getPage={visitor.id == user.id ? getOwnRatings : getRatings}
      showHeader={true}
      title={"Raisons données"}
      loadFirstPage={false}
      emptyMessage={`Aucune raison n'a encore été donnée publiquement par ${user.username}`}
      buttons={[]}
    />
  )
}

const addBigPictureButton = () => {
  return <AddBigPictureButton key={`addhome`} bigPicture={null} />
}

export default UserViewLook
