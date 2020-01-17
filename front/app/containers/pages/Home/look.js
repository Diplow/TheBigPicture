import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList from '../../../components/BigPicture/list'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import EditionModalButton from '../../../components/Buttons/modal'
import "./style.scss"


const HomeLook = ({ getBigPictures, count }) => {
  return (
    <div>
      <div className="container tbp-section">
        <BigPictureList
          parent={null}
          count={count}
          getPage={getBigPictures}
          title={"SUJETS"}
          emptyMessage={"Aucun sujet n'a encore été créé. Soyez le premier !"}
          loadFirstPage={true}
          buttons={[cst.ADD_BUTTON]}
          filter={bp => bp.kind == cst.SUBJECT}
        />
      </div>
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

const addBigPictureButton = () => {
  const newBP = {
    kind: cst.SUBJECT,
    title: "",
    parent: null,
  }
  return (
    <EditionModalButton
      init={newBP}
      classname={"vde-home"}
      icon={"fas fa-plus"}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

export default HomeLook
