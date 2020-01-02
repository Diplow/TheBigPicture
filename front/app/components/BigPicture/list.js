
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { getBigPicture } from '../../actions'

import usePagination from '../utils/pagination'
import EditionModalButton from '../Buttons/modal'

import BigPicturePreview from './preview'
import NewBigPicture from './new'
import BigPictureModal from './modal'

import * as cst from '../../constants'
import "./style.scss"


const BigPictureListLook = ({ user, parent, bigPictures, count, getPage, ratings }) => {
  bigPictures.sort((a, b) => bpSort(ratings, a, b))
  const [pagination, page] = usePagination(bigPictures, count, getPage, cst.PAGE_SIZE)

  return (
    <div className="section">
    { header(parent, user) }
    { page.map((bp) => <BigPicturePreview key={bp.id} bigPictureId={bp.id} margin={0} />) }
    { pagination }
    </div>
  )
}

BigPictureListLook.propTypes = {
  user: PropTypes.object.isRequired,
  parent: PropTypes.object,
  bigPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  getPage: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const header = (parent, user) => {
  if (parent == null)
    return null
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <p className="subtitle level-item vde-subtitle-bp-page">Analyse</p>
        {backButton(parent)}
        {user.id == parent.author ? addBigPictureButton(parent) : null}
      </div>
    </div>
  )
}

const bpSort = (ratings, a, b) => {
  // Sort by median first, then average, and then by count.
  const aresult = ratings.find(elt => elt.target_bp == a.id && elt.author == a.author)
  const bresult = ratings.find(elt => elt.target_bp == b.id && elt.author == b.author)
  const aModifDate = new Date(a.modification_date)
  const bModifDate = new Date(b.modification_date)
  if (aresult == null && bresult == null)
    return aModifDate>bModifDate ? -1 : aModifDate<bModifDate ? 1 : 0
  if (aresult == null)
    return 1
  if (bresult == null)
    return -1
  if (aresult.value > bresult.value)
    return -1
  if (aresult.value < bresult.value)
    return 1
  return aModifDate>bModifDate ? -1 : aModifDate<bModifDate ? 1 : 0
}


const backButton = (bp) => {
  const to = bp.parent == null ? "/" : `/subject/${bp.subject}/bigPicture/${bp.parent}`
  return (
    <Link
      className="button tbp-radio"
      to={to}
    >
      <span className="icon is-small"><i className="fas fa-step-backward"></i></span>
    </Link>

  )
}

const addBigPictureButton = (bigPicture) => {
  const newBP = {
    title: "",
    parent: bigPicture.id,
    kind: cst.PROBLEM,
    subject: bigPicture.subject != null ? bigPicture.subject : bigPicture.id,
    body: "",
  }
  return (
    <div className="button tbp-radio vde-add-comment is-narrow">
      <EditionModalButton
        init={newBP}
        classname={"button tbp-radio "}
        icon={"fas fa-plus"}
        EditionModal={BigPictureModal}
        NewItem={NewBigPicture}
      />
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const user = state.get("user")
  return {
    user,
    bigPictures: state.get("bigpictures").filter(ownProps.filter),
    ratings: ownProps.parent != null ? state.get("results").filter(rating => rating.author == ownProps.parent.author) : [],
  }
}

const BigPictureList = connect(mapStateToProps)(BigPictureListLook)

export default BigPictureList

export const createList = (parent, count, getPage, filter) => {
  return (
    <BigPictureList
      parent={parent}
      count={count}
      getPage={getPage}
      filter={filter}
    />
  )
}