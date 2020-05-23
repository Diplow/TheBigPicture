
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as cst from '../../constants'
import "./style.scss"


const NewUser = (props) => {
  const { data, setData } = props
  const edit = (e) => {
    if (e.target.name == "image") {
      setData({ ...data, "image": e.target.files[0]})
    }
    else {
      setData({ ...data, [e.target.name]: e.target.value})
    }
  }

  return (
    <div className="newBigPicture-modal">
      {bioField(data, edit)}
      {imageField(data, edit)}
    </div>
  )
}

const imageField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Image</p>
      <input
        type="file"
        name="image"
        onChange={edit} />
      <img src={typeof(data.image) == "string" ? data.image : URL.createObjectURL(data.image)} />
    </div>
  )
}

const bioField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Bio</p>
      <textarea
        className="textarea tbp-modal"
        name="bio"
        value={data.bio}
        onChange={edit}
        placeholder={cst.labels.USER_BIO_PLACEHOLDER} />
    </div>
  )
}

export default NewUser
