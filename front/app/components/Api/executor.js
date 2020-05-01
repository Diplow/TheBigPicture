import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { remove } from '../../actions/delete'
import { add } from '../../actions/add'
import * as cst from '../../constants'

/**
  The ExecutionEngine executes all the request with the status cst.DONE
  See the requests reducers for an explanation over the purpose of "requests"
  in this application.
**/
const ExecutionEngine = ({ todo, remove, add }) => {

  useEffect(() => {
	if (todo != undefined) {
		switch (todo.method) {

			// for the same reason there are no "POST" or
			// "PATCH" case (see below), there really should
			// not be a "DELETE" case...
			// TODO: remove this or use this design for more
			// than just reducing server load
			case "DELETE":
				remove(todo)
				break;

			case "GET":
				add(todo)
				break;

			// there is no "POST" or "PATCH" case for now
			// because these requests are not meant to be
			// executed multiple times

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
  	remove: (request) => { dispatch(remove(request))},
  	add: (request) => { dispatch(add(request))},
  }
}

const Executor = connect(mapStateToProps, mapDispatchToProps)(ExecutionEngine)

export default Executor
