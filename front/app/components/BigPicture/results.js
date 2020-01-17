import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chart from "react-apexcharts";
import RefreshButton from '../Buttons/refresh'
import { getResults } from '../../actions'
import "./style.scss"
import * as cst from '../../constants'
import EXPLICATIONS from '../../constants/explications'


const ResultsLook = ({ showHeader, bigPicture, getResults }) => {
  if (bigPicture == undefined)
    return null

  return (
    <div className="container tbp-section section-field">
      { showHeader ? header(bigPicture, getResults) : null }
      { bigPicture.results != undefined ? chart(bigPicture) : <p className="vde-no-comment subtitle">Obtenez les résultats via le bouton d'actualisation.</p> }
    </div>
  )
}

const header = (bigPicture, getResults) => {
  return (
    <div className="level is-mobile">
      <div className="level-left">
        <p className="subtitle level-item vde-subtitle-bp-page">Résultats</p>
        <RefreshButton refresh={() => getResults(bigPicture.id)} />
      </div>
    </div>
  )
}

const chart = (bigPicture) => {
  const series = [{
    name: EXPLICATIONS[bigPicture.kind][0],
    data: [bigPicture.results["0star"]]
  },{
    name: EXPLICATIONS[bigPicture.kind][1],
    data: [bigPicture.results["1star"]]
  }, {
    name: EXPLICATIONS[bigPicture.kind][2],
    data: [bigPicture.results["2star"]]
  }, {
    name: EXPLICATIONS[bigPicture.kind][3],
    data: [bigPicture.results["3star"]]
  }, {
    name: EXPLICATIONS[bigPicture.kind][4],
    data: [bigPicture.results["4star"]]
  }, {
    name: EXPLICATIONS[bigPicture.kind][5],
    data: [bigPicture.results["5star"]]
  }]
  const options = {
    chart: {
      type: 'bar',
      height: 'auto',
      stacked: true,
      stackType: '100%',
      colors: ["#6A6A6B", "#B02E0C", "#EB4511", "#C1BFB5", "#8ADD75", "#5EA34C"],
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#f4e5d9']
    },
    toolbar: {
      show: false,
    },
    theme: {
      mode: 'dark'
    },
    colors: ["#6A6A6B", "#B02E0C", "#EB4511", "#C1BFB5", "#8ADD75", "#5EA34C"],
    title: {
      text: `Nombre de votes: ${bigPicture.results.count}`,
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: true,
      style: {
        fontSize:  '18px',
      },
    },
    xaxis: {
      categories: [bigPicture.id],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      offsetX: 0,
      color: '#f4e5d9',
      fontSize: '16px'
    }
  }
  return (
    <div id="chart">
    {
      bigPicture.results.count == 0
      ? <p className="vde-no-comment subtitle">Personne n'a encore évalué ce contenu.</p>
      : <Chart options={options} series={series} type="bar" height={600} />
    }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    bigPicture: state.get("bigpictures").find(bp => bp.id == ownProps.bigPictureId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResults: (bpId) => { dispatch(getResults(bpId)) }
  }
}

const Results = connect(mapStateToProps, mapDispatchToProps)(ResultsLook)

export default Results;
