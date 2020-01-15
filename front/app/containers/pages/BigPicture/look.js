import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import RatingList from '../../../components/Rating/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import Results from '../../../components/BigPicture/results'
import { RatingButton } from '../../../components/Rating/buttons'
import AuthorIcon from '../../../components/User/authorIcon'
import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = ({ user, match, bigPicture, children, getBigPicture, getReferences }) => {

  useEffect(() => {
    getBigPicture(match.params.subjectId)
  }, [match])

  return (
    <div className="vde-bigpicture-page">
      { bigPicture == undefined ? <div className="container tbp-section section-field"><div className="loader"></div></div> : null }
      { header(bigPicture) }
      { analyse(bigPicture) }
      { comments(bigPicture) }
      { references(bigPicture, getReferences) }
      { results(bigPicture) }
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
  const [hidden, setHidden] = useState(false)

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
            <h1 className="title" onClick={() => setHidden(!hidden)}>
              {bigPicture.title}
              <p className={hidden ? "tbp-description is-hidden" : "tbp-description"}>{bigPicture.body}</p>
            </h1>
          </div>
        </div>
      </div>
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
