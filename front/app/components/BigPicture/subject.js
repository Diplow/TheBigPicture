import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import AuthorIcon from '../User/authorIcon'
import LinkButton from '../Buttons/link'

import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'
import { ReactComponent as EditIcon } from '../../images/icons/edit.svg'
import { ReactComponent as PinIcon } from '../../images/icons/pin.svg'

import NewBigPicture from './new'

import { AbstractContent } from '../../utils'
import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const SubjectPreviewLook = ({ bigPicture, user }) => {
  const [showNewBigPicture, setShowNewBigPicture] = useState(false)
  const [bigPictureBuffer, setBigPictureBuffer] = useState(null)

  useEffect(() => {
    if (bigPicture) {
      setBigPictureBuffer({
        id: bigPicture.id,
        title: bigPicture.title,
        body: bigPicture.body,
        author_id: user.id,
        kind: bigPicture.kind,
        parent: null,
        subject: bigPicture.subject,
        private: bigPicture.private
      })
    }
  }, [bigPicture, user])

  const header = (bigPicture) => {
    if (!bigPicture) return null


    const editButton = (
      <div className="vde header-button" onClick={() => setShowNewBigPicture(!showNewBigPicture)}>
        <EditIcon className="vde header-icon is-narrow icon-button" />
      </div>
    )

    const headerLevelLeft = (bigPicture) => (
      <div className="level-left">
        <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/>
        <p className="title">{bigPicture.title}</p>
        { user.id == bigPicture.author ? editButton : null }
      </div>
    )

    const headerLevelRight = (bigPicture) => {

      const lookButton = (bigPicture) => {
        if (!bigPicture) return null

        return (
          <LinkButton
            icon={ <LookIcon className="vde header-icon icon lookicon" /> }
            to={`/subject/${bigPicture.subject || bigPicture.id}/bigpicture/${bigPicture.id}`}
            classname="vde header-button is-narrow icon-button"
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
    return (
      <li className="card vde subject-preview">
        <NewBigPicture
          bp={bigPicture}
          newBigPicture={bigPictureBuffer}
          setNewBigPicture={setBigPictureBuffer} 
          setShowNewBigPicture={setShowNewBigPicture}
        />
      </li>
    )
  }

  const pinButton = (
    <div className="vde header-button level-item pin-icon">
      <PinIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  return (
    <div className={`card subject-preview ${ bigPicture.pin ? "pinned" : ""}`}>
      { bigPicture.pin ? pinButton : null }
      { header(bigPicture) }
      { content(bigPicture) }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  bigPicture: state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId),
  user: state.get("user")
})

const SubjectPreview = connect(mapStateToProps)(SubjectPreviewLook)

export default SubjectPreview
