import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (user, items, count, getPage, size, loadFirstPage, sortFunc) => {
  const [pageNb, setPageNb] = useState(0)
  const [currentPage, setCurrentPage] = useState(items)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [lastRequest, setLastRequest] = useState(false)

  const loadMore = () => {
    const options = {}
    if (search !== "")
      options.search = search
    getPage(pageNb+1, options)
    setPageNb(pageNb+1)
  }

  useEffect(() => {
    if (sort == "default") {
      setCurrentPage(items.sort(sortFunc))
    }
    else {
      const lastSearchItems = items.filter(item => item[sort] !== undefined)
      setCurrentPage(lastSearchItems.sort((a, b) => a[sort] > b[sort] ? 1 : -1))
    }
  }, [items, sort])

  useEffect(() => {
    // If a search request is sent, lastRequest will be set to true,
    // and items will be sorted according to their rank in this request
    if (lastRequest) {
      setLastRequest(false)
      setSort(user.last_request)
    }
  }, [user.last_request])


  useEffect(() => {
    if (loadFirstPage)
      loadMore()
  }, [])
 
  return [
    <LoadMore
      loadMore={loadMore}
      currentPage={currentPage}
      count={count}
      pageNb={pageNb}
      size={size} />,
    <SearchBar
      search={search}
      setSearch={setSearch}
      getPage={getPage}
      setPageNb={setPageNb}
      setLastRequest={setLastRequest}
      setSort={setSort} />,
    currentPage
  ]
}

const LoadMore = ({ loadMore, currentPage, count, pageNb, size }) => {
  return currentPage.length < count && count > pageNb*size ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
}

const SearchBar = ({ search, setSearch, getPage, setPageNb, setLastRequest }) => {
  const onClick = () => {
    const options = {}
    if (search !== "")
      options.search = search
    setLastRequest(true)
    getPage(1, options)
    setPageNb(1)
  }

  return (
    <div className="field">
      <div className="vde level is-mobile">
        <div className="level-item control">
          <input
            className="input"
            type="text"
            onKeyDown={(e) => { e.key === 'Enter' ? onClick() : null }}
            placeholder="Recherche..."
            name="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value) }} />
        </div>
        <div className="button tbp-radio title-button" onClick={onClick}>
          <span className="icon is-small"><i className="fas fa-search"></i></span>
        </div>
      </div>
    </div>
  )
}

export default createPagination
