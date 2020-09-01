import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { postBigPicture, deleteBigPicture, patchBigPicture } from '../../actions'
import RadioButton from '../Buttons/radio'
import NewActionsButtons from '../Buttons/newtoolbar'

import { ReactComponent as MoreIcon } from '../../images/icons/down-arrow.svg'
import { ReactComponent as PencilIcon } from '../../images/icons/pencil-solid.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'

import * as cst from '../../constants'
import * as utils from '../../utils'
import "./style.scss"

const NewBigPictureLook = (props) => {
  const { 
    item,
    newItem,
    setNewItem,
    setShowNewItem,
    publish,
    trash,
  } = props

  const [showAdvancedOptions, setShowAdvancedOption] = useState(false)

  if (!newItem) return null

  const edit = (e) => {
    if (e.target.name == "private") {
      if (e.target.value === "false" || e.target.value === false) {
        setNewItem({ ...newItem, [e.target.name]: false})
      }
      else if (e.target.value === "true" || e.target.value === true) {
        setNewItem({ ...newItem, [e.target.name]: true})
      }
    }
    else {
      setNewItem({ ...newItem, [e.target.name]: e.target.value })
    }
  }

  const header = () => (
    <div className="field">
      <input
        className="input vde-newrating"
        name="title"
        value={newItem.title}
        onChange={edit}
        placeholder={cst.labels.NEW_BP_TITLE_PLACEHOLDER} />
    </div>
  )

  const content = () => (
    <div className="field">
      <textarea
        className="textarea vde-newrating"
        name="body"
        value={newItem.body}
        onChange={edit}
        placeholder={cst.labels.NEW_BP_ABSTRACT_PLACEHOLDER} />
    </div>
  )

  const verb = showAdvancedOptions ? " Masquer les options avancées" : "Afficher"
  const showAdvancedOptionsButton = (
    <div className="level is-mobile show-advanced-options">
      <div
        className="level-item is-narrow"
        onClick={() => { setShowAdvancedOption(!showAdvancedOptions) }}>
        <MoreIcon
          style={!showAdvancedOptions ? {transition: "transform 0.5s"} : {transform: "rotate(180deg)", transition: "transform 0.5s"}}
          className="vde header-icon is-narrow icon-button"
        />
        <p className="subtitle is-narrow show-more">{showAdvancedOptions ? cst.labels.HIDE_ADVANCED_OPTIONS : cst.labels.SHOW_ADVANCED_OPTIONS}</p>
      </div>
    </div>
  )

  const reference = () => (
    <div className="field">
      <input
        className="input vde-newrating"
        type="number"
        name="hyperlink_id"
        value={newItem.hyperlink_id}
        onChange={edit}
        placeholder={cst.labels.NEW_REFERENCE_PLACEHOLDER} />
      <p className="helper-text">{cst.labels.HELPER_TEXT_REFERENCE_FIELD}</p>
    </div>
  )


  const parentField = () => (
    <div className="field">
      <input
        className="input vde-newrating"
        type="number"
        name="parent"
        value={newItem.parent}
        onChange={edit}
        placeholder="Identifiant du parent (numérique)" />
      <p className="helper-text">{cst.labels.HELPER_TEXT_PARENT_FIELD}</p>
    </div>
  )

  const radioButton = (name, checked, value, onChange, label) => (
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

  const privacyField = () => (
    <div className="field">
      <div className="control">
        { radioButton("private", newItem.private === false, false, edit, "Publique") }
        { radioButton("private", newItem.private === true, true, edit, "Privé") }
      </div>
      <p className="helper-text">{cst.labels.HELPER_TEXT_PRIVACY_FIELD}</p>
    </div>
  )

  return (
    <div className="vde new-item">
      { header() }
      { content() }
      { showAdvancedOptionsButton }
      { showAdvancedOptions ? reference() : null }
      { showAdvancedOptions ? parentField() : null }
      { showAdvancedOptions ? privacyField() : null }
      <NewActionsButtons
        publish={() => publish(newItem)}
        trash={() => trash(newItem)}
        discard={
          () => {
            setShowNewItem(false);
            setNewItem({
              ...newItem,
              body: item && item.body || "",
              title: item && item.title || ""
            })
          }
        } />
    </div>
  )
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  publish: (item) => { item.id ? dispatch(patchBigPicture(item)) : dispatch(postBigPicture(item)) },
  trash: (item) => { item.id ? dispatch(deleteBigPicture(item.id)) : null }
})

const NewBigPicture = connect(mapStateToProps, mapDispatchToProps)(NewBigPictureLook)

export default NewBigPicture
