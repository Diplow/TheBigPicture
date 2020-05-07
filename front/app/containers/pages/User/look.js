import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import BigPictureList from '../../../components/BigPicture/list'
import SubscriptionPreview from '../../../components/Subscription/preview'
import RatingList from '../../../components/Rating/list'
import Loader from '../../../components/Loader'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import UserModal from '../../../components/User/modal'
import NewUser from '../../../components/User/new'
import List from '../../../components/List'
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
    subscriptions,
    getUser,
    follow,
    getOwnSubjects,
    getSubjects,
    getOwnRatings,
    getRatings,
    getSubscriptions,
    match
  } = props

  // to hide/show the bio
  const [hiddenBiography, setHiddenBiography] = useState(false)
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

  return (
    <Loader condition={user == undefined}>
      { header(data) }
      { biography(data, setData, visitor, hiddenBiography, setHiddenBiography) }
      { subjectsList(data, user, visitor, getOwnSubjects, getSubjects, follow) }
      { ratingsList(data, user, visitor, getOwnRatings, getRatings) }
      { subscriptionList(subscriptions, getSubscriptions, user, visitor) }
    </Loader>
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
  if (user == undefined)
    return null
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
  if (user == undefined)
    return null

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
  if (user == undefined)
    return null

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


const subjectsList = (user, fullUser, visitor, getOwnSubjects, getSubjects, follow) => {
  if (user == undefined)
    return null

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
      buttons={visitor.id == user.id ? [addBigPictureButton] : [() => followButton(follow, visitor)]}
    />
  )
}

const ratingsList = (user, fullUser, visitor, getOwnRatings, getRatings) => {
  if (user == undefined)
    return null

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

const subscriptionList = (subscriptions, getSubscriptions, user, visitor) => {
  if (user == undefined || user.id != visitor.id)
    return null

  const sort = (a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    if (aDate < bDate)
      return 1
    return aDate == bDate ? 0 : -1
  }

  return (
    <List
      items={subscriptions}
      container={(sub) => <SubscriptionPreview key={`previewsub-${sub.id}`} subscriptionId={sub.id} />}
      user={visitor}
      emptyMessage={"Vous ne vous êtes encore abonné à personne."}
      sortFunc={sort}
      count={visitor.subscriptionCount}
      getPage={getSubscriptions}
      loadFirstPage={false}
      showHeader={true}
      title={"Abonnements"}
      buttons={[]}
      search={false}
    />
  )
}

const addBigPictureButton = () => {
  return <AddBigPictureButton key={`addhome`} bigPicture={null} />
}

const followButton = (follow, visitor) => {
  return (
    <div className="button tbp-radio title-button is-narrow">
      <a onClick={() => follow(visitor.id)}>
        <span className="icon is-small"><i className="fas fa-heart"></i></span>
      </a>
    </div>
  )
}

export default UserViewLook
