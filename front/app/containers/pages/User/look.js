import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import SubscriptionList from '../../../components/Subscription/list'
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

export default UserViewLook
