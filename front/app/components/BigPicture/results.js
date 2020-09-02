import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBigPictureResults, getReasons } from '../../actions'

import ResultsLook from '../Results'
import { getPageFormatter } from '../List'

import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => ({
  reasons: state.get("reasons").filter((reason) => reason.target_bp == ownProps.bigPictureId),
  target: state.get("bigpictures").find((bp) => bp.id == ownProps.bigPictureId)
})

const mapDispatchToProps = (dispatch) => ({
  getResults: (bpId) => { dispatch(getBigPictureResults(bpId)) },
  getPage: getPageFormatter(dispatch, getReasons),
})

const Results = connect(mapStateToProps, mapDispatchToProps)(ResultsLook)

export default Results
