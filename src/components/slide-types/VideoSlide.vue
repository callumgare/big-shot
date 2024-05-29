<script setup lang="ts">
  import { onUnmounted, ref, watch } from 'vue';
  import { VideoPlayer } from '@videojs-player/vue'
  import { VideoJsPlayer } from "video.js";
  import 'video.js/dist/video-js.css'
  import 'videojs-errors';

  import { VideoSlide } from '../../types/slide';

  const props = defineProps<{
    slide: VideoSlide,
    active: boolean
  }>()

  const emit = defineEmits<{
    (e: 'playStarted'): void,
    (e: 'playFinished'): void,
    (e: 'videoMetadataLoaded', value: VideoJsPlayer): void,
  }>()

  const videoJS = ref()

  function mounted({video, player}: {video: HTMLVideoElement, player: typeof VideoPlayer}) {
    videoJS.value = player
    video.classList.add("swiper-zoom-target")
    player.errors()
  }

  function handleKeypress(event: KeyboardEvent) {
    if (!props.active || !videoJS.value) {
      return
    }
    if (event.code === "Space") {
      if (videoJS.value.paused()) {
        videoJS.value.play()
      } else {
        videoJS.value.pause()
      }
    }
  }

  document.addEventListener("keydown", handleKeypress)
  onUnmounted(() => document.removeEventListener('keydown', handleKeypress))

  watch(() => props.active, () => {
    if (props.active) {
      emit('playStarted')
    }
    if (videoJS.value) {
      if (props.active) {
        videoJS.value.play()
        if (videoJS.value.error()) {
          setTimeout(() => emit('playFinished'), 3000)
        }
      } else {
        videoJS.value.pause()
      }
    }
  })

  const videoJSOptions = {
    userActions: {
      click: false,
      doubleClick: false
    },
    crossorigin: "anonymous",
    playsinline: true,
    controls: true,
    sources: [
      {
        src: props.slide.src,
        ...(props.slide.mimeType ? {type: props.slide.mimeType} : {})
      }
    ],
    volume: 0.4,
    children: [
      'mediaLoader',
      'posterImage',
      'bigPlayButton',
      'loadingSpinner',
      'errorDisplay',
      'controlBar',
      'textTrackDisplay'
    ],
    controlBar: {
      volumePanel: false
    }
  }

  function emitOnError() {
    if (props.active){
      setTimeout(() => emit('playFinished'), 3000)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- PlayerEvent is used but because it's a type eslint doesn't pick it up
  type PlayerEvent = {target: {player: VideoJsPlayer}}
</script>

<template>
  <div class="swiper-zoom-container">
    <video-player
      v-bind="videoJSOptions"
      class="video-player vjs-theme-forest vjs-big-play-centered vjs-fluid"
      @loadeddata="(event: PlayerEvent) => emit('videoMetadataLoaded', event.target.player)"
      @mounted="mounted"
      @ended="emit('playFinished')"
      @error="emitOnError"
    />
  </div>
</template>

<style scoped lang="postcss">
  .video-player {
    padding: 0 !important;
    height: 100% !important;

    :deep(.vjs-tech) {
      top: 50%;
      left: 50%;
      max-height: 100%;
      max-width: 100%;
      translate: -50% -50%;
      height: unset;
      width: unset;
    }

    :deep(.vjs-control-bar) {
      background: transparent;
      opacity: 0.5;
      transition: background 0.3s, opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    }

    /* Disable button hover effect when hovering over whole video, just show when hovering over button */
    &:hover :deep(.vjs-big-play-button:not(:hover)) {
      border: 0.06666em solid #fff;
      background-color: #2B333F;
      background-color: rgba(43, 51, 63, 0.7);
      transition: all 0.4s;
    }

    :deep(.vjs-modal-dialog) {
      margin: 10rem;
      box-sizing: border-box;
      right: 0;
      width: unset;
      bottom: 0;
      height: unset;
    }
  }
</style>
