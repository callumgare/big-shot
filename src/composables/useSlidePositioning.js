export default function setup () {
  /**
  * Positions on the page the media of the current slide. This involves both
  * shifting and scaling the DOM element based on the dimensions of the media
  * and the current zoom level.
  */
  function positionLoadedSlide (slide) {
    const transformFunctions = this.getPositionForLoadedSlide(slide)

    slide.elmStyle = {
      ...slide.elmStyle,
      ...{ transform: transformFunctions.join(' ') }
    }

    this.$forceUpdate() // forceUpdate needed because Vue 2 doesn't support WeakMap reactivity
  }

  /**
   * Positions the DOM media elements of each slide currently loaded into the
   * DOM.
   */
  function positionAllLoadedSlides () {
    for (const slide of this.loadedSlides) {
      if (slide !== this.currentSlide) {
        slide.scale = this.getInitialScale(slide)
      }
      this.executeOnceMediaDimensionsKnown(slide, () => this.positionLoadedSlide(slide))
    }
  }

  function getPositionForLoadedSlide (slide) {
    const { container: containerSize, media: mediaSize } = this.getSlideDimensions(slide)
    const translateHeight = (containerSize.height / 2) - (mediaSize.height / 2)
    const translateWidth = (containerSize.width / 2) - (mediaSize.width / 2)
    const scaleWidth = containerSize.width / mediaSize.width
    const scaleHeight = containerSize.height / mediaSize.height
    const scale = Math.min(scaleWidth, scaleHeight)
    const transformFunctions = []

    // Scale first to natural size
    transformFunctions.push(`translate(${translateWidth}px, ${translateHeight}px)`)

    if (slide.scale === 'contain') {
      // Then scale to contain size if necessary
      transformFunctions.push(`scale(${scale})`)
    }

    return transformFunctions
  }

  function getSlideDimensions (slide) {
    const dimensions = {
      container: {
        height: this.$el.clientHeight,
        width: this.$el.clientWidth
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
      console.warn(slide)
      throw new Error('Could not get media height')
    }
    if (!dimensions.media.width) {
      throw new Error('Could not get media width')
    }
    return dimensions
  }

  /**
   * Check if the slide media would be larger than the slide container if the
   * media were rendered at it's normal size. Returns true if larger, false if
   * not, or null if sizes can not be deduced.
   */
  function naturalSlideSizeBiggerThanContainer (slide) {
    const { container: containerSize, media: mediaSize } = this.getSlideDimensions(slide)

    if (mediaSize.height < containerSize.height && mediaSize.width < containerSize.width) {
      return false
    }
    return true
  }

  return {
    positionLoadedSlide,
    positionAllLoadedSlides,
    getPositionForLoadedSlide,
    getSlideDimensions,
    naturalSlideSizeBiggerThanContainer
  }
}
