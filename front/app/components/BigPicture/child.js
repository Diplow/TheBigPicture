import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'


import AuthorIcon from '../User/authorIcon'
import LinkButton from '../Buttons/link'
import NewBigPicture from './new'

import { ReactComponent as LookIcon } from '../../images/icons/arrow.svg'
import { ReactComponent as ReferenceIcon } from '../../images/icons/forward.svg'

import { AbstractContent, hooks } from '../../utils'
import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


const ChildPreviewLook = ({ bigPicture, user, key }) => {
  const [
    editButton,
    newItem,
    showNewItem,
    setShowNewItem
  ] = hooks.useEditionBuffer({
    EditionWidget: NewBigPicture,
    initItem: (bigPicture, user) => ({
      id: bigPicture.id,
      title: bigPicture.title,
      body: bigPicture.body,
      hyperlink_id: bigPicture.hyperlink_id || "",
      author_id: user.id,
      kind: cst.RESOURCE,
      parent: bigPicture.parent,
      subject: bigPicture.subject || bigPicture.id,
      private: bigPicture.private
    }),
    item: bigPicture,
    user
  })

  const header = () => {
    if (!bigPicture) return null

    const headerLevelLeft = () => (
      <div className="level-left">
        { user.id == bigPicture.author ? editButton : null }
        <p className="title">{bigPicture.title}</p>
        {
          bigPicture.hyperlink_id ? (
            <LinkButton
              icon={ <ReferenceIcon className="vde header-icon icon lookicon" /> }
              to={`/bigpicture/${bigPicture.hyperlink_id || bigPicture.id}`}
              classname="vde is-narrow header-button icon-button"
            />
          ) : null
        }
      </div>
    )

    const headerLevelRight = () => {

      const lookButton = (bigPicture) => {
        if (!bigPicture) return null
        return (
          <LinkButton
            icon={ <LookIcon className="vde header-icon icon lookicon" /> }
            to={`/bigpicture/${bigPicture.hyperlink_id || bigPicture.id}`}
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
        { headerLevelLeft() }
        { headerLevelRight() }
      </header>
    )
  }

  const content = () => {
    if (!bigPicture) return null
    return <AbstractContent text={bigPicture.body} />
  }

  if (showNewItem) return newItem 

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
