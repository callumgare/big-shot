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
  wrapIndex
}) {
  const thisProxy = getCurrentInstance().proxy
  onMounted(() => {
    setupLoadedSlides()
  })

  emitter.on('slideMediaFailedToLoad', (error) => {
    error.slide.mediaLoadingStatus = "failed"
  })

  emitter.on('newSlideLoaded', (slide) => {
    if (slide.mediaLoadingStatus === "loading") {
      showLoadingIndicatorIfStuck(slide)
    }
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
      if (!slide.elm) {
        console.warn(`Slide ${slide.index} is in loadedSlides but does not have an elm ref`, slide, slide.elm)
        continue
      }

      if (slide.mediaLoadingStatus) {
        // iOS seems more likely to autoplay videos if no videos are loaded until after the first
        // user interaction
        if (slide.type === "video" && !userInteractHasOccurred.value && isIosDevice()) {
          slide.mediaLoadingStatus = "delayed till play"
        } else {
          if (!slide.mediaElm) {
            console.error(`Slide ${slide.index} is a media slide but does not have a media elm ref`)
            continue
          }
          if (slide.mediaLoadingStatus === "not loaded") {
            slide.mediaLoadingStatus = "loading"
            setupSlideMedia(slide)
          }
        }

      }
    }
  }

  function setupSlideMedia(slide) {
    emitEventWhenLoaded(slide)

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
      emitter.emit('newSlideLoaded', currentSlide.value)
    })
  })

  function emitEventWhenLoaded (slide) {
    const sendEvent = (error) => {
      // Check that slide hasn't been unloaded in the mean time
      if (!slide.elm || !document.body.contains(slide.elm)) {
        return
      }
      if (error) {
        error.slide = slide
        emitter.emit('slideMediaFailedToLoad', error)
      } else {
        emitter.emit('slideMediaLoaded', slide)
      }
    }
    if (slide.mediaElm.naturalHeight || slide.mediaElm.readyState >= 1) {
      sendEvent()
    } else {
      // Used by images
      slide.mediaElm.addEventListener('load', () => sendEvent())
      // Used by videos
      slide.mediaElm.addEventListener('loadedmetadata', () => sendEvent())
      // Used by both
      slide.mediaElm.addEventListener('error', (error) => sendEvent(error))
    }
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


  watch(() => props.slideData, (newSlidesData, oldSlidesData) => {
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
      showLoadingIndicatorIfStuck(currentSlide.value)
      emitter.emit('playRequested', currentSlide.value)
    })
  })

  watch(loadedSlides, (newLoadedSlides, oldLoadedSlides) => {
    const unloadedSlides = oldLoadedSlides
      .filter(oldSlide => !newLoadedSlides.includes(oldSlide))

    for (const slide of unloadedSlides) {
      if (slide.mediaElm) {
        if (slide.mediaElm.src) {
          slide.mediaElm.src = ""
        }
        const sourceElms = Array.from(slide.mediaElm.children).filter(tag => tag.tagName === "SOURCE")
        if (sourceElms.length) {
          sourceElms.forEach(sourceElm => slide.mediaElm.removeChild(sourceElm))
        }
      }
      if (slide.elmRef) {
        slide.elmRef.value = null
        slide.mediaElmRef.value = null
        slide.elmStyleRef.value = null
      }
      slide.elmClasses = null
      slide.mediaLoadingStatus = "not loaded"
    }
  })

  function showLoadingIndicatorIfStuck(slide) {
    if (showLoadingIndicator.value) {
      showLoadingIndicator.value = false
    }

    if (slide.mediaLoadingStatus) {
      setTimeout(() => {
        if (
          currentSlideIndex.value === slide.index &&
          slide.mediaLoadingStatus !== "loaded"
        ) {
          emitter.on('slideMediaMetadataLoaded', removeLoadingIndicator)
          emitter.on('slideMediaFailedToLoad', removeLoadingIndicator)
          console.warn('new slide hasnt loaded or failed yet so setting loading indicator')
          showLoadingIndicator.value = true
        }
  
        function removeLoadingIndicator (changedSlide) {
          if (
            currentSlideIndex.value === slide.index &&
            changedSlide.id === slide.id
          ) {
            showLoadingIndicator.value = false
            emitter.off('slideMediaMetadataLoaded', removeLoadingIndicator)
            emitter.off('slideMediaFailedToLoad', removeLoadingIndicator)
          }
        }
      }, 300)
    }
  }

  return {
    currentSlideIndex,
    loadedSlides,
    numOfSlides,
  }
}
