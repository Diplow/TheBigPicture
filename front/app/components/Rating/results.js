import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getRatingResults } from '../../actions'

import ResultsLook from '../Results'

import * as cst from '../../constants'


const mapStateToProps = (state, ownProps) => ({
  target: state.get("ratings").find((rating) => rating.id == ownProps.ratingId)
})

const mapDispatchToProps = (dispatch) => ({
  getResults: (bpId) => { dispatch(getRatingResults(bpId)) }
})

const RatingResults = connect(mapStateToProps, mapDispatchToProps)(ResultsLook)

export default RatingResults;
