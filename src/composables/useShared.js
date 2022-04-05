import { ref, computed, watch, nextTick, reactive } from 'vue'
import mitt from 'mitt'

export default function setup (props) {
  const emitter = mitt()

  const currentSlideIndex = ref(props.slideData?.length > 0 ? 0 : null)
  const showLoadingIndicator = ref(false)

  watch(currentSlideIndex, () => {
    if (typeof currentSlideIndex.value === "number") {
      if (currentSlideIndex.value < 0) {
        console.warn(`currentSlideIndex ("${currentSlideIndex.value}") less than 0`)
      } else if (currentSlideIndex.value > numOfSlides.value) {
        console.warn(`currentSlideIndex ("${currentSlideIndex.value}") appears to be neither greater than the number of slides`)
      }
    } else if (currentSlideIndex.value !== null) {
      console.warn(`currentSlideIndex ("${currentSlideIndex.value}") appears to be neither a number of a null`)
    }
  })

  const userInteractHasOccurred = ref(false)

  function logUserInteractionHasOccurred(slide) {
    userInteractHasOccurred.value = true
    emitter.off('playRequested', logUserInteractionHasOccurred)
    nextTick(() => {
      emitter.emit('playRequested', slide)
    })
  }
  emitter.on('playRequested', logUserInteractionHasOccurred) 

  const slideDataToIndexMap = computed(() => {
    return new WeakMap(
      Array.from(props.slideData.entries())
        .map(([index, slideData]) => ([slideData, index]))
    )
  })

  const slidesMap = new WeakMap()

  function getSlide(slideIndex) {
    const data = props.slideData[slideIndex]
    if (!data) {
      return null
    }
    if (!slidesMap.has(data)) {
      const type = data?.type || 'image'
      slidesMap.set(data, {
        data,
        type,
        mediaLoadingStatus: type === "video" || type === "image" ? "not loaded" : null,
        mediaHeight: undefined,
        mediaWidth: undefined,
        biggerThanContainer: undefined,
        scale: undefined,
        id: slideDataToIndexMap.value.get(data) + Math.random(),
        positioning: reactive({
          scaleMode: undefined,
        }),
        elmStyleRef: ref(null),
        elmRef: ref(null),
        get elm() {
          return this.elmRef.value
        },
        mediaElmRef: ref(null),
        get mediaElm() {
          return this.mediaElmRef.value
        },
        get index() {
          return slideDataToIndexMap.value.get(data)
        }
      })
    }
    return slidesMap.get(data)
  }

  const currentSlide = computed(() => {
    return getSlide(currentSlideIndex.value)
  })

  const numOfSlides = computed(() => {
    return props.slideData?.length || 0
  })

  /**
   * For a given index value check if it's in bounds (i.e. equal to or between
   * the first and the last slide) and if not then wrap around so it is. For
   * example -1 will become the index of the last slide.
   */
  function wrapIndex (index) {
    return index >= 0
      ? index % numOfSlides.value
      : ((index % numOfSlides.value) + numOfSlides.value) % numOfSlides.value
  }

  return {
    showLoadingIndicator,
    currentSlideIndex,
    currentSlide,
    getSlide,
    numOfSlides,
    wrapIndex,
    userInteractHasOccurred,
    emitter
  }
}