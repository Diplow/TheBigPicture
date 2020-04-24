import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList from '../../../components/BigPicture/list'
import NewBigPicture from '../../../components/BigPicture/new'
import BigPictureModal from '../../../components/BigPicture/modal'
import EditionModalButton from '../../../components/Buttons/modal'
import AddBigPictureButton from '../../../components/Buttons/add'
import "./style.scss"


const HomeLook = ({ user, getBigPictures, getOwnSubjects, count }) => {
  return (
    <div>
      <BigPictureList
        filter={bp => bp.kind == cst.SUBJECT && bp.private == false}
        parent={null}
        count={count}
        getPage={getBigPictures}
        showHeader={true}
        title={"SUJETS"}
        loadFirstPage={true}
        emptyMessage={"Aucun sujet n'a encore été créé."}
        buttons={[]}
      />
      {
        user.id == 0
        ? null
        : <BigPictureList
            filter={bp => bp.kind == cst.SUBJECT && bp.author == user.id}
            parent={null}
            count={user.ownSubjectCount}
            getPage={(page) => getOwnSubjects(user.id, page)}
            showHeader={true}
            title={"VOS SUJETS"}
            loadFirstPage={true}
            emptyMessage={"Vous n'avez encore créé aucun sujet."}
            buttons={[addBigPictureButton]}
          />
      }
    </div>
  )
}

const addBigPictureButton = () => {
  return <AddBigPictureButton key={`addhome`} bigPicture={null} />
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default HomeLook
