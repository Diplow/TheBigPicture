import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (items, count, getPage, size) => {
  const [pageNb, setPageNb] = useState(0)
  const [currentPage, setCurrentPage] = useState(items.slice(0, pageNb*size))
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))

  const loadMore = () => {
    getPage(pageNb+1)
    setCurrentPage(items.slice(0, (pageNb+1)*size))
    setPageNb(pageNb+1)
  }

  useEffect(() => {
    setCurrentPage(items.slice(0, pageNb*size))
  }, [items])

  useEffect(() => {
    console.log("lalalal")
    loadMore()
  }, [])

  if (items == null || items.length == 0)
    return [null, []]

  const res = currentPage.length < count ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
  return [res, currentPage]
}

export default createPagination
