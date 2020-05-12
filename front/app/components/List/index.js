
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
    showHeader,
    title,
    buttons,
    search,
    processedRequests
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

  return (
    <div className={showHeader ? "container vde section section-field" : ""}>
      { showHeader ? header(buttons, user, title, hidden, setHidden, getPage) : null }
      { !hidden && search ? searchbar : null }
      { count == 0 && items.length == 0 && waitingForResponse == "" ? <p className="vde subtitle">{emptyMessage}</p> : null }
      { page.map((item) => !hidden ? <div key={"listItem"+item.id}>{container(item)}</div> : null) }
      { !hidden ?
          <Loader condition={waitingForResponse !== "" && getPage !== null}>
            { !hidden ? pagination : null }
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
        { buttons.map((button) => <div key={uuid()}>{button()}</div>) }
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

export default List
