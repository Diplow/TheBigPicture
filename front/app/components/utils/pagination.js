import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (user, items, count, getPage, size, loadFirstPage, sortFunc, processedRequests) => {
  const [pageNb, setPageNb] = useState(0)
  const [currentPage, setCurrentPage] = useState(items)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [lastRequest, setLastRequest] = useState(false)
  const [waitingForResponse, setWaitingForResponse] = useState("")

  const loadMore = () => {
    const options = {}
    if (search !== "") {
      options.search = search
    }
    if (getPage !== null) {
      setWaitingForResponse(getPage(pageNb+1, options))
    }
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
    const req = processedRequests.find(elt => elt.requestId == waitingForResponse)
    if (req != null) {
      setWaitingForResponse("")
    }
  }, [processedRequests])


  useEffect(() => {
    if (loadFirstPage)
      loadMore()
  }, [])

  const globalLoader = waitingForResponse !== "" && search !== ""
  const localLoader = waitingForResponse !== ""
 
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
      setWaitingForResponse={setWaitingForResponse}
      setSort={setSort} />,
    currentPage,
    waitingForResponse,
    search
  ]
}

const LoadMore = ({ loadMore, currentPage, count, pageNb, size }) => {
  return currentPage.length < count && count > pageNb*size ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
}

const SearchBar = ({ search, setSearch, setSort, getPage, setPageNb, setLastRequest, setWaitingForResponse}) => {
  if (getPage == null)
    return null
  const onClick = () => {
    const options = {}
    if (search !== "") {
      options.search = search
      const reqId = getPage(1, options)
      setSort(reqId)
      setWaitingForResponse(reqId)    
      setPageNb(1)
    } else {
      // Empty search serves as a reset button for sorting
      setSort("default")
      setWaitingForResponse(getPage(1, options))    
      setPageNb(1)
    }
  }

  return (
    <div className="vde level is-mobile searchbar">
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
      <div className="level-item button tbp-radio title-button is-narrow" onClick={onClick}>
        <span className="icon is-small"><i className="fas fa-search"></i></span>
      </div>
    </div>
  )
}

export default createPagination
