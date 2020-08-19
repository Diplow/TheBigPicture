
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBigPicture } from '../../../actions/index'
import BigPictureSection from './bigPictureSection'
import ReasonsSection from './reasonsSection'
import ResultsSection from './resultsSection'

import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = (props) => {
  const {
    match,
    bigPicture,
    getBigPicture
  } = props


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!bigPicture)
      getBigPicture(match.params.subjectId)
  }, [match])

  return (
    <div className="vde container section">
      <BigPictureSection bigPicture={bigPicture} />
      <ReasonsSection bigPicture={bigPicture} />
      <ResultsSection bigPicture={bigPicture} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  bigPicture: state.get("bigpictures").find((elt) => elt.id == ownProps.match.params.bigPictureId)
})

const mapDispatchToProps = (dispatch) => ({
  getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) }
})

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
