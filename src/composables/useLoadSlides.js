import { ref, computed, onMounted, getCurrentInstance, nextTick, watch } from 'vue'

const maxLoadedPreviousSlides = 2
const maxLoadedNextSlides = 3

export default function setup (props, {emitter, currentSlideIndex, currentSlide, slides, numOfSlides, showLoadingIndicator}) {
  const thisProxy = getCurrentInstance().proxy
  onMounted(() => {
    setupLoadedSlides()
  })

  emitter.on('slideMediaFailedToLoad', (error) => {
    error.slide.mediaLoadingFailed = true
  })

  emitter.on('newSlideLoaded', (slide) => {
    if (showLoadingIndicator.value) {
      showLoadingIndicator.value = false
    }
    setTimeout(() => {
      if (
        currentSlideIndex.value === slide.index &&
        !slide.mediaMetadataLoaded &&
        !slide.mediaLoadingFailed
      ) {
        emitter.on('slideMediaMetadataLoaded', removeLoadingIndicator)
        emitter.on('slideMediaFailedToLoad', removeLoadingIndicator)
        console.log('new slide hasnt loaded or failed yet so setting loading indicator')
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
  })

  const previousCurrentSlideId = ref(null)

  /**
   * Managers the DOM elements which make up the slide show. Attaches event
   * handlers and extracts the metadata from the loaded media, ensures it is
   * positioned correctly etc.
   */
  function setupLoadedSlides () {
    for (const slide of loadedSlides.value) {
      if (!slide.elm) {
        slide.elm = thisProxy.$refs[`slide-${slide.id}`]
        if (!slide.elm) {
          throw new Error('Something went wrong. Can\'t access slide element.')
        }

        if (slide.type === 'video-first-interaction') {
          slide.elm.querySelector('.play-button').classList.add('show')
          continue
        }

        slide.mediaElm = slide.elm
          ? slide.elm.querySelector('.media')
          : null
  
        if (!slide.mediaElm) {
          throw new Error('Something went wrong. Can\'t access media element.')
        }

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

      if (previousCurrentSlideId.value !== slides.value[currentSlideIndex.value]?.id) {
        if (slide.index === currentSlideIndex.value) {
          emitter.emit('newSlideLoaded', slide)
        }
      }
    }
    previousCurrentSlideId.value = slides.value[currentSlideIndex.value]?.id
  }

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

  const userInteractHasOccurred = ref(false)

  function logUserInteractionHasOccurred() {
    userInteractHasOccurred.value = true
    emitter.off('playRequested', logUserInteractionHasOccurred) 
    nextTick( // first we need to wait for the new slide elements to be rendered
      () => nextTick( // then we need to wait for the setup slides function to register the element
        // Finally our slide object is now different so we need to get the new slide object
        () => emitter.emit('playRequested', slides.value[currentSlideIndex.value])
      )
    )
  }
  emitter.on('playRequested', logUserInteractionHasOccurred) 


  const slidesNeedRerendering = ref(false)
  emitter.on('slidesRerenderRequested', () => slidesNeedRerendering.value = true)
  /**
   * Get the subset of the slides which should be rendered to the DOM. For
   * performance reasons only the current slide and a few slides before
   * and after are ever rendered.
   */
  const loadedSlides = computed(function () {
    // Use slidesNeedRerendering so that loadedSlides is recomputed on change
    // which triggers a rerender
    slidesNeedRerendering.value = !slidesNeedRerendering.value && false

    if (currentSlideIndex.value === null) {
      if (slides.value.length > 0) {
        currentSlideIndex.value = 0
      } else {
        return []
      }
    } else {
      if (slides.value.length > 0) {
        if (currentSlideIndex.value < 0) {
          currentSlideIndex.value = 0
        } else if (currentSlideIndex.value >= slides.value.length) {
          currentSlideIndex.value = slides.value.length - 1
        }
      } else {
        thisProxy.currentSlideIndex = null
        return []
      }
    }
  
    const numOfLoadedSlides = Math.min(
      numOfSlides.value,
      maxLoadedPreviousSlides + 1 + maxLoadedNextSlides
    )

    const loadedSlides = []

    for (let arrayIndex = 0; arrayIndex < numOfLoadedSlides; arrayIndex += 1) {
      const slideIndex = thisProxy.wrapIndex(
        arrayIndex + currentSlideIndex.value - maxLoadedPreviousSlides
      )
      const slide = slides.value[slideIndex]
      if (!userInteractHasOccurred.value && slide?.type === 'video') {
        loadedSlides.push({
          ...slide,
          id: slide.id + '-stub',
          elmStyle: {transform: true},
          type: 'video-first-interaction'
        })
      } else {
        loadedSlides.push(slide)
      }
    }

    // Wait till after render and refs assigned
    nextTick(() => setupLoadedSlides())

    return loadedSlides
  })

  const notLoadedSlides = computed(() => {
    return slides.value
      .filter(
        slide => !loadedSlides.value.some(loadedSlide => loadedSlide === slide)
      )
  })

  watch(notLoadedSlides, (notLoadedSlides) => {
    for (const slide of notLoadedSlides) {
      if (slide.mediaElm) {
        if (slide.mediaElm.src) {
          slide.mediaElm.src = ""
        }
        const sourceElms = Array.from(slide.mediaElm.children).filter(tag => tag.tagName === "SOURCE")
        if (sourceElms.length) {
          sourceElms.forEach(sourceElm => slide.mediaElm.removeChild(sourceElm))
        }
      }
    }
  })

  return {
    currentSlideIndex,
    slides,
    loadedSlides,
    notLoadedSlides,
    numOfSlides,
  }
}
