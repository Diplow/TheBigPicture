import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import * as cst from '../../../constants'
import List from '../../../components/List'
import SubjectPreview from '../../../components/BigPicture/subject'
import CategoryHeader from '../../../components/Category/header'
import sortBigPictures from '../../../components/BigPicture/sort'
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

  const getPage = (page, options, reqId) => {
    return getBigPictures(
      page,
      {
        ...options,
        category: match.params.category
      },
      reqId
    )
  }

  return (
    <div className="vde container section">
      <CategoryHeader data={category} />
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
