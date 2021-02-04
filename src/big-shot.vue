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
      :key="slide.index"
      :class="[
        'slide',
        {
          'current': slide.index === currentSlideIndex,
          'positioned': slide.positioned
        },
      ]"
      :ref="`slide`"
      :data-slide-index="slide.index"
    >
      <img
        v-if="slide.type === 'image'"
        :src="slide.data.src"
        class="media"
      />
      <template v-else-if="slide.type === 'video'">
        <video
          class="media"
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
import useSlidePositioning from './composables/useSlidePositioning'
import RepeatIcon from './assets/icons/repeat.svg'

export default {
  name: 'BigShot',
  props: ['slideData', 'rememberScale'],
  components: { RepeatIcon },
  setup (props) {
    const {
      positionLoadedSlide,
      getPositionForLoadedSlide,
      getSlideDimensions,
      naturalSlideSizeBiggerThanContainer
    } = useSlidePositioning()

    return {
      positionLoadedSlide,
      getPositionForLoadedSlide,
      getSlideDimensions,
      naturalSlideSizeBiggerThanContainer
    }
  },
  data () {
    return {
      currentSlideIndex: this.slideData?.length > 0 ? 0 : -1,
      scale: undefined,
      slidesMap: new WeakMap(),
      maxLoadedPreviousSlides: 2,
      maxLoadedNextSlides: 3
    }
  },
  created () {
    window.addEventListener('keydown', this.keyDownListener)
    window.addEventListener('resize', this.resizeWindowListener)
  },
  mounted () {
    // Remove class used for triggering animation after animation has finished
    const loopIndicator = this.$el.querySelector('.loopIndicator')
    loopIndicator.addEventListener('transitionend', event => {
      if (event.propertyName !== 'opacity') return
      loopIndicator.classList.remove('animate')
    })

    this.setupLoadedSlides()
  },
  updated () {
    this.$nextTick(this.setupLoadedSlides)
  },
  computed: {
    slides () {
      const slides = []
      for (const [index, data] of this.slideData.entries()) {
        if (!this.slidesMap.has(data)) {
          this.slidesMap.set(data, {
            data,
            type: data?.type || 'image',
            mediaHeight: undefined,
            mediaWidth: undefined,
            biggerThanContainer: undefined,
            scale: undefined
          })
        }
        const slide = this.slidesMap.get(data)
        slide.index = index
        slides.push(slide)
      }
      return slides
    },
    currentSlide () {
      return this.slides[this.currentSlideIndex]
    },
    /**
     * Get the subset of the slides which should be rendered to the DOM. For
     * performance reasons only the current slide and a few slides before
     * and after are ever rendered.
     */
    loadedSlides () {
      const numOfLoadedSlides = Math.min(
        this.numOfSlides,
        this.maxLoadedPreviousSlides + 1 + this.maxLoadedNextSlides
      )

      const loadedSlides = []

      for (let arrayIndex = 0; arrayIndex < numOfLoadedSlides; arrayIndex += 1) {
        const slideIndex = this.wrapIndex(
          arrayIndex + this.currentSlideIndex - this.maxLoadedPreviousSlides
        )
        loadedSlides.push(this.slides[slideIndex])
      }

      return loadedSlides
    },
    notLoadedSlides () {
      return this.slides
        .filter(
          slide => !this.loadedSlides.some(loadedSlide => loadedSlide === slide)
        )
    },
    numOfSlides () {
      return this.slideData?.length || 0
    }
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
     * Managers the DOM elements which make up the slide show. Attaches event
     * handlers and extracts the metadata from the loaded media, ensures it is
     * positioned correctly etc.
     */
    setupLoadedSlides () {
      for (const slide of this.loadedSlides) {
        if (slide.elm) {
          continue
        }
        slide.elm = this.$refs.slide.find(
          slideElm => slideElm.dataset.slideIndex === slide.index.toString()
        )
        if (!slide.elm) {
          throw new Error('Something went wrong. Can\'t access slide element.')
        }
        slide.mediaElm = slide.elm
          ? slide.elm.querySelector('.media')
          : null

        if (!slide.mediaElm) {
          throw new Error('Something went wrong. Can\'t access media element.')
        }

        const processLoadedMedia = () => {
          // Check that slide hasn't been unloaded in the mean time
          if (!slide.elm) {
            return
          }
          this.saveMediaMetadata(slide)
          this.positionLoadedSlide(slide, this.getInitialScale(slide))
        }
        if (slide.mediaHeight && slide.mediaWidth) {
          this.positionLoadedSlide(slide, this.getInitialScale(slide))
        } else if (slide.mediaElm.completed) {
          processLoadedMedia()
        } else {
          // Used by images
          slide.mediaElm.addEventListener('load', processLoadedMedia)
          // Used by videos
          slide.mediaElm.addEventListener('loadedmetadata', processLoadedMedia)
        }

        slide.mediaElm.addEventListener('click', (event) => {
          console.count('toggle size')
          console.log(event.target, event.timeStamp)
          this.toggleScaleMode(this.currentSlide)
        })
        slide.mediaElm.addEventListener('play', () => {
          slide.elm.querySelector('.playButton').classList.remove('show')
        })
        slide.mediaElm.addEventListener('pause', () => {
          slide.elm.querySelector('.playButton').classList.add('show')
        })
        // Remove class for smothing sizing change after animation has finished
        slide.mediaElm.addEventListener('transitionend', () => {
          slide.mediaElm.classList.remove('animateZoom')
        })
      };
    },
    /**
     * Positions the DOM media elements of each slide currently loaded into the
     * DOM.
     */
    positionAllLoadedSlides () {
      for (const slide of this.loadedSlides) {
        if (slide !== this.currentSlide) {
          slide.scale = this.getInitialScale(slide)
        }
        this.positionLoadedSlide(slide)
      }
    },
    /**
     * Plays the video of a given slide if that slide has a video.
     */
    playVideo (slide) {
      if (slide.mediaElm?.play) {
        slide.mediaElm.play()
        setTimeout(() => {
          if (slide.mediaElm.paused) {
            slide.elm.querySelector('.playButton').classList.add('show')
          }
        }, 50)
      }
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
     * Prepares for close and emits close event.
     */
    closeSlideShow () {
      window.location.hash = ''
      this.$emit('exited')
    },
    /**
     * Move to the next slide
     */
    nextSlide () {
      return this.changeCurrentSlideBy(1)
    },
    /**
     * Go back to the previous slide
     */
    previousSlide () {
      return this.changeCurrentSlideBy(-1)
    },
    /**
     * Move forwards or back by the given number of slides
     */
    changeCurrentSlideBy (delta) {
      const newIndexWithoutWrap = this.currentSlideIndex + delta

      // Trigger loop indicator if change means going between the start and end
      // slides
      if (
        newIndexWithoutWrap < 0 ||
        newIndexWithoutWrap > (this.numOfSlides - 1)
      ) {
        const loopIndicator = this.$el.querySelector('.loopIndicator')
        if (loopIndicator.classList.contains('animate')) {
          // This shouldn't normally happen but in cases where the user has
          // been flicking back and forth between the start and the end the
          // animate class name can become stuck so best to clear it and try
          // again in a tick.
          loopIndicator.classList.remove('animate')
          setTimeout(() => loopIndicator.classList.add('animate'), 50)
        } else {
          loopIndicator.classList.add('animate')
        }
      }

      return this.changeCurrentSlideTo(
        this.wrapIndex(newIndexWithoutWrap)
      )
    },
    /**
     * Go to the given slide
     */
    changeCurrentSlideTo (newCurrentSlideIndex) {
      this.currentSlide.mediaElm?.pause?.()
      this.currentSlideIndex = newCurrentSlideIndex
      this.playVideo(this.currentSlide)
    },
    /**
     * Toggle between the different zoom levels
     */
    toggleScaleMode (slide) {
      const newScale = this.nextToggledScaleMode(slide)

      if (slide.scale === newScale) return
      slide.scale = newScale

      if (slide === this.currentSlide) {
        slide.mediaElm.classList.add('animateZoom')
        this.positionLoadedSlide(slide)
        this.scale = newScale
        this.positionAllLoadedSlides()
      } else {
        this.positionLoadedSlide(slide)
      }
    },
    nextToggledScaleMode (slide) {
      if (slide.biggerThanContainer || this.rememberScale === 'contain') {
        if (slide.scale === 'contain') {
          return 'natural'
        } else {
          return 'contain'
        }
      } else {
        return 'natural'
      }
    },
    nextToggledScaleModeZoomDirection (slide) {
      if (slide.scale === this.nextToggledScaleMode(slide)) {
        return null
      }
      if (slide.scale === 'contain' && this.nextToggledScaleMode(slide) === 'natural') {
        if (slide.biggerThanContainer) {
          return 'in'
        } else {
          return 'out'
        }
      } else if (slide.scale === 'natural' && this.nextToggledScaleMode(slide) === 'contain') {
        if (slide.biggerThanContainer) {
          return 'out'
        } else {
          return 'in'
        }
      }
    },
    /**
     * Toggle between the different zoom levels
     */
    getInitialScale (slide, ignoreRememberScale) {
      if (this.rememberScale && !ignoreRememberScale && (this.rememberScale === this.scale || this.rememberScale === true)) {
        return this.scale
      }
      if (slide.biggerThanContainer) {
        return 'contain'
      }
      return 'natural'
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
    }
  },
  watch: {
    notLoadedSlides () {
      for (const slide of this.notLoadedSlides) {
        slide.elm = null
        slide.mediaElm = null
        slide.positioned = false
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

    .media {
      &.animateZoom {
        transition: transform 0.2s;
      }

      &.zoom-in {
        cursor: zoom-in;
      }

      &.zoom-out {
        cursor: zoom-out;
      }
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
