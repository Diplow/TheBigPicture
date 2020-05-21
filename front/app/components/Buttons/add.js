import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import EditionModalButton from './modal'

import NewBigPicture from '../BigPicture/new'
import BigPictureModal from '../BigPicture/modal'

import * as cst from '../../constants'
import "./style.scss"


const AddBigPictureButtonLook = ({ bigPicture, user }) => {
  const init = {
    title: "",
    author_id: user.id,
    parent: !bigPicture ? null : bigPicture.id,
    kind: !bigPicture ? cst.SUBJECT : cst.PROBLEM,
    private: !bigPicture ? true : bigPicture.private,
    hyperlink: null,
    subject: !bigPicture ? null : bigPicture.subject,
    body: "",
  }
  if (!bigPicture)
    delete init["subject"]
  const [initBp, setInitBp] = useState(init)
  useEffect(() => {
    setInitBp(init)
  }, [bigPicture])
  return (
    <EditionModalButton
      init={initBp}
      setter={setInitBp}
      classname="button tbp-radio title-button"
      icon={cst.icons.PLUS}
      EditionModal={BigPictureModal}
      NewItem={NewBigPicture}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.get("user")
  }
}

const AddBigPictureButton = connect(mapStateToProps)(AddBigPictureButtonLook)

export default AddBigPictureButton
