import { ref } from 'vue'

export default function setup (props, emitter) {
  const currentScalePreference = ref(undefined)

  /**
   * Toggle between the different zoom levels
   */
  function toggleScaleMode (slide) {
    const newScale = this.nextToggledScaleMode(slide)

    if (slide.scale === newScale) return
    slide.scale = newScale

    if (slide === this.currentSlide) {
      slide.elmClasses = [
        ...(slide.elmClasses || []),
        'animate-zoom'
      ]
      this.$forceUpdate() // forceUpdate needed because Vue 2 doesn't support WeakMap reactivity
      this.positionLoadedSlide(slide)
      currentScalePreference.value = newScale
      this.positionAllLoadedSlides()
    } else {
      this.positionLoadedSlide(slide)
    }
  }

  function nextToggledScaleMode (slide) {
    if (slide.biggerThanContainer || props.rememberScale === 'contain') {
      if (slide.scale === 'contain') {
        return 'natural'
      } else {
        return 'contain'
      }
    } else {
      return 'natural'
    }
  }

  function nextToggledScaleModeZoomDirection (slide) {
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
  }

  /**
   * Toggle between the different zoom levels
   */
  function getInitialScale (slide, ignoreRememberScale) {
    if (
      props.rememberScale &&
      !ignoreRememberScale && (
        props.rememberScale === currentScalePreference.value ||
        props.rememberScale === true
      )
    ) {
      return currentScalePreference.value
    }
    if (slide.biggerThanContainer) {
      return 'contain'
    }
    return 'natural'
  }

  emitter.on('slideMediaPositioningMetadataLoaded', saveMediaMetadata)

  /**
   * Extracts certain metadata from slide media
   */
  function saveMediaMetadata (slide) {
    slide.scale = getInitialScale(slide)
    emitter.emit('slideMediaScalingMetadataLoaded', slide)
    slide.mediaMetadataLoaded = true
    emitter.emit('slideMediaMetadataLoaded', slide)
  }

  return {
    toggleScaleMode,
    nextToggledScaleMode,
    nextToggledScaleModeZoomDirection,
    getInitialScale
  }
}
