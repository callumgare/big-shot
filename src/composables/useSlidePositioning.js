export default function setup (emitter, slidesNeedRerendering) {
  /**
  * Positions on the page the media of the current slide. This involves both
  * shifting and scaling the DOM element based on the dimensions of the media
  * and the current zoom level.
  */
  function positionLoadedSlide (slide) {
    // Trying to position the slide but we don't know how big it is. This function
    // will be called again when the media has finished loading so at which point
    // we should know the size so we can just return now and expect to be called 
    // later.
    try {
      getSlideDimensions (slide)
    } catch (error) {
      return
    }
    const transformFunctions = getPositionForLoadedSlide(slide)

    slide.elmStyle = {
      ...slide.elmStyle,
      ...{ transform: transformFunctions.join(' ') }
    }

    slidesNeedRerendering.value = true
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

      // We already have an event listener set up to position media
      // once loaded so we don't need to worry about that case here.
      if (slide.mediaMetadataLoaded) {
        positionLoadedSlide(slide)
      }
    }
  }

  function getPositionForLoadedSlide (slide) {
    const { container: containerSize, media: mediaSize } = getSlideDimensions(slide)
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
        height: slide.elm.parentElement.clientHeight,
        width: slide.elm.parentElement.clientWidth
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
    const { container: containerSize, media: mediaSize } = getSlideDimensions(slide)

    if (mediaSize.height < containerSize.height && mediaSize.width < containerSize.width) {
      return false
    }
    return true
  }

  emitter.on('slideMediaMetadataLoaded', (slide) => positionLoadedSlide(slide))

  emitter.on('slideMediaLoaded', saveMediaMetadata)

  /**
   * Extracts certain metadata from slide media
   */
  function saveMediaMetadata (slide) {
    slide.mediaHeight = slide.mediaElm.naturalHeight || slide.mediaElm.videoHeight
    slide.mediaWidth = slide.mediaElm.naturalWidth || slide.mediaElm.videoWidth
    slide.biggerThanContainer = naturalSlideSizeBiggerThanContainer(slide)
    emitter.emit('slideMediaPositioningMetadataLoaded', slide)
  }

  return {
    positionLoadedSlide,
    positionAllLoadedSlides,
    getSlideDimensions,
    naturalSlideSizeBiggerThanContainer
  }
}
