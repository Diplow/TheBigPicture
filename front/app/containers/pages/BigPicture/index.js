
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getBigPicture } from '../../../actions/index'

import Tutorial from '../../../components/Tutorial'
import BigPictureSection from './bigPictureSection'
import ReasonsSection from './reasonsSection'
import ResultsSection from './resultsSection'

import * as cst from '../../../constants'
import "./style.scss"


const BigPictureViewLook = (props) => {
  const {
    match,
    bigPicture,
    getBigPicture
  } = props


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    getBigPicture(match.params.bigPictureId)
  }, [match])



  const tutorialBigPictureSection = () => (
    <Tutorial
      page={cst.tutorial.BP_PAGE}
      identifier={cst.tutorial.BP_SECTION_ID}
      title="Présentation de la vue d'ensemble."
      paragraphs={[
        "Cette partie présente la vue d'ensemble de manière plus complète que dans la page catégorie. On retrouve l'icône de l'auteur et le titre de la vue d'ensemble, mais aussi les vues 'enfants'. On appelle 'vue enfant' une vue qui vient préciser une autre vue. Cette hiérarchie permet de structurer l'information, et elle est déterminante pour une bonne compréhension du sujet. En particulier, il ne faut pas hésiter à critiquer la hiérarchie proposée par l'auteur de la vue. Pour se faire, ça se passe un peu plus bas sur la page."
      ]} />
  )

  const tutorialReasonsSection = () => (
    <Tutorial
      page={cst.tutorial.BP_PAGE}
      identifier={cst.tutorial.REASONS_SECTION_ID}
      title="Les 'raisons' de la vue d'ensemble."
      paragraphs={[
        "Ici, vous trouverez ce qu'on appelle (ailleurs sur le net) la partie 'commentaire'. Sur VDE, on appelle ces commentaires des 'raisons' parce qu'ils vont justifier des jugements (cf la troisième et dernière partie de cette page un peu plus bas). En particulier c'est ici que l'on va pouvoir critiquer la vue d'ensemble. L'idée est que chaque membre de la communauté VDE, en lisant la vue d'ensemble et les commentaires associés puisse se faire sa propre idée, sans être à la merci des convictions de l'auteur."
      ]} />
  )

  const tutorialResultsSection = () => (
    <Tutorial
      page={cst.tutorial.BP_PAGE}
      identifier={cst.tutorial.RESULTS_SECTION_ID}
      title="Les évaluations de cette vue d'ensemble."
      paragraphs={[
        "En cliquant sur le symbole '+' à droite, vous dévoilerez le graphique des résultats de cette vue d'ensemble (s'il y a au moins un vote). En dessous, vous trouverez les raisons associées aux évaluations sélectionnées dans la légende. Pour voter vous aussi, il faut remonter dans la partie 'raisons' et cliquer sur l'icône en forme d'étoile à gauche de la raison qui justifie notre jugement.",
      ]} />
  )

  return (
    <div className="vde container section">
      { tutorialBigPictureSection() }
      <BigPictureSection bigPicture={bigPicture} />
      { tutorialReasonsSection() }
      <ReasonsSection bigPicture={bigPicture} bpId={match.params.bigPictureId} />
      { tutorialResultsSection() }
      <ResultsSection bigPicture={bigPicture} bpId={match.params.bigPictureId} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  bigPicture: state.get("bigpictures").find((elt) => elt.id == ownProps.match.params.bigPictureId)
})

const mapDispatchToProps = (dispatch) => ({
  getBigPicture: (bpId) => { dispatch(getBigPicture(bpId)) }
})

const BigPictureView = connect(mapStateToProps, mapDispatchToProps)(BigPictureViewLook)

export default BigPictureView
