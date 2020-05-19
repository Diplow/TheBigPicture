import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Loader from '../../../components/Loader'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import EndorsmentPreview from '../../../components/Endorsment/preview'
import RatingList from '../../../components/Rating/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import Results from '../../../components/BigPicture/results'
import List from '../../../components/List'
import { RatingButton } from '../../../components/Rating/buttons'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import AddBigPictureButton from '../../../components/Buttons/add'
import HideAndShowButton from '../../../components/Buttons/hideandshow'

import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = (props) => {
  const {
    user,
    match,
    bigPicture,
    children,
    endorsments,
    getBigPicture,
    getReferences,
    getRatingsPage,
    getEndorsmentsPage } = props
  const [init, setter] = useState(bigPicture)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (bigPicture == undefined)
      getBigPicture(match.params.subjectId)
  }, [match])

  useEffect(() => {
    if (bigPicture != undefined)
      setter(bigPicture)
  }, [bigPicture])

  return (
    <div className="vde-bigpicture-page">
      <Loader condition={bigPicture == undefined}>
        { header(init) }
        <div className="vde container section">
          { content(init, user, setter) }
          { analyse(init, user) }
          { comments(init, getRatingsPage, user) }
          { references(init, getReferences) }
          { results(init) }
          { endorsmentsList(init, endorsments, getEndorsmentsPage) }
        </div>
      </Loader>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  getBigPicture: PropTypes.func.isRequired,
  getReferences: PropTypes.func.isRequired
}

const header = (bigPicture) => {
  if (bigPicture == undefined) return null

  return (
    <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
      <div className="vde container section">
        <div className="level is-mobile">
          <div style={{maxWidth: "100%"}} className="level-left">
            <span className="level-item author-icon">
              <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/>
            </span>
            <h1 className="vde title">
              {bigPicture.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

const content = (bigPicture, user, setter) => {
  const [hidden, setHidden] = useState(false)

  if (bigPicture == undefined) return null

  return (
    <div className="container vde section section-field">
      <div className="level is-mobile vde-header">
        <div className="level-left">
          <HideAndShowButton hidden={hidden} setHidden={setHidden} />
          <p className="vde subtitle level-item">Contenu</p>
          { user.id == bigPicture.author ? editButton(bigPicture, setter) : null}
        </div>
      </div>
      {
        !hidden
        ? <div className={"card vde tbp-description"}>
            <div className="vde card-content content">
              <ReactMarkdown source={bigPicture.body != "" ? bigPicture.body : "Ce contenu est vide pour le moment."} />
            </div>
          </div>
        : null
      }
    </div>
  )
}


const editButton = (init, setter) => {
  return (
    <EditionModalButton
      init={init}
      setter={setter}
      classname={"button tbp-radio title-button"}
      icon={"fas fa-edit"}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

const analyse = (bigPicture, user) => {
  if (bigPicture == undefined) return null

  return (
    <BigPictureList
      filter={bp => bp.parent == bigPicture.id}
      parent={bigPicture}
      count={bigPicture.children.length}
      getPage={null}
      title={"Analyse"}
      loadFirstPage={true}
      emptyMessage={"Aucun élément n'a encore été apporté pour préciser cette vue d'ensemble."}
      buttons={[
        () => { return backButton(bigPicture) },
        () => { return user.id == bigPicture.author ? addBigPictureButton(bigPicture) : null }
      ]}
      margin={0}
    />
  )
}


const backButton = (bp) => {
  const to = bp.parent == null ? "/" : `/subject/${bp.subject}/bigPicture/${bp.parent}`
  return (
    <div className="button tbp-radio title-button is-narrow" key={`back${bp.id}`}>
      <Link to={to}>
        <span className="icon is-small"><i className="fas fa-step-backward"></i></span>
      </Link>
    </div>
  )
}

const addBigPictureButton = (bigPicture) => {
  return <AddBigPictureButton key={`add${bigPicture.id}`} bigPicture={bigPicture} />
}


const comments = (bigPicture, getRatingsPage, user) => {
  if (bigPicture == undefined) return null

  return (
    <RatingList
      target={bigPicture}
      filter={(rating) => rating.target_bp == bigPicture.id}
      loadFirstPage={false}
      count={bigPicture.ratingCount}
      getPage={
        (page, options, requestId) => {
          return getRatingsPage(page, { ...options, bigpicture: bigPicture.id }, requestId)
        }
      }
      title={cst.REASON_LIST_TITLE}
      emptyMessage={cst.MSG_NO_REASON}
      buttons={[() => addRatingButton(bigPicture, user)]}
      margin={0}
    />
  )
}


const addRatingButton = (bigPicture, user) => {
  const initRating = {
    value: 0,
    target_bp: bigPicture.id,
    target_rating: null,
    author_id: user.id,
    reason: "",
    subject: bigPicture.subject
  }
  if (initRating.subject == null)
    initRating.subject = bigPicture.id
  return (
    <RatingButton initRating={initRating} classname={"button tbp-radio title-button"} icon={cst.RATING_ICON} />
  )
}


const references = (bigPicture, getReferences) => {
  if (bigPicture == undefined) return null

  return (
    <BigPictureList
      filter={bp => bigPicture.references.indexOf(bp.id) != -1}
      parent={bigPicture}
      count={bigPicture.referenceCount}
      getPage={
        (page, options, requestId) => {
          return getReferences(page, { ...options, reference: bigPicture.id }, requestId)
        }
      }
      title={cst.REFERENCE_LIST_TITLE}
      loadFirstPage={false}
      emptyMessage={cst.MSG_NO_REFERENCE}
      margin={0}
    />
  )
}


const endorsmentsList = (bigPicture, endorsments, getPage) => {
  if (bigPicture == undefined) return null

  const endorsmentsSort = (endorsmentA, endorsmentB) => {
    const dateA = new Date(endorsmentA.date)
    const dateB = new Date(endorsmentB.date)
    return dateA >= dateB ? 1 : -1
  }

  return (
    <List
      items={endorsments}
      container={(endorsment) => <EndorsmentPreview key={`previewendorsment-${endorsment.id}`} endorsmentId={endorsment.id} />}
      emptyMessage={cst.BP_HAS_NO_ENDORSMENT}
      sortFunc={endorsmentsSort}
      count={bigPicture.endorsmentCount}
      getPage={
        (page, options, reqId) => {
          return getPage(page, { ...options, bigpicture: bigPicture.id }, reqId)
        }
      }
      loadFirstPage={false}
      title={"Évaluations"}
      margin={0}
    />
  )
}

const results = (bigPicture) => {
  if (bigPicture == undefined) return null

  return (
    <Results showHeader={true} bigPictureId={bigPicture.id} margin={0} />
  )
}


export default BigPictureViewLook
