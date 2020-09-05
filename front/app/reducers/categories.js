
import * as cst from "../constants"

const addCategory = (newCategory, state) => {
  if (!newCategory) return state
  const oldCat = state.find((category) => category.label == newCategory.label)
  return [
    ...state.filter((cat) => cat.label !== newCategory.label),
    {
      ...oldCat,
      ...newCategory
    }
  ]
}


const categories = (state = [], action) => {
  switch (action.type) {

    case cst.actions.ADD_CATEGORY:
      return addCategory(action.category, state)

    case cst.actions.ADD_BIG_PICTURE:
      return addCategory(action.bigpicture.category, state)

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
      const oldCat = state.find((category) => category.label == action.category)
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
