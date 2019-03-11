import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { getBigPicture, getArguments, getResources } from '../../../actions/index'
import {} from '../../../constants'
import BigPictureViewHeader from '../../../components/BigPictureViewHeader'
import ResourceList from '../../../components/ResourceList'
import ArgumentList from '../../../components/ArgumentList'
import BigPicture from '../../../components/BigPicture'
import "./style.scss"


class BigPictureViewLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      match,
      bigPicture,
      getBigPicture,
      getArguments,
      getResources
    } = this.props;
  }

  componentDidMount() {
    const bpId = this.props.match.params.id;
    this.props.getBigPicture(bpId);
    this.props.getArguments(bpId);
    this.props.getResources(bpId);
  }

  render() {
    return (
      <div>
      {
        this.props.bigPicture !== null ? (
          <div key={this.props.bigPicture.id}>
            <BigPictureViewHeader bigPicture={this.props.bigPicture} />
            <section className="section bp-body">
              <div className="bp-body-container">
                <div className="columns">
                  <div className="column is-8">
                    <BigPicture data={this.props.bigPicture} />
                    <ResourceList bigPicture={this.props.bigPicture} />
                  </div>
                  <ArgumentList bigPicture={this.props.bigPicture} />
                </div>
              </div>
            </section>
          </div>
        ) : <div/>
      }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const bpId = ownProps.match.params.id
  const hash = ownProps.location.hash
  const bigPictures = state.get("bigpictures").filter(bp => bp.id == bpId)
  const previews = state.get("bigpictures").filter(bp => bp.id == parseInt(hash.substr(1, hash.length)))
  return {
    "bigPicture": bigPictures.length == 1 ? bigPictures[0] : null,
    "preview": previews.length == 1 ? previews[0] : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    "getBigPicture": (id) => { dispatch(getBigPicture(id)) },
    "getArguments": (bigpictureId) => { dispatch(getArguments(bigpictureId)) },
    "getResources": (bigpictureId) => { dispatch(getResources(bigpictureId)) }
  }
}

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
