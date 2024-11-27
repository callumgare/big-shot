# Big Shot
_A Vue-based image/video slide show widget._

Big Shot is a image and video full screen slide show component for Vue 3 (version 0.2.8 and below are compatible with Vue 2).  It’s basically a loving rip-off of [PhotoSwipe](https://photoswipe.com/) but based on [Swiper](https://swiperjs.com/). That said it’s not aiming to replicate PhotoSwipe exactly. It will probably never have quite as many features or customisations as PhotoSwipe, at the same time it does things that PhotoSwipe doesn’t like natively support video.

## 🎪 Demo
**Check out the [live demo](https://callumgare.github.io/big-shot/example-using-umd.html).**

## ⚠️ Software Quality and Features
**Big Shot is very much in alpha.** No assurances are given, there are no tests yet and there could potentially be breaking changes in the future. So don’t use big shot in a situation when stability is very important.

### Things It Does
- Supports image and video
- Minimal and elegant UI
- Next/previous slide mobile swipe gesture

### Things It Does Not Do (Yet?)
- Captions/displaying other metadata 
- Events for slide changes
- HTML slides
- Rotation
- Next/previous slide buttons

I plan to slowly but continually improve Big Shot however I wouldn't rely on that. Unless you’re happy with how Big Shot functions at the moment I would recommend one of the other PhotoSwipe Vue implementations such as:
- [vue-picture-swipe](https://www.npmjs.com/package/vue-picture-swipe) (whose readme also includes a good summary of other PhotoSwipe implementations for Vue).
- [vue-pswipe](https://www.npmjs.com/package/vue-pswipe)

Pull requests are encouraged if you would like to contribute. Although for new features, unless you're happy to try your luck please create an issue before you write any code because I would like to build out Big Shot's feature set in a conscious and thoughtful way.

## 🚀 Getting Started
If the above hasn't scared you away give it a shot!

```bash
npm install big-shot
```
In your component script:
```javascript
import Vue from 'vue'
import BigShot from 'big-shot'
import 'big-shot/css'

export default Vue.extend({
  name: 'MyComponent',
  components: { BigShot },
  data () {
    return {
      slideData: [
        { src: 'media/factory.jpg' },
        { src: 'media/sunset.jpg' },
        { src: 'media/santa.mp4', type: 'video' },
        { src: 'media/tree.jpg' },
        { src: 'media/tunnels.jpg' }
      ],
    }
  }
})
```

In your template add:
```html
<big-shot
  :slideData="slideData"
/>
```

## 🎛 API
The props:
* **slideData**\
An array of objects, one for each slide you want to include. Currently the two property supported are:
  * **src**\
  The url to the media you want to include.
  * **posterSrc**\
  (optional) If slide is type "video" then posterSrc allows to set the video's poster image.
  * **type**\
  The type of media to display. Currently the two supported values are "image" (default) and "video".

* **beforeSlideChangeHook**\
As implied by the name this allows you to pass in a function which will be called when a slide change has been requested but before it occurs. This allows you to do things like load more slides or something if the user is approaching the end of the slide deck. If you give it an async function or return a promise it will block the slide change from occurring until the promise resolves. This function is called with an object containing:\
  * **currentIndex**\
  The index of the current slide (this index starts at 0 not 1).
  
  * **newIndex**\
  This is what the index of the current slide will be after the slide change has taken place.

  * **delta**\
  The number of slides we're planning to change by. Ignoring "wrapping" for the moment, if delta is positive we're going forwards and if delta is negative then we're going back by delta number of slides. Be aware that delta might not equal newIndex - currentIndex. That is because the delta value is not "wrapped", meaning if you are currently on the last slide and go forwards 1 then the delta value will be 1 but since currentIndex + delta is greater than the index of the last slide the newIndex value is found by wrapping around to the other slide of the last of slides meaning that in this case the newIndex would be 0.

  * **length**\
  This is the number of slides.

## 🌏 Non-Vue Usage
Although Big Shot is written in the Vue framework you don't have to have a Vue-based app to use it. Check the [source code of the demo](https://glitch.com/edit/#!/big-shot-demo) to see how it can easily be embedded in any webpage. (Although to be honest if you're not adding it to a Vue app I don't know why you wouldn't just use the original [PhotoSwipe library](https://photoswipe.com/).)


## ✨ Motivation
I wanted a photo and video slide show widget and after a bit of research I liked PhotoSwipe the best. There are a number of Vue wrappers for the PhotoSwipe library. These are mostly work fine but by the nature of being a wrapper around a library not originally designed as a Vue component they are always going to have certain limitations. So I decided to write my own and Big Shot was born.

The name is in part a nod to Cowboy Bebop and the eponymously named fictional tv show it featured.

![Logo of the tv-show-inside-a-tv-show Big Shot](src/assets/cowboy-bebop_bigshot.jpg)