import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import * as cst from '../../../constants'
import List from '../../../components/List'
import SubjectPreview from '../../../components/BigPicture/subject'
import CategoryHeader from '../../../components/Category/header'
import sortBigPictures from '../../../components/BigPicture/sort'
import Tutorial from '../../../components/Tutorial'
import "./style.scss"


const CategoryPageLook = (props) => {
  const {
    user,
    bigPictures,
    getBigPictures,
    getCategory,
    category,
    match
  } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!category) {
      getCategory(match.params.category)
    }
  }, [category])

  if (!category) return null

  const getPage = (page, options, reqId) => getBigPictures(
    page,
    {
      ...options,
      category: match.params.category
    },
    reqId
  )

  const tutorialTextHeader = () => (
    <Tutorial
      page={cst.tutorial.CATEGORY_PAGE}
      identifier={cst.tutorial.HEADER_TUTO_ID}
      title={`Vous êtes sur la page de la catégorie '${category.title}'`}
      paragraphs={[
        "Sur cette page, vous trouverez d'abord le chapeau de la catégorie, qui reprend son logo, son titre et sa description. L'icône à droite du titre permet de créer (si l'on est identifié), une nouvelle vue d'ensemble dans cette catégorie.",
      ]} />
  )

  const tutorialTextList = () => (
    <Tutorial
      page={cst.tutorial.CATEGORY_PAGE}
      identifier={cst.tutorial.LIST_TUTO_ID}
      paragraphs={[
        "Puis, vous trouverez une liste de vues d'ensemble. Chaque vue met en avant l'icône de son auteur et son titre. En cliquant sur le titre de la vue d'ensemble, on affiche aussi son résumé s'il est renseigné. Enfin la flèche à droite permet d'aller sur la page de cette vue d'ensemble.",
      ]} />
  )

  return (
    <div className="vde container section">
      { tutorialTextHeader() }
      <CategoryHeader data={category} />
      { tutorialTextList() }
      <List
        name={`category-${match.params.category}-page-subjects-list`}
        items={bigPictures}
        container={(bigPicture) => <SubjectPreview key={`subject-${bigPicture.id}`} bigPictureId={bigPicture.id} />}
        user={user}
        emptyMessage={cst.labels.MSG_NO_SUBJECT}
        sortFunc={sortBigPictures}
        count={category.subjectCount}
        getPage={getPage}
        loadFirstPage={true}
        showHeader={false}
        search={true}
        margin={0}
      />
    </div>
  )
}

export default CategoryPageLook
