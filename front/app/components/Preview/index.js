import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import DropdownMenu from '../DropDownMenu'
import DropDownButton from '../DropDownButton'

import * as utils from '../../utils'
import * as cst from '../../constants'
import "./style.scss"


export const PreviewLook = (props) => {
  const {
    item,
    itemId,
    itemType,
    getItem,
    header,
    content,
    steps,
    leftToolbar,
    lookButton,
    user
  } = props


  const [menu, setMenu] = useState(null)
  const [activeStep, setActiveStep] = useState({ step: null, activateLabel: null })

  let actions = {}
  steps.map((step) => {
    actions[step.step] = step.actions.map((action) => action.constructor({
      ...action,
      item,
      user,
      setActiveStep,
      activeStep
    }))
  })


  useEffect(() => {
    if (!item)
      getItem(itemId)
  }, [])

  const cardId = !item && `${itemType}-preview-${itemId}` || ""

  const dropdownStep = (step, isActive, setIsActive, activeStep) => (
    <div>
      <DropDownButton
        name={ step.step }
        isActive={ isActive }
        setIsActive={ setIsActive }
        classname={ `vde toolbar level-item ${activeStep.step == step.step ? "active" : ""}` }
        icon={ step.icon }
      >
        <DropdownMenu
          linksArray={
            actions[step.step].filter((action) => action).map(
              (action) => (action[1])
            )
          } />
      </DropDownButton>
    </div>
  )

  const toolBarContainer = (cardId, steps, lookButton, leftToolbar) => {
    const [isActive, setIsActive] = useState(null)

    return (
      <div className="vde toolbar level is-mobile">
        <div className="level-left">
          {leftToolbar}
        </div>
        <div className="level-right">
          {
            steps.map(
              (step) => (
                <div key={`${cardId}-${step.step}`}>
                  { dropdownStep(step, isActive, setIsActive, activeStep) }
                </div>
              )
            )
          }
          { lookButton }
        </div>
      </div>
    )
  }

  const toolbar = toolBarContainer(cardId, steps, lookButton, leftToolbar)

  return (
    <div>
      <div id={cardId} className={`vde card ${itemType}`}>
        { header }
        { content }
        { toolbar }
      </div>
      { 
        steps.map(
          (step) => (
            actions[step.step]
              .filter((action) => action)
              .map((action) => (
                <div key={`${cardId}-${action[1].name}`}>
                  {action[0]}
                </div>
              ))
          )
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.get("user")
})

const Preview = connect(mapStateToProps)(PreviewLook)

export default Preview;
