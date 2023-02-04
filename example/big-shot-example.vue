<script>
import BigShot from '../src/big-shot.vue'

export default {
  name: 'BigShotExample',
  components: {
    BigShot,
  },
  props: {},
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
    }
  }
}
</script>

<template>
  <BigShot
    v-if="showSlideShow"
    :slide-data="slideData"
  >
    <template #center-header="{currentSlide}">
      <h1>{{ currentSlide.src }}</h1>
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

  /* disable scrolling on iOS */
  html {
    position: fixed;
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;
  }
  body {
    height: 100%;
    width: 100%;
  }
</style>
