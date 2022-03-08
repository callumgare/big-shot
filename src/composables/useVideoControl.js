export default function setup (props, {emitter, currentSlide, showLoadingIndicator}) {
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

      let waiting = false

      slide.mediaElm.addEventListener('playing', () => {
        waiting = false
        if (slide.id === currentSlide.value?.id) {
          if (showLoadingIndicator.value) {
            showLoadingIndicator.value = false
          }
        }
      });

      slide.mediaElm.addEventListener('pause', () => {
        waiting = false
        if (slide.id === currentSlide.value?.id) {
          if (showLoadingIndicator.value) {
            showLoadingIndicator.value = false
          }
        }
      });

      slide.mediaElm.addEventListener('waiting', () => {
        waiting = true
        setTimeout(() => {
          if (waiting && slide.id === currentSlide.value?.id) {
            showLoadingIndicator.value = true
          }
        }, 1000)
      });
  
      setTimeout(() => {
        if (slide.mediaElm.paused) {
          slide.elm.querySelector('.play-button').classList.add('show')
        }
      }, 50)
    } else {
      console.warn('Attempted to play but slide has no media elm', slide)
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