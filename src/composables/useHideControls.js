import { ref } from "vue"

export default function setup () {
  const controlsHidden = ref(false)
  const timer = ref(null)

  function startTimer() {
    timer.value = setTimeout(() => {
      controlsHidden.value = true
    }, 2 * 1000)
  }

  function clearTimer() {
    if (timer.value) {
      clearTimeout(timer.value)
    }
    if (controlsHidden.value) {
      controlsHidden.value = false
    }
  }

  function resetTimer() {
    clearTimer()
    startTimer()
  }

  document.addEventListener('pointermove', resetTimer)

  startTimer()

  return {controlsHidden}
}