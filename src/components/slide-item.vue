<script setup lang="ts">
  import ImageSlide from "./slide-types/ImageSlide.vue"
  import VideoSlide from "./slide-types/VideoSlide.vue"
  import TypeNotFoundSlide from "./slide-types/ImageSlide.vue"
  import type { Slide } from "../types/slide"

  defineProps<{
    slide: Slide
  }>()

  const typeMap = {
    image: ImageSlide,
    video: VideoSlide,
  }

</script>

<template>
  <component
    :is="typeMap[slide.type ?? 'image'] ?? TypeNotFoundSlide"
    :slide="slide"
  />
</template>
