
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
    name, // reference is an ID used
    icon,
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

  const [hidden, setHidden] = useState(!loadFirstPage)

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
    processedRequests,
    hidden,
    name
  )

  const [hiddenInitValue, _] = useState(hidden)
  const [loading, setLoading] = useState(waitingForResponse !== "")

  useEffect(() => {
    setLoading(waitingForResponse !== "")
  }, [waitingForResponse])

  useEffect(() => {
    // if the reference change, reset the hidden param to its initial value
    setHidden(hiddenInitValue)
  }, [name])

  return (
    <div
      style={margin == undefined ? {marginLeft: cst.SUBMARGIN +"%"} : {marginLeft: margin +"%"}}
      className={title ? "container vde section section-field" : ""}>
      {
        title
          ? header(buttons, user, title, hidden, setHidden, getPage, icon)
          : null
      }
      {
        !hidden && search
          ? searchbar
          : null
      }
      {
        !hidden && count == 0 && items.length == 0 && !loading
          ? <p className="vde subtitle vde-loadmore">{emptyMessage}</p>
          : null
      }
      {
        page.map((item, index) => {
          const key = `${name}-${index}`
          return !hidden
            ? <div id={key} key={key}>{container(item)}</div>
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

const header = (buttons, user, title, hidden, setHidden, getPage, icon) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <div className="level-item" onClick={ () => setHidden(!hidden) }>
          {
            icon ? icon : <HideAndShowButton hidden={hidden} setHidden={setHidden} />
          }
          <p className="vde subtitle level-item">{title}</p>
        </div>
        { buttons && buttons.map((button) => <div key={uuid()}>{button()}</div>) }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
    processedRequests: state.get("requests").filter(req => req.state == cst.actions.REQUEST_PROCESSED)
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
