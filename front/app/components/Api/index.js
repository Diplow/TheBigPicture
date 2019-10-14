import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { make } from '../../actions/api'
import * as cst from '../../constants'


const ApiEngine = ({ todo, make }) => {
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
