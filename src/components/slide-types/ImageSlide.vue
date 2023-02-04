<script setup lang="ts">
  import { ImageSlide } from '../../types/slide';

  defineProps<{
    slide: ImageSlide,
  }>()
</script>

<template>
  <div class="swiper-zoom-container">
    <img
      :src="slide.src"
      loading="eager"
    >
  </div>
</template>
