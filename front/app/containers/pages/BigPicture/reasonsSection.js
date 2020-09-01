import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getRatings } from '../../../actions/index'

import Loader from '../../../components/Loader'
import ratingsSort from '../../../components/Rating/sort'
import RatingPreview from '../../../components/Rating/preview'
import HideAndShowButton from '../../../components/Buttons/hideandshow'
import RadioButton from '../../../components/Buttons/radio'
import List, { getPageFormatter } from '../../../components/List'
import NewRating from '../../../components/Rating/new'

import { AbstractContent, hooks } from '../../../utils'
import * as cst from '../../../constants'
import "./style.scss"


const ReasonsSectionLook = (props) => {
  const {
    bigPicture,
    bpId,
    ratings,
    user,
    getPage
  } = props

  const [
    newButton,
    newReason,
    showNewReason,
    setShowNewReason
  ] = hooks.useNewBuffer({
    NewWidget: NewRating,
    initItem: (bigPicture, user) => (bigPicture ? {
      body: "",
      target_bp: bigPicture.id,
      author_id: user.id,
      subject: bigPicture.subject || bigPicture.id
    } : null),
    item: bigPicture,
    user
  })

  const [hiddenReasons, setHiddenReasons] = useState(true)

  useEffect(() => {
    setHiddenReasons(true)
  }, [bpId])

  const header = () => {
    if (!bigPicture) return null
    return (
      <header className="card-header level is-mobile">
        <div className="level-left">
          <p className="title">{cst.labels.REASON_LIST_TITLE(bigPicture.ratingCount)}</p>
          { newButton }
        </div>
        <div className="level-right">
          <HideAndShowButton hidden={hiddenReasons} setHidden={setHiddenReasons} />
        </div>
      </header>
    )
  }

  const reasonList = (bigPicture, ratings) => (
    <List
      name={`bp-${bigPicture.id}-ratings-list`}
      items={ratings}
      container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} />}
      emptyMessage={cst.labels.MSG_NO_REASON}
      sortFunc={ratingsSort}
      count={bigPicture.ratingCount}
      getPage={
        (page, options, reqId) => getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
      }
      loadFirstPage={true}
      margin={0}
    />
  )

  return (
    <div className={`vde card reasons-section ${ hiddenReasons ? "" : "is-open"}`}>
      { header() }
      { showNewReason ? newReason : null }
      { bigPicture && !hiddenReasons && bigPicture.id == bpId ? reasonList(bigPicture, ratings) : null }
    </div>
  )
}


const mapStateToProps = (state, ownProps) => ({
  user: state.get("user"),
  ratings: state.get("ratings").filter((elt) => elt.target_bp == ownProps.bigPicture.id)
})

const mapDispatchToProps = (dispatch) => ({
  getPage: getPageFormatter(dispatch, getRatings)
})

const ReasonsSection = connect(mapStateToProps, mapDispatchToProps)(ReasonsSectionLook)

export default ReasonsSection
