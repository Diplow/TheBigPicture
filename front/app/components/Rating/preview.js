import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'

import {
  getRating,
  getRatings,
  getEndorsments
} from '../../actions'

import Preview from '../Preview'
import useToggleAction from '../Preview/action_toggle'
import useModalAction from '../Preview/action_modal'

import AuthorIcon from '../User/authorIcon'

import { RatingButton } from './buttons'
import RatingResults from './results'
import RatingModal from './modal'
import NewRating from './new'

import LoginModal from '../Login/modal'

import { EndorsmentButton } from '../Endorsment/buttons'
import EndorsmentModal from '../Endorsment/modal'
import NewEndorsment from '../Endorsment/new'
import EndorsmentPreview from '../Endorsment/preview'
import endorsmentsSort from '../Endorsment/sort'

import DropdownMenu from '../DropDownMenu'
import DropDownButton from '../DropDownButton'

import List, { getPageFormatter } from '../List'

import RadioButton from '../Buttons/radio'
import LinkButton from '../Buttons/link'

import { ReactComponent as StarIcon } from '../../images/icons/star.svg'
import { ReactComponent as ReasonIcon } from '../../images/icons/reasons.svg'
import { ReactComponent as EyeIcon } from '../../images/icons/eye.svg'
import { ReactComponent as PlusIcon } from '../../images/icons/plus.svg'
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg'
import { ReactComponent as ChartIcon } from '../../images/icons/barchart.svg'
import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'

import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const RatingPreviewLook = (props) => {
  const {
    rating,
    ratings,
    endorsments,
    user,
    ratingId,
    getRatingContext,
    getRatingsPage,
    getEndorsmentsPage
  } = props


  const [creationModalIsActive, setCreationModalIsActive] = useState(false)
  const [editionModalIsActive, setEditionModalIsActive] = useState(false)
  const [createReasonModalIsActive, setCreateReasonModalIsActive] = useState(false)
  const [createEndorsmentModalIsActive, setCreateEndorsmentModalIsActive] = useState(false)
  const [newEndorsment, setNewEndorsment] = useState(null)
  const [editionBuffer, setEditionBuffer] = useState(null)
  const [newReason, setNewReason] = useState(null)

  useEffect(() => {
    if (rating) {
      setEditionBuffer(rating)
      setNewEndorsment({
        value: 0,
        target_id: rating.id,
        author_id: user.id,
        bigpicture: rating.target_bp,
        rating: rating.target_rating,
        reason: rating.body
      })
      setNewReason({
        body: "",
        target_rating: rating.id,
        author_id: user.id,
        subject: rating.subject
      })
    }
  }, [rating, user])

  const cardId = !rating && `rating-preview-${rating.id}` || ""

  const header = (rating) => (
    <header className="vde card-header level preview-item-level is-mobile">    
      <div style={{maxWidth:"100%"}} className="level-left">
        <div className="vde card-content vde-preview-content">
          <div className="content">
            <ReactMarkdown source={rating.body} />
          </div>
        </div>
      </div>
    </header>
  )

  const editModal = (rating, user) => {
    if (rating.author !== user.id) {
      return null
    }

    return (
      <RatingModal
        title={ cst.labels.EDIT_RATING}
        construct={ <NewRating data={ editionBuffer } setData={ setEditionBuffer } /> }
        active={ editionModalIsActive }
        setActive={ setEditionModalIsActive }
        data={ editionBuffer }
      />
    )
  }

  const ratingRatings = (rating, ratings, getPage) => {
    if (!rating) return null
    const ratingsSort = (ratingA, ratingB) => ratingA.median >= ratingB.median ? 1 : -1

    return (
      <List
        name={`rating-preview-${rating.id}-ratings-list`}
        items={ratings}
        container={(child) => <RatingPreview key={`previewrating-${child.id}`} ratingId={child.id} />}
        emptyMessage={cst.labels.RATING_HAS_NO_RATING}
        sortFunc={ratingsSort}
        count={rating.ratingCount}
        getPage={
          (page, options, reqId) => getPage(page, { ...options, rating: rating.id }, reqId)
        }
        loadFirstPage={true}
      />
    )
  }

  const ratingModal = (rating, user) => {
    if (!rating || !newReason) return null

    if (user.id === cst.GUEST_ID) {
      return (
        <LoginModal
          active={createReasonModalIsActive}
          setActive={setCreateReasonModalIsActive}
        />
      )
    }

    return (
      <RatingModal
        title={cst.labels.CREATE_REASON}
        construct={
          <NewRating data={newReason} setData={setNewReason} />
        }
        active={createReasonModalIsActive}
        setActive={setCreateReasonModalIsActive}
        data={newReason}
      />
    )
  }

  const endorsmentModal = (rating, user) => {
    if (!rating || !newEndorsment) return null

    if (user.id === cst.GUEST_ID) {
      return (
        <LoginModal
          active={createEndorsmentModalIsActive}
          setActive={setCreateEndorsmentModalIsActive}
        />
      )
    }

    return (
      <EndorsmentModal
        title={cst.labels.CREATE_ENDORSMENT}
        construct={
          <NewEndorsment data={newEndorsment} setData={setNewEndorsment} />
        }
        active={createEndorsmentModalIsActive}
        setActive={setCreateEndorsmentModalIsActive}
        data={newEndorsment}
      />
    )
  }

  const ratingEndorsments = (rating, endorsments, getPage) => {
    if (!ratingEndorsments) return null

    const endorsmentsSort = (endorsmentA, endorsmentB) => {
      const dateA = new Date(endorsmentA.date)
      const dateB = new Date(endorsmentB.date)
      return dateA >= dateB ? 1 : -1
    }

    return (
      <List
        name={`rating-preview-${rating.id}-endorsments-list`}
        items={endorsments}
        container={(endorsment) => <EndorsmentPreview endorsmentId={endorsment.id} />}
        emptyMessage={cst.labels.BP_HAS_NO_ENDORSMENT}
        sortFunc={endorsmentsSort}
        count={rating.endorsmentCount}
        getPage={
          (page, options, reqId) => (
            getPage(page, { ...options, rating: rating.id }, reqId)
          )
        }
        loadFirstPage={true}
      />
    )
  }

  const lookButton = (rating) => {
    if (!rating) return null

    return (
      <LinkButton
        icon={ <LookIcon className="vde toolbar menu image" /> }
        to={`/subject/${rating.subject}/rating/${rating.id}`}
        classname="vde toolbar level-item icon-button"
      />
    )
  }

  return (
    <Preview
      item={rating}
      itemId={ratingId}
      itemType="reason"
      getItem={getRatingContext}
      header={ header(rating) }
      leftToolbar={ <p className="content">{`${rating.id} - ${rating.date}`}</p> }
      lookButton={ lookButton(rating) }
      user={user}
      steps={[
        {
          step: cst.REASON_STEP,
          icon: <ReasonIcon className="vde toolbar menu image" />,
          actions: [
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_REASONS,
              deactivateLabel: cst.labels.HIDE_REASONS,
              icon: <EyeIcon className="vde toolbar menu image" />,
              step: cst.REASON_STEP,
              display: (rating, user) => ratingRatings(rating, ratings, getRatingsPage)
            },
            {
              constructor: useModalAction,
              label: cst.labels.CREATE_REASON,
              icon: <PlusIcon className="vde toolbar menu image" />,
              modal: (rating, user) => ratingModal(rating, user),
              setActiveModal: setCreateReasonModalIsActive
            },
            {
              hidden: !rating || rating.author !== user.id,
              constructor: useModalAction,
              label: cst.labels.EDIT_RATING,
              icon: <EditIcon className="vde toolbar menu image" />,
              modal: (rating, user) => editModal(rating, user),
              setActiveModal: setEditionModalIsActive
            }
          ]
        },
        {
          step: cst.DELIBERATION_STEP,
          icon: <StarIcon className="vde toolbar menu image" />,
          actions: [
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_RESULTS,
              deactivateLabel: cst.labels.HIDE_RESULTS,
              icon: <ChartIcon className="vde toolbar menu image" />,
              step: cst.DELIBERATION_STEP,
              display: (rating, user) => <RatingResults showHeader={false} ratingId={rating.id} />
            },
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_ENDORSMENTS,
              deactivateLabel: cst.labels.HIDE_ENDORSMENTS,
              icon: <EyeIcon className="vde toolbar menu image" />,
              step: cst.DELIBERATION_STEP,
              display: (rating, user) => ratingEndorsments(rating, endorsments, getEndorsmentsPage)
            },
            {
              constructor: useModalAction,
              label: cst.labels.CREATE_ENDORSMENT,
              icon: <PlusIcon className="vde toolbar menu image" />,
              modal: (rating, user) => endorsmentModal(rating, user),
              setActiveModal: setCreateEndorsmentModalIsActive
            }
          ]
        }
      ]}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  rating: state.get("ratings").find((rating) => rating.id == ownProps.ratingId),
  ratings: state.get("ratings").filter((rating) => rating.target_rating == ownProps.ratingId),
  endorsments: state.get("endorsments").filter((endorsment) => endorsment.rating == ownProps.ratingId),
  user: state.get("user")
})

const mapDispatchToProps = (dispatch) => ({
  getRatingContext: (ratingId) => getRating(ratingId),
  getRatingsPage: getPageFormatter(dispatch, getRatings),
  getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
})

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
