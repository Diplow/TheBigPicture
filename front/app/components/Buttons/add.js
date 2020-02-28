import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import EditionModalButton from './modal'
import NewBigPicture from '../BigPicture/new'
import BigPictureModal from '../BigPicture/modal'
import "./style.scss"


const AddBigPictureButton = ({ bigPicture }) => {
  const init = {
    title: "",
    parent: bigPicture == null ? null : bigPicture.id,
    kind: bigPicture == null ? cst.SUBJECT : cst.PROBLEM,
    private: bigPicture == null ? true : bigPicture.private,
    hyperlink: null,
    subject: bigPicture == null ? null : bigPicture.subject,
    body: "",
  }
  if (bigPicture == null)
  	delete init["subject"]
  const [initBp, setInitBp] = useState(init)
  useEffect(() => {
  	setInitBp(init)
  }, [bigPicture])
  return (
    <div className="button tbp-radio vde-add-comment is-narrow">
      <EditionModalButton
        init={initBp}
        setter={setInitBp}
        classname={"button tbp-radio "}
        icon={"fas fa-plus"}
        EditionModal={BigPictureModal}
        NewItem={NewBigPicture}
      />
    </div>
  )
}

export default AddBigPictureButton
