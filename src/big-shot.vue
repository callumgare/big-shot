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
      :class="['slide', {'current': slide.index === currentSlideIndex}]"
      :ref="`slide-${slide.index}`"
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
      <span class="icon">⟳</span>
    </div>
    <div class="bottombar">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigShot',
  props: ['slideData', 'rememberScale'],
  data() {
    return {
      currentSlideIndex: this.slideData?.length > 0 ? 0 : -1,
      scale: undefined,
      slidesMap: new WeakMap(),
      maxLoadedPreviousSlides: 2,
      maxLoadedNextSlides: 3,
    };
  },
  created() {
    window.addEventListener('keydown', this.keyDownListener);
    window.addEventListener('resize', this.resizeWindowListener);
  },
  mounted() {
    // Remove class used for triggering animation after animation has finished
    const loopIndicator = this.$el.querySelector('.loopIndicator')
    loopIndicator.addEventListener('transitionend', event => {
      if(event.propertyName !== 'opacity') return;
      loopIndicator.classList.remove('animate')
    })

    this.$nextTick(this.setupLoadedSlides);
  },
  updated() {
    this.$nextTick(this.setupLoadedSlides);
  },
  computed: {
    slides() {
      const slides = []
      for (const [index, data] of this.slideData.entries()) {
        if (!this.slidesMap.has(data)) {
          this.slidesMap.set(data, {
            data,
            type: data?.type || 'image'
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
    loadedSlides() {
      const numOfLoadedSlides = Math.min(
        this.numOfSlides,
        this.maxLoadedPreviousSlides + 1 + this.maxLoadedNextSlides,
      );

      const loadedSlides = [];

      for (let arrayIndex = 0; arrayIndex < numOfLoadedSlides; arrayIndex += 1) {
        const slideIndex = this.wrapIndex(
          arrayIndex + this.currentSlideIndex - this.maxLoadedPreviousSlides,
        );
        loadedSlides.push(this.slides[slideIndex]);
      }

      return loadedSlides;
    },
    numOfSlides() {
      return this.slideData?.length || 0;
    },
  },
  methods: {
    /** 
     * For a given index value check if it's in bounds (i.e. equal to or between
     * the first and the last slide) and if not then wrap around so it is. For 
     * example -1 will become the index of the last slide.
     */
    wrapIndex(index) {
      return index >= 0
        ? index % this.numOfSlides
        : ((index % this.numOfSlides) + this.numOfSlides) % this.numOfSlides;
    },
    /**
     * Managers the DOM elements which make up the slide show. Attaches event
     * handlers and extracts the metadata from the loaded media, ensures it is
     * positioned correctly etc.
     */
    setupLoadedSlides() {
      for (const slide of this.slides) {
        if (slide.elm) continue;
        slide.elm = this.$refs[`slide-${slide.index}`]?.[0] || null
        slide.mediaElm = slide.elm
          ? slide.elm.querySelector('.media')
          : null

        slide.mediaElm.addEventListener('click', () => {
          this.toggleScaleMode(this.currentSlide);
        });
        slide.mediaElm.addEventListener('play', () => {
          slide.elm.querySelector('.playButton').classList.remove('show')
        });
        slide.mediaElm.addEventListener('pause', () => {
          slide.elm.querySelector('.playButton').classList.add('show')
        });
        // Remove class for smothing sizing change after animation has finished
        slide.mediaElm.addEventListener('transitionend', () => {
          slide.mediaElm.classList.remove('animateZoom')
        })
        const processLoadedMedia = () => {
          this.saveMediaMetadata(slide);
          this.positionLoadedSlide(slide, this.getInitialScale(slide));
        }
        if (slide.mediaElm.completed) {
          processLoadedMedia()
        } else {
          // Used by images
          slide.mediaElm.addEventListener('load', processLoadedMedia);
          // Used by videos
          slide.mediaElm.addEventListener('loadedmetadata', processLoadedMedia);
        }
      };
    },
    /** 
     * Positions on the page the media of the current slide. This involves both
     * shifting and scaling the DOM element based on the dimentions of the media
     * and the current zoom level.
     */
    positionLoadedSlide(slide) {
      const {container: containerSize, media: mediaSize} = this.getSlideDimensions(slide)
      const translateHeight = (containerSize.height / 2) - (mediaSize.height / 2);
      const translateWidth = (containerSize.width / 2) - (mediaSize.width / 2);
      const scaleWidth = containerSize.width / mediaSize.width;
      const scaleHeight = containerSize.height / mediaSize.height;
      const scale = Math.min(scaleWidth, scaleHeight);
      const transformFunctions = [];
      
      // Scale first to natural size
      transformFunctions.push(`translate(${translateWidth}px, ${translateHeight}px)`);

      if (slide.scale === "contain") {
        // Then scale to contain size if necessary
        transformFunctions.push(`scale(${scale})`);
      }

      // eslint-disable-next-line no-param-reassign
      slide.mediaElm.style.transform = transformFunctions.join(' ');

      // eslint-disable-next-line no-param-reassign
      slide.mediaElm.style.display = '';
    },
    /** 
     * Positions the DOM media elements of each slide currently loaded into the
     * DOM.
     */
    positionAllLoadedSlides() {
      for (const slide of this.slides) {
        if (slide !== this.currentSlide) {
          slide.scale = this.getInitialScale(slide)
        }
        this.positionLoadedSlide(slide)
      }
    },
    /**
     * Plays the video of a given slide if that slide has a video.
     */
    playVideo(slide) {
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
    saveMediaMetadata(slide) {
      slide.mediaHeight = slide.mediaElm.naturalHeight || slide.mediaElm.videoHeight;
      slide.mediaWidth = slide.mediaElm.naturalWidth || slide.mediaElm.videoWidth;
      slide.biggerThanContainer = this.naturalSlideSizeBiggerThanContainer(slide)
      slide.scale = this.getInitialScale(slide)
    },
    /** 
     * Prepares for close and emits close event.
     */
    closeSlideShow() {
      window.location.hash = '';
      this.$emit('exited');
    },
    /** 
     * Move to the next slide
     */
    nextSlide() {
      return this.changeCurrentSlideBy(1)
    },
    /** 
     * Go back to the previous slide
     */
    previousSlide() {
      return this.changeCurrentSlideBy(-1)
    },
    /** 
     * Move forwards or back by the given number of slides
     */
    changeCurrentSlideBy(delta) {
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
      );
    },
    /** 
     * Go to the given slide
     */
    changeCurrentSlideTo(newCurrentSlideIndex) {
      this.currentSlide.mediaElm?.pause?.()
      this.currentSlideIndex = newCurrentSlideIndex;
      this.playVideo(this.currentSlide)
    },
    /** 
     * Toggle between the different zoom levels
     */
    toggleScaleMode(slide) {
      let newScale
      if (slide.biggerThanContainer || this.rememberScale === "contain") {
        if (slide.scale === "contain") {
          newScale = "natural"
        } else {
          newScale = "contain";
        }
      } else {
        newScale = "natural";
      }

      if (slide.scale === newScale) return;
      slide.scale = newScale

      if (slide === this.currentSlide) {
          slide.mediaElm.classList.add('animateZoom')
          this.positionLoadedSlide(slide)
          this.scale = newScale
          this.positionAllLoadedSlides();
      } else {
          this.positionLoadedSlide(slide)
      }
    },
    /** 
     * Toggle between the different zoom levels
     */
    getInitialScale(slide, ignoreRememberScale) {
      if (this.rememberScale && !ignoreRememberScale && (this.rememberScale === this.scale || this.rememberScale === true)) {
        return this.scale
      }
      if (slide.biggerThanContainer) {
        return "contain";
      }
      return "natural";
    },
    /** 
     * Check if the slide media would be larger than the slide container if the
     * media were rendered at it's normal size. Returns true if larger, false if
     * not, or null if sizes can not be deduced.
     */
    naturalSlideSizeBiggerThanContainer(slide) {
      const {container: containerSize, media: mediaSize} = this.getSlideDimensions(slide)

      if (mediaSize.height < containerSize.height && mediaSize.width < containerSize.width) {
        return false;
      }
      return true;
    },
    getSlideDimensions(slide) {
      const dimensions = {
        container: {
          height: this.$el.clientHeight,
          width: this.$el.clientWidth,
        },
        media: {
          height: slide.data.height || slide.mediaHeight,
          width: slide.data.width || slide.mediaWidth
        }
      }
      if (!dimensions.container.height) {
        throw new Error('Could not get container height')
      }
      if (!dimensions.container.width) {
        throw new Error('Could not get container width')
      }
      if (!dimensions.media.height) {
        throw new Error('Could not get media height')
      }
      if (!dimensions.media.width) {
        throw new Error('Could not get media width')
      }
      return dimensions
    },
    /** 
     * Handler for a key down event.
     */
    keyDownListener(event) {
      if (event.key === 'ArrowLeft') {
        this.previousSlide();
      } else if (event.key === 'ArrowRight') {
        this.nextSlide();
      } else if (event.key === 'Escape') {
        this.closeSlideShow();
      }
    },
    /** 
     * Handler for window resize
     */
    resizeWindowListener() {
      // Current zoom level may no longer be valid so try re-applying
      // this.setZoomLevel(this.zoomLevel);
      for (const slide of this.loadedSlides) {
        const newBiggerThanContainer = this.naturalSlideSizeBiggerThanContainer(slide)
        if (slide.biggerThanContainer !== newBiggerThanContainer) {
          slide.biggerThanContainer = newBiggerThanContainer
          slide.scale = this.getInitialScale(slide, true)
        }
      }
      this.positionLoadedSlide(this.currentSlide);
      this.positionAllLoadedSlides();
    },
  },
};
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
    }

    &:not(.current) {
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
    border-radius: 20px;
    line-height: 100px;
    text-align: center;
    opacity: 1;
    visibility: hidden;

    span {
      display: inline-block;
    }

    &.animate {
      visibility: visible;
      transform: scale(1.5);
      opacity: 0;
      transition: transform 1s, opacity 2s 1s;
    }
  }
}
</style>
