
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import usePagination from '../utils/pagination'
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
  } = props

  useEffect(() => {
    items.sort(sortFunc)
  }, [items])

  const [pagination, page] = usePagination(items, count, getPage, cst.PAGE_SIZE, loadFirstPage)
  const [hidden, setHidden] = useState(!loadFirstPage)

  return (
    <div>
      { showHeader ? header(buttons, user, title, hidden, setHidden) : null }
      <div>
        { !hidden && count == 0 && items.length == 0 ? <p className="vde-no-comment subtitle">{emptyMessage}</p> : null }
        { !hidden ? page.map((item) => <div key={"listItem"+item.id}>{container(item)}</div>) : null }
        { !hidden ? pagination : null }
      </div>
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
}

const header = (buttons, user, title, hidden, setHidden) => {

  return (
    <div className="level is-mobile vde-header">
      <div className="level-left">
        { hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-plus"></i></figure> : null }
        { !hidden ? <figure className="level-item image is-24x24" onClick={() => setHidden(!hidden)}><i style={{height: "100%"}} className="level-item fas fa-minus"></i></figure> : null }
        <p className="subtitle level-item vde-subtitle-bp-page">{title}</p>
        { buttons.map((button) => <div key={uuid()}>{button()}</div>) }
      </div>
    </div>
  )
}

export default List
