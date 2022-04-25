import { ref } from "vue"

export default function setup ({emitter}) {
  const controlsHidden = ref(false)

  let lastInputFocusoutEvent = -999

  if (typeof document !== 'undefined') {
    document.addEventListener('focusout', (event) => {
      if (event.target.tagName === 'INPUT') {
        lastInputFocusoutEvent = event.timeStamp
      }
      console.log('focusout', event.target)
    })
  }

  emitter.on('containerSingleClicked', (event) => {
    if (
      ["SUMMARY", "BUTTON", "A", "INPUT"].includes(event.target.tagName) ||
      // If a focusout event occured recently the user was probably clicking in
      // blank space to clear focus from something
      event.timeStamp < (lastInputFocusoutEvent + 200)
    ) {
      return
    }
    controlsHidden.value = !controlsHidden.value
  })

  return {controlsHidden}
}
