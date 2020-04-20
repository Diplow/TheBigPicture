import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { make } from '../../actions/api'
import * as cst from '../../constants'


/**
  The APIEngine executes all the request with the status cst.REQUEST_CREATED
  See the requests reducers for an explanation over the purpose of "requests"
  in this application.
**/
const ApiEngine = (props) => {
  const {
    todo, // a request (see the requests reducer for a request fields description)
    make // a function to execute a request
  } = props

  if (todo != undefined)
    make(todo)

  return null
}

const mapStateToProps = (state) => {
  return {
    todo: state.get("requests").filter(elt => elt.state == cst.REQUEST_CREATED)[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    make: (request) => { dispatch(make(request)) },
  }
}

const Api = connect(mapStateToProps, mapDispatchToProps)(ApiEngine)

export default Api
