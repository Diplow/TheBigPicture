import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { getBigPicture, getArguments, getResources } from '../../../actions/index'
import { PRO_ARGUMENT, CON_ARGUMENT } from '../../../constants'
import BigPicturePreview from '../../../components/BigPicturePreview'
import NewArgument from '../../../components/Argument/new'
import Argument from '../../../components/Argument'
import Resource from '../../../components/Resource'
import Hashtags from '../../../components/Hashtags'
import "./style.scss"


class BigPictureViewLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      match,
      bigPicture,
      resources,
      args,
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
        this.props.bigPicture !== undefined ? (
          <div key={this.props.bigPicture.id}>
            <section className="hero is-dark">
              <div className="hero-body">
                <div className="bp-header-container">
                  <h1 className="title">
                    {this.props.bigPicture.title}
                  </h1>
                </div>
              </div>
            </section>
            <section className="section bp-body">
              <div className="bp-body-container">
                <div className="columns is-mobile">
                  <div className="column is-3 pro-column">
                    {
                      this.props.args.filter(arg => arg.nature == PRO_ARGUMENT).map(arg => (
                        <Argument
                          key={arg.id}
                          data={arg}
                          showDetails={false} />
                      ))
                    }
                    <NewArgument pro={true} target={this.props.bigPicture.id}/>
                  </div>
                  <div className="column is-6">
                    <h2 className="title">Vue</h2>
                    <div className="content">
                      {this.props.bigPicture.body}
                    </div>
                    <Hashtags data={this.props.bigPicture.hashtags} />
                    <h2 className="title">Ressources</h2>
                    <div className="tile is-ancestor">
                      <div className="tile is-parent is-vertical is-4">
                        {
                          this.props.resources.map((resource, index) => (
                            (index % 3 == 0) ? <Resource key={resource.id} bigpicture={this.props.bigPicture.id} resourceId={resource.id} /> : null
                          ))
                        }
                      </div>
                      <div className="tile is-parent is-vertical is-4">
                        {
                          this.props.resources.map((resource, index) => (
                            (index % 3 == 1) ? <Resource key={resource.id} bigpicture={this.props.bigPicture.id} resourceId={resource.id} /> : null
                          ))
                        }
                      </div>
                      <div className="tile is-parent is-vertical is-4">
                        {
                          this.props.resources.map((resource, index) => (
                            (index % 3 == 2) ? <Resource key={resource.id} bigpicture={this.props.bigPicture.id} resourceId={resource.id} /> : null
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className="column is-3 con-column">
                    {
                      this.props.args.filter(arg => arg.nature == CON_ARGUMENT).map(arg => (
                        <Argument
                          key={arg.id}
                          data={arg}
                          showDetails={false} />
                      ))
                    }
                    <NewArgument pro={false} target={this.props.bigPicture.id}/>
                  </div>
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
  const newResource = {
    "title": "Nouvelle Ressource",
    "body": "",
    "id": 0,
    "source": null
  }
  const bigpicture = state.get("bigpictures").filter(bp => bp.id == ownProps.match.params.id)[0]
  const resources = state.get("resources").filter(resource => bigpicture.resources.indexOf(resource.id) != -1)
  resources.push(newResource)
  console.log(resources)
  return {
    "bigPicture": bigpicture,
    "args": state.get("args").filter(arg => arg.obj == ownProps.match.params.id),
    "resources": bigpicture != undefined ? resources : []
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
