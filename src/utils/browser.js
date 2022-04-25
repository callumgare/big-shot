export function isIosDevice() {
  if (typeof document === 'undefined') {
    return false
  }
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export function onDoubleClick(element, handler) {
  if (isIosDevice()) {
    onClickIOS(element, (event, numOfClicks) => {
      if (numOfClicks === 2) {
        handler(event)
      }
    })
    return
  }
  element.addEventListener('click', (event) => {
    if (event.detail === 2) {
      handler()
    }
  })
}

export function onSingleClick(element, handler) {
  if (isIosDevice()) {
    onClickIOS(element, (event, numOfClicks) => {
      if (numOfClicks === 1) {
        handler(event)
      }
    })
    return
  }
  element.addEventListener('click', (event) => {
    if (event.detail > 1) {
      return
    }
    const timeoutId = setTimeout(() => {
      element.removeEventListener('click', clickHandler)
      handler(event)
    }, 200)

    element.addEventListener('click', clickHandler, {once: true})

    function clickHandler(event) {
      if ((event.detail === 2) && timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  })
}

// Anoyingly iOS doesn't registor double clicks so we have to manaully
// keep track of how many times a click has occured.
function onClickIOS (element, handler) {
  let numOfClicks = 0
  let timeoutId = null
  element.addEventListener('click', (event) => {
    numOfClicks++
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      handler(event, numOfClicks)
      timeoutId = null
      numOfClicks = 0
    }, 200)
  })
}
