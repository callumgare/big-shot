import { ref, computed, onMounted, getCurrentInstance, nextTick } from 'vue'

const maxLoadedPreviousSlides = 2
const maxLoadedNextSlides = 3

export default function setup (props, emitter) {
  const thisProxy = getCurrentInstance().proxy
  onMounted(() => {
    setupLoadedSlides()
  })

  const numOfSlides = computed(() => {
    return props.slideData?.length || 0
  })

  const slidesMap = new WeakMap()

  /**
   * Managers the DOM elements which make up the slide show. Attaches event
   * handlers and extracts the metadata from the loaded media, ensures it is
   * positioned correctly etc.
   */
  function setupLoadedSlides () {
    for (const slide of thisProxy.loadedSlides) {
      if (!slide.elm) {
        slide.elm = thisProxy.$refs[`slide-${slide.id}`]
        if (!slide.elm) {
          throw new Error('Something went wrong. Can\'t access slide element.')
        }
        slide.mediaElm = slide.elm
          ? slide.elm.querySelector('.media')
          : null
  
        if (!slide.mediaElm) {
          throw new Error('Something went wrong. Can\'t access media element.')
        }
  
        thisProxy.executeOnceMediaDimensionsKnown(slide, () => {
          thisProxy.positionLoadedSlide(slide, thisProxy.getInitialScale(slide))
        })
  
        slide.mediaElm.addEventListener('click', () => {
          thisProxy.toggleScaleMode(thisProxy.currentSlide)
        })
        slide.mediaElm.addEventListener('play', () => {
          slide.elm.querySelector('.play-button').classList.remove('show')
        })
        slide.mediaElm.addEventListener('pause', () => {
          slide.elm.querySelector('.play-button').classList.add('show')
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
      if (slide.index === thisProxy.currentSlideIndex) {
        emitter.emit('newSlideLoaded', slide)
      }
    }
  }

  const slides = computed(() => {
    const slides = []
    for (const [index, data] of props.slideData.entries()) {
      if (!slidesMap.has(data)) {
        slidesMap.set(data, {
          data,
          type: data?.type || 'image',
          mediaHeight: undefined,
          mediaWidth: undefined,
          biggerThanContainer: undefined,
          scale: undefined,
          id: index + Math.random()
        })
      }
      const slide = slidesMap.get(data)
      slide.index = index
      slides.push(slide)
    }
    return slides
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
      const slideIndex = thisProxy.wrapIndex(
        arrayIndex + thisProxy.currentSlideIndex - maxLoadedPreviousSlides
      )
      loadedSlides.push(slides.value[slideIndex])
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

  return {
    currentSlideIndex: ref(props.slideData?.length > 0 ? 0 : -1),
    slides,
    loadedSlides,
    notLoadedSlides,
    numOfSlides,
    setupLoadedSlides
  }
}
