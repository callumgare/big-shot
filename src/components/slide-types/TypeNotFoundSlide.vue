<script setup lang="ts">
  import { Slide } from '../../types/slide';

  defineProps<{
    slide: Slide,
  }>()
</script>

<template>
  Type "{{ slide.type }}" not found
</template>
