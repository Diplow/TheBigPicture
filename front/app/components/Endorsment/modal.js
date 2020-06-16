import { connect } from 'react-redux'
import React from 'react'
import { postEndorsment, deleteEndorsment } from '../../actions/index'
import EditionModalLook from '../Modal/look'
import * as cst from '../../constants'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  post: (endorsment) => { dispatch(postEndorsment(endorsment)) },
  del: (endorsment) => { if (endorsment.id) { dispatch(deleteEndorsment(endorsment.id)) } }
})

const EndorsmentModal = connect(mapStateToProps, mapDispatchToProps)(EditionModalLook)

export default EndorsmentModal
