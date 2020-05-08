import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList from '../../../components/BigPicture/list'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import "./style.scss"


const HomeLook = ({ user, getBigPictures, getOwnSubjects, count }) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="vde container section">
      <BigPictureList
        filter={bp => bp.kind == cst.SUBJECT && bp.private == false}
        parent={null}
        count={count}
        search={true}
        getPage={getBigPictures}
        showHeader={false}
        title={"SUJETS"}
        loadFirstPage={true}
        emptyMessage={"Aucun sujet n'a encore été créé."}
        buttons={[]}
      />
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default HomeLook
