import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import RatingList from '../../../components/Rating/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import { RatingButton } from '../../../components/Rating/buttons'
import AuthorIcon from '../../../components/User/authorIcon'
import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = ({ user, match, bigPicture, children, getBigPicture }) => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    getBigPicture(match.params.subjectId)
  }, [match])

  if (bigPicture == undefined)
    return null

  return (
    <div className="vde-bigpicture-page">
      <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
        <div className="container tbp-section">
          <div className="level is-mobile">
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
      <div className="container tbp-section section-field">
        <BigPictureList
          parent={bigPicture}
          count={bigPicture.children.length}
          getPage={(page) => {}}
          filter={bp => bp.parent == bigPicture.id}
        />
      </div>
      <div className="container tbp-section section-field">
        <RatingList
          target={bigPicture}
          ratingsFilter={(rating) => rating.target_bp == bigPicture.id}
        />
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  getBigPicture: PropTypes.func.isRequired
}


export default BigPictureViewLook
