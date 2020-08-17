import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'


import LinkButton from '../Buttons/link'
import NewBigPicture from './new'

import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg'

import { AbstractContent } from '../../utils'
import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const ChildPreviewLook = ({ bigPicture, user, key }) => {
  const [showNewBigPicture, setShowNewBigPicture] = useState(false)
  const [bigPictureBuffer, setBigPictureBuffer] = useState(null)

  useEffect(() => {
    if (bigPicture) {
      setBigPictureBuffer({
        id: bigPicture.id,
        title: bigPicture.title,
        body: bigPicture.body,
        author_id: user.id,
        kind: cst.RESOURCE,
        parent: bigPicture.parent,
        subject: bigPicture.subject || bigPicture.id,
        private: bigPicture.private
      })
    }
  }, [bigPicture])

  const header = (bigPicture) => {
    if (!bigPicture) return null

    const headerLevelLeft = (bigPicture) => {

      const editButton = (
        <div className="vde header-button" onClick={() => setShowNewBigPicture(!showNewBigPicture)}>
          <EditIcon className="vde header-icon is-narrow icon-button" />
        </div>
      )

      return (
        <div className="level-left">
          { user.id == bigPicture.author ? editButton : null }
          <p className="title">{bigPicture.title}</p>
        </div>
      )
    }

    const headerLevelRight = (bigPicture) => {

      const lookButton = (bigPicture) => {
        if (!bigPicture) return null

        return (
          <LinkButton
            icon={ <LookIcon className="vde header-icon icon lookicon" /> }
            to={`/subject/${bigPicture.subject || bigPicture.id}/bigpicture/${bigPicture.id}`}
            classname="vde is-narrow header-button icon-button"
          />
        )
      }

      return (
        <div className="level-right">
          { lookButton(bigPicture) }
        </div>
      )
    }

    return (
      <header className="card-header level is-mobile">
        { headerLevelLeft(bigPicture) }
        { headerLevelRight(bigPicture) }
      </header>
    )
  }

  const content = (bigPicture) => {
    if (!bigPicture) return null
    return <AbstractContent text={bigPicture.body} />
  }

  if (showNewBigPicture) {
    return <NewBigPicture newBigPicture={bigPictureBuffer} setNewBigPicture={setBigPictureBuffer} setShowNewBigPicture={setShowNewBigPicture} />
  }

  return (
    <li className="vde child" key={key}>
      { header(bigPicture) }
      { content(bigPicture) }
    </li>
  )
}

const mapStateToProps = (state, ownProps) => ({
  bigPicture: state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId),
  user: state.get("user")
})

const ChildPreview = connect(mapStateToProps)(ChildPreviewLook)

export default ChildPreview
