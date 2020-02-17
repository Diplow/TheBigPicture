
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { getBigPicture } from '../../actions'

import usePagination from '../utils/pagination'
import AddBigPictureButton from '../Buttons/add'

import BigPicturePreview from './preview'

import * as cst from '../../constants'
import "./style.scss"


const BigPictureListLook = ({ user, parent, bigPictures, title, emptyMessage, loadFirstPage, buttons, count, getPage, ratings }) => {
  bigPictures.sort((a, b) => bpSort(ratings, a, b))
  const [pagination, page] = usePagination(bigPictures, count, getPage, cst.PAGE_SIZE, loadFirstPage)

  return (
    <div>
    { header(buttons, parent, user, title) }
    { count == 0 && bigPictures.length == 0 ? <p className="vde-no-comment subtitle">{emptyMessage}</p> : null }
    { page.map((bp) => <BigPicturePreview key={bp.id} bigPictureId={bp.id} margin={0} />) }
    { pagination }
    </div>
  )
}

BigPictureListLook.propTypes = {
  user: PropTypes.object.isRequired,
  parent: PropTypes.object,
  bigPictures: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  loadFirstPage: PropTypes.bool.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  count: PropTypes.number.isRequired,
  getPage: PropTypes.func.isRequired,
  ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const header = (buttons, parent, user, title) => {
  return (
    <div className="level is-mobile vde-header">
      <div className="level-left">
        <p className="subtitle level-item vde-subtitle-bp-page">{title}</p>
        {buttons.indexOf(cst.BACK_BUTTON) != -1 ? backButton(parent) : null}
        {
          buttons.indexOf(cst.ADD_BUTTON) != -1 
          && (
            (parent == null && user.id != 0)
            || (parent != null && user.id == parent.author)
          ) ? addBigPictureButton(parent)
          : null
        }
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

  <div className="button tbp-radio vde-add-comment is-narrow">
    <Link
      to={to}
    >
      <span className="icon is-small"><i className="fas fa-step-backward"></i></span>
    </Link>
  </div>

  )
}

const addBigPictureButton = (bigPicture) => {
  return <AddBigPictureButton bigPicture={bigPicture} />
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.get("user"),
    bigPictures: state.get("bigpictures").filter(ownProps.filter),
    ratings: ownProps.parent != null ? state.get("ratings").filter(rating => rating.author == ownProps.parent.author) : [],
  }
}

const BigPictureList = connect(mapStateToProps)(BigPictureListLook)

export default BigPictureList
