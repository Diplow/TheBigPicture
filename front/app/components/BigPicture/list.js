
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BigPicturePreview from './preview'
import List from '../List'
import * as cst from '../../constants'
import "./style.scss"


const BigPictureListLook = (props) => {
  const {
    bigPictures,
    user,
    emptyMessage,
    parent,
    sortFunc,
    count,
    getPage,
    showHeader,
    loadFirstPage,
    title,
    buttons,
    search,
    margin,
    name,
    icon
  } = props

  const sortBigPictures = (a, b) => {
    // Sort by modif date
    const aModifDate = new Date(a.modification_date)
    const bModifDate = new Date(b.modification_date)
    return aModifDate>bModifDate ? -1 : aModifDate<bModifDate ? 1 : 0
  }

  return (
    <List
      name={name}
      items={bigPictures}
      container={(bigPicture) => <BigPicturePreview bigPictureId={bigPicture.id} margin={0} />}
      user={user}
      emptyMessage={emptyMessage}
      sortFunc={sortFunc || sortBigPictures}
      count={count}
      getPage={getPage}
      loadFirstPage={loadFirstPage}
      showHeader={showHeader}
      title={title}
      buttons={buttons}
      search={search}
      margin={margin}
      icon={icon}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  bigPictures: state.get("bigpictures").filter(ownProps.filter),
  user: state.get("user")
})

const BigPictureList = connect(mapStateToProps)(BigPictureListLook)

export default BigPictureList
