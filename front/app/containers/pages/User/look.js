import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import BigPictureList from '../../../components/BigPicture/list'
import SubscriptionList from '../../../components/Subscription/list'
import RatingList from '../../../components/Rating/list'
import Loader from '../../../components/Loader'
import UserModal from '../../../components/User/modal'
import NewUser from '../../../components/User/new'
import List from '../../../components/List'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'

import { ReactComponent as ContentIcon } from '../../../images/icons/book.svg'
import { ReactComponent as DnaIcon } from '../../../images/icons/dna.svg'
import { ReactComponent as RatingsIcon } from '../../../images/icons/reasons.svg'

import * as cst from '../../../constants'
import "./style.scss"


const UserViewLook = (props) => {

  const {
    user, // this page is about this user
    visitor, // the logged in user
    ratings, // this user's ratings
    subscriptions,
    getUser,
    follow,
    unfollow,
    getOwnSubjects,
    getSubjects,
    getOwnRatings,
    getRatings,
    getSubscriptions,
    match
  } = props

  const [hiddenBiography, setHiddenBiography] = useState(false)
  // data is a buffer used when editing the user
  const [data, setData] = useState(user)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setData(user)
  }, [user])

  useEffect(() => {
    const userId = parseInt(match.params.id)
    if (!user)
      getUser(userId)
  }, [match])

  return (
    <Loader condition={!user}>
      { header(data) }
      <div className="vde container section">
        { biography(data, setData, visitor, hiddenBiography, setHiddenBiography) }
        { subjectsList(data, user, visitor, getOwnSubjects, getSubjects, follow, unfollow) }
        { ratingsList(data, user, visitor, getOwnRatings, getRatings) }
        { user && user.id == visitor.id ? <SubscriptionList /> : null }
      </div>
    </Loader>
  )
}

const header = (user) => {
  if (!user) return null
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

const biography = (user, setUser, visitor, hidden, setHidden) => {
  if (!user) return null

  return (
    <div className="container vde section section-field">
      { contentHeader(user, visitor, setUser, hidden, setHidden) }
      {
        !hidden
          ? <div className="card vde tbp-description">
            <div className="vde card-content content">
              <ReactMarkdown source={user.bio != "" ? user.bio : cst.labels.USER_EMPTY_BIO(user.username) } />
            </div>
          </div>
          : null
      }
    </div>
  )
}

const contentHeader = (user, visitor, setUser, hidden, setHidden) => {
  if (!user) return null

  return (
    <div className="level is-mobile vde-header">
      <div className="level-left" onClick={ () => { setHidden(!hidden) }}>
        <DnaIcon className="vde header-button level-item image is-32x32" />
        <p className="vde subtitle level-item">Bio</p>
        { user.id == visitor.id ? editButton(user, setUser) : null}
      </div>
    </div>
  )
}


const editButton = (init, setter) => (
  <EditionModalButton
    init={{id: init.id, bio: init.bio, image: init.image}}
    setter={setter}
    classname="button tbp-radio title-button"
    icon={cst.icons.EDIT}
    EditionModal={UserModal}
    NewItem={NewUser}
  />
)


const subjectsList = (user, fullUser, visitor, getOwnSubjects, getSubjects, follow, unfollow) => {
  if (!user || !fullUser) return null

  let buttons = []
  if (visitor.id !== cst.GUEST_ID)
    buttons = [() => followButton(follow, unfollow, visitor, fullUser)]

  return (
    <BigPictureList
      name={`user-page-${user.id}-subjects-list`}
      icon={ <ContentIcon className="vde header-button level-item image is-32x32" /> }
      filter={(bp) => bp.kind == cst.SUBJECT && bp.author == user.id}
      parent={null}
      count={fullUser.subjectCount}
      getPage={visitor.id == user.id ? getOwnSubjects : getSubjects}
      title={cst.labels.CREATED_SUBJECT_LIST_TITLE}
      loadFirstPage={false}
      emptyMessage={cst.labels.USER_HAS_NO_SUBJECT(user.username)}
      buttons={buttons}
      margin={0}
    />
  )
}

const ratingsList = (user, fullUser, visitor, getOwnRatings, getRatings) => {
  if (!user) return null

  return (
    <RatingList
      name={`user-page-${user.id}-ratings-list`}
      icon={ <RatingsIcon className="vde header-button level-item image is-32x32" /> }
      filter={(rating) => user.reasons.indexOf(rating.id) != -1}
      parent={null}
      count={fullUser.ratingCount}
      getPage={visitor.id == user.id ? getOwnRatings : getRatings}
      title={cst.labels.CREATED_REASON_LIST_TITLE}
      loadFirstPage={false}
      emptyMessage={cst.labels.USER_HAS_NO_REASON(user.username)}
      margin={0}
    />
  )
}

const followButton = (follow, unfollow, visitor, user) => (
  <div 
    className={`button tbp-radio title-button favorites-button is-narrow ${user.favorite ? "is-active" : ""}`}
    onClick={() => user.favorite ? unfollow() : follow(visitor.id)}
  >
    <span className="icon is-small"><i className={cst.icons.FOLLOW}></i></span>
  </div>
)

export default UserViewLook
