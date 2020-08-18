import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getEndorsments } from '../../../actions/index'

import Loader from '../../../components/Loader'
import HideAndShowButton from '../../../components/Buttons/hideandshow'
import RadioButton from '../../../components/Buttons/radio'
import List, { getPageFormatter } from '../../../components/List'
import NewEndorsment from '../../../components/Endorsment/new'
import BigPictureResults from '../../../components/BigPicture/results'

import { ReactComponent as StarIcon } from '../../../images/icons/star.svg'

import { AbstractContent } from '../../../utils'
import * as cst from '../../../constants'
import "./style.scss"


const ResultsSectionLook = (props) => {
  const {
    bigPicture,
    user,
    getPage
  } = props

  const [hiddenEndorsments, setHiddenEndorsments] = useState(true)

  const header = () => (
    <header className="card-header level is-mobile">
      <div className="level-left">
        <p className="title">{cst.labels.RESULTS_TITLE}</p>
      </div>
      <div className="level-right">
        <HideAndShowButton hidden={hiddenEndorsments} setHidden={setHiddenEndorsments} />
      </div>
    </header>
  )

  const results = (bigPicture) => (
    <BigPictureResults bigPictureId={bigPicture.id} margin={0} />
  )

  return (
    <div className="vde card results-section">
      { header() }
      { bigPicture && !hiddenEndorsments ? results(bigPicture) : null }
    </div>
  )
}


const mapStateToProps = (state, ownProps) => ({
  user: state.get("user")
})

const mapDispatchToProps = (dispatch) => ({
  getPage: getPageFormatter(dispatch, getEndorsments)
})

const ResultsSection = connect(mapStateToProps, mapDispatchToProps)(ResultsSectionLook)

export default ResultsSection
