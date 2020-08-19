import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Loader from '../../../components/Loader'
import LinkButton from '../../../components/Buttons/link'
import HideAndShowButton from '../../../components/Buttons/hideandshow'
import ChildPreview from '../../../components/BigPicture/child'
import NewBigPicture from '../../../components/BigPicture/new'
import ratingsSort from '../../../components/Rating/sort'
import RatingPreview from '../../../components/Rating/preview'
import AuthorIcon from '../../../components/User/authorIcon'
import List from '../../../components/List'

import { ReactComponent as NewBigPictureIcon } from '../../../images/icons/pencil-solid.svg'
import { ReactComponent as LookIcon } from '../../../images/icons/arrow.svg'

import { AbstractContent } from '../../../utils'

import * as cst from '../../../constants'
import "./style.scss"


const BigPictureSectionLook = (props) => {
  const {
    user,
    bigPicture,
    children
  } = props

  const [hiddenBpDetails, setHiddenBpDetails] = useState(false)
  const [showNewBigPicture, setShowNewBigPicture] = useState(false)
  const [newBigPicture, setNewBigPicture] = useState(null)

  useEffect(() => {
    if (bigPicture) {
      setNewBigPicture({
        title: "",
        body: "",
        author_id: user.id,
        kind: cst.RESOURCE,
        parent: bigPicture.id,
        subject: bigPicture.subject || bigPicture.id,
        private: bigPicture.private
      })
    }
  }, [bigPicture, user])

  const lookButton = (bigPicture) => (
    <LinkButton
      icon={ <LookIcon className="vde header-icon backicon" /> }
      to={!bigPicture.parent ? '/' : `/subject/${bigPicture.subject}/bigpicture/${bigPicture.parent}`}
      classname="vde header-button is-narrow icon-button"
    />
  )

  const addChild = (    
    <div className="vde header-button" onClick={() => { setShowNewBigPicture(!showNewBigPicture)}}>
      <NewBigPictureIcon className="vde header-icon is-narrow icon-button" />
    </div>
  )

  const headerLevelLeft = (bigPicture) => (
    <div className="level-left">
      { lookButton(bigPicture) }
      <AuthorIcon userId={bigPicture.author} showIcon={true} clickable={true}/>
      <p style={{margin: 0}} className="title">{bigPicture.title}</p>
      { user.id == bigPicture.author ? addChild : null }
    </div>
  )

  const headerLevelRight = () => (
    <div className="level-right">
      <HideAndShowButton hidden={hiddenBpDetails} setHidden={setHiddenBpDetails} />
    </div>
  )


  const header = (bigPicture) => (
    <header className="card-header level is-mobile">
      { headerLevelLeft(bigPicture) }
      { headerLevelRight() }
    </header>
  )

  const analyse = (bigPicture, children) => (
    <List
      name={`bp-${bigPicture.id}-children-list`}
      items={children}
      container={(bigPicture, idx) => <ChildPreview key={`bp-${bigPicture.id}-child-${idx}`} bigPictureId={bigPicture.id} />}
      user={user}
      emptyMessage={""}
      sortFunc={(a, b) => a.title > b.title ? 1 : -1}
      count={bigPicture.children.length}
      getPage={null}
      margin={0}
      loadFirstPage={true}
    />
  )

  return (
    <div className="vde card subject-preview">
      <Loader condition={!bigPicture}>
        { bigPicture ? header(bigPicture) : null }
        { bigPicture && !hiddenBpDetails ? <AbstractContent text={bigPicture.body} /> : null }
        { showNewBigPicture
          ? (
            <NewBigPicture
              newBigPicture={newBigPicture}
              setNewBigPicture={setNewBigPicture}
              setShowNewBigPicture={setShowNewBigPicture} />
          )
          : null }
        { bigPicture && !hiddenBpDetails ? analyse(bigPicture, children) : null }
      </Loader>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.get("user"),
  children: ownProps.bigPicture && state.get("bigpictures").filter((elt) => elt.parent == ownProps.bigPicture.id),
})

const BigPictureSection = connect(mapStateToProps)(BigPictureSectionLook)

export default BigPictureSection
