<script>
import BigShot from '../src/big-shot.vue'
import testPluginStar from './test-plugin-star.js'
import testPluginCircle from './test-plugin-circle.js'

export default {
  name: 'BigShotExampleUsage',
  components: {
    BigShot,
  },
  props: {
    loadPlugins: Boolean,
  },
  data ({loadPlugins}) {
    return {
      slideData: [
        { src: 'media/factory.jpg' },
        { src: 'media/sunset.jpg' },
        { src: 'media/santa.mp4', type: 'video' },
        { src: 'media/tree.jpg' },
        { src: 'media/tunnels.jpg' }
      ],
      showSlideShow: true,
      plugins: loadPlugins ? [testPluginStar, testPluginCircle] : []
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
}
</script>

<template>
  <BigShot
    v-if="showSlideShow"
    :slide-data="slideData"
    :before-slide-change-hook="beforeSlideChangeHook"
    :plugins="plugins"
    @exited="() => showSlideShow = false"
  >
    <template #center-header="{currentSlide}">
      <h1>{{ currentSlide.data.src }}</h1>
    </template>
  </BigShot>
  <button @click="() => showSlideShow = true">
    Open Slide Show
  </button>
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
