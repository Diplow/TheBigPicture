import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { remove } from '../../actions/delete'
import { add } from '../../actions/add'
import * as cst from '../../constants'


const ExecutionEngine = ({ todo, remove, add }) => {

  useEffect(() => {
	if (todo != undefined) {
		switch (todo.method) {
			case "DELETE":
				remove(todo)
				break;

			case "GET":
				add(todo)
				break;

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
