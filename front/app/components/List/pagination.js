import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const createPagination = (user, items, count, getPage, size, loadFirstPage, sortFunc, processedRequests) => {
  const [pageNb, setPageNb] = useState(0)
  const [favorites, setFavorites] = useState(false)
  const [currentPage, setCurrentPage] = useState(items)
  const [pageCount, setCurrentPageCount] = useState(Math.ceil(count / size))
  const [currentSearchId, setCurrentSearchId] = useState(null)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [lastRequest, setLastRequest] = useState(false)
  const [waitingForResponse, setWaitingForResponse] = useState("")

  const loadMore = () => {
    const options = { favorites }
    if (search !== "") {
      options.search = search
    }
    if (getPage !== null) {
      setPageNb(pageNb+1)
      if (pageNb != 0) {
        getPage(pageNb+1, options, currentSearchId)
        setWaitingForResponse(currentSearchId)
      }
      else {
        const sId = getPage(1, options)
        setWaitingForResponse(sId)
        setCurrentSearchId(sId)
      }
    }
  }

  useEffect(() => {
    if (sort == "default") {
      setCurrentPage(items.filter(elt => favorites ? elt.favorite == true : true).sort(sortFunc))
    }
    else {
      const lastSearchItems = items.filter(item => item[sort] !== undefined && (favorites ? item.favorite : true ))
      setCurrentPage(lastSearchItems.sort((a, b) => a[sort] > b[sort] ? 1 : -1))
    }
  }, [items, sort, favorites])

  useEffect(() => {
    const req = processedRequests.find(elt => elt.requestId == waitingForResponse && elt.nextargs.page == pageNb)
    if (req != null) {
      setWaitingForResponse("")
    }
  }, [processedRequests])

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
  return currentPage.length < count && count > pageNb*size ? (
    <a className="subtitle vde-loadmore" onClick={loadMore}>
      Charger plus de contenus...
    </a>
  ) : null
}

const SearchBar = (props) => {
  const {
    search,
    setSearch,
    setSort,
    getPage,
    setPageNb,
    setLastRequest,
    setWaitingForResponse,
    favorites,
    setFavorites, 
    setCurrentSearchId
  } = props

  if (getPage == null)
    return null
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
      <div
        className={`level-item button tbp-radio title-button favorites-button is-narrow ${favorites ? "is-active" : ""}`}
        onClick={() => {
          onClick({ favorites: !favorites })
          setFavorites(!favorites)}
        }>
        <span className="icon is-small"><i className="fas fa-heart"></i></span>
      </div>
    </div>
  )
}

export default createPagination
