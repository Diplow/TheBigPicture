import { connect } from 'react-redux'
import React from 'react'
import { patchUser } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import * as cst from '../../constants'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  post: (user) => dispatch(patchUser(user))
})

const UserModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default UserModal
