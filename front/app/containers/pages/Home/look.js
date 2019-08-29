import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'
import "./style.scss"


const subjectsList = () => {
  const bigPicture = null
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.SUBJECT
    )
  }
  const buttons = ["look", "edit"]
  const showRatings = false
  return createList(bigPicture, bpFilter, buttons, showRatings)

}

const HomeLook = ({ getBigPictures, user }) => {

  useEffect(() => {
    getBigPictures()
  })

  const initNewBp = {
    kind: cst.SUBJECT,
    title: "",
    parent: null
  }

  const canCreate = user.username != cst.GUEST_NAME && initNewBp != undefined

  return (
    <div>
      <div className="hero resource">
        <div className="container tbp-section">
          <div className="level is-mobile">
            <div className="level-left">
              <h1 className="title">SUJETS</h1>
            </div>
            <div className="level-right">
              { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
            </div>
          </div>
        </div>
      </div>
      <div className="container tbp-section">
        { subjectsList() }
      </div>
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default HomeLook
