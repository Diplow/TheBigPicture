import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBigPictureResults } from '../../actions'

import ResultsLook from '../Results'

import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => ({
  target: state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId)
})

const mapDispatchToProps = (dispatch) => ({
  getResults: (bpId) => { dispatch(getBigPictureResults(bpId)) }
})

const Results = connect(mapStateToProps, mapDispatchToProps)(ResultsLook)

export default Results
