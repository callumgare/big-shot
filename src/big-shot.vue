<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Virtual, Keyboard, Zoom, Autoplay } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/zoom';

  import type { Slide } from "./types/slide"

  import SlideItem from "./components/slide-item.vue";
  import AutoPlaySwitch from "./components/AutoPlaySwitch.vue";

  const autoPlay = ref(false)

  const props = defineProps<{
    slideData: Slide[]
  }>()

  type BeforeSlideChangeHookArgs = {
    currentIndex: number,
    newIndex: number,
    delta: number,
    length: number,
  }

  const emit = defineEmits<{
    (e: 'beforeSlideChangeHook', value: BeforeSlideChangeHookArgs): void
  }>()

  const swiperObj = ref()

  const swiperProps = {
    virtual: true,
    slidesPerView: 1,
    modules: [Virtual, Keyboard, Zoom, Autoplay],
    keyboard: true,
    spaceBetween: 50,
    zoom: true,
    loop: true,
    autoplay: false,
    speed: 1, // for some reason setting this to 0 seems to break autoplay after the first transition
    longSwipesRatio: 0.1,
  };

  const currentIndex = ref(0)

  watch(swiperObj, () => {
    if (!swiperObj.value) {
      return
    }
    if (!autoPlay.value) {
      swiperObj.value.autoplay.stop()
    }
    swiperObj.value.on('autoplayStop', function () {
      if (autoPlay.value) {
        autoPlay.value = false
      }
    });
    swiperObj.value.on('autoplayStart', function () {
      if (!autoPlay.value) {
        autoPlay.value = true
      }
    });

    let previousIndex = 0

    swiperObj.value.on('slideChange', () => {
      currentIndex.value = swiperObj.value.realIndex

      const newIndex = swiperObj.value.realIndex
      const numOfSlides = props.slideData.length
      const lastIndex = numOfSlides - 1
      if (previousIndex === newIndex) {
        return
      }
      const wrappedDelta = newIndex - previousIndex
      const distanceIfForwards = wrappedDelta > 0 ? wrappedDelta : (lastIndex - previousIndex) + (newIndex + 1)
      const distanceIfBackwards = wrappedDelta < 0 ? Math.abs(wrappedDelta) : (previousIndex + 1) + lastIndex - newIndex
      let unwrappedDelta

      if (distanceIfForwards < distanceIfBackwards) {
        unwrappedDelta = distanceIfForwards
      } else {
        unwrappedDelta = distanceIfBackwards * -1
      }

      emit('beforeSlideChangeHook', {
        currentIndex: previousIndex,
        newIndex: newIndex,
        delta: unwrappedDelta,
        length: props.slideData.length,
      })

      previousIndex = swiperObj.value.realIndex
    })
  })

  const autoPlayPausedBySlide = ref(false)

  function slidePlayStarted() {
    autoPlayPausedBySlide.value = true
  }

  function slidePlayFinished() {
    autoPlayPausedBySlide.value = false
  }

  watch(autoPlay, () => {
    if (autoPlay.value) {
      if (!autoPlayPausedBySlide.value) {
        swiperObj.value.autoplay.start()
      }
    } else {
      swiperObj.value.autoplay.stop()
    }
  })

  watch(autoPlayPausedBySlide, () => {
    if (!swiperObj.value) {
      return
    }
    if (autoPlay.value) {
      if (autoPlayPausedBySlide.value) {
        if (autoPlay.value) {
          if (swiperObj.value.animating) {
            swiperObj.value.once(
              'slideChangeTransitionEnd',
              () => swiperObj.value.autoplay.pause()
            )
          } else {
            swiperObj.value.autoplay.pause()
          }
        }
      } else {
        swiperObj.value.slideNext()
        // slideNext() stops autoplay so restart
        swiperObj.value.autoplay.start()
      }
    }
  })

</script>
<template>
  <div class="big-shot">
    <swiper
      v-if="slideData.length > 0"
      v-bind="swiperProps"
      ref="swiperElm"
      @swiper="(swiper) => swiperObj = swiper"
    >
      <template #container-start>
        <div class="toolbar">
          <div>
            <span class="text">
              {{ currentIndex + 1 }} / {{ slideData.length }}
            </span>
          </div>
          <div>
            <slot
              name="center-header"
              :current-slide="slideData[currentIndex]"
            />
          </div>
          <div>
            <auto-play-switch v-model="autoPlay" />
          </div>
        </div>
      </template>
      <swiper-slide
        v-for="(slide, index) in slideData.filter(slide => slide)"
        :key="index"
        :virtual-index="index"
      >
        <slide-item
          :slide="slide"
          :active="currentIndex === index"
          @play-started="slidePlayStarted"
          @play-finished="slidePlayFinished"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="postcss" scoped>
  .big-shot {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    color: white;

    .toolbar {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      opacity: 0.5;
      transition: all 0.1s;
      font-family: sans-serif;
      align-items: start;

      &:hover, &:focus-within {
        opacity: 1;
      }

      > * {
        display: flex;
        min-height: 2rem;
        align-items: center;

        .text {
          margin: 0.3rem
        }
      }
    }

    & .swiper {
      height: 100%;
    }
  }
</style>
