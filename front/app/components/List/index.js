
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
import HideAndShowButton from '../Buttons/hideandshow'
import Loader from '../Loader'
import uuid from 'uuid/v4'

import * as cst from '../../constants'
import "./style.scss"

const List = (props) => {

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
    search
  } = props

  const [pagination, searchbar, page, waitingForResponse] = usePagination(user, items, count, getPage, cst.PAGE_SIZE, loadFirstPage, sortFunc)
  const [hidden, setHidden] = useState(!loadFirstPage)

  return (
    <div className={showHeader ? "container vde section section-field" : ""}>
      { showHeader ? header(buttons, user, title, hidden, setHidden, getPage) : null }
      { !hidden && search ? searchbar : null }
      {
        !hidden ? 
          <Loader condition={waitingForResponse == "full"}>
            { count == 0 && items.length == 0 && waitingForResponse == "" ? <p className="vde subtitle">{emptyMessage}</p> : null }
            { page.map((item) => <div key={"listItem"+item.id}>{container(item)}</div>) }
            <Loader condition={waitingForResponse == "loadmore"}>
              { pagination }
            </Loader>
          </Loader>
        : null
      }
    </div>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  container: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  sortFunc: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  getPage: PropTypes.func.isRequired,
  loadFirstPage: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.func).isRequired,
  search: PropTypes.bool
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

export default List
