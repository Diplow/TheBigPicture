
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../../actions/'

import sortCategories from '../../../components/Category/sort'
import Category from '../../../components/Category'
import List, { getPageFormatter } from '../../../components/List'

import * as cst from '../../../constants'


const CategoriesPageLook = (props) => {
  const {
    user,
    categories,
    getCategories,
    count,
    match
  } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vde container section">
      <List
        name={`categories-page`}
        items={categories}
        container={(category) => <Category key={`category-${category.label}`} data={category} />}
        user={user}
        emptyMessage={cst.labels.MSG_NO_CATEGORIES}
        sortFunc={sortCategories}
        count={count}
        getPage={getCategories}
        loadFirstPage={true}
        showHeader={false}
        margin={0}
      />
    </div>
  )
}


const mapStateToProps = (state) => ({
  user: state.get("user"),
  categories: state.get("categories"),
  count: state.get("global").categoryCount
})

const mapDispatchToProps = (dispatch, state) => ({
  getCategories: getPageFormatter(dispatch, getCategories)
})

const Categories = connect(mapStateToProps, mapDispatchToProps)(CategoriesPageLook)

export default Categories