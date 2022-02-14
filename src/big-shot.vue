<template>
  <div
    ref="container"
    class="container"
  >
    <div class="topbar">
      <div>
        {{ currentSlideIndex + 1 }} / {{ numOfSlides }}
      </div>
      <div class="right-side">
        <button
          class="close-button"
          @click="closeSlideShow"
        >
          X
        </button>
        <div 
          v-for="plugin in plugins?.filter(plugin => plugin.topbarIcon)"
          :key="plugin.name"
          class="plugin"
        >
          <component
            :is="plugin.topbarIcon"
            class="icon"
          />
        </div>
      </div>
    </div>
    <div
      v-for="slide in loadedSlides"
      :key="slide.id"
      :ref="`slide-${slide.id}`"
      :class="[
        'slide',
        {
          'current': slide.index === currentSlideIndex,
          'positioned': slide.elmStyle && slide.elmStyle.transform
        },
        nextToggledScaleModeZoomDirection(slide) && `zoom-${nextToggledScaleModeZoomDirection(slide)}`,
        slide.elmClasses
      ]"
      :data-slide-index="slide.index"
    >
      <img
        v-if="slide.type === 'image'"
        :src="slide.data.src"
        class="media"
        :style="slide.elmStyle"
      >
      <template v-else-if="slide.type === 'video'">
        <video
          class="media"
          :style="slide.elmStyle"
          playsinline
        >
          <source :src="slide.data.src">
        </video>
        <button
          class="play-button"
          @click="() => playVideo(slide)"
        >
          <span>▶</span>
        </button>
      </template>
    </div>
    <div class="slide-status-indicator">
      <div class="container loop-indicator">
        <RepeatIcon class="icon" />
      </div>
      <div class="container loading-indicator">
        <SpinnerIcon class="icon" />
      </div>
    </div>
    <div class="bottom-bar" />
  </div>
</template>

<script>
import {ref} from "vue"
import mitt from 'mitt'
import useLoadSlides from './composables/useLoadSlides'
import useSlideControl from './composables/useSlideControl'
import useSlidePositioning from './composables/useSlidePositioning'
import useSlideScaling from './composables/useSlideScaling'
import useGestures from './composables/useGestures'
import useVideoControl from './composables/useVideoControl'
import RepeatIcon from './assets/icons/repeat.svg'
import SpinnerIcon from './assets/icons/spinner.svg'

export default {
  name: 'BigShot',
  components: { RepeatIcon, SpinnerIcon },
  props: {
    slideData: {
      type: Array,
      default: () => []
    },
    rememberScale: String,
    beforeSlideChangeHook: {
      type: Function,
      default: () => () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    },
  },
  setup (props) {
    const emitter = mitt()
    useGestures()

    const slidesNeedRerendering = ref(false)

    const {
      slides,
      currentSlideIndex,
      ...loadSlidesProps
    } = useLoadSlides(props, emitter, slidesNeedRerendering)

    return {
      SpinnerIcon,
      slides,
      currentSlideIndex,
      ...loadSlidesProps,
      ...useSlideControl(props, slides, currentSlideIndex, emitter),
      ...useSlidePositioning(emitter, slidesNeedRerendering),
      ...useSlideScaling(props, emitter),
      ...useVideoControl(emitter)
    }
  },
  watch: {
    notLoadedSlides: {
      handler() {
        for (const slide of this.notLoadedSlides) {
          slide.elm = null
          slide.mediaElm = null
          slide.elmStyle = null
          slide.elmClasses = null
        }
      },
      deep: true
    }
  },
  created () {
    window.addEventListener('keydown', this.keyDownListener)
    window.addEventListener('resize', this.resizeWindowListener)
    window.addEventListener('orientationchange', this.resizeWindowListener)
  },
  methods: {
    /**
     * For a given index value check if it's in bounds (i.e. equal to or between
     * the first and the last slide) and if not then wrap around so it is. For
     * example -1 will become the index of the last slide.
     */
    wrapIndex (index) {
      return index >= 0
        ? index % this.numOfSlides
        : ((index % this.numOfSlides) + this.numOfSlides) % this.numOfSlides
    },

    /**
     * Handler for a key down event.
     */
    keyDownListener (event) {
      if (event.key === 'ArrowLeft') {
        this.previousSlide()
      } else if (event.key === 'ArrowRight') {
        this.nextSlide()
      } else if (event.key === 'Escape') {
        this.closeSlideShow()
      }
    },
    /**
     * Handler for window resize
     */
    resizeWindowListener () {
      // Current zoom level may no longer be valid so try re-applying
      // this.setZoomLevel(this.zoomLevel);
      for (const slide of this.loadedSlides) {
        const newBiggerThanContainer = this.naturalSlideSizeBiggerThanContainer(slide)
        if (slide.biggerThanContainer !== newBiggerThanContainer) {
          slide.biggerThanContainer = newBiggerThanContainer
          slide.scale = this.getInitialScale(slide, true)
        }
      }
      this.positionLoadedSlide(this.currentSlide)
      this.positionAllLoadedSlides()
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  color: white;
  overflow: hidden;
  text-align: initial;
  font-family: sans-serif;
  z-index: 10;

  .topbar {
    background-color: rgb(0 0 0 / 30%);
    position: absolute;
    left: 0;
    top: 0;
    height: 44px;
    width: 100%;
    opacity: 75%;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    padding: 2px 20px;
    box-sizing: border-box;

    > * {
      flex: 0 1 auto;
      flex-direction: row-reverse;
    }

    button {
      color: white;
      background: none;
      border: none;
    }

    .plugin {
      .icon {
        height: 100%;
        max-width: 3em; // we need to set a max-width cos flexbox is wack
        // https://github.com/philipwalton/flexbugs/issues/184
        padding: 10px;
        box-sizing: border-box;
      }
    }

    .right-side {
      display: flex;
      height: 100%;

      > * {
        flex: 0 1 auto;

        svg {
          width: fit-content;
        }
      }
    }
  }

  .slide {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .play-button {
      left: 0;
      right: 0;
      margin: auto;
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
    &:not(.positioned) {
      display: none;
    }
  }

  .slide-status-indicator {
    .container {
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      height: 100px;
      width: 100px;
      position: absolute;
      background-color: rgb(0 0 0 / 60%);
      border: none;
      font-size: 70px;
      color: #fff;
      line-height: 100px;
      text-align: center;
      visibility: hidden;
      transform: scale(0.3);
      pointer-events: none;
      opacity: 80%;

      .icon {
        display: inline-block;
        height: 1em;
        width: 1em;
      }

      &.loading-indicator {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 70%;
          height: 70%;
        }

        &.animate {
          visibility: visible;
          transform: scale(1);
          transition: transform 1s, opacity 4s 1s, visibility 0s 0.2s;
        }
      }

      &.loop-indicator {
        .icon {
          vertical-align: -0.2em;

          &:deep(path) {
            fill: #fff !important;
          }
        }

        &.animate {
          visibility: visible;
          transform: scale(1);
          opacity: 0%;
          transition: transform 1s, opacity 4s 1s, visibility 0s 0.2s;
        }
      }
    }
  }
}
</style>
