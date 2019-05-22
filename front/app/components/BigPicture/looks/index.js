import ReactMarkdown from 'react-markdown'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BigPictureModal from '../modal'
import AddBigPictureButton from './addbutton'
import * as cst from '../../../constants'
import "./style.scss"


export const useAuthorCheck = (data, user) => {
  const [isAuthor, setter] = useState(data.author == user.id)
  return isAuthor
}

const BigPictureContentLook = ({ data, user }) => {
  const isAuthor = useAuthorCheck(data, user)

  return (
    <div className="section">

      <div className="level is-mobile">
        <div className="level-left">
          <h2 className="title">{data.title}</h2>
        </div>
        <div className="level-right">
          { isAuthor ? <AddBigPictureButton initBp={data} /> : null }
        </div>
      </div>
      <div className="content">
        <ReactMarkdown source={data.body} />
      </div>
    </div>
  )
}

BigPictureContentLook.propTypes = {
  data: PropTypes.object.isRequired, // the bigPicture which is represented
  user: PropTypes.object.isRequired, // the logged in user
}

export default BigPictureContentLook
