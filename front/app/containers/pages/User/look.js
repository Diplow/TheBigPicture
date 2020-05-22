import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import BigPictureList from '../../../components/BigPicture/list'
import SubscriptionPreview from '../../../components/Subscription/preview'
import EndorsmentPreview from '../../../components/Endorsment/preview'
import RatingList from '../../../components/Rating/list'
import Loader from '../../../components/Loader'
import UserModal from '../../../components/User/modal'
import NewUser from '../../../components/User/new'
import List from '../../../components/List'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import AddBigPictureButton from '../../../components/Buttons/add'
import HideAndShowButton from '../../../components/Buttons/hideandshow'
import * as cst from '../../../constants'
import "./style.scss"


const UserViewLook = (props) => {

  const {
    user, // this page is about this user
    visitor, // the logged in user
    ratings, // this user's ratings
    subscriptions,
    endorsments,
    getUser,
    follow,
    getOwnSubjects,
    getSubjects,
    getOwnRatings,
    getRatings,
    getSubscriptions,
    getEndorsments,
    match
  } = props

  // to hide/show the bio
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
        { subjectsList(data, user, visitor, getOwnSubjects, getSubjects, follow) }
        { ratingsList(data, user, visitor, getOwnRatings, getRatings) }
        { endorsmentList(endorsments, getEndorsments, user) }
        { subscriptionList(subscriptions, getSubscriptions, user, visitor) }
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
  if (!user || !fullUser) return null

  let buttons = []
  if (visitor.id !== 0 && visitor.favorite !== true)
    buttons = [() => followButton(follow, visitor)]
  if (visitor.id == user.id)
    buttons = [addBigPictureButton]

  return (
    <BigPictureList
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

const subscriptionList = (subscriptions, getSubscriptions, user, visitor) => {
  if (!user || user.id != visitor.id) return null

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
      emptyMessage={cst.labels.USER_HAS_NO_SUBSCRIPTION}
      sortFunc={sort}
      count={visitor.subscriptionCount}
      getPage={getSubscriptions}
      loadFirstPage={false}
      title={cst.labels.SUBSCRIPTION_LIST_TITLE}
      margin={0}
    />
  )
}

const endorsmentList = (endorsments, getEndorsments, user) => {
  if (!user) return null

  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} />}
      emptyMessage={cst.labels.BP_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={user.endorsmentCount}
      getPage={getEndorsments}
      loadFirstPage={false}
      title={cst.labels.ENDORSMENT_LIST_TITLE}
      margin={0}
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
        <span className="icon is-small"><i className={cst.icons.FOLLOW}></i></span>
      </a>
    </div>
  )
}

export default UserViewLook
