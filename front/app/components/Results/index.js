import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Chart from "react-apexcharts"

import RefreshButton from '../Buttons/refresh'
import HideAndShowButton from '../Buttons/hideandshow'
import Loader from '../Loader'


import { ReactComponent as ResultsIcon } from '../../images/icons/barchart.svg'

import * as cst from '../../constants'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const ResultsLook = (props) => {
  const {
    showHeader,
    target,
    getResults,
    margin
  } = props

  const [hidden, setHidden] = useState(showHeader)

  useEffect(() => {
    if (!hidden)
      getResults(target.id)
  }, [hidden])

  useEffect(() => {
    setHidden(showHeader)
  }, [target.id])

  if (!target) return null

  const marg = margin == undefined ? cst.SUBMARGIN : margin
  return (
    <div
      style={{marginLeft: marg +"%"}}
      className={showHeader ? "container vde section section-field" : ""}>
      { target && showHeader ? header(hidden, setHidden) : null }
      {
        !hidden
          ? <Loader condition={target.results == undefined}>
              { chart(target) }
            </Loader>
          : null
      }
    </div>
  )
}

const header = (hidden, setHidden) => {
  return (
    <div className="level is-mobile">
      <div className="level-left" onClick={ () => setHidden(!hidden) }>
        <ResultsIcon className="vde header-button level-item image is-32x32" />
        <p className="vde subtitle level-item">{cst.labels.RESULTS_TITLE}</p>
      </div>
    </div>
  )
}

const chart = (bigPicture) => {
  if (bigPicture.results == undefined) return null
  const series = [{
    name: EXPLICATIONS[0],
    data: [bigPicture.results["0star"]]
  },{
    name: EXPLICATIONS[1],
    data: [bigPicture.results["1star"]]
  }, {
    name: EXPLICATIONS[2],
    data: [bigPicture.results["2star"]]
  }, {
    name: EXPLICATIONS[3],
    data: [bigPicture.results["3star"]]
  }, {
    name: EXPLICATIONS[4],
    data: [bigPicture.results["4star"]]
  }, {
    name: EXPLICATIONS[5],
    data: [bigPicture.results["5star"]]
  }]
  const options = {
    chart: {
      type: 'bar',
      height: '50px',
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
      ? <p className="vde subtitle vde-loadmore">Personne n'a encore évalué ce contenu.</p>
      : <Chart options={options} series={series} type="bar" height={300} />
    }
    </div>
  )
}

export default ResultsLook
