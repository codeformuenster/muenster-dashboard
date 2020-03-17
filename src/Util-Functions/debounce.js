
export const debouncer = (debTime, func) => {
  let timer
  return (...args) => {    
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, debTime)
  }
}
