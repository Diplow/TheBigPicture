import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (items, count, getPage, size, loadFirstPage) => {
  const [pageNb, setPageNb] = useState(0)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))

  const loadMore = () => {
    getPage(pageNb+1)
    setPageNb(pageNb+1)
  }

  useEffect(() => {
    if (loadFirstPage)
      loadMore()
  }, [])

  const res = count > items.length ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
  return [res, items]
}

export default createPagination
