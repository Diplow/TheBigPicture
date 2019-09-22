import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import BigPictureContent from '../../../components/BigPicture'
import "./style.scss"
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'
import RadioButton from '../../../components/Buttons/radio'


const toolButton = (classname, isPushed, setIsPushed, icon) => {
  return (
    <RadioButton
      classname={classname}
      isPushed={isPushed}
      setIsPushed={setIsPushed}
      icon={icon} />
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

const BigPictureViewLook = ({ user, match, bigPicture, children, setBigPicture }) => {
  const ratingUser = match.params.user != null ? parseInt(match.params.user) : user.id

  useEffect(() => {
    setBigPicture(match.params.id, ratingUser)
  }, [match])


  const [resourceFilter, setResourceFilter] = useState(true)
  const [problemFilter, setProblemFilter] = useState(true)
  const [solutionFilter, setSolutionFilter] = useState(true)
  const filtersData = {
    [cst.PROBLEM]: problemFilter,
    [cst.SOLUTION]: solutionFilter,
    [cst.RESOURCE]: resourceFilter
  }
  const [hidden, setHidden] = useState(true)
  const initUserRating = ratingUser != 0 ? true : false
  const [ownRating, setOwnRating] = useState(initUserRating)


  if (bigPicture == null)
    return null

  const initNewBp = {
    title: "",
    parent: bigPicture.id,
    kind: cst.PROBLEM,
    body: "",
  }
  const isGuest = ratingUser == 0

  return (
    <div>
      <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
        <div className="container tbp-section">
          <h1 className="title" onClick={() => setHidden(!hidden)}>
            {bigPicture.title}
          <p className={hidden ? "tbp-description is-hidden" : "tbp-description"}>{bigPicture.body}</p>
          </h1>
        </div>
      </div>
      <div className="container tbp-section">
        <div key={bigPicture.id}>
          <div className="level is-mobile">
            <div className="level-left">
              {toolButton("problem", problemFilter, setProblemFilter, "fas fa-exclamation-triangle")}
              { bigPicture.kind != cst.SUBJECT && bigPicture.kind != cst.RESOURCE ? toolButton("solution", solutionFilter, setSolutionFilter, "fas fa-lightbulb") : null}
              {toolButton("resource", resourceFilter, setResourceFilter, "fas fa-file")}
              { !isGuest && ratingUser == user.id ? toolButton("rating", ownRating, setOwnRating, "fas fa-star") : null}
            </div>
            <div className="level-right">
              { backButton(bigPicture.parent) }
              { user.id == bigPicture.author ? <AddBigPictureButton initBp={initNewBp} /> : null }
            </div>
          </div>
        </div>
          {bigPictureList(bigPicture, filtersData, ownRating, ratingUser)}
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  setBigPicture: PropTypes.func.isRequired
}

const bigPictureList = (bigPicture, filters, ownRating, ratingUser) => {
  const bpFilter = (bp) => {
    return (
      bigPicture.id == bp.parent && filters[bp.kind]
    )
  }
  const buttons = ["edit", "look"]
  if (ownRating)
    buttons.push("rate")
  const showRatings = true
  return createList(bigPicture, bpFilter, buttons, showRatings, ownRating, ratingUser)
}

export default BigPictureViewLook
