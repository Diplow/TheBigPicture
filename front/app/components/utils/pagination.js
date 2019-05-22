import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const Pagination = ({ currentPageNb, pageCount, changePage }) => {
  if (pageCount == 1)
    return null

  const hidePreviousPage = currentPageNb == 1
  const hideNextPage = currentPageNb == pageCount
  const hidePreviousEllipsis = currentPageNb < 4
  const hideNextEllipsis = currentPageNb > pageCount - 3
  const hideLastPage = currentPageNb >= pageCount - 1
  const hideFirstPage = currentPageNb <= 2

  const firstPage = (hide) => (hide ? null : <li><a className="pagination-link" aria-label="Goto page 1" onClick={changePage(1)}>1</a></li>)
  const prevEllipsis = (hide) => (hide ? null : <li><span className="pagination-ellipsis">&hellip;</span></li>) 
  const prevPage = (hide) => (hide ? null : <li><a className="pagination-link" aria-label="Goto previous page" onClick={changePage(currentPageNb-1)}>{currentPageNb-1}</a></li>)
  const currentPage = () => (<li><a className="pagination-link is-current" aria-label="currentPage">{currentPageNb}</a></li>)
  const nextPage = (hide) => (hide ? null : <li><a className="pagination-link" aria-label="Goto next page" onClick={changePage(currentPageNb+1)}>{currentPageNb+1}</a></li>)
  const nextEllipsis = prevEllipsis
  const lastPage = (hide) => (hide ? null : <li><a className="pagination-link" aria-label="Goto last page" onClick={changePage(pageCount)}>{pageCount}</a></li>)

  return (
    <nav className="pagination level-item" role="navigation" aria-label="pagination">
      <ul className="pagination-list">
        { firstPage(hideFirstPage) }
        { prevEllipsis(hidePreviousEllipsis) }
        { prevPage(hidePreviousPage) }
        { currentPage() }
        { nextPage(hideNextPage) }
        { nextEllipsis(hideNextEllipsis) }
        { lastPage(hideLastPage) }
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPageNb: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired
}

const createPagination = (items, size) => {
  if (items == null || items.length == 0)
    return [null, []]
  const [currentPage, setCurrentPage] = useState([])
  const [currentPageNb, setCurrentPageNb] = useState(1)
  const pageCount = Math.ceil(items.length / size)

  const changePage = (pageNb) => {
    return () => {
      const first = size*(pageNb-1)
      const last = first + size
      setCurrentPage(items.slice(first, last))
      setCurrentPageNb(pageNb)
    }
  }

  useEffect(() => {
    changePage(currentPageNb)()
  }, [items])

  const res = (
    <div className="level is-mobile">
      <div className="level-left" />
      <div className="level-right">
        <Pagination currentPageNb={currentPageNb} pageCount={pageCount} changePage={changePage} />
      </div>
    </div>
  )
  return [res, currentPage]
}

export default createPagination
