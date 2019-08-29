import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import BigPicturePreview from '../../../components/BigPicture/preview'
import BigPictureContent from '../../../components/BigPicture'
import "./style.scss"
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'


const useFilters = (bigPicture, filters) => {

  let init = {}
  for (const key in filters)
    init[filters[key]] = true

  const [res, setFilters] = useState(init)
  if (bigPicture == null) {
    return [null, null]
  }
  const names = {
    [cst.RESOURCE]: "Ressources",
    [cst.PROBLEM]: "Problèmes",
    [cst.SOLUTION]: "Solutions"
  }
  const onChange = (flts, key) => {
    return () => {
      setFilters({ ...flts, [key]: !flts[key]})
    }
  }
  const item = (
    <div className="filters">
    {
      Object.keys(res).map((key) => {
        return (
          <label key={key} className="checkbox filter">
            <input
              type="checkbox"
              checked={res[key]}
              onChange={onChange(res, key)}
              disabled={[cst.SUBJECT, cst.RESOURCE].indexOf(bigPicture.kind) != -1 && key == cst.SOLUTION} />
            {names[key]}
          </label>
        )
      })
    }
    </div>
  )

  return [item, res]
}


const context = (bigPicture) => {
  if (bigPicture.kind == cst.SUBJECT)
    return null
  return (
    <div className="tbp-context">
      <h2 className="subtitle">Contexte</h2>
      <BigPicturePreview
        key={bigPicture.parent}
        bpId={bigPicture.parent}
        buttons={["look"]}
      />
    </div>
  )
}

const BigPictureViewLook = ({ user, match, bigPicture, children, setBigPicture }) => {

  useEffect(() => {
    setBigPicture(match.params.id)
  }, [match])


  const [filters, filtersData] = useFilters(
    bigPicture,
    [cst.RESOURCE, cst.PROBLEM, cst.SOLUTION]
  )
  const [hidden, setHidden] = useState(false)


  if (bigPicture == null)
    return null

  const initNewBp = {
    title: "",
    parent: bigPicture.id,
    kind: cst.PROBLEM
  }
  const canCreate = user.username != cst.GUEST_NAME && initNewBp != undefined

  return (
    <div>
      <div className={"hero " + cst.CLASSNAMES[bigPicture.kind]}>
        <div className="container tbp-section">
          <h1 className="title" onClick={() => setHidden(!hidden)}>
            {bigPicture.title}
          <p className={hidden ? "tbp-description is-hidden" : "tbp-description"}>{bigPicture.body}</p>
          </h1>
        </div>
      </div>
      <div className="container tbp-section">
        <div key={bigPicture.id}>
          {context(bigPicture)}
          <div className="level is-mobile">
            <div className="level-left">
              {filters}
            </div>
            <div className="level-right">
              { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
            </div>
          </div>
        </div>
          {bigPictureList(bigPicture, filtersData)}
      </div>
    </div>
  )
}

BigPictureViewLook.propTypes = {
  match: PropTypes.object.isRequired,
  bigPicture: PropTypes.object,
  setBigPicture: PropTypes.func.isRequired
}

const bigPictureList = (bigPicture, filters) => {
  const bpFilter = (bp) => {
    return (
      bigPicture.id == bp.parent && filters[bp.kind]
    )
  }
  const buttons = ["look", "edit", "rate"]
  const showRatings = true
  return createList(bigPicture, bpFilter, buttons, showRatings)
}

export default BigPictureViewLook
