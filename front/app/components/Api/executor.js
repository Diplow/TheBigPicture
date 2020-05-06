import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { add } from '../../actions/add'
import * as cst from '../../constants'

/**
  The ExecutionEngine executes all the request with the status cst.DONE
  See the requests reducers for an explanation over the purpose of "requests"
  in this application.
**/
const ExecutionEngine = ({ todo, add }) => {

  useEffect(() => {
	if (todo != undefined) {
		switch (todo.method) {

			case "GET":
				add(todo)
				break;

			// there is no "POST" / "PATCH" / "DELETE" case for now
			// because these requests have no reason to be executed
			// multiple times.

			default:
				throw Error("unhandled method " + req.method)
		}	
	}
  }, [todo])

  return null
}

const mapStateToProps = (state) => {
  return {
    todo: state.get("requests").filter(elt => elt.state == cst.REQUEST_DONE)[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	add: (request) => { dispatch(add(request))},
  }
}

const Executor = connect(mapStateToProps, mapDispatchToProps)(ExecutionEngine)

export default Executor
