import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import RatingList from '../../../components/Rating/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import Results from '../../../components/BigPicture/results'
import { RatingButton } from '../../../components/Rating/buttons'
import AuthorIcon from '../../../components/User/authorIcon'
import EditionModalButton from '../../../components/Buttons/modal'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = ({ user, match, bigPicture, children, getBigPicture, getReferences }) => {
  useEffect(() => {
    if (bigPicture == undefined)
      getBigPicture(match.params.subjectId)
  }, [match])

  const [init, setter] = useState(bigPicture)

  useEffect(() => {
    if (bigPicture != undefined)
      setter(bigPicture)
  }, [bigPicture])

  return (
    <div className="vde-bigpicture-page">
      { init == undefined ? <div className="container tbp-section section-field"><div className="loader" style={{width:"5rem", height:"5rem"}}></div></div> : null }
      { header(init) }
      { content(init, user, setter) }
      { analyse(init) }
      { comments(init) }
      { references(init, getReferences) }
      { results(init) }
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
  if (bigPicture == undefined)
    return null

  return (
    <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
      <div className="container tbp-section">
        <div className="level is-mobile no-top-margin">
          <div className="level-left">
            <span className="level-item author-icon">
              <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/>
            </span>
            <h1 className="title">
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

  if (bigPicture == undefined)
    return null

  return (
    <div className="container tbp-section section-field">
      <div className="level is-mobile vde-header">
        <div className="level-left">
          { hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-plus"></i></figure> : null }
          { !hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-minus"></i></figure> : null }
          <p className="subtitle level-item vde-subtitle-bp-page">Contenu</p>
          { user.id == bigPicture.author ? editButton(bigPicture, setter) : null}
        </div>
      </div>
      <div className={hidden ? "card bp-tile tbp-description is-hidden" : "card bp-tile tbp-description"}>
        <div className="content">
          <ReactMarkdown source={bigPicture.body != "" ? bigPicture.body : "Ce contenu est vide pour le moment."} />
        </div>
      </div>
    </div>
  )
}


const editButton = (init, setter) => {
  return (
    <div className="button tbp-radio vde-add-comment is-narrow">
      <EditionModalButton
        init={init}
        setter={setter}
        icon={"fas fa-edit"}
        EditionModal={BigPictureModal}
        NewItem={NewBigPicture}
      />
    </div>
  )
}

const analyse = (bigPicture) => {
  if (bigPicture == undefined)
    return null

  return (
    <div className="container tbp-section section-field">
      <BigPictureList
        parent={bigPicture}
        count={bigPicture.children.length}
        title={"Analyse"}
        emptyMessage={"Aucun élément d'analyse n'a encore été apporté pour préciser cette vue d'ensemble."}
        loadFirstPage={true}
        buttons={[cst.ADD_BUTTON, cst.BACK_BUTTON]}
        getPage={(page) => {}}
        filter={bp => bp.parent == bigPicture.id}
      />
    </div>
  )
}

const comments = (bigPicture) => {
  if (bigPicture == undefined)
    return null

  return (
    <div className="container tbp-section section-field">
      <RatingList
        target={bigPicture}
        margin={cst.BASE_MARGIN}
        showHeader={true}
        loadFirstPage={true}
        ratingsFilter={(rating) => rating.target_bp == bigPicture.id}
      />
    </div>
  )
}

const references = (bigPicture, getReferences) => {
  if (bigPicture == undefined)
    return null

  return (
    <div className="container tbp-section section-field">
      <BigPictureList
        parent={bigPicture}
        count={bigPicture.referenceCount}
        title={"Références"}
        emptyMessage={"Cette vue d'ensemble n'a encore été référencée nulle part sur VDE."}
        loadFirstPage={false}
        buttons={[]}
        getPage={(page) => {getReferences(page, bigPicture.id)}}
        filter={bp => bigPicture.references.indexOf(bp.id) != -1}
      />
    </div>
  )
}

const results = (bigPicture) => {
  if (bigPicture == undefined)
    return null

  return (
    <Results showHeader={true} bigPictureId={bigPicture.id} />
  )
}


export default BigPictureViewLook
