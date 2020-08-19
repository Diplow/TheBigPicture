import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import UserModal from '../../../components/User/modal'
import NewUser from '../../../components/User/new'
import List from '../../../components/List'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import sortBigPictures from '../../../components/BigPicture/sort'
import SubjectPreview from '../../../components/BigPicture/subject'
import ChildPreview from '../../../components/BigPicture/child'


import { ReactComponent as EditIcon } from '../../../images/icons/edit.svg'
import { ReactComponent as DnaIcon } from '../../../images/icons/dna.svg'
import { ReactComponent as BookIcon } from '../../../images/icons/book.svg'
import { ReactComponent as RatingsIcon } from '../../../images/icons/reasons.svg'

import { AbstractContent } from '../../../utils'

import * as cst from '../../../constants'
import "./style.scss"


const UserViewLook = (props) => {

  const {
    user, // this page is about this user
    visitor, // the logged in user
    ratings, // this user's ratings
    bigPictures,
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
  const [showEditUser, setShowEditUser] = useState(false)

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

  const biography = (user) => {
    if (!user) return null
    const editButton = (
      <div className="vde header-button" onClick={() => setShowEditUser(!showEditUser)}>
        <EditIcon className="vde header-icon is-narrow icon-button" />
      </div>
    )

    return (
      <div className="vde card subject-preview">
        <div className="card-header level is-mobile">
          <div className="level-left">
            <div className="vde header-button">
              <DnaIcon style={{width:"4rem", color: "black"}} className="vde header-icon is-narrow icon-button" />
            </div>
            <p className="title">Biographie</p>
            { user.id == visitor.id ? editButton : null }
          </div>
          <div className="level-right" />
        </div>
        <AbstractContent text={user.bio} />
        <UserModal
          data={data}
          setData={setData}
          active={showEditUser}
          setActive={setShowEditUser}
          construct={<NewUser data={data} setData={setData} />} />
      </div>
    )
  }

  const subjects = (user) => {
    if (!user) return null
    return (
      <div className="vde card subject-preview">
        <div className="card-header level is-mobile">
          <div className="level-left">
            <div className="vde header-button">
              <BookIcon style={{width:"4rem", color: "black"}} className="vde header-icon is-narrow icon-button" />
            </div>
            <p className="title">Sujets</p>
          </div>
          <div className="level-right" />
        </div>    
        <List
          name="user-page-subjects-list"
          items={bigPictures}
          container={(bigPicture) => (
            <ChildPreview
              key={`subject-${bigPicture.id}`}
              bigPictureId={bigPicture.id}
              style={{margin: 0, padding: 0}}
            />
          )}
          user={user}
          emptyMessage={cst.labels.MSG_NO_SUBJECT}
          sortFunc={sortBigPictures}
          count={user.subjectCount}
          getPage={user.id == visitor.id ? getOwnSubjects : getSubjects}
          loadFirstPage={true}
          margin={0}
        />
      </div>
    )
  }

  return (
    <Loader condition={!user}>
      { header(data) }
      <div className="vde container section">
        { biography(data) }
        { subjects(data) }
      </div>
    </Loader>
  )
}


export default UserViewLook
