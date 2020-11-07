
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../../../actions/'

import sortCategories from '../../../components/Category/sort'
import Category from '../../../components/Category'
import Tutorial from '../../../components/Tutorial'
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


  const tutorialWelcomeHeader = () => (
    <Tutorial
      page={cst.tutorial.CATEGORIES_PAGE}
      identifier={cst.tutorial.WELCOME_TUTO_ID}
      title="Bienvenue sur VDE !"
      paragraphs={[
        "Sur VDE, vous trouverez des vues d'ensemble, ce sont des analyses politiques qui visent à donner tous les éléments à nos lecteurs pour se forger leur propre opinion informée. Cliquez sur une catégorie ci-dessous pour voir les dernières vues d'ensemble discutées sur VDE autour de cette thématique."
      ]} />
  )


  return (
    <div className="vde container section">
      { tutorialWelcomeHeader() }
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