<script setup>
  defineProps({
    slide: {
      type: Object,
      default: () => ({})
    },
    currentSlideIndex: {
      type: Number,
      default: () => 0
    },
    toggledScaleModeZoomDirection: {
      type: String,
      default: () => ""
    },
    userInteractHasOccurred: {
      type: Boolean,
      default: () => false
    },
    emitter: {
      type: Object,
      default: () => ({})
    },
  })
</script>

<template>
  <div
    :ref="slide.elmRef"
    :class="[
      'slide',
      {
        'current': slide.index === currentSlideIndex,
        'has-media': slide.mediaLoadingStatus && slide.mediaLoadingStatus !== 'failed' && slide.mediaLoadingStatus !== 'delayed till play',
        'positioned': (slide.elmStyleRef.value && slide.elmStyleRef.value.transform)
      },
      toggledScaleModeZoomDirection && `zoom-${toggledScaleModeZoomDirection}`,
      slide.elmClasses
    ]"
    :data-slide-index="slide.index"
  >
    <div
      v-if="slide.mediaLoadingStatus === 'failed'"
      class="media media-status"
    >
      <span>Failed to load media</span>
    </div>
    <img
      v-else-if="slide.type === 'image'"
      :ref="slide.mediaElmRef"
      :src="slide.data.src"
      class="media"
      :style="slide.elmStyleRef.value"
      loading="eager"
    >
    <template v-else-if="slide.type === 'video' && slide.mediaLoadingStatus === 'delayed till play'">
      <button
        class="play-button show"
        @click="emitter.emit('playRequested', slide)"
      >
        <span>▶</span>
      </button>
    </template>
    <template v-else-if="slide.type === 'video'">
      <video
        :ref="slide.mediaElmRef"
        class="media"
        :style="slide.elmStyleRef.value"
        playsinline
        :preload="slide.index >= currentSlideIndex ? 'auto' : 'metadata'"
      >
        <source
          :src="slide.data.src"
          :type="slide.data.mimeType"
        >
      </video>
      <button
        class="play-button"
        @click="emitter.emit('playRequested', slide)"
      >
        <span>▶</span>
      </button>
    </template>
    <template v-else>
      <div
        class="media media-status"
      >
        <span>Can't load media type {{ slide.type }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .slide {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .play-button {
      left: 0;
      right: 0;
      margin: auto;
      padding: 0;
      top: 0;
      bottom: 0;
      height: 80px;
      width: 80px;
      position: absolute;
      background-color: rgb(255 255 255 / 100%);
      border: none;
      font-size: 40px;
      color: #000;
      border-radius: 40px;
      visibility: hidden;
      transform: scale(0.5);
      opacity: 0%;
      box-sizing: unset;

      span {
        transform: translateY(-3px) translateX(3px);
        display: inline-block;
        transition: transform 0.3s;
      }

      &:hover span {
        transform: translateY(-3px) translateX(10px);
      }

      &.show {
        visibility: visible;
        transform: scale(1);
        opacity: 100%;
        transition: transform 0.2s, opacity 0.2s;
      }
    }
    
    .media {
      will-change: transform; 
    }

    .media-status {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3em;
      font-weight: bold;
      color: #d7a039;
    }

    &.animate-zoom .media {
      transition: transform 0.2s;
    }

    &.zoom-in .media {
      cursor: zoom-in;
    }

    &.zoom-out .media {
      cursor: zoom-out;
    }

    &:not(.current),
    &.has-media:not(.positioned) {
      display: none;
    }
  }
</style>