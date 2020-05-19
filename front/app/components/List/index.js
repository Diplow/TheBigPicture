
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import usePagination from './pagination'
import HideAndShowButton from '../Buttons/hideandshow'
import Loader from '../Loader'
import uuid from 'uuid/v4'

import * as cst from '../../constants'
import "./style.scss"

const ListLook = (props) => {

  const {
    items,
    container,
    user,
    emptyMessage,
    // pagination
    sortFunc,
    count,
    getPage,
    loadFirstPage,
    // header
    title,
    buttons,
    search,
    processedRequests,
    margin
  } = props

  const [
    pagination,
    searchbar,
    page,
    waitingForResponse,
    searchStr
  ] = usePagination(
    user,
    items,
    count,
    getPage,
    cst.PAGE_SIZE,
    loadFirstPage,
    sortFunc,
    processedRequests
  )

  const [hidden, setHidden] = useState(!loadFirstPage)
  const [loading, setLoading] = useState(waitingForResponse !== "")

  useEffect(() => {
    setLoading(waitingForResponse !== "")
  }, [waitingForResponse])

  return (
    <div
      style={margin == undefined ? {marginLeft: cst.SUBMARGIN +"%"} : {marginLeft: margin +"%"}}
      className={title ? "container vde section section-field" : ""}>
      {
        title
          ? header(buttons, user, title, hidden, setHidden, getPage)
          : null
      }
      {
        !hidden && search
          ? searchbar
          : null
      }
      {
        !hidden && count == 0 && items.length == 0 && !loading
          ? <p className="vde subtitle">{emptyMessage}</p>
          : null
      }
      {
        page.map((item) => {
          return !hidden
            ? <div key={"listItem"+item.id}>{container(item)}</div>
            : null
        })
      }
      {
        !hidden
          ? <Loader condition={loading}>
              {pagination}
            </Loader>
          : null
      }
    </div>
  )
}

const header = (buttons, user, title, hidden, setHidden, getPage) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <HideAndShowButton hidden={hidden} setHidden={setHidden} />
        <p className="vde subtitle level-item">{title}</p>
        { buttons && buttons.map((button) => <div key={uuid()}>{button()}</div>) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
    processedRequests: state.get("requests").filter(req => req.state == cst.REQUEST_PROCESSED)
  }
}

const List = connect(mapStateToProps)(ListLook)

// this function must be called when giving a not-null getPage argument to a List
// it makes sure it is possible to keep track of the requests sent to get a page
export const getPageFormatter = (dispatch, action) => {
  return (page, options, request_id) => {
    const requestId = request_id || uuid()
    dispatch(action(page, options, requestId))
    return requestId
  }
}

export default List
