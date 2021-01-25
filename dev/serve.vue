<script>
import Vue from 'vue';
import BigShot from '@/big-shot.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    BigShot
  },
  data() {
    return {
      slideData: [
        {src: 'media/factory.jpg'},
        {src: 'media/sunset.jpg'},
        {src: 'media/santa.mp4', type: 'video'},
        {src: 'media/tree.jpg'},
        {src: 'media/tunnels.jpg'},
      ],
      showSlideShow: true,
    }
  }
});
</script>

<template>
  <div id="app">
    <big-shot v-if="showSlideShow" :slideData="slideData" @exited="() => showSlideShow = false" rememberScale="contain" />
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