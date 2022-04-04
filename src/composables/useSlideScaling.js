import { ref } from 'vue'

export default function setup (props, {emitter}) {
  const currentScalePreference = ref(undefined)

  /**
   * Toggle between the different zoom levels
   */
  function toggleScaleMode (slide) {
    const currentScale = slide.positioning.scaleMode
    const newScale = this.nextToggledScaleMode(slide)

    if (currentScale === newScale) return
    slide.positioning.scaleMode = newScale

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
      if (slide.positioning.scaleMode === 'contain') {
        return 'natural'
      } else {
        return 'contain'
      }
    } else {
      return 'natural'
    }
  }

  function nextToggledScaleModeZoomDirection (slide) {
    const scaleMode = slide.positioning.scaleMode
    if (scaleMode === this.nextToggledScaleMode(slide)) {
      return null
    }
    if (scaleMode === 'contain' && this.nextToggledScaleMode(slide) === 'natural') {
      if (slide.biggerThanContainer) {
        return 'in'
      } else {
        return 'out'
      }
    } else if (scaleMode === 'natural' && this.nextToggledScaleMode(slide) === 'contain') {
      if (slide.biggerThanContainer) {
        return 'out'
      } else {
        return 'in'
      }
    } else {
      console.warn('Unknown scale mode', slide, scaleMode, this.nextToggledScaleMode(slide) )
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
    slide.positioning.scaleMode = getInitialScale(slide)
    emitter.emit('slideMediaScalingMetadataLoaded', slide)
    slide.mediaLoadingStatus = "loaded"
    emitter.emit('slideMediaMetadataLoaded', slide)
  }

  return {
    toggleScaleMode,
    nextToggledScaleMode,
    nextToggledScaleModeZoomDirection,
    getInitialScale
  }
}
