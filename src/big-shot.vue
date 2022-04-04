<template>
  <div
    ref="container"
    class="container"
  >
    <div class="topbar">
      <div class="left-side">
        <div v-if="currentSlideIndex !== null">
          {{ currentSlideIndex + 1 }} / {{ numOfSlides }}
        </div>
        <div v-else>
          No slides
        </div>
      </div>
      <div class="center">
        <component
          :is="plugin.topbarCenterContent"
          v-for="plugin in plugins?.filter(plugin => plugin.topbarIcon)"
          :key="plugin.name"
          v-bind="plugin.topbarCenterContentProps"
          :current-slide="currentSlide"
        />
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
          <img
            v-if="plugin.topbarIcon && typeof plugin.topbarIcon === 'string'"
            :src="plugin.topbarIcon"
            class="icon"
          >
          <component
            :is="plugin.topbarIcon"
            v-else
            class="icon"
          />
        </div>
      </div>
    </div>
    <template
      v-for="slide in loadedSlides"
      :key="slide.id"
    >
      <slide-item
        :slide="slide"
        :current-slide-index="currentSlideIndex"
        :toggled-scale-mode-zoom-direction="slide.positioning.scaleMode && nextToggledScaleModeZoomDirection(slide)"
        :user-interact-has-occurred="userInteractHasOccurred"
        :emitter="emitter"
      />
    </template>
    <div class="slide-status-indicator">
      <div class="container loop-indicator">
        <RepeatIcon class="icon" />
      </div>
      <div
        v-if="showLoadingIndicator"
        class="container loading-indicator"
      >
        <SpinnerIcon class="icon" />
      </div>
    </div>
    <div class="bottom-bar" />
  </div>
</template>

<script>
import useShared from './composables/useShared'
import useLoadSlides from './composables/useLoadSlides'
import useSlideControl from './composables/useSlideControl'
import useSlidePositioning from './composables/useSlidePositioning'
import useSlideScaling from './composables/useSlideScaling'
import useGestures from './composables/useGestures'
import useVideoControl from './composables/useVideoControl'
import RepeatIcon from './assets/icons/repeat.svg'
import SpinnerIcon from './assets/icons/spinner.svg'
import SlideItem from './components/slide-item.vue'

export default {
  name: 'BigShot',
  components: { RepeatIcon, SpinnerIcon, SlideItem },
  props: {
    slideData: {
      type: Array,
      default: () => []
    },
    rememberScale: {
      type: String,
      default: "",
    },
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
    useGestures()

    const shared = useShared(props)

    return {
      SpinnerIcon,
      ...shared,
      ...useLoadSlides(props, shared),
      ...useSlideControl(props, shared),
      ...useSlidePositioning(props, shared),
      ...useSlideScaling(props, shared),
      ...useVideoControl(props, shared),
      log: console.log
    }
  },
  watch: {
    notLoadedSlides: {
      handler() {
        for (const slide of this.notLoadedSlides) {
          slide.elmRef.value = null
          slide.mediaElmRef.value = null
          slide.elmStyleRef.value = null
          slide.elmClasses = null
          slide.mediaLoadingStatus = "not loaded"
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
        // To work out the proper scale mode we need to know the media dimensions which
        // we might not know until the media has loaded. Since the scale mode is also
        // set when loaded we don't need to worry about doing it now.
        try {
          this.naturalSlideSizeBiggerThanContainer(slide)
        } catch (error) {
          continue
        }
        const newBiggerThanContainer = this.naturalSlideSizeBiggerThanContainer(slide)
        if (slide.biggerThanContainer !== newBiggerThanContainer) {
          slide.biggerThanContainer = newBiggerThanContainer
          slide.positioning.scaleMode = this.getInitialScale(slide, true)
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

    .center {
      align-self: flex-start;
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
        visibility: unset;
        transform: unset;
        border-radius: 50%;

        .icon {
          width: 70%;
          height: 70%;
        }

        animation: entrance-animation 1s linear;

        @keyframes entrance-animation {
          0% {
            transform: scale(0.3);
            opacity: 0%;
          }

          50% {
            opacity: 80%;
          }

          100% {
            transform: scale(1);
          }
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
