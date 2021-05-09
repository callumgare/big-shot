<template>
  <div ref="container" class="container">
    <div class="topbar">
      <div>
        {{currentSlideIndex + 1}} / {{numOfSlides}}
      </div>
      <div>
        <button class="closeButton" @click="closeSlideShow">X</button>
      </div>
    </div>
    <div
      v-for="slide in loadedSlides"
      :key="slide.id"
      :class="[
        'slide',
        {
          'current': slide.index === currentSlideIndex,
          'positioned': slide.elmStyle && slide.elmStyle.transform
        },
        nextToggledScaleModeZoomDirection(slide) && `zoom-${nextToggledScaleModeZoomDirection(slide)}`,
        slide.elmClasses
      ]"
      :ref="`slide`"
      :data-slide-index="slide.index"
    >
      <img
        v-if="slide.type === 'image'"
        :src="slide.data.src"
        class="media"
        :style="slide.elmStyle"
      />
      <template v-else-if="slide.type === 'video'">
        <video
          class="media"
          :style="slide.elmStyle"
          playsinline
        >
          <source :src="slide.data.src" />
        </video>
        <button class="playButton" @click="() => playVideo(slide)">
          <span>▶</span>
        </button>
      </template>
    </div>
    <div class="loopIndicator">
      <RepeatIcon class="icon" />
    </div>
    <div class="bottombar">
    </div>
  </div>
</template>

<script>
import useLoadSlides from './composables/useLoadSlides'
import useSlideControl from './composables/useSlideControl'
import useSlidePositioning from './composables/useSlidePositioning'
import useSlideScaling from './composables/useSlideScaling'
import useGestures from './composables/useGestures'
import RepeatIcon from './assets/icons/repeat.svg'

export default {
  name: 'BigShot',
  props: ['slideData', 'rememberScale'],
  components: { RepeatIcon },
  setup (props) {
    useGestures()

    const {
      slides,
      currentSlideIndex,
      ...loadSlidesProps
    } = useLoadSlides(props)

    return {
      slides,
      currentSlideIndex,
      ...loadSlidesProps,
      ...useSlideControl(slides, currentSlideIndex),
      ...useSlidePositioning(),
      ...useSlideScaling()
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
     * Extracts certain metadata from slide media
     */
    saveMediaMetadata (slide) {
      slide.mediaHeight = slide.mediaElm.naturalHeight || slide.mediaElm.videoHeight
      slide.mediaWidth = slide.mediaElm.naturalWidth || slide.mediaElm.videoWidth
      slide.biggerThanContainer = this.naturalSlideSizeBiggerThanContainer(slide)
      slide.scale = this.getInitialScale(slide)
      this.$forceUpdate() // forceUpdate needed because Vue 2 doesn't support WeakMap reactivity
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
    executeOnceMediaDimensionsKnown (slide, callback) {
      const processLoadedMedia = () => {
        // Check that slide hasn't been unloaded in the mean time
        if (!slide.elm || !document.body.contains(slide.elm)) {
          return
        }
        this.saveMediaMetadata(slide)
        callback && callback(slide)
      }
      if (slide.mediaHeight && slide.mediaWidth) {
        callback && callback(slide)
      } else if (slide.mediaElm.naturalHeight || slide.mediaElm.readyState >= 1) {
        processLoadedMedia()
      } else {
        // Used by images
        slide.mediaElm.addEventListener('load', processLoadedMedia)
        // Used by videos
        slide.mediaElm.addEventListener('loadedmetadata', processLoadedMedia)
      }
    }
  },
  watch: {
    notLoadedSlides () {
      for (const slide of this.notLoadedSlides) {
        slide.elm = null
        slide.mediaElm = null
        slide.elmStyle = null
        slide.elmClasses = null
      }
    }
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
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    height: 44px;
    width: 100%;
    opacity: 0.75;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;

    div {
      padding: 20px;
    }

    button {
      color: white;
      background: none;
      border: none;
    }
  }

  .slide {
    height: 100%;
    width: 100%;
    overflow: hidden;

    .playButton {
      left: 0;
      right: 0;
      margin: auto;
      top: 0;
      bottom: 0;
      height: 80px;
      width: 80px;
      position: absolute;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      font-size: 40px;
      color: #000;
      border-radius: 40px;
      visibility: hidden;
      transform: scale(0.5);
      opacity: 0;

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
        opacity: 1;
        transition: transform 0.2s, opacity 0.2s;
      }
    }

    &.animateZoom .media {
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

  .loopIndicator {
    left: 0;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    height: 100px;
    width: 100px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    font-size: 70px;
    color: #fff;
    line-height: 100px;
    text-align: center;
    visibility: hidden;
    transform: scale(0.3);
    pointer-events: none;
    opacity: 0.8;

    .icon {
      vertical-align: -0.2em;

      &::v-deep path {
        fill: #fff;
      }
    }

    &.animate {
      visibility: visible;
      transform: scale(1);
      opacity: 0;
      transition: transform 1s, opacity 4s 1s, visibility 0s 0.2s;
    }
  }

  .icon {
    display: inline-block;
    height: 1em;
    width: 1em;
  }
}
</style>
