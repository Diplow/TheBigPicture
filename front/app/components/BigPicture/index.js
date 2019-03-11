import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import {} from '../../constants'
import Hashtags from '../../components/Hashtags'
import "./style.scss"


class BigPictureContentLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      data
    } = this.props;
  }


  render() {
    return (
      <div>
        <div className="content">
          <ReactMarkdown source={this.props.data.body} />
        </div>
        <Hashtags data={this.props.data.hashtags} />
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const BigPictureContent = connect(mapStateToProps, mapDispatchToProps)(BigPictureContentLook)

export default BigPictureContent;
