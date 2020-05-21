import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { make } from '../../actions/api'
import * as basics from '../../actions/basics'
import * as cst from '../../constants'


/**
  The APIEngine executes all the request with the status cst.REQUEST_CREATED
  See the requests reducers for an explanation over the purpose of "requests"
  in this application.
**/
const ApiEngine = (props) => {
  const {
    todo, // a request (see the requests reducer for a request fields description)
    make, // a function to execute a request
    ongoing // set the request on a special state indicating that it is... ongoing
  } = props


  useEffect(() => {
    if (todo != undefined) {
      ongoing(todo)
      make(todo)
    }
  }, [todo])


  return null
}

const mapStateToProps = (state) => {
  return {
    todo: state.get("requests").filter(elt => elt.state == cst.actions.REQUEST_CREATED)[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ongoing: (request) => {
      dispatch(basics.ongoing(request))
    },
    make: (request) => { dispatch(make(request)) },
  }
}

const Api = connect(mapStateToProps, mapDispatchToProps)(ApiEngine)

export default Api
