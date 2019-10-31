import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import ReactTooltip from 'react-tooltip'
import AuthorIcon from '../../../components/User/authorIcon'
import "./style.scss"
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'


const BigPictureViewLook = ({ user, match, bigPicture, children, getBigPicture }) => {
  const initRatingUser = match.params.user != null ? parseInt(match.params.user) : 0
  const [ratingUsers, setRatingUsers] = useState(initRatingUsers(user, bigPicture, initRatingUser))
  const [ratingUser, setRatingUser] = useState(initRatingUser)
  const [hidden, setHidden] = useState(true)
  const tooltip = useRef(null)

  useEffect(() => {
    getBigPicture(match.params.id, match.params.user)
  }, [])

  useEffect(() => {
    if (ratingUser != 0 && ratingUsers.indexOf(ratingUser) == -1)
      ratingUsers.push(ratingUser)
    if (bigPicture != undefined && ratingUsers.indexOf(bigPicture.author.id) == -1) {
      setRatingUsers([...ratingUsers, bigPicture.author.id])
    }
    if (bigPicture != undefined && ratingUser == 0) {
      setRatingUser(bigPicture.author.id)
    }
  }, [ratingUser, bigPicture])

  if (bigPicture == undefined || ratingUser == 0)
    return null

  const initNewBp = {
    title: "",
    parent: bigPicture.id,
    kind: cst.PROBLEM,
    subject: bigPicture.subject != null ? bigPicture.subject : bigPicture.id,
    body: "",
  }
  const isGuest = user.id == 0

  return (
    <div>
      <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
        <div className="container tbp-section">
          <div className="level is-mobile">
            <div className="level-item" style={{"maxWidth": "100%"}}>
              <span className="author-icon">
                <AuthorIcon userId={bigPicture.author.id} clickable={true} />
              </span>
              <h1 className="title" onClick={() => setHidden(!hidden)}>
                {bigPicture.title}
              <p className={hidden ? "tbp-description is-hidden" : "tbp-description"}>{bigPicture.body}</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container tbp-section">
        <div key={bigPicture.id}>
          <div className="level is-mobile">
            <div className="level-left">
              { ratingButton(bigPicture, ratingUser, setRatingUser, ratingUsers, tooltip) }
            </div>
            <div className="level-right">
              { backButton(bigPicture.parent) }
              { user.id == bigPicture.author.id ? <AddBigPictureButton initBp={initNewBp} /> : null }
            </div>
          </div>
        </div>
          {bigPictureList(bigPicture, ratingUser)}
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  getBigPicture: PropTypes.func.isRequired
}

const initRatingUsers = (user, bigPicture, ratingUser) => {
  let res = []
  if (ratingUser != 0)
    res.push(ratingUser)
  if (user.id != 0 && res.indexOf(user.id) == -1)
    res.push(user.id)
  return res
}

const ratingButton = (bigPicture, ratingUser, setRatingUser, ratingUsers, tooltip) => {
  const hideTooltip = () => {
    const current = tooltip.current
    current.tooltipRef = null
    ReactTooltip.hide()
  }

  return (
    <div className="button is-primary">
      <span className="level-item author-icon">
        <AuthorIcon userId={ratingUser} clickable={true}/>
      </span>
      <span className="icon is-small">
        <a data-tip data-for={'ratingbutton'+bigPicture.id} data-event='click'>
          <span className="icon is-small">
            <i className="bp-preview-icon fa fa-star"/>
          </span>
        </a>
        <ReactTooltip
          id={'ratingbutton'+bigPicture.id}
          ref={tooltip}
          place="top"
          type="dark"
          effect="float"
          clickable={true}>
          <div className="level is-mobile">
            {
              ratingUsers.map((rtgUsr) => {
                return (
                  <span onClick={() => { setRatingUser(rtgUsr); hideTooltip()}} key={rtgUsr} className="level-item author-icon">
                    <AuthorIcon userId={rtgUsr} clickable={false}/>
                  </span>
                )
              })
            }
          </div>
        </ReactTooltip>
      </span>
    </div>
  )
}

const backButton = (parent) => {
  const to = parent == null ? "/" : "/bigPicture/" + parent  
  return (
    <Link
      className="button tbp-radio"
      to={to}
    >
      <span className="icon is-small"><i className="fas fa-step-backward"></i></span>
    </Link>

  )
}

const bigPictureList = (bigPicture, ratingUser) => {
  const bpFilter = (bp) => {
    return (
      bigPicture.id == bp.parent
    )
  }
  const buttons = ["rate", "edit", "look"]
  const showRatings = true
  return createList(bigPicture, bpFilter, buttons, showRatings, ratingUser, bigPicture.children)
}

export default BigPictureViewLook
