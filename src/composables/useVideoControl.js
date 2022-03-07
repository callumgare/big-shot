export default function setup (emitter) {
  /**
   * Plays the video of a given slide if that slide has a video.
   */
  function playVideo (slide) {
    if (slide.mediaElm?.play) {
      try {
        slide.mediaElm.play()
      } catch (error) {
        // We couldn't play (auto play might be blocked by the browser) so
        // show the play button immediately
        slide.elm.querySelector('.play-button').classList.add('show')
      }
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
  emitter.on('playRequested', playVideo)

  return {
    playVideo
  }
}