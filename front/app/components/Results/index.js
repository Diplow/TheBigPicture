import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Chart from "react-apexcharts"

import HideAndShowButton from '../Buttons/hideandshow'
import List from '../List'
import Loader from '../Loader'
import RatingPreview from '../Rating/preview'

import { ReactComponent as ResultsIcon } from '../../images/icons/barchart.svg'

import { AbstractContent } from '../../utils'
import * as cst from '../../constants'
import EXPLICATIONS from '../../constants/explications'
import "./style.scss"


const ResultsLook = (props) => {
  const {
    showHeader,
    target,
    reasons,
    getResults,
    getPage,
    margin
  } = props

  const [hidden, setHidden] = useState(showHeader)

  const [seriesActivated, setSeriesActivated] = useState(null)
  const [seriesCode, setSeriesCode] = useState("")
  const [series, setSeries] = useState([])

  const toggleSerie = (id) => {
    setSeriesActivated({
      ...seriesActivated,
      [id]: !seriesActivated[id]
    })
  }

  useEffect(() => {
    if (seriesActivated) {
      let newSeries = []
      let newCode = []
      for (let i=0; i < Object.keys(seriesActivated).length; ++i) {
        if (seriesActivated[i]) {
          newSeries.push({
            name: EXPLICATIONS[i],
            data: [target.results[`${i}star`]],
            index: i
          })
          newCode.push(`${i}`)
        }
        else {
          newSeries.push({
            name: EXPLICATIONS[i],
            data: [],
            index: i
          })
          newCode.push(`!${i}`)
        }
      }
      setSeries(newSeries)
      setSeriesCode(newCode.join(':'))
    }
  }, [seriesActivated])


  useEffect(() => {
    if (!hidden)
      getResults(target.id)
  }, [hidden])

  useEffect(() => {
    setHidden(showHeader)
    if (target.results) {
      setSeriesActivated({
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true
      })
    }
  }, [target.results])

  if (!target) return null

  const reasonPreview = (reason, idx) => (
    <RatingPreview key={`reason-${reason.target}`} ratingId={reason.target} count={reason.count} />
  )

  const fltReasons = reasons.filter((r) => r.code == seriesCode)
  const listReasons = (target, reasons, marg) => {
    if (!target) return null
    return (
      <Loader condition={fltReasons.length == 0 && (target.reasonCount && target.reasonCount[seriesCode] == 0)}>
        <List
          name={`bp-${target.id}-${seriesCode}-reasons-list`}
          items={fltReasons}
          container={reasonPreview}
          emptyMessage={""}
          sortFunc={(a, b) => a.count > b.count ? -1 : 1}
          count={target.reasonCount ? target.reasonCount[seriesCode] : null}
          getPage={
            (page, options, reqId) => getPage(page, { ...options, bigpicture: target.id, code: seriesCode }, reqId)
          }
          loadFirstPage={true}
          margin={marg}
        />
      </Loader>
    )
  }

  const marg = margin == undefined ? cst.SUBMARGIN : margin
  return (
    <div
      style={{marginLeft: marg +"%"}}
      className={showHeader ? "container vde section section-field" : ""}>
      { target && showHeader ? header(hidden, setHidden) : null }
      { target && !hidden ? chart(target, series, toggleSerie) : null }
      { target && !hidden && seriesCode && target.results && target.results.count !== 0 ? listReasons(target, reasons, marg) : null }
    </div>
  )
}

const header = (hidden, setHidden) => (
  <div className="level is-mobile">
    <div className="level-left" onClick={ () => setHidden(!hidden) }>
      <ResultsIcon className="vde header-button level-item image is-32x32" />
      <p className="vde subtitle level-item">{cst.labels.RESULTS_TITLE}</p>
    </div>
  </div>
)

const chartOptions = {
  type: 'bar',
  height: '50px',
  width: '100%',
  stacked: true,
  stackType: '100%',
  colors: ["#6A6A6B", "#B02E0C", "#EB4511", "#C1BFB5", "#8ADD75", "#5EA34C"],
  toolbar: {
    show: false
  }
}

const plotOptions = {
  bar: {
    horizontal: true
  }
}

const chart = (bigPicture, series, toggleSerie) => {
  if (bigPicture.results == undefined) return null
  const options = {
    chart: chartOptions,
    plotOptions,
    stroke: {
      width: 0.5,
      colors: ['hsl(198, 0%, 15%)']
    },
    grid: {
      show: true,
      borderColor: 'hsl(198, 0%, 15%)',
      strokeDashArray: 0, 
      column: {
        colors: undefined,
        opacity: 0.5
      },
      xaxis: {
        lines: {
          show: true
        }
      },   
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    toolbar: {
      show: false,
    },
    colors: ["#6A6A6B", "#B02E0C", "#EB4511", "#C1BFB5", "#8ADD75", "#5EA34C"],
    xaxis: {
      categories: [bigPicture.id],
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: 'hsl(198, 0%, 15%)',
        height: 6,
        offsetX: 0,
        offsetY: 0
      },
      tickAmount: 4,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    }
  }

  const legend = (series, bigPicture) => (
    <div className="level-item legend">
      {
        series.map((item) => (
          <div
            className={`legendItem level is-mobile ${item.data.length == 0 ? "" : "is-pushed"}`}
            onClick={() => toggleSerie(item.index)}
            key={`legend-${item.index}`}
          >
            <span
              style={{ backgroundColor: options.colors[item.index] }}
              className="level-item button"
            />
            <span
              className="level-item label"
            >
              {`${item.name} (${bigPicture.results[`${item.index}star`]})`}
            </span>
          </div>
        ))
      }
    </div>
  )

  const emptyResultsMessage = () => (
    <div className="card-content">
      <div className="content">
        <p style={{ color:"inherit" }} className="vde subtitle vde-loadmore">{ cst.labels.MSG_NO_EVAL }</p>
      </div>
    </div>
  )

  const helperTextChart = () => (
    <div className="card-content">
      <div style={{ paddingBottom: 0, marginBottom: 0 }} className="content">
        <p style={{ color:"inherit" }} className="vde subtitle vde-loadmore">{ cst.labels.HELPER_TEXT_RESULTS(bigPicture.title) }</p>
      </div>
    </div>
  )

  const helperTextList = () => (
    <div className="card-content">
      <div style={{ paddingBottom: 0, marginBottom: 0, paddingTop: 0, marginTop: 0 }} className="content">
        <p style={{ color:"inherit" }} className="vde subtitle vde-loadmore">{ cst.labels.HELPER_TEXT_REASON_LIST }</p>
      </div>
    </div>
  )
  if (bigPicture.results && bigPicture.results.count == 0)
    return emptyResultsMessage()

  return (
    <Loader condition={bigPicture.results == undefined}>
      { helperTextChart() }
      <div className="level">
        <div style={{minWidth: "70%"}} className="level-left">
          <div style={{width: "100%"}} id="chart">
            <Chart options={options} series={series} type="bar" height={300} width={"100%"} />
          </div>
        </div>
        { legend(series, bigPicture) }
      </div>
      { helperTextList() }
    </Loader>
  )
}

export default ResultsLook
