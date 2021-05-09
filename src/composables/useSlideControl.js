import { computed, onMounted, getCurrentInstance } from '@vue/composition-api'

export default function setup (props, slides, currentSlideIndex) {
  onMounted(() => {
    const self = getCurrentInstance()

    // Remove class used for triggering animation after animation has finished
    const loopIndicator = self.proxy.$el.querySelector('.loopIndicator')
    loopIndicator.addEventListener('transitionend', event => {
      if (event.propertyName !== 'opacity') return
      loopIndicator.classList.remove('animate')
    })
  })

  /**
  * Move to the next slide
  */
  function nextSlide () {
    return this.changeCurrentSlideBy(1)
  }

  /**
   * Go back to the previous slide
   */
  function previousSlide () {
    return this.changeCurrentSlideBy(-1)
  }

  /**
   * Move forwards or back by the given number of slides
   */
  async function changeCurrentSlideBy (delta) {
    let newIndexWithoutWrap = currentSlideIndex.value + delta

    const currentLoadedSlides = this.loadedSlides

    let loadingIndicatorTriggered = false
    const loadingIndicator = this.$el.querySelector('.loadingIndicator')

    const showLoadingIndicator = setTimeout(() => {
      loadingIndicator.classList.add('animate')
      loadingIndicatorTriggered = true
    }, 300)

    await props.beforeSlideChangeHook?.({
      currentIndex: currentSlideIndex.value,
      newIndex: this.wrapIndex(newIndexWithoutWrap),
      delta,
      length: this.numOfSlides
    })

    clearTimeout(showLoadingIndicator)
    if (loadingIndicatorTriggered) {
      loadingIndicator.classList.remove('animate')
    }

    newIndexWithoutWrap = currentSlideIndex.value + delta

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

    if (currentLoadedSlides === this.loadedSlides) {
      return this.changeCurrentSlideTo(
        this.wrapIndex(newIndexWithoutWrap),
        delta
      )
    } else {
      // beforeSlideChangeHook has changed what slides are loaded so wait for DOM to update
      return new Promise(
        resolve => this.$nextTick(
          () => resolve(
            this.changeCurrentSlideTo(
              this.wrapIndex(newIndexWithoutWrap),
              delta
            )
          )
        )
      )
    }
  }

  /**
   * Go to the given slide
   */
  function changeCurrentSlideTo (newCurrentSlideIndex, delta) {
    this.$emit('slideChanged', {
      newIndex: newCurrentSlideIndex,
      oldIndex: currentSlideIndex.value,
      delta: delta || newCurrentSlideIndex - currentSlideIndex.value
    })
    this.currentSlide.mediaElm?.pause?.()
    currentSlideIndex.value = newCurrentSlideIndex
    this.playVideo(this.currentSlide)
  }

  /**
   * Plays the video of a given slide if that slide has a video.
   */
  function playVideo (slide) {
    if (slide.mediaElm?.play) {
      slide.mediaElm.play()
      setTimeout(() => {
        if (slide.mediaElm.paused) {
          slide.elm.querySelector('.playButton').classList.add('show')
        }
      }, 50)
    }
  }

  /**
   * Prepares for close and emits close event.
   */
  function closeSlideShow () {
    window.location.hash = ''
    this.$emit('exited')
  }

  const currentSlide = computed(() => {
    return slides.value[currentSlideIndex.value]
  })

  return {
    nextSlide,
    previousSlide,
    changeCurrentSlideBy,
    changeCurrentSlideTo,
    playVideo,
    closeSlideShow,
    currentSlide
  }
}
