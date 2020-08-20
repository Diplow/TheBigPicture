import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import * as cst from '../../../constants'
import List from '../../../components/List'
import SubjectPreview from '../../../components/BigPicture/subject'
import sortBigPictures from '../../../components/BigPicture/sort'
import "./style.scss"


const HomeLook = ({ user, bigPictures, getBigPictures, count }) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vde container section">
      <List
        name="home-page-subjects-list"
        items={bigPictures}
        container={(bigPicture) => <SubjectPreview key={`subject-${bigPicture.id}`} bigPictureId={bigPicture.id} />}
        user={user}
        emptyMessage={cst.labels.MSG_NO_SUBJECT}
        sortFunc={sortBigPictures}
        count={count}
        getPage={getBigPictures}
        loadFirstPage={true}
        showHeader={false}
        search={true}
        margin={0}
      />
    </div>
  )
}

export default HomeLook
