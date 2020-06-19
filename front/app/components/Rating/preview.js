import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'

import {
  getRatings,
  getEndorsments
} from '../../actions'

import AuthorIcon from '../User/authorIcon'

import { RatingButton } from './buttons'
import RatingResults from './results'
import RatingModal from './modal'
import NewRating from './new'

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
    getRatingsPage,
    getEndorsmentsPage
  } = props

  const [menu, setMenu] = useState(null)
  const [showRatings, toggleRatings] = utils.hooks.useToggle(false)
  const [showEndorsments, toggleEndorsments] = utils.hooks.useToggle(false)
  const [showResults, toggleResults] = utils.hooks.useToggle(false)

  const cardId = !rating && `rating-preview-${rating.id}` || ""

  return (
    <div>
      <div id={cardId} className="vde card reason">
        <header className="vde card-header level preview-item-level is-mobile">
          { ratingLeftLevel(rating) }
        </header>
        {
          toolBar({
            rating,
            ratings,
            showRatings,
            showEndorsments,
            showResults,
            toggleRatings,
            toggleEndorsments,
            toggleResults,
            user,
            menu,
            setMenu,
            cardId
          })
        }
      </div>
      { showRatings ? ratingChildren(rating, ratings, getRatingsPage) : null }
      { showEndorsments ? ratingEndorsments(rating, endorsments, getEndorsmentsPage) : null }
      { showResults ? <RatingResults ratingId={rating.id} /> : null }
    </div>
  )
}

const ratingLeftLevel = (rating) => {
  if (!rating) return null

  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      <div className="vde card-content vde-preview-content">
        <div className="content">
          <ReactMarkdown source={rating.body} />
        </div>
      </div>
    </div>
  )
}

const toolBar = (props) => {
  const {
    rating,
    ratings,
    showRatings,
    showResults,
    showEndorsments,
    toggleResults,
    toggleRatings,
    toggleEndorsments,
    user,
    menu,
    setMenu,
    cardId
  } = props

  const initRating = {
    target_bp: null,
    target_rating: rating.id,
    author_id: user.id,
    body: "",
    subject: rating.subject
  }

  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p>{rating.date}</p>
      </div>
      <div className="level-right">
        {
          reasonDropdown({
            menu,
            setMenu,
            showRatings,
            toggleRatings,
            rating,
            user
          })
        }
        {
          endorsmentDropdown({
            menu,
            setMenu,
            toggleResults,
            toggleEndorsments,
            showResults,
            showEndorsments,
            rating,
            user
          })
        }
        {
          lookButton(
            rating,
            `${cardId}-toolbarbutton-look`
          )
        }
      </div>
    </div>
  )
}


const reasonDropdown = (props) => {
  const {
    menu,
    setMenu,
    toggleRatings,
    showRatings,
    rating,
    user
  } = props

  const [createReasonModalIsActive, setCreateReasonModalIsActive] = useState(false)
  const [newReason, setNewReason] = useState(null)

  useEffect(() => {
    if (rating)
      setNewReason({
        body: "",
        target_rating: rating.id,
        author_id: user.id,
        subject: rating.subject
      })
  }, [rating])

  if (!rating || !newReason) return null

  return (
    <div>
      <DropDownButton
        name="reasons"
        isActive={menu}
        setIsActive={setMenu}
        classname="vde toolbar level-item"
        icon={ <ReasonIcon className="vde toolbar menu image"/> }
      >
        <DropdownMenu
          linksArray={[
            {
              leftIcon: <EyeIcon className="vde toolbar menu image" />,
              name: showRatings ? cst.labels.HIDE_REASONS : cst.labels.SHOW_REASONS,
              onClick: () => toggleRatings()
            },
            {
              leftIcon: <PlusIcon className="vde toolbar menu image" />,
              name: cst.labels.CREATE_REASON,
              onClick: () => setCreateReasonModalIsActive(true)
            }
          ]} />
      </DropDownButton>

      <RatingModal
        title={"Ajouter une raison"}
        construct={
          <NewRating data={newReason} setData={setNewReason} />
        }
        active={createReasonModalIsActive}
        setActive={setCreateReasonModalIsActive}
        data={newReason}
      />
    </div>
  )
}

const endorsmentDropdown = (props) => {
  const {
    menu,
    setMenu,
    toggleResults,
    toggleEndorsments,
    showResults,
    showEndorsments,
    rating,
    user
  } = props

  const [createEndorsmentModalIsActive, setCreateEndorsmentModalIsActive] = useState(false)
  const [newEndorsment, setNewEndorsment] = useState(null)

  useEffect(() => {
    if (rating)
      setNewEndorsment({
        value: 0,
        target_id: rating.id,
        author_id: user.id,
        bigpicture: rating.target_bp,
        rating: rating.target_rating,
        reason: rating.body
      })
  }, [rating])

  if (!rating || !newEndorsment) return null

  let links = [
    {
      leftIcon: <EyeIcon className="vde toolbar menu image" />,
      name: showEndorsments ? cst.labels.HIDE_ENDORSMENTS : cst.labels.SHOW_ENDORSMENTS,
      onClick: () => toggleEndorsments()
    },
    {
      leftIcon: <ChartIcon className="vde toolbar menu image" />,
      name: showResults ? cst.labels.HIDE_RESULTS : cst.labels.SHOW_RESULTS,
      onClick: () => toggleResults()
    }
  ]
  if (user.id !== cst.GUEST_ID) {
    links.push({
      leftIcon: <PlusIcon className="vde toolbar menu image" />,
      name: cst.labels.CREATE_ENDORSMENT,
      onClick: () => setCreateEndorsmentModalIsActive(true)
    })
  }

  return (
    <div>
      <DropDownButton
        name="results"
        isActive={menu}
        setIsActive={setMenu}
        classname="vde toolbar level-item"
        icon={ <StarIcon className="vde toolbar menu image" /> }
      >
        <DropdownMenu linksArray={links} />
      </DropDownButton>

      <EndorsmentModal
        title={"Évaluer un contenu"}
        construct={
          <NewEndorsment data={newEndorsment} setData={setNewEndorsment} />
        }
        active={createEndorsmentModalIsActive}
        setActive={setCreateEndorsmentModalIsActive}
        data={newEndorsment}
      />
    </div>
  )
}

const lookButton = (rating, id) => {
  if (!rating) return null

  return (
    <LinkButton
      id={id}
      icon={ <LookIcon className="vde toolbar menu image" /> }
      to={`/subject/${rating.subject}/rating/${rating.id}`}
      classname="vde toolbar level-item icon-button"
    />
  )
}

const ratingChildren = (rating, children, getPage) => {
  
  const ratingsSort = (ratingA, ratingB) => ratingA.median >= ratingB.median ? 1 : -1

  return (
    <List
      name={`rating-preview-${rating.id}-ratings-list`}
      items={children}
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

const ratingEndorsments = (rating, endorsments, getPage) => {
  if (!rating) return null

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
        (page, options, reqId) => getPage(page, { ...options, rating: rating.id }, reqId)
      }
      loadFirstPage={true}
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
  getRatingsPage: getPageFormatter(dispatch, getRatings),
  getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
})

const RatingPreview = connect(mapStateToProps, mapDispatchToProps)(RatingPreviewLook)

export default RatingPreview
