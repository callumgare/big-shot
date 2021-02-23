# Big Shot
_A Vue-based image/video slide show widget._

Big Shot is a image and video full screen slide show Vue component.  It’s basically a loving rip-off of [PhotoSwipe](https://photoswipe.com/) but written from the ground up in Vue. That said it’s not aiming to replicate PhotoSwipe exactly. It will probably never have quite as many features or customisations as PhotoSwipe, at the same time it does things that PhotoSwipe doesn’t like natively support video.

## 🎪 Demo
**Check out the [live demo](https://big-shot-demo.glitch.me/).**

## ⚠️ Software Quality and Features
**Big Shot is very much in alpha.** No assurances are given, there are no tests yet and there could potentially be breaking changes in the future. So don’t use big shot in a situation when stability is very important.

While I intend to improve Big Shot over time I have limited capacity so I will probably focus on either features that I’ll use or improve general stability. Pull requests are encouraged if you would like to contribute. Although unless you're not concerned if a change is not accepted please create an issue before you write any code because I would like to add features in a conscious and thoughtful way.

### Things It Does
- Supports image and video
- Has the same zoom behaviour as PhotoSwipe (minus panning)
- Minimal and elegant UI
- Basic next/previous slide mobile swipe gesture

### Things It Does Not Do (Yet?)
- Panning zoomed media
- Timer for automatic slide progression
- Captions/displaying other metadata 
- Events for slide changes
- HTML slides
- Rotation

Unless you’re happy with how Big Shot functions at the moment I would recommend one of the other PhotoSwipe Vue implementations such as:
- [vue-picture-swipe](https://www.npmjs.com/package/vue-picture-swipe) (whose readme also includes a good summary of other PhotoSwipe implementations for Vue).
- [vue-pswipe](https://www.npmjs.com/package/vue-pswipe)

## 🚀 Getting Started
If the above hasn't scared you away give it a shot!

```bash
npm install big-shot
```
In your component script:
```javascript
import Vue from 'vue'
import BigShot from 'big-shot'

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
      showSlideShow: true
    }
  }
})
```

In your template add:
```html
<big-shot
  v-if="showSlideShow"
  :slideData="slideData"
  @exited="() => showSlideShow = false"
/>
```

**Important:** BigShot uses the Vue 2 backport of the composition API. Therefore it must be installed in the global vue instance for Big Shot to work. (Note step this is not needed if you are using Vue directly in the browser without compiling.)

First add the package:
```bash
npm install @vue/composition-api
```

Then the file which you initialise your app you must include:
```javascript
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
```

Although Big Shot is written in the Vue framework you don't have to have a Vue-based app to use it. Check the [source code of the demo](https://glitch.com/edit/#!/big-shot-demo) to see see how it can easily be embedded in any webpage. (Although to be honest if you're not adding it to a Vue app I don't know why you wouldn't just use the original [PhotoSwipe library](https://photoswipe.com/).)


## ✨ Motivation
I wanted a photo and video slide show widget and after a bit of research I liked PhotoSwipe the best. There are a number of Vue wrappers for the PhotoSwipe library. These are mostly work fine but by the nature of being a wrapper around a library not originally designed as a Vue component they are always going to have certain limitations. So I decided to write my own and Big Shot was born.

The name is in part a nod to Cowboy Bebop and the eponymously named fictional tv show it featured.

![Logo of the tv-show-inside-a-tv-show Big Shot](src/assets/cowboy-bebop_bigshot.jpg)