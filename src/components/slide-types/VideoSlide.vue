<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import { VideoSlide } from '../../types/slide';
  import Hls from 'hls.js'

  const props = defineProps<{
    slide: VideoSlide,
    active: boolean
  }>()

  const emit = defineEmits<{
    (e: 'playStarted'): void,
    (e: 'playFinished'): void,
  }>()

  const videoRef = ref<HTMLVideoElement | null>(null)
  const hlsRef = ref<Hls | null>(null)

  function handleKeypress(event: KeyboardEvent) {
    if (!props.active || !videoRef.value) {
      return
    }
    if (event.code === "Space") {
      if (videoRef.value.paused) {
        videoRef.value.play()
      } else {
        videoRef.value.pause()
      }
    }
  }
  onUnmounted(() => document.removeEventListener('keydown', handleKeypress))

  function setupOrTearDownVideo() {
    const videoElm = videoRef.value
    if (!videoElm) {
      console.error("Video element not mounted yet")
      return
    }
    // For some reason firefox seems to really struggle when there's a bunch of videos loading.
    // It doesn't prioritise the playing video and even if you say preload="none" it will still
    // sometimes load a video. To avoid this we set the video src when the slide becomes active
    // and remove it when it stops being active.
    if (props.active) {
      document.addEventListener("keydown", handleKeypress)
      const src = props.slide.src
      if (new URL(src.toLowerCase(), 'https://domain').pathname.endsWith('.m3u8')) {
        if (videoElm.canPlayType('application/vnd.apple.mpegurl')) {
          videoElm.src = src
        }
        else if (Hls.isSupported()) {
          const hls = new Hls()
          hlsRef.value = hls
          hls.loadSource(src)
          hls.attachMedia(videoElm)
        }
        else {
          throw Error('Browser can\'t play HLS')
        }
      } else {
        videoElm.src = props.slide.src
      }
      emit('playStarted')
      videoElm.play()
    } else {
      document.removeEventListener('keydown', handleKeypress)
      videoElm.pause()
      videoElm.src = ""
    }
  }

  onMounted(setupOrTearDownVideo)
  watch(() => props.active, setupOrTearDownVideo)

  function emitOnError() {
    if (props.active){
      setTimeout(() => emit('playFinished'), 1000)
    }
  }
</script>

<template>
  <div class="swiper-zoom-container">
    <video
      ref="videoRef"
      controls
      :poster="props.slide.posterSrc"
      preload="metadata"
      playsinline="true"
      class="swiper-zoom-target"
      @ended="emit('playFinished')"
      @error="emitOnError"
    />
  </div>
</template>

<style scoped lang="postcss">
  .video-player {
    padding: 0 !important;
    height: 100% !important;

    & video {
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>
