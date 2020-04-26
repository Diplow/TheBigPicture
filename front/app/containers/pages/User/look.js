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

  const [hidden, setHidden] = useState(false)
  const [data, setData] = useState(user)

  useEffect(() => {
    const userId = parseInt(match.params.id)
    if (user == undefined)
      getUser(userId)
  }, [match])

  useEffect(() => {
    setData(user)
  }, [user])

  if (data == undefined)
    return null

  return (
    <div>
      <div className="hero subject">
        <div className="vde container section">
          <div className="vde level is-mobile">
            <div style={{maxWidth: "100%"}} className="level-left">
              <span className="level-item author-icon">
                <AuthorIcon userId={data.id}/>
              </span>
              <h1 className="vde title">{data.username}</h1>
            </div>
          </div>
        </div>
      </div>
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


const content = (user, setUser, visitor, hidden, setHidden) => {
  return (
    <div className="container vde section section-field">
      <div className="level is-mobile vde-header">
        <div className="level-left">
          { hidden ? <figure className="vde header-button level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-plus"></i></figure> : null }
          { !hidden ? <figure className="vde header-button level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-minus"></i></figure> : null }
          <p className="vde subtitle level-item">Bio</p>
          { user.id == visitor.id ? editButton(user, setUser) : null}
        </div>
      </div>
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
