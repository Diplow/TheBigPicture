
import * as hooks from './hooks'

export { hooks }


export const range = (start, stop, step) => {
  if (typeof stop == 'undefined') {
    stop = start
    start = 0
  }

  if (typeof step == 'undefined') {
    step = 1
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  var result = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result
}

export const removeEmptyKeys = (obj) => {
  let res = {}
  Object.keys(obj).forEach(
    (key) => {
      if ((obj[key] !== null && obj[key] !== ""))
        res[key] = obj[key]
    }
  )
  return res
}
