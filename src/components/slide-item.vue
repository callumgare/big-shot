<script setup lang="ts">
  import ImageSlide from "./slide-types/ImageSlide.vue"
  import VideoSlide from "./slide-types/VideoSlide.vue"
  import TypeNotFoundSlide from "./slide-types/TypeNotFoundSlide.vue"
  import type { Slide } from "../types/slide"

  defineProps<{
    slide: Slide,
    active: boolean,
  }>()

</script>

<template>
  <ImageSlide
    v-if="slide.type === 'image'"
    :slide="slide"
    :active="active"
  />
  <VideoSlide
    v-else-if="slide.type === 'video'"
    :slide="slide"
    :active="active"
  />
  <TypeNotFoundSlide
    v-else
    :slide="slide"
  />
</template>
