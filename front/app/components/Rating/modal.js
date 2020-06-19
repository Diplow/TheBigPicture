import { connect } from 'react-redux'
import React from 'react'
import { postRating, patchRating, deleteVote } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import * as cst from '../../constants'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  post: (rating) => { rating.id ? dispatch(patchRating(rating)) : dispatch(postRating(rating)) },
  del: (rating) => { if (rating.id) { dispatch(deleteVote(rating.id)) } }
})

const RatingModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default RatingModal
