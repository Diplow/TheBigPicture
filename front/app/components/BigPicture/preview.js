import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ReactMarkdown from 'react-markdown'

import {
  getBigPicture,
  getRatings,
  getSubjects,
  getEndorsments
} from '../../actions/index'

import BigPictureModal from './modal'
import Results from './results'
import NewBigPicture from './new'

import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { RatingButton } from '../Rating/buttons'

import EndorsmentPreview from '../Endorsment/preview'
import endorsmentsSort from '../Endorsment/sort'

import AuthorIcon from '../User/authorIcon'

import List, { getPageFormatter } from '../List'

import DropdownMenu from '../DropDownMenu'
import DropDownButton from '../DropDownButton'

import RadioButton from '../Buttons/radio'
import EditionModalButton from '../Buttons/modal'
import LinkButton from '../Buttons/link'

import { ReactComponent as BookIcon } from '../../images/icons/book.svg'
import { ReactComponent as StarIcon } from '../../images/icons/star.svg'
import { ReactComponent as ReasonIcon } from '../../images/icons/reasons.svg'
import { ReactComponent as EyeIcon } from '../../images/icons/eye.svg'
import { ReactComponent as SiteMapIcon } from '../../images/icons/sitemap.svg'
import { ReactComponent as PlusIcon } from '../../images/icons/plus.svg'
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg'
import { ReactComponent as ChartIcon } from '../../images/icons/barchart.svg'
import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'
import { ReactComponent as ReferenceIcon } from '../../images/icons/reference.svg'


import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const BigPicturePreviewLook = (props) => {
  const {
    bigPicture,
    children,
    references,
    endorsments,
    user,
    hyperlink,
    ratings,
    bigPictureId,
    getBigPicture,
    getBigPictureRatings,
    getReferences,
    getEndorsmentsPage
  } = props

  useEffect(() => {
    if (!bigPicture)
      getBigPicture(bigPictureId)
  }, [])

  const [bpDataEditionBuffer, setBpDataEditionBuffer] = useState(bigPicture)

  useEffect(() => {
    setBpDataEditionBuffer(bigPicture)
  }, [bigPicture])

  const [menu, setMenu] = useState(null)
  const [showChildren, toggleChildren] = utils.hooks.useToggle(false)
  const [showRatings, toggleRatings] = utils.hooks.useToggle(false)
  const [showDetails, toggleDetails] = utils.hooks.useToggle(false)
  const [showResults, toggleResults] = utils.hooks.useToggle(false)
  const [showEndorsments, toggleEndorsments] = utils.hooks.useToggle(false)
  const [showReferences, toggleReferences] = utils.hooks.useToggle(false)

  const cardId = !bigPicture && `bp-preview-${bigPicture.id}` || ""

  return (
    <div>
      <div id={cardId} className="vde card">
        <header
          className="vde card-header level preview-item-level is-mobile"
          onClick={() => toggleDetails()}
        >
          { bpLeftLevel(bigPicture) }
        </header>
        { bpDetails(showDetails, bigPicture.body) }
        {
          toolBar({
            bigPicture,
            ratings,
            toggleDetails,
            toggleRatings,
            toggleChildren,
            toggleResults,
            toggleEndorsments,
            toggleReferences,
            showDetails,
            showRatings,
            showChildren,
            showResults,
            showEndorsments,
            showReferences,
            bpDataEditionBuffer,
            setBpDataEditionBuffer,
            user,
            menu,
            setMenu,
            cardId
          })
        }
      </div>
      { showChildren ? bpChildren(bigPicture, children, user) : null }
      { showRatings ? bpRatings(bigPicture, ratings, getBigPictureRatings) : null }
      { showReferences ? bpReferences(bigPicture, user, references, getReferences) : null }
      { showEndorsments ? bpEndorsments(bigPicture, endorsments, getEndorsmentsPage) : null }
      { showResults  ? <Results showHeader={false} bigPictureId={bigPicture.id} /> : null }
    </div>
  )
}

const bpLeftLevel = (bigPicture) => {
  if (!bigPicture) return null

  const bpFigure = (icon) => (
    <figure className="vde bp-icons level-item image is-32x32">
      <i className={icon}></i>
    </figure>
  )

  return (
    <div style={{maxWidth:"100%"}} className="level-left">
      { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/> : null }
      { bigPicture.kind == cst.PROBLEM ? bpFigure(cst.icons.PROBLEM) : null }
      { bigPicture.kind == cst.SOLUTION ? bpFigure(cst.icons.SOLUTION) : null }
      { bigPicture.kind == cst.RESOURCE ? bpFigure(cst.icons.RESOURCE) : null }
      { bigPicture.hyperlink_id != null ? bpFigure(cst.icons.HYPERLINK) : null }
      <p className="vde title">{bigPicture.title}</p>
    </div>
  )
}

const toolBar = (props) => {
  const {
    bigPicture,
    ratings,
    toggleDetails,
    toggleRatings,
    toggleChildren,
    toggleResults,
    toggleEndorsments,
    toggleReferences,
    showDetails,
    showRatings,
    showChildren,
    showResults,
    showEndorsments,
    showReferences,
    bpDataEditionBuffer,
    setBpDataEditionBuffer,
    user,
    menu,
    setMenu,
    cardId
  } = props

  return (
    <div className="vde toolbar level is-mobile">
      <div className="level-left">
        <p className="content">{`${bigPicture.id} - ${bigPicture.creation_date}`}</p>
      </div>
      <div className="level-right">
        {
          analyseDropdown({
            menu,
            setMenu,
            toggleDetails,
            toggleChildren,
            showDetails,
            showChildren,
            bpDataEditionBuffer,
            setBpDataEditionBuffer,
            user
          })
        }
        {
          reasonDropdown({
            menu,
            setMenu,
            showRatings,
            showReferences,
            toggleRatings,
            toggleReferences,
            bpDataEditionBuffer,
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
            bpDataEditionBuffer
          })
        }
        {
          lookButton(
            bigPicture,
            `${cardId}-toolbarbutton-look`
          )
        }
      </div>
    </div>
  )
}


const analyseDropdown = (props) => {
  const {
    menu,
    setMenu,
    toggleDetails,
    toggleChildren,
    showDetails,
    showChildren,
    bpDataEditionBuffer,
    setBpDataEditionBuffer,
    user
  } = props

  const [editionModalIsActive, setEditionModalIsActive] = useState(false)
  const [creationModalIsActive, setCreationModalIsActive] = useState(false)
  const [newChild, setNewChild] = useState(null)

  useEffect(() => {
    if (bpDataEditionBuffer)
      setNewChild({
        parent: bpDataEditionBuffer.id,
        title: "",
        body: "",
        author_id: user.id,
        private: bpDataEditionBuffer.private,
        subject: bpDataEditionBuffer.subject || bpDataEditionBuffer.id,
        kind: cst.RESOURCE
      })
  }, [bpDataEditionBuffer])

  if (!bpDataEditionBuffer || !newChild) return null

  let links = []
  if (bpDataEditionBuffer.body !== "") {
    links.push({
      leftIcon: <EyeIcon className="vde toolbar menu image" />,
      name: showDetails ? cst.labels.HIDE_CONTENT : cst.labels.SHOW_CONTENT,
      onClick: () => toggleDetails()
    })
  }
  if (bpDataEditionBuffer.children.length !== 0) {
    links.push({
      leftIcon: <SiteMapIcon className="vde toolbar menu image" />,
      name: showChildren ? cst.labels.HIDE_CHILDREN : cst.labels.SHOW_CHILDREN,
      onClick: () => toggleChildren()
    })
  }
  if (bpDataEditionBuffer.author == user.id) {
    links.push({
      leftIcon: <PlusIcon className="vde toolbar menu image" />,
      name: cst.labels.ADD_CHILD,
      onClick: () => setCreationModalIsActive(true)
    })
    links.push({
      leftIcon: <EditIcon className="vde toolbar menu image" />,
      name: cst.labels.EDIT_BP,
      onClick: () => setEditionModalIsActive(true)
    })
  }

  return (
    <div>
      <DropDownButton
        name="analyse"
        isActive={menu}
        setIsActive={setMenu}
        classname="vde toolbar level-item"
        icon={ <BookIcon className="vde toolbar menu image" /> }
      >
        <DropdownMenu linksArray={links} />
      </DropDownButton>

      <BigPictureModal
        title={"Modification de la vue"}
        construct={
          <NewBigPicture data={bpDataEditionBuffer} setData={setBpDataEditionBuffer} />
        }
        active={editionModalIsActive}
        setActive={setEditionModalIsActive}
        data={bpDataEditionBuffer}
      />

      <BigPictureModal
        title={"Ajouter une vue enfant"}
        construct={
          <NewBigPicture data={newChild} setData={setNewChild} />
        }
        active={creationModalIsActive}
        setActive={setCreationModalIsActive}
        data={newChild}
      />
    </div>
  )
}

const reasonDropdown = (props) => {
  const {
    menu,
    setMenu,
    toggleRatings,
    toggleReferences,
    showRatings,
    showReferences,
    bpDataEditionBuffer,
    user
  } = props

  const [createReasonModalIsActive, setCreateReasonModalIsActive] = useState(false)
  const [newReason, setNewReason] = useState(null)

  useEffect(() => {
    if (bpDataEditionBuffer)
      setNewReason({
        body: "",
        target_bp: bpDataEditionBuffer.id,
        author_id: user.id,
        subject: bpDataEditionBuffer.subject || bpDataEditionBuffer.id
      })
  }, [bpDataEditionBuffer])

  if (!bpDataEditionBuffer || !newReason) return null

  let links = [
    {
      leftIcon: <EyeIcon className="vde toolbar menu image" />,
      name: showRatings ? cst.labels.HIDE_REASONS : cst.labels.SHOW_REASONS,
      onClick: () => toggleRatings()
    },
    {
      leftIcon: <ReferenceIcon className="vde toolbar menu image" />,
      name: showReferences ? cst.labels.HIDE_REFERENCES : cst.labels.SHOW_REFERENCES,
      onClick: () => toggleReferences()
    }
  ]
  if (user.id !== cst.GUEST_ID) {
    links.push({
      leftIcon: <PlusIcon className="vde toolbar menu image" />,
      name: cst.labels.CREATE_REASON,
      onClick: () => setCreateReasonModalIsActive(true)
    })
  }

  return (
    <div>
      <DropDownButton
        name="reasons"
        isActive={menu}
        setIsActive={setMenu}
        classname="vde toolbar level-item"
        icon={ <ReasonIcon className="vde toolbar menu image"/> }
      >
        <DropdownMenu linksArray={links} />
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
    bpDataEditionBuffer
  } = props

  if (!bpDataEditionBuffer) return null

  return (
    <DropDownButton
      name="results"
      isActive={menu}
      setIsActive={setMenu}
      classname="vde toolbar level-item"
      icon={ <StarIcon className="vde toolbar menu image" /> }
    >
      <DropdownMenu
        linksArray={[{
          leftIcon: <EyeIcon className="vde toolbar menu image" />,
          name: showEndorsments ? cst.labels.HIDE_ENDORSMENTS : cst.labels.SHOW_ENDORSMENTS,
          onClick: () => toggleEndorsments()
        },
        {
          leftIcon: <ChartIcon className="vde toolbar menu image" />,
          name: showResults ? cst.labels.HIDE_RESULTS : cst.labels.SHOW_RESULTS,
          onClick: () => toggleResults()
        }]} />
    </DropDownButton>
  )
}

const lookButton = (bigPicture, id) => {
  if (!bigPicture) return null

  const bpSubject = bigPicture.subject || bigPicture.id
  const subjectId = bigPicture.hyperlink_id ||  bpSubject
  const bpId = bigPicture.hyperlink || bigPicture.id

  return (
    <LinkButton
      id={id}
      icon={ <LookIcon className="vde toolbar menu image" /> }
      to={`/subject/${subjectId}/bigPicture/${bpId}`}
      classname="vde toolbar level-item icon-button"
    />
  )
}

const bpDetails = (showDetails, body) => {
  if (!showDetails) return null
  if (body == undefined || body == "") return null

  return (
    <div className="vde card-content">
      <div className="content">
        <ReactMarkdown source={body} />
      </div>
    </div>
  )
}

const bpChildren = (bigPicture, children, user) => {
  if (!bigPicture) return null

  return (
    <List
      name={`bp-preview-${bigPicture.id}-children-list`}
      items={children}
      container={(bp) => <BigPicturePreview key={"preview"+bp.id} bigPictureId={bp.id} />}
      user={user}
      emptyMessage={""}
      sortFunc={(a, b) => a.title > b.title ? 1 : -1}
      count={bigPicture.children.length}
      getPage={null}
      loadFirstPage={true}
    />
  )
}


const bpReferences = (bigPicture, user, references, getReferences) => {
  if (!bigPicture) return null

  return (
    <List
      name={`bp-page-${bigPicture.id}-references-list`}
      items={references}
      container={(bp) => <BigPicturePreview key={"preview"+bp.id} bigPictureId={bp.id} />}
      user={user}
      emptyMessage={cst.labels.MSG_NO_REFERENCE}
      sortFunc={(a, b) => a.title > b.title ? 1 : -1}
      count={bigPicture.referenceCount}
      getPage={
        (page, options, requestId) => (
          getReferences(page, { ...options, reference: bigPicture.id }, requestId)
        )
      }
      loadFirstPage={true}
    />
  )
}

const bpEndorsments = (bigPicture, endorsments, getPage) => {
  if (!bigPicture) return null

  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      name={`bp-preview-${bigPicture.id}-endorsments-list`}
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview endorsmentId={endorsment.id} />}
      emptyMessage={cst.labels.BP_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={bigPicture.endorsmentCount}
      getPage={
        (page, options, reqId) => (
          getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        )
      }
      loadFirstPage={true}
    />
  )
}

const bpRatings = (bigPicture, ratings, getPage) => {
  if (!bigPicture) return null

  return (
    <RatingList
      name={`bp-preview-${bigPicture.id}-ratings-list`}
      target={bigPicture}
      filter={(rating) => rating.target_bp == bigPicture.id}
      loadFirstPage={true}
      emptyMessage={cst.labels.MSG_NO_REASON}
      count={bigPicture.ratingCount}
      getPage={
        (page, options, reqId) => (
          getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        )
      }
    />
  )
}


const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId)
  return {
    bigPicture,
    children: bigPicture != null ? state.get("bigpictures").filter((bp) => bigPicture.children.indexOf(bp.id) != -1) : [],
    user: state.get("user"),
    references: bigPicture != null ? state.get("bigpictures").filter((bp) => bigPicture.references.indexOf(bp.id) != -1) : [],
    endorsments: state.get("endorsments").filter((elt) => elt.bigPicture == ownProps.bigPictureId),
    hyperlink: bigPicture != null ? state.get("bigpictures").find((bp) => bp.id == bigPicture.hyperlink_id) : null,
    ratings: state.get("ratings").filter((rating) => rating.target_bp == ownProps.bigPictureId)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) },
  getBigPictureRatings: getPageFormatter(dispatch, getRatings),
  getReferences: getPageFormatter(dispatch, getSubjects),
  getEndorsmentsPage: getPageFormatter(dispatch, getEndorsments)
})

const BigPicturePreview = connect(mapStateToProps, mapDispatchToProps)(BigPicturePreviewLook)

export default BigPicturePreview
