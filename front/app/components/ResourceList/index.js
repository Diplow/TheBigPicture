import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import {} from '../../actions/index'
import {} from '../../constants'
import Resource from '../../components/Resource'
import NewResource from '../../components/Resource/new'
import "./style.scss"


class ResourceListLook extends React.Component {

  constructor(props) {
    super(props);
    const {
      bigPicture,
      resources
    } = this.props;
    this.state = {
      createModal: false
    }
  }


  render() {
    return (
      <div>
        <div className="level resourcelist-level">
          <h2 className="title level-item arglist-title">Ressources</h2>
          <a href="#" onClick={() => this.setState({createModal: !this.state.createModal})} className="button level-item is-narrow">
            <span className="icon"><i className="fas fa-plus"></i></span>
          </a>
        </div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical is-6">
            {
              this.props.resources.map((resource, index) => (
                (index % 2 == 0) ? <Resource key={resource.id} bigpicture={this.props.bigPicture.id} resourceId={resource.id} /> : null
              ))
            }
          </div>
          <div className="tile is-parent is-vertical is-6">
            {
              this.props.resources.map((resource, index) => (
                (index % 2 == 1) ? <Resource key={resource.id} bigpicture={this.props.bigPicture.id} resourceId={resource.id} /> : null
              ))
            }
          </div>
        </div>
        <div className={"modal" + (this.state.createModal ? " is-active" : "")}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Nouvelle ressource</p>
              <button className="delete" onClick={() => this.setState({...this.state, createModal: false})} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <Resource bigpicture={this.props.bigPicture.id} resourceId={0}/>
            </section>
            <footer className="modal-card-foot">
            </footer>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const bigpicture = ownProps.bigPicture;
  const resources = state.get("bigpictures").filter(resource => bigpicture != undefined && bigpicture.resources.indexOf(resource.id) != -1)
  return {
    "resources": bigpicture != undefined ? resources : []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const ResourceList = connect(mapStateToProps, mapDispatchToProps)(ResourceListLook)

export default ResourceList
