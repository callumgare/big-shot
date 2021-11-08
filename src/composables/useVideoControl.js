export default function setup (emitter) {
  /**
   * Plays the video of a given slide if that slide has a video.
   */
  function playVideo (slide) {
    if (slide.mediaElm?.play) {
      slide.mediaElm.play()
      setTimeout(() => {
        if (slide.mediaElm.paused) {
          slide.elm.querySelector('.play-button').classList.add('show')
        }
      }, 50)
    }
  }

  /**
   * Pause the video of a given slide if that slide has a video.
   */
  function pauseVideo (slide) {
    slide.mediaElm?.pause?.()
  }

  emitter.on('newSlideLoaded', playVideo)
  emitter.on('unloadSlide', pauseVideo)

  return {
    playVideo
  }
}