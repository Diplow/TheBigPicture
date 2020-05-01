import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import BigPictureList from '../../../components/BigPicture/list'
import RatingList from '../../../components/Rating/list'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import UserModal from '../../../components/User/modal'
import NewUser from '../../../components/User/new'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import AddBigPictureButton from '../../../components/Buttons/add'
import HideAndShowButton from '../../../components/Buttons/hideandshow'
import "./style.scss"


const UserViewLook = (props) => {

  const {
    user, // this page is about this user
    visitor, // the logged in user
    ratings, // this user's ratings
    getUser,
    getOwnSubjects,
    getSubjects,
    getOwnRatings,
    getRatings,
    match
  } = props

  // to hide/show the bio
  const [hidden, setHidden] = useState(false)
  // data is a buffer used when editing the user
  const [data, setData] = useState(user)

  useEffect(() => {
    setData(user)
  }, [user])

  useEffect(() => {
    const userId = parseInt(match.params.id)
    if (user == undefined)
      getUser(userId)
  }, [match])

  if (data == undefined)
    return null

  return (
    <div>
      { header(data) }
      { content(data, setData, visitor, hidden, setHidden) }
      { subjectsList(data, user, visitor, getOwnSubjects, getSubjects) }
      { ratingsList(data, user, visitor, getOwnRatings, getRatings) }
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

const header = (user) => {
  return (
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
  )
}

const content = (user, setUser, visitor, hidden, setHidden) => {
  return (
    <div className="container vde section section-field">
      { contentHeader(user, visitor, setUser, hidden, setHidden) }
      {
        !hidden
        ? <div className={"card vde tbp-description"}>
            <div className="vde card-content content">
              <ReactMarkdown source={user.bio != "" ? user.bio : `${user.username} n'a pas renseigné sa bio.`} />
            </div>
          </div>
        : null
      }
    </div>
  )
}

const contentHeader = (user, visitor, setUser, hidden, setHidden) => {
  return (
    <div className="level is-mobile vde-header">
      <div className="level-left">
        <HideAndShowButton hidden={hidden} setHidden={setHidden} />
        <p className="vde subtitle level-item">Bio</p>
        { user.id == visitor.id ? editButton(user, setUser) : null}
      </div>
    </div>
  )
}


const editButton = (init, setter) => {
  return (
    <EditionModalButton
      init={{id: init.id, bio: init.bio, image: init.image}}
      setter={setter}
      classname={"button tbp-radio title-button"}
      icon={"fas fa-edit"}
      EditionModal={UserModal}
      NewItem={NewUser}
    />
  )
}


const subjectsList = (user, fullUser, visitor, getOwnSubjects, getSubjects) => {
  return (
    <BigPictureList
      filter={(bp) => bp.kind == cst.SUBJECT && bp.author == user.id}
      parent={null}
      count={fullUser.ownSubjectCount}
      getPage={visitor.id == user.id ? getOwnSubjects : getSubjects}
      showHeader={true}
      title={"Sujets créés"}
      loadFirstPage={false}
      emptyMessage={`Aucun sujet n'a encore été créé publiquement par ${user.username}`}
      buttons={visitor.id == user.id ? [addBigPictureButton] : []}
    />
  )
}

const ratingsList = (user, fullUser, visitor, getOwnRatings, getRatings) => {
  return (
    <RatingList
      filter={(rating) => rating.author == user.id}
      parent={null}
      count={fullUser.ownRatingCount}
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
