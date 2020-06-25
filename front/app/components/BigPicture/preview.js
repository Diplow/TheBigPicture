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

import Preview from '../Preview'
import useToggleAction from '../Preview/action_toggle'
import useModalAction from '../Preview/action_modal'

import BigPictureModal from './modal'
import Results from './results'
import NewBigPicture from './new'

import RatingModal from '../Rating/modal'
import RatingPreview from '../Rating/preview'
import NewRating from '../Rating/new'
import RatingList from '../Rating/list'
import { RatingButton } from '../Rating/buttons'

import LoginModal from '../Login/modal'

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
    bigPictureId,
    getBigPicture,
    getBigPictureRatings,
    getReferences,
    getEndorsmentsPage
  } = props

  const [showContent, toggleContent] = utils.hooks.useToggle(false)

  const [creationModalIsActive, setCreationModalIsActive] = useState(false)
  const [editionModalIsActive, setEditionModalIsActive] = useState(false)
  const [createReasonModalIsActive, setCreateReasonModalIsActive] = useState(false)

  const header = (bigPicture, toggleContent) => {
    if (!bigPicture) return null

    const bpFigure = (icon) => (
      <figure className="vde bp-icons level-item image is-32x32">
        <i className={icon}></i>
      </figure>
    )

    return (
      <header
        className="vde card-header level preview-item-level is-mobile"
        onClick={() => toggleContent()}
      >
        <div style={{maxWidth:"100%"}} className="level-left">
          { bigPicture.kind == cst.SUBJECT ? <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/> : null }
          { bigPicture.kind == cst.PROBLEM ? bpFigure(cst.icons.PROBLEM) : null }
          { bigPicture.kind == cst.SOLUTION ? bpFigure(cst.icons.SOLUTION) : null }
          { bigPicture.kind == cst.RESOURCE ? bpFigure(cst.icons.RESOURCE) : null }
          { bigPicture.hyperlink_id != null ? bpFigure(cst.icons.HYPERLINK) : null }
          <p className="vde title">{bigPicture.title}</p>
        </div>
      </header>
    )
  }

  const content = (show, body) => {
    if (!show) return null
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

  const addChildModal = (bigPicture, user, creationModalIsActive, setCreationModalIsActive) => {
    const [newChild, setNewChild] = useState(null)

    useEffect(() => {
      if (bigPicture)
        setNewChild({
          parent: bigPicture.id,
          title: "",
          body: "",
          author_id: user.id,
          private: bigPicture.private,
          subject: bigPicture.subject || bigPicture.id,
          kind: cst.RESOURCE
        })
    }, [bigPicture, user])

    if (!bigPicture || bigPicture.author !== user.id) return null

    return (
      <BigPictureModal
        title={ cst.labels.ADD_CHILD }
        construct={ <NewBigPicture data={ newChild } setData={ setNewChild } /> }
        active={ creationModalIsActive }
        setActive={ setCreationModalIsActive }
        data={ newChild }
      />
    )
  }

  const editModal = (bigPicture, user, editionModalIsActive, setEditionModalIsActive) => {
    const [editionBuffer, setEditionBuffer] = useState(bigPicture)

    useEffect(() => {
      if (bigPicture)
        setEditionBuffer(bigPicture)
    }, [bigPicture, user])

    if (bigPicture.author !== user.id) {
      return null
    }

    return (
      <BigPictureModal
        title={ cst.labels.EDIT_BP }
        construct={ <NewBigPicture data={ editionBuffer } setData={ setEditionBuffer } /> }
        active={ editionModalIsActive }
        setActive={ setEditionModalIsActive }
        data={ editionBuffer }
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
          (page, options, requestId) => getReferences(page, { ...options, reference: bigPicture.id }, requestId)
        }
        loadFirstPage={true}
      />
    )
  }

  const bpRatings = (bigPicture, getPage) => {
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

  const ratingModal = (bigPicture, user, createReasonModalIsActive, setCreateReasonModalIsActive) => {
    const [newReason, setNewReason] = useState(null)
    useEffect(() => {
      if (bigPicture)
        setNewReason({
          body: "",
          target_bp: bigPicture.id,
          author_id: user.id,
          subject: bigPicture.subject || bigPicture.id
        })
    }, [bigPicture])

    if (!bigPicture || !newReason) return null

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

  const lookButton = (bigPicture) => {
    if (!bigPicture) return null

    const bpSubject = bigPicture.subject || bigPicture.id
    const subjectId = bigPicture.hyperlink_id ||  bpSubject
    const bpId = bigPicture.hyperlink || bigPicture.id

    return (
      <LinkButton
        icon={ <LookIcon className="vde toolbar menu image" /> }
        to={`/subject/${subjectId}/bigPicture/${bpId}`}
        classname="vde toolbar level-item icon-button"
      />
    )
  }

  return (
    <Preview
      item={bigPicture}
      itemId={bigPictureId}
      itemType={"bigpicture"}
      getItem={getBigPicture}
      header={ header(bigPicture, toggleContent) }
      content={ content(showContent, bigPicture.body) }
      leftToolbar={ <p className="content">{`${bigPicture.id} - ${bigPicture.creation_date}`}</p> }
      lookButton={ lookButton(bigPicture) }
      user={user}
      steps={[
        {
          step: cst.ANALYSE_STEP,
          icon: <BookIcon className="vde toolbar menu image" />,
          actions: [
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_CHILDREN,
              deactivateLabel: cst.labels.HIDE_CHILDREN,
              icon: <SiteMapIcon className="vde toolbar menu image" />,
              step: cst.ANALYSE_STEP,
              display: () => bpChildren(bigPicture, children, user)
            },
            {
              hidden: !bigPicture || bigPicture.author !== user.id,
              constructor: useModalAction,
              label: cst.labels.ADD_CHILD,
              icon: <PlusIcon className="vde toolbar menu image" />,
              modal: addChildModal(bigPicture, user, creationModalIsActive, setCreationModalIsActive),
              setActiveModal: setCreationModalIsActive
            },
            {
              hidden: !bigPicture || bigPicture.author !== user.id,
              constructor: useModalAction,
              label: cst.labels.EDIT_BP,
              icon: <EditIcon className="vde toolbar menu image" />,
              modal: editModal(bigPicture, user, editionModalIsActive, setEditionModalIsActive),
              setActiveModal: setEditionModalIsActive
            }
          ]
        },
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
              display: (bp) => bpRatings(bp, getBigPictureRatings)
            },
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_REFERENCES,
              deactivateLabel: cst.labels.HIDE_REFERENCES,
              icon: <ReferenceIcon className="vde toolbar menu image" />,
              step: cst.REASON_STEP,
              display: (bp) => bpReferences(bp, user, references, getReferences)
            },
            {
              constructor: useModalAction,
              label: cst.labels.CREATE_REASON,
              icon: <PlusIcon className="vde toolbar menu image" />,
              modal: ratingModal(bigPicture, user, createReasonModalIsActive, setCreateReasonModalIsActive),
              setActiveModal: setCreateReasonModalIsActive
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
              display: () => <Results showHeader={false} bigPictureId={bigPicture.id} />
            },
            {
              constructor: useToggleAction,
              activateLabel: cst.labels.SHOW_ENDORSMENTS,
              deactivateLabel: cst.labels.HIDE_ENDORSMENTS,
              icon: <EyeIcon className="vde toolbar menu image" />,
              step: cst.DELIBERATION_STEP,
              display: (bp) => bpEndorsments(bp, endorsments, getEndorsmentsPage)
            }
          ]
        }
      ]}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  const bigPicture = state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId)
  return {
    bigPicture,
    children: bigPicture ? state.get("bigpictures").filter((bp) => bigPicture.children.indexOf(bp.id) !== -1) : [],
    user: state.get("user"),
    references: bigPicture ? state.get("bigpictures").filter((bp) => bigPicture.references.indexOf(bp.id) !== -1) : [],
    endorsments: state.get("endorsments").filter((elt) => elt.bigPicture == ownProps.bigPictureId),
    hyperlink: bigPicture ? state.get("bigpictures").find((bp) => bp.id == bigPicture.hyperlink_id) : null
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
