import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (items, count, getPage, size, loadFirstPage) => {
  const [pageNb, setPageNb] = useState(0)
  const [currentPage, setCurrentPage] = useState(items)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))

  const loadMore = () => {
    getPage(pageNb+1)
    setPageNb(pageNb+1)
  }

  useEffect(() => {
    setCurrentPage(items)
  }, [items])

  useEffect(() => {
    if (loadFirstPage)
      loadMore()
  }, [])

  const res = currentPage.length < count && count > pageNb*size ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
  return [res, currentPage]
}

export default createPagination
