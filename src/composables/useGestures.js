
import { onMounted, getCurrentInstance } from '@vue/composition-api'

import HammerJS from 'hammerjs'

export default function useGestures () {
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
