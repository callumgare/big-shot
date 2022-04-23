export default function setup (props, {
  emitter,
  currentSlide,
  showLoadingIndicator,
  userInteractHasOccurred
}) {
  /**
   * Plays the video of a given slide if that slide has a video.
   */
  function playVideo (slide) {
    // Don't do any thing if not a video slide
    if (slide.type !== "video" || slide.mediaLoadingStatus === "delayed till play") {
      return
    }

    if (!userInteractHasOccurred.value) {
      slide.elm.querySelector('.play-button').classList.add('show')
      return
    }

    if (!slide.mediaElm?.play) {
      console.warn('Attempted to play but slide has no media elm', slide)
      return
    }

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

  /**
   * Pause the video of a given slide if that slide has a video.
   */
  function pauseVideo (slide) {
    slide.mediaElm?.pause?.()
  }

  function setupPlayButton(slide) {
    // Don't do any thing if not a video slide
    if (slide.type !== "video" || !userInteractHasOccurred.value) {
      return
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
  }

  emitter.on('currentSlideChanged', (newCurrentSlide) => {
    playVideo(newCurrentSlide)
    setupPlayButton(newCurrentSlide)
  })
  emitter.on('unloadSlide', pauseVideo)
  emitter.on('playRequested', playVideo)

  return {}
}
