import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as cst from '../../constants'
import "./style.scss"


const NewRatingLook = ({ data, setData, target_bp }) => {
  if (data == null)
    return null

  const edit = (e) => {
    setData({ ...data, [e.target.name]: e.target.value})
  }

  return (
    <div className="newRatingModal">
      {starField(data, edit, target_bp)}
      {reasonField(data, edit)}
    </div>
  )
}

NewRatingLook.propTypes = {
  data: PropTypes.object,
  setData: PropTypes.func
}

const starField = (data, edit, target_bp) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Évaluation</p>
        { stars(data, edit) }
        { explicit(data, edit, target_bp) }
    </div>
  )
}


const stars = (data, edit) => {
  const setV = (nb) => edit({ target: { name: "value", value: nb }})

  const Star = ({ value, setValue, nb }) => {
    return (
      <div className={"level-item" + (value >= nb ? " selected" : "")} onClick={() => {value == nb ? setValue(0) : setValue(nb)}}>
        <span className="tbp-star tbp-eval fa fa-star"/>
      </div>
    )
  }

  return (
    <div className="level star-level is-mobile">
      {
        [1, 2, 3, 4, 5].map(key => <Star key={`star-${key}-${data.id}`} value={data.value} setValue={setV} nb={key} />)
      }
    </div>
  )
}

const explicit = (data, edit, target_bp) => {
  switch (data.value) {
    case 1:
      if (target_bp == null)
        return (<p>Je pense que ce commentaire n'apporte rien.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Je pense que pour toute personne raisonnable, ce problème n'en est pas un.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Je pense que cette ressource embrouille la vue d'ensemble, est hors sujet ou une fake news.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je pense que cette solution ne règlera pas le problème, qu'elle est impossible à implémenter ou qu'elle provoquera des problèmes plus grave que ceux qu'elle résout.</p>)
    case 2:
      if (target_bp == null)
        return (<p>Je ne trouve pas ce commentaire pertinent, mais je comprends que pour quelqu'un d'autre il puisse l'être.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Je ne pense pas que ce problème structure la vue d'ensemble, mais je comprends que d'autres personnes raisonnables puissent le penser.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Je ne pense pas que cette ressource aide à appréhender la vue d'ensemble, mais je comprends qu'elle puisse être considérée utile pour une autre analyse que la mienne.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je pense que cette solution ne changera pas grand chose, qu'elle ne pourra pas être implémentée correctement ou qu'elle provoquera des effets de bord indésirables.</p>)
    case 3:
      if (target_bp == null)
        return (<p>Je suis partagé quant à ce commentaire. Certains points soulevés me semblent pertinents mais l'ensemble n'est pas satisfaisant.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Je suis partagé quant à ce problème. Il ne me semble pas très structurant tel quel, mais il met le doigt sur quelque chose.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Je suis partagé quant à cette ressource. Elle met en avant des éléments intéressants mais en l'état je ne suis pas sûr de bien voir comment elle éclaire la vue d'ensemble.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je pense que cette solution pourrait fonctionner mais j'ai encore des doutes quant à son efficacité et à sa faisabilité.</p>)
    case 4:
      if (target_bp == null)
        return (<p>Ce commentaire me semble pertinent et tout personne lisant le contenu associé gagnerait à en prendre connaissance.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Ce problème est structurant pour la vue d'ensemble, et devrait être adressé.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Cette ressource contribue à une meilleure compréhension de la vue d'ensemble.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je pense qu'on gagnerait à essayer cette solution, elle devrait résoudre au moins une partie du problème, mais je ne pense pas qu'on puisse s'en contenter.</p>)
    case 5:
      if (target_bp == null)
        return (<p>Ce commentaire devrait être épinglé à ce contenu de façon à ce que tout le monde en prenne connaissance.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Ce problème structure totalement cette vue d'ensemble et me semble résolvable.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Cette ressource permet de tout comprendre rapidement et simplement. Elle donne l'essentiel des éléments pour juger par soi-même.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je suis convaincu que cette solution est faisable et efficace pour régler le problème.</p>)
    default:
      if (target_bp == null)
        return (<p>Je ne comprends pas bien ce commentaire.</p>)
      if (target_bp.kind == cst.PROBLEM)
        return (<p>Je ne comprends pas bien ce problème.</p>)
      if (target_bp.kind == cst.RESOURCE)
        return (<p>Je ne comprends pas bien cette ressource.</p>)
      if (target_bp.kind == cst.SOLUTION)
        return (<p>Je ne comprends pas bien cette solution.</p>)
  }
}
const reasonField = (data, edit) => {
  return (
    <div className="field">
      <p className="subtitle-modal">Raison</p>
      <textarea
        className="textarea tbp-modal"
        name="reason"
        value={data.reason}
        onChange={edit}
        placeholder="Explication de vote" />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    target_bp: state.get("bigpictures").find(bp => bp.id == ownProps.data.target_bp)
  }
}

const NewRating = connect(mapStateToProps)(NewRatingLook)
export default NewRating
