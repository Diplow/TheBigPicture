import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (user, items, count, getPage, size, loadFirstPage, sortFunc, processedRequests, hidden, reference) => {
  const [pageNb, setPageNb] = useState(0)
  const [favorites, setFavorites] = useState(false)
  const [currentPage, setCurrentPage] = useState(items)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))
  const [currentSearchId, setCurrentSearchId] = useState(undefined)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [lastRequest, setLastRequest] = useState(false)
  const [waitingForResponse, setWaitingForResponse] = useState("")

  const loadMore = () => {
    if (getPage == null || count == 0) return
    const options = { favorites, search }
    const newPageNb = pageNb+1
    setPageNb(newPageNb)
    const searchRequestId = getPage(pageNb+1, options, currentSearchId)
    setWaitingForResponse(searchRequestId)
    setCurrentSearchId(searchRequestId)
  }

  useEffect(() => {
    if (!hidden && pageNb == 0 && !loadFirstPage)
      loadMore()
  }, [hidden])

  useEffect(() => {
    // Sort and filter items 
    const favoritesFilter = (elt) => !favorites || elt.favorite
    const searchSort = (a, b) => a[sort] > b[sort] ? 1 : -1
    setCurrentPage(
      items
        .filter(favoritesFilter)
        .filter((item) => sort == "default" || item[sort])
        .sort(sort == "default" ? sortFunc : searchSort)
    )
  }, [items, sort, favorites])

  useEffect(() => {
    // Watch current request and stop waiting for a response if it is processed
    const isCurrentPage = (elt) => elt.nextargs == undefined || elt.nextargs.page == pageNb
    const currentRequest = (elt) => elt.requestId == waitingForResponse && isCurrentPage(elt)
    if (processedRequests.find(currentRequest) !== undefined) setWaitingForResponse("")
  }, [processedRequests])

  useEffect(() => {
    setPageNb(0)
    if (loadFirstPage && pageNb == 0) {
      loadMore()
    }
  }, [reference])
 
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
      user={user}
      getPage={getPage}
      setPageNb={setPageNb}
      setLastRequest={setLastRequest}
      setWaitingForResponse={setWaitingForResponse}
      setSort={setSort}
      favorites={favorites}
      setFavorites={setFavorites}
      setCurrentSearchId={setCurrentSearchId} />,
    currentPage,
    waitingForResponse,
    search
  ]
}

const LoadMore = ({ loadMore, currentPage, count, pageNb, size }) => {
  const canLoad = count == undefined || currentPage.length < count && count > pageNb*size
  return canLoad ? (
    <li className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </li>
  ) : null
}

const SearchBar = (props) => {
  const {
    search,
    setSearch,
    setSort,
    user,
    getPage,
    setPageNb,
    setLastRequest,
    setWaitingForResponse,
    favorites,
    setFavorites, 
    setCurrentSearchId
  } = props

  if (getPage == null) return null

  const onClick = (options) => {
    if (search !== "") {
      options.search = search
      const reqId = getPage(1, options)
      setSort(reqId)
      setCurrentSearchId(reqId)
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
          onKeyDown={(e) => { e.key === 'Enter' ? onClick({ favorites }) : null }}
          placeholder="Recherche..."
          name="search"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }} />
      </div>
      <div className="level-item button tbp-radio title-button is-narrow" onClick={() => onClick({ favorites })}>
        <span className="icon is-small"><i className="fas fa-search"></i></span>
      </div>
      {
        user.id !== cst.GUEST_ID
          ? <div
            className={`level-item button tbp-radio title-button favorites-button is-narrow ${favorites ? "is-active" : ""}`}
            onClick={() => {
              onClick({ favorites: !favorites })
              setFavorites(!favorites)}
            }>
            <span className="icon is-small"><i className="fas fa-heart"></i></span>
          </div>
          : null
      }
    </div>
  )
}

export default createPagination
