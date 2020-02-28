import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList from '../../../components/BigPicture/list'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import EditionModalButton from '../../../components/Buttons/modal'
import "./style.scss"


const HomeLook = ({ user, getBigPictures, getOwnSubjects, count }) => {
  return (
    <div>
      <div className="container tbp-section">
        <BigPictureList
          parent={null}
          count={count}
          getPage={getBigPictures}
          title={"SUJETS"}
          emptyMessage={"Aucun sujet n'a encore été créé."}
          loadFirstPage={true}
          buttons={[]}
          filter={bp => bp.kind == cst.SUBJECT && bp.private == false}
        />
      </div>
      {
        user.id == 0
        ? null
        : <div className="container tbp-section">
            <BigPictureList
              parent={null}
              count={user.ownSubjectCount}
              getPage={(page) => getOwnSubjects(user.id, page)}
              title={"VOS SUJETS"}
              emptyMessage={"Vous n'avez encore créé aucun sujet."}
              loadFirstPage={true}
              buttons={[cst.ADD_BUTTON]}
              filter={bp => bp.kind == cst.SUBJECT && bp.author == user.id}
            />
          </div>
      }
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default HomeLook
