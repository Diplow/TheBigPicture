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

import { ReactComponent as PencilIcon } from '../../../images/icons/pencil-solid.svg'

import { AbstractContent } from '../../../utils'
import * as cst from '../../../constants'
import "./style.scss"


const ReasonsSectionLook = (props) => {
  const {
    bigPicture,
    ratings,
    user,
    getPage
  } = props

  const [hiddenReasons, setHiddenReasons] = useState(true)
  const [showNewReason, setShowNewReason] = useState(false)
  const [newReason, setNewReason] = useState(null)

  useEffect(() => {
    if (bigPicture)
      setNewReason({
        body: "",
        target_bp: bigPicture.id,
        author_id: user.id,
        subject: bigPicture.subject || bigPicture.id
      })
  }, [bigPicture, user])

  const header = () => {
    if (!bigPicture) return null
    return (
      <header className="card-header level is-mobile">
        <div className="level-left">
          <p className="title">{cst.labels.REASON_LIST_TITLE(bigPicture.ratingCount)}</p>
          <div className="vde header-button" onClick={() => setShowNewReason(!showNewReason)}>
            <PencilIcon className="vde header-icon is-narrow icon-button" />
          </div>
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
      { showNewReason
        ? <NewRating
          newReason={newReason}
          setNewReason={setNewReason}
          setShowNewReason={setShowNewReason} />
        : null }
      { bigPicture && !hiddenReasons ? reasonList(bigPicture, ratings) : null }
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
