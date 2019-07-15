import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import "./style.scss"


const votationList = () => {
  const title = "VOTES"
  const bigPicture = null
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.VOTATION_CODE
    )
  }
  const initNewBp = {
    title: "",
    body: "",
    kind: cst.VOTATION_CODE,
    choices: []
  }
  const buttons = ["look", "edit", "trash"]
  return createList(title, bigPicture, bpFilter, initNewBp, buttons)

}

const HomeLook = ({ getBigPictures, user }) => {

  useEffect(() => {
    getBigPictures()
  })

  return (
    <div className="container tbp-section">
      { votationList() }
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default HomeLook
