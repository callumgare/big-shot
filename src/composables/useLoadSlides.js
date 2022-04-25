import { computed, onMounted, getCurrentInstance, nextTick, watch } from 'vue'
import { isIosDevice } from '../utils/browser'

const maxLoadedPreviousSlides = 2
const maxLoadedNextSlides = 3

export default function setup (props, {
  emitter,
  currentSlideIndex,
  currentSlide,
  getSlide,
  numOfSlides,
  showLoadingIndicator,
  userInteractHasOccurred,
  wrapIndex,
  slideData
}) {
  const thisProxy = getCurrentInstance().proxy
  onMounted(() => {
    setupLoadedSlides()
  })

  emitter.on('slideMediaFailedToLoad', (error) => {
    error.slide.mediaLoadingStatus = "failed"
  })

  /**
   * Get the subset of the slides which should be rendered to the DOM. For
   * performance reasons only the current slide and a few slides before
   * and after are ever rendered.
   */
  const loadedSlides = computed(function () {
    const numOfLoadedSlides = Math.min(
      numOfSlides.value,
      maxLoadedPreviousSlides + 1 + maxLoadedNextSlides
    )

    const loadedSlides = []

    for (let arrayIndex = 0; arrayIndex < numOfLoadedSlides; arrayIndex += 1) {
      const slideIndex = wrapIndex(
        arrayIndex + currentSlideIndex.value - maxLoadedPreviousSlides
      )
      const slide = getSlide(slideIndex)

      loadedSlides.push(slide)
    }

    return loadedSlides
  })

  watch(loadedSlides, () => nextTick(setupLoadedSlides))

  /**
   * Managers the DOM elements which make up the slide show. Attaches event
   * handlers and extracts the metadata from the loaded media, ensures it is
   * positioned correctly etc.
   */
  function setupLoadedSlides () {
    for (const slide of loadedSlides.value) {
      setupLoadedSlide (slide)
    }
  }

  function setupLoadedSlide (slide) {
      if (!slide.elm) {
        console.warn(`Slide ${slide.index} is in loadedSlides but does not have an elm ref`, slide, slide.elm)
      return
      }

      if (slide.mediaLoadingStatus) {
        // iOS seems more likely to autoplay videos if no videos are loaded until after the first
        // user interaction
        if (slide.type === "video" && !userInteractHasOccurred.value && isIosDevice()) {
          slide.mediaLoadingStatus = "delayed till play"
        } else {
          if (!slide.mediaElm && slide.mediaLoadingStatus !== "failed") {
            console.error(`Slide ${slide.index} is a media slide but does not have a media elm ref`)
            return
          }
          if (slide.mediaLoadingStatus === "not loaded") {
            slide.mediaLoadingStatus = "loading"
            setupSlideMedia(slide)
          }
        }
      }
    }

  emitter.on('retryLoadingMedia', async (slide) => {
    console.log('attempting to reload', slide.index, slide.isCurrent)
    slide.mediaLoadingStatus = "not loaded"
    // Wait for DOM to re-render
    await nextTick()
    setupLoadedSlide(slide)
    if (slide.isCurrent) {
      emitter.emit('currentSlideChanged', slide)
    }
  })

  function setupSlideMedia(slide) {
    emitEventsWhenMediaLoaded(slide)
    showWarningIfMediaLoadingVerySlow(slide)

    slide.mediaElm.addEventListener('click', () => {
      thisProxy.toggleScaleMode(currentSlide.value)
    })
    slide.mediaElm.addEventListener('play', () => {
      slide.elm?.querySelector('.play-button').classList.remove('show')
    })
    slide.mediaElm.addEventListener('pause', () => {
      slide.elm?.querySelector('.play-button').classList.add('show')
    })
    // Remove class for smoothing sizing change after animation has finished
    slide.mediaElm.addEventListener('transitionend', () => {
      if (slide.elmClasses) {
        slide.elmClasses = slide.elmClasses
          .filter(classText => classText !== 'animate-zoom')

        thisProxy.$forceUpdate() // forceUpdate needed because Vue 2 doesn't support WeakMap reactivity
      }
    })
  }

  const currentSlideId = computed(() => {
    return currentSlide.value?.id
  })

  watch(currentSlideId, () => {
    // wait till new slide has rendered before emitting new slide event
    nextTick(() => {
      // current slide could be null if we have no slides
      if (currentSlide.value) {
        currentSlide.value.events.emit('isCurrent')
        emitter.emit('currentSlideChanged', currentSlide.value)
      }
    })
  })

  function whenMediaStoppedLoading (slide, handler) {
    if (slide.mediaLoadingStatus === "loaded" || slide.mediaLoadingStatus === "failed") {
      handler()
    } else {
      slide.events.on('mediaLoaded', handler)
      slide.events.on('mediaFailedToLoad', handler)
    }
  }

  function emitEventsWhenMediaLoaded (slide) {
    function sendEvent(triggeringEvent) {
      removeEventListeners()

      slide.mediaLoadingStatus = "loaded"

      if ((triggeringEvent instanceof ErrorEvent) || (triggeringEvent?.type === "error")) {
        triggeringEvent.slide = slide
        console.error(`An error occured loading ${slide.index}`, triggeringEvent)
        slide.events.emit('mediaFailedToLoad', triggeringEvent)
        emitter.emit('slideMediaFailedToLoad', triggeringEvent)
      } else {
        slide.events.emit('mediaLoaded')
        emitter.emit('slideMediaLoaded', slide)
      }
    }

    function manuallyCheckIfLoaded() {
      if (slide.mediaElm.naturalHeight || slide.mediaElm.readyState >= 1) {
        sendEvent()
      }
    }

    slide.events.on('beforeSlideUnload', removeEventListeners)

    function removeEventListeners() {
      clearInterval(intervalId)
      slide.mediaElm?.removeEventListener('load', sendEvent)
      slide.mediaElm?.removeEventListener('loadedmetadata', sendEvent)
      slide.mediaElm?.removeEventListener('error', sendEvent)
      for (const sourceElm of slide.mediaElm?.querySelectorAll('source') || []) {
        sourceElm.removeEventListener('error', sendEvent)
      }
    }

    const intervalId = setInterval(manuallyCheckIfLoaded, 100);
    // Used by images, however for things like gifs this will only fire after the whole
    // gif has been loaded not, on first render so manuallyCheckIfLoaded() will likely be quicker.
    slide.mediaElm.addEventListener('load', sendEvent)
    // Used by videos
    slide.mediaElm.addEventListener('loadedmetadata', sendEvent)
    for (const sourceElm of slide.mediaElm.querySelectorAll('source')) {
      sourceElm.addEventListener('error', sendEvent)
    }
    // Used by both
    slide.mediaElm.addEventListener('error', sendEvent)
    manuallyCheckIfLoaded();
  }

  function setLoadingTimeout(slide, handler, timeoutTime) {
    const timeoutId = setTimeout(handler, timeoutTime);

    whenMediaStoppedLoading(slide, () => clearTimeout(timeoutId))
    slide.events.on('beforeSlideUnload', () => clearTimeout(timeoutId))
  }


  // Show loading indicator if slide media hasn't loaded after a certain amount of time
  emitter.on('currentSlideChanged', slide => {
    setLoadingTimeout(slide, () => {
      if (slide.isCurrent) {
        showLoadingIndicator.value = true
      }
    }, 300)

    whenMediaStoppedLoading(slide, () => {
      if (slide.isCurrent) {
        showLoadingIndicator.value = false
      }
    })
  })

  function showWarningIfMediaLoadingVerySlow(slide) {
    setLoadingTimeout(slide, () => {
      console.warn("Media has taken longer than 10 seconds to load. Index:", slide.index)
      showWarningIfMediaLoadingVerySlow(slide)
    }, 10 * 1000)
  }


  watch(numOfSlides, () => {
    if (numOfSlides.value > 0 && currentSlideIndex.value === null) {
      // What has likely happened:
      // Previously we had no slides, now we do
      currentSlideIndex.value = 0
    } else if (numOfSlides.value > 0 && currentSlideIndex.value >= numOfSlides.value) {
      // What has likely happened:
      // The number of slides has been reduced but we still have some
       currentSlideIndex.value = numOfSlides.value - 1
    } else if (numOfSlides.value === 0 && currentSlideIndex.value !== null) {
      // What has likely happened:
      // We use to have some slides but now we have none
      currentSlideIndex.value = null
    }
  })


  watch(slideData, (newSlidesData, oldSlidesData) => {
    // We can't use our computed currentSlide here because that would cause
    // it to re-compute using the new slides and we want to get whatever
    // value currentSlide before slides was changed
    const currentSlideData = oldSlidesData?.[currentSlideIndex.value]
    const currentSlideNewIndex = newSlidesData.indexOf(currentSlideData)

    // If slide that's currently showing exists in the new set of slides but has a
    // different index then set the current slide index to this new index so that
    // we still show the same slide.
    if (currentSlideNewIndex >= 0 && currentSlideNewIndex !== currentSlideIndex.value) {
      currentSlideIndex.value = currentSlideNewIndex
    }
  })

  watch(userInteractHasOccurred, () => {
    for (const slide of loadedSlides.value) {
      if (slide.mediaLoadingStatus === 'delayed till play') {
        slide.mediaLoadingStatus = 'not loaded'
      }
    }
    nextTick(() => {
      // We need to wait till next tick to make sure new mediaElms have been rendered
      setupLoadedSlides()
      emitter.emit('playRequested', currentSlide.value)
    })
  })

  watch(loadedSlides, (newLoadedSlides, oldLoadedSlides) => {
    const unloadedSlides = oldLoadedSlides
      .filter(oldSlide => !newLoadedSlides.includes(oldSlide))

    for (const slide of unloadedSlides) {
      slide.events.emit('beforeSlideUnload')
      emitter.emit('beforeSlideUnload', slide)
      if (slide.mediaElm) {
        if (slide.mediaElm.src) {
          slide.mediaElm.src = ""
        }
        const sourceElms = Array.from(slide.mediaElm.children).filter(tag => tag.tagName === "SOURCE")
        if (sourceElms.length) {
          sourceElms.forEach(sourceElm => slide.mediaElm.removeChild(sourceElm))
        }
      }
      slide.elmClasses = null
      slide.mediaLoadingStatus = "not loaded"
      nextTick(() => {
        slide.events.emit('slideUnloaded')
        slide.events.off('*')
  })
    }
  })

  return {
    currentSlideIndex,
    loadedSlides,
    numOfSlides,
  }
}
