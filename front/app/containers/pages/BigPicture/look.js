import React, { useState, useEffect } from 'react'
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


const context = (bigPicture) => {
  if (bigPicture.kind == cst.SUBJECT)
    return null
  return (
    <div className="tbp-context">
      <h2 className="subtitle">Contexte</h2>
      <BigPicturePreview
        key={bigPicture.parent}
        bpId={bigPicture.parent}
        buttons={["look"]}
      />
    </div>
  )
}

const BigPictureViewLook = ({ user, match, bigPicture, children, setBigPicture }) => {

  useEffect(() => {
    setBigPicture(match.params.id)
  }, [match])


  const [resourceFilter, setResourceFilter] = useState(true)
  const [problemFilter, setProblemFilter] = useState(true)
  const [solutionFilter, setSolutionFilter] = useState(true)
  const filtersData = {
    [cst.PROBLEM]: problemFilter,
    [cst.SOLUTION]: solutionFilter,
    [cst.RESOURCE]: resourceFilter
  }
  const [hidden, setHidden] = useState(false)
  const [ownRating, setOwnRating] = useState(true)


  if (bigPicture == null)
    return null

  const initNewBp = {
    title: "",
    parent: bigPicture.id,
    kind: cst.PROBLEM
  }
  const canCreate = user.username != cst.GUEST_NAME && initNewBp != undefined

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
          {context(bigPicture)}
          <div className="level is-mobile">
            <div className="level-left">
              {toolButton("problem", problemFilter, setProblemFilter, "fas fa-exclamation-triangle")}
              {toolButton("solution", solutionFilter, setSolutionFilter, "fas fa-lightbulb")}
              {toolButton("resource", resourceFilter, setResourceFilter, "fas fa-file")}
              {toolButton("rating", ownRating, setOwnRating, "fas fa-star")}
            </div>
            <div className="level-right">
              { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
            </div>
          </div>
        </div>
          {bigPictureList(bigPicture, filtersData, ownRating)}
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  setBigPicture: PropTypes.func.isRequired
}

const bigPictureList = (bigPicture, filters, ownRating) => {
  const bpFilter = (bp) => {
    return (
      bigPicture.id == bp.parent && filters[bp.kind]
    )
  }
  const buttons = ["edit", "look"]
  if (ownRating)
    buttons.push("rate")
  const showRatings = true
  return createList(bigPicture, bpFilter, buttons, showRatings, ownRating)
}

export default BigPictureViewLook
