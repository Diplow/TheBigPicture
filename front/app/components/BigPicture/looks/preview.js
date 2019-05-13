import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import BigPictureModal from '../modal'
import RatingModal from '../../Votation/ratingmodal'
import * as cst from '../../../constants'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { TrashButton, LookButton, EditButton, RateButton } from '../previewbuttons'
import "./style.scss"


const useToggle = (initial_value) => {
  const [toggleItem, setter] = useState(initial_value)
  const toggleFunc = () => { setter(!toggleItem) } 
  return [toggleItem, toggleFunc]
}

const getTileColor = (nature) => {
  let res = "white"
  if (nature == cst.PRO_ARGUMENT)
    res = "green"
  if (nature == cst.CON_ARGUMENT)
    res = "red"
  return res
}

const BigPicturePreviewLook = ({ data, buttons, votation }) => {
  if (data == undefined)
    return null

  const [showDetails, toggleDetails] = useToggle(false)
  const [createBPisActive, setCreateBPisActive] = useState(false)
  const [createRatingIsActive, setCreateRatingIsActive] = useState(false)
  const hasButton = (button) => { return buttons.indexOf(button) != -1 }
  const tileColor = getTileColor(data.nature)

  return (
    <div style={{"backgroundColor": tileColor}} className="card">
      <header className="card-header level preview-item-level is-mobile">
        <div className="level-left">
          <p
            className="card-header-title"
            onClick={toggleDetails}>
            {data.title}
          </p>
        </div>
        <div className="level-right">
          <LookButton
            data={data}
            icon="fas fa-search "
            show={hasButton("look")}
            isAuthorized={(user, data) => { return true }}
            to={(id) => { return "/bigPicture/" + id}} />
          <RateButton
            data={data}
            action={() => setCreateRatingIsActive(true)}
            icon="fas fa-poll "
            show={hasButton("rate")}
            isAuthorized={(user, data) => { return user.username != cst.GUEST_NAME }} />
          <TrashButton
            data={data}
            icon="fas fa-trash "
            show={hasButton("trash")}
            isAuthorized={(user, data) => { return user.id == data.author }} />
          <EditButton
            data={data}
            action={() => setCreateBPisActive(true)}
            icon="fas fa-edit "
            show={hasButton("edit")}
            isAuthorized={(user, data) => { return user.id == data.author }} />
          <BigPictureModal
            active={createBPisActive}
            setActive={setCreateBPisActive}
            initBp={data}
          />
          {
            votation != null
            ? <RatingModal
                active={createRatingIsActive}
                setActive={setCreateRatingIsActive}
                init={{
                  value: 0,
                  reasons: [],
                  target: data.id,
                  votation: votation.id
                }}
              />
            : null
          }
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
  data: PropTypes.object.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string),
  votation: PropTypes.object
}

export default BigPicturePreviewLook
