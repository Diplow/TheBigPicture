import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import { createList } from '../../../components/BigPicture/list'
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'
import "./style.scss"


const subjectsList = (count, getPage, userId) => {
  const bigPicture = null
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.SUBJECT
    )
  }
  const buttons = ["edit", "look"]
  const showRatings = false
  return createList(bigPicture, count, getPage, bpFilter, buttons, showRatings, null, [])
}

const HomeLook = ({ getBigPictures, user, count }) => {

  const initNewBp = {
    kind: cst.SUBJECT,
    title: "",
    parent: null,
  }

  const canCreate = user.username != cst.GUEST_NAME

  return (
    <div>
      <div className="hero resource">
        <div className="container tbp-section">
          <div className="level is-mobile">
            <h1 className="title">SUJETS</h1>
            { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
          </div>
        </div>
      </div>
      <div className="container tbp-section">
        { subjectsList(count, getBigPictures, user.id) }
      </div>
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
}

export default HomeLook
