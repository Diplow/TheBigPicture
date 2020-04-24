import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chart from "react-apexcharts";
import RefreshButton from '../Buttons/refresh'
import { getRatingResults } from '../../actions'
import "./style.scss"
import * as cst from '../../constants'
import EXPLICATIONS from '../../constants/explications'


const ResultsLook = ({ rating, getResults }) => {

  useEffect(() => {
    getResults(rating.id)
  }, [])

  if (rating == undefined)
    return null

  return (
    <div className="container vde section section-field">
      { rating.results != undefined ? chart(rating) : null}
    </div>
  )
}

const chart = (rating) => {
  const series = [{
    name: EXPLICATIONS[cst.RATING][0],
    data: [rating.results["0star"]]
  },{
    name: EXPLICATIONS[cst.RATING][1],
    data: [rating.results["1star"]]
  }, {
    name: EXPLICATIONS[cst.RATING][2],
    data: [rating.results["2star"]]
  }, {
    name: EXPLICATIONS[cst.RATING][3],
    data: [rating.results["3star"]]
  }, {
    name: EXPLICATIONS[cst.RATING][4],
    data: [rating.results["4star"]]
  }, {
    name: EXPLICATIONS[cst.RATING][5],
    data: [rating.results["5star"]]
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
      text: `Nombre de votes: ${rating.results.count}`,
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
      categories: [rating.id],
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
      rating.results.count == 0
      ? <p className="vde subtitle">Personne n'a encore évalué ce commentaire.</p>
      : <Chart options={options} series={series} type="bar" height={300} />
    }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    rating: state.get("ratings").find(rating => rating.id == ownProps.ratingId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResults: (bpId) => { dispatch(getRatingResults(bpId)) }
  }
}

const RatingResults = connect(mapStateToProps, mapDispatchToProps)(ResultsLook)

export default RatingResults;
