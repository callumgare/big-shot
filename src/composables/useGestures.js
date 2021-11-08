import { onMounted, getCurrentInstance } from 'vue'
import HammerJS from 'hammerjs'

export default function setup () {
  onMounted(() => {
    const self = getCurrentInstance()
    const containerGestures = new HammerJS(self.proxy.$el, {})
    containerGestures.on('swipe', event => {
      if (event.deltaX < 0) {
        self.proxy.nextSlide()
      } else {
        self.proxy.previousSlide()
      }
    })
  })
}
