<script>
import Vue from 'vue'
import BigShotSource from '@/entry.js'
import BigShotDist from '../'
import testPluginStar from './test-plugin-star.js'
import testPluginCircle from './test-plugin-circle.js'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    BigShotSource,
    BigShotDist
  },
  props: ['componentFrom'],
  data () {
    return {
      slideData: [
        { src: 'media/factory.jpg' },
        { src: 'media/sunset.jpg' },
        { src: 'media/santa.mp4', type: 'video' },
        { src: 'media/tree.jpg' },
        { src: 'media/tunnels.jpg' }
      ],
      showSlideShow: true,
      testPluginStar,
      testPluginCircle
    }
  },
  methods: {
    async beforeSlideChangeHook ({ currentIndex, newIndex, delta }) {
      if (delta > 0 && newIndex < currentIndex) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.slideData.push({ ...this.slideData[currentIndex - 4] })
      }
    }
  }
})
</script>

<template>
  <div id="app">
    <component
      :is="`big-shot-${componentFrom}`"
      v-if="showSlideShow"
      :slideData="slideData"
      @exited="() => showSlideShow = false"
      :beforeSlideChangeHook="beforeSlideChangeHook"
      :plugins="[testPluginStar, testPluginCircle]"
    />
    <button @click="() => showSlideShow = true">Open Slide Show</button>
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
