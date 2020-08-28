
import * as cst from "../constants"


const categories = (state = [], action) => {
  let oldCat = null

  switch (action.type) {

    case cst.actions.ADD_CATEGORY:
      oldCat = state.find((category) => category.label == action.category.label)
      return [
        ...state.filter((cat) => cat.label !== action.category.label),
        {
          ...oldCat,
          ...action.category
        }
      ]

    case cst.actions.CREATE_BIG_PICTURE:
      const cat = state.find((category) => category.label == action.bigpicture.tags)
      if (!cat) return state
      return [
        ...state.filter((category) => category.label !== cat.label),
        {
          ...cat,
          subjectCount: cat.subjectCount + 1
        }
      ]

    case cst.actions.SET_CATEGORY_SUBJECT_COUNT:
      oldCat = state.find((category) => category.label == action.category)
      if (!oldCat) return state
      return [
        ...state.filter((category) => category.label !== action.category),
        {
          ...oldCat,
          subjectCount: action.count
        }
      ]

    default:
      return state
  }
}

export default categories
