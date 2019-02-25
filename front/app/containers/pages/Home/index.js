import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { getBigPictures } from '../../../actions/index'
import BigPicturePreview from '../../../components/BigPicturePreview'
import "./style.scss"


class HomeLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigpictures,
      getBigPictures
    } = this.props;
  }

  componentDidMount() {
    this.props.getBigPictures()
  }

  render() {
    return (
      <div>
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                VUES
              </h1>
            </div>
          </div>
        </section>
        { this.props.bigpictures.map(bigpicture => (
          <BigPicturePreview key={bigpicture.id} data={bigpicture} showDetails={false} />
          ))}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
    return {
      bigpictures: JSON.parse(JSON.stringify(state.get("bigpictures")))
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "getBigPictures": () => { dispatch(getBigPictures()) }
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeLook)

export default Home