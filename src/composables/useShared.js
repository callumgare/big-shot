import { ref, computed, watch } from 'vue'
import mitt from 'mitt'

export default function setup (props) {
  const currentSlideIndex = ref(props.slideData?.length > 0 ? 0 : null)
  const showLoadingIndicator = ref(false)

  const slidesMap = new WeakMap()

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

  watch(slides, (newSlides, oldSlides) => {
    // We can't use our computed currentSlide here because that would cause
    // it to re-compute using the new slides and we want to get whatever
    // value currentSlide before slides was changed
    const currentSlide = oldSlides?.[currentSlideIndex.value]
    const currentSlideNewIndex = slides.value.indexOf(currentSlide)

    if (currentSlideNewIndex >= 0 && currentSlideNewIndex !== currentSlideIndex.value) {
      currentSlideIndex.value = currentSlideNewIndex
    }
  })

  const currentSlide = computed(() => {
    return slides.value?.[currentSlideIndex.value] ?? null
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

  const emitter = mitt()

  return {
    showLoadingIndicator,
    currentSlideIndex,
    currentSlide,
    slides,
    numOfSlides,
    wrapIndex,
    emitter
  }
}