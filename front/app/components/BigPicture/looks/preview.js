import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from '../modal'
import RatingButton from './ratingbutton'
import * as cst from '../../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { TrashButton, LookButton, EditButton, RateButton } from '../previewbuttons'
import "./style.scss"


const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggleFunc = () => { setter(!toggleItem) } 
  return [toggleItem, toggleFunc]
}


const BigPicturePreviewLook = ({ data, buttons, votation, ratingUser }) => {
  if (data == undefined)
    return null

  const [showDetails, toggleDetails] = useToggle(false)
  const [createBPisActive, setCreateBPisActive] = useState(false)
  const [createRatingIsActive, setCreateRatingIsActive] = useState(false)
  const hasButton = (button) => { return buttons.indexOf(button) != -1 }

  return (
    <div className={cst.CLASSNAMES[data.kind] + " card bp-tile"}>
      <header className="card-header level preview-item-level is-mobile">
        <div className="level-left">
          <p
            className="card-header-title"
            onClick={toggleDetails}>
            {data.title}
          </p>
        </div>
        <div className="level-right">
          <EditButton
            data={data}
            action={() => setCreateBPisActive(true)}
            icon="fas fa-edit "
            show={hasButton("edit")}
            isAuthorized={(user, data) => { return user.id == data.author }} />
          <RatingButton
            bigPicture={data}
            show={hasButton("rate")}
            ratingUser={ratingUser} />
          <LookButton
            data={data}
            icon="fas fa-search "
            show={hasButton("look")}
            isAuthorized={(user, data) => { return true }}
            to={(id) => { return "/bigPicture/" + id}} />
          <BigPictureModal
            active={createBPisActive}
            setActive={setCreateBPisActive}
            initBp={data}
          />
        </div>
      </header>
      {
        showDetails
        ? <div className="card-content"><div className="content"><ReactMarkdown source={data.body} /></div></div>
        : null
      }
    </div>
  )
}

BigPicturePreviewLook.propTypes = {  
  bpId: PropTypes.number.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string),
  ratingUser: PropTypes.number
}

export default BigPicturePreviewLook
