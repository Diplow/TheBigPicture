import { connect } from 'react-redux'
import React from 'react'
import { patchUser } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import * as cst from '../../constants'


const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	post: (user) => dispatch(patchUser(user))
  }
}

const BigPictureModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default BigPictureModal
