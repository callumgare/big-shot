
export default function useSlidePositioning (user) {
  /**
  * Positions on the page the media of the current slide. This involves both
  * shifting and scaling the DOM element based on the dimensions of the media
  * and the current zoom level.
  */
  function positionLoadedSlide (slide) {
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

    // eslint-disable-next-line no-param-reassign
    slide.mediaElm.style.transform = transformFunctions.join(' ')

    // eslint-disable-next-line no-param-reassign
    slide.mediaElm.style.display = ''

    slide.mediaElm.classList.remove('zoom-in')
    slide.mediaElm.classList.remove('zoom-out')
    if (this.nextToggledScaleModeZoomDirection(slide)) {
      slide.mediaElm.classList.add('zoom-' + this.nextToggledScaleModeZoomDirection(slide))
    }
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
    getSlideDimensions,
    naturalSlideSizeBiggerThanContainer
  }
}
