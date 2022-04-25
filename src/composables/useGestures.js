import { onMounted, getCurrentInstance } from 'vue'
import HammerJS from 'hammerjs'
import { onSingleClick } from '../utils/browser'

export default function setup ({emitter}) {
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

    onSingleClick(self.proxy.$el, (event) => emitter.emit('containerSingleClicked', event))
  })
}
