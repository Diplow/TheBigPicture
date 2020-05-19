import { connect } from 'react-redux'
import React from 'react'
import { postVote, deleteVote } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    post: (rating) => { dispatch(postVote(rating)) },
    del: (rating) => { if (rating.id != undefined) { dispatch(deleteVote(rating.id)) } }
  }
}

const RatingModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default RatingModal
