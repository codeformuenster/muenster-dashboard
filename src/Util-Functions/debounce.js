
export const debounce = (debTime, func) => {
  let timer
  return (...args) => {    
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, debTime)
  }
}
