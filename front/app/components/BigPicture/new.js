
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as cst from '../../constants'
import "./style.scss"


const NewBigPictureLook = ({ parent, data, setData }) => {
  const [kind, setKind] = useState(data.kind)
  const [privacy, setPrivacy] = useState(data.private)

  useEffect(() => {
    setKind(data.kind)
    setPrivacy(data.private)
  }, [data])

  const edit = (e) => {
    if (e.target.name == "private") {
      if (e.target.value === "false" || e.target.value === false) {
        setData({ ...data, [e.target.name]: false})
      }
      else if (e.target.value === "true" || e.target.value === true) {
        setData({ ...data, [e.target.name]: true})
      }
    }
    else {
      setData({ ...data, [e.target.name]: e.target.value})
    }
  }

  return (
    <div className="newBigPicture-modal">
      {kindField(kind, edit, parent)}
      {data.kind != cst.SUBJECT ? parentField(data, edit) : null}
      {data.kind != cst.SUBJECT ? hyperLinkIdField(data, edit) : null}
      {titleField(data, edit)}
      {contentField(data, edit)}
      {data.kind == cst.SUBJECT ? privacyField(privacy, edit) : null}
    </div>
  )
}

const radioButton = (name, checked, value, onChange, label) => {
  return (
    <label className="radio">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked} />
      {label}
    </label>
  )
}

const kindField = (kind, edit, parent) => {
  if (kind == cst.SUBJECT)
    return null
  return (
    <div className="field">
      <p className="subtitle-modal">Type</p>
      <div className="control">
        { radioButton("kind", kind == cst.PROBLEM, cst.PROBLEM, edit, "Problème") }
        { parent != null && parent.kind != cst.RESOURCE && parent.kind != cst.SUBJECT ? radioButton("kind", kind == cst.SOLUTION, cst.SOLUTION, edit, "Solution") : null }
        { radioButton("kind", kind == cst.RESOURCE, cst.RESOURCE, edit, "Ressource") }
      </div>
    </div>
  )
}

const privacyField = (privacy, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Visibilité</p>
      <div className="control">
        { radioButton("private", privacy === false, false, edit, "Publique") }
        { radioButton("private", privacy === true, true, edit, "Privé") }
      </div>
    </div>
  )
}

const hyperLinkIdField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Identifiant de la référence (optionnel)</p>
      <input
        className="input tbp-modal"
        type="text"
        name="hyperlink_id"
        value={data.hyperlink_id != undefined ? data.hyperlink_id : ""}
        onChange={edit}
        placeholder="Identifiant (numérique)" />
    </div>
  )
}


const parentField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Identifiant du parent</p>
      <input
        className="input tbp-modal"
        type="text"
        name="parent"
        value={data.parent}
        onChange={edit}
        placeholder="Identifiant du parent (numérique)" />
    </div>
  )
}

const titleField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Titre</p>
      <input
        className="input tbp-modal"
        type="text"
        name="title"
        value={data.title}
        onChange={edit}
        placeholder="Titre" />
    </div>
  )
}

const contentField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Contenu</p>
      <textarea
        className="textarea tbp-modal"
        name="body"
        value={data.body}
        onChange={edit}
        placeholder="Contenu" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    parent: state.get("bigpictures").find(elt => elt.id == ownProps.data.parent)
  }
}

const NewBigPicture = connect(mapStateToProps)(NewBigPictureLook)

export default NewBigPicture
