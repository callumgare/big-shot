<script setup lang="ts">
  const props = defineProps<{
    modelValue: boolean
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  function toggle() {
    emit('update:modelValue', !props.modelValue)
  }
</script>

<template>
  <div
    role="switch"
    :aria-checked="modelValue"
    tabindex="0"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space="toggle"
  >
    <span class="label">
      Autoplay Slides
    </span>
    <span class="switch" />
    <span class="label">
      {{ modelValue ? "On" : "Off" }}
    </span>
  </div>
</template>

<style scoped lang="postcss">
  [role="switch"] {
    padding: 4px 2px;
    /* border: 0 solid #005a9c; */
    /* border-radius: 5px; */
    user-select: none;
    position: relative;

    .label {
      display: inline-block;
      width: 0;
      height: 0;
      overflow: hidden;
    }

    .switch {
      position: relative;
      display: inline-block;
      border: 2px solid white;
      border-radius: 12px;
      height: 20px;
      width: 40px;
      vertical-align: bottom;
      transition: all 0.1s;

      @media (prefers-reduced-motion) {
        transition: all 0s;
      }

      &::before {
        position: absolute;
        top: 2px;
        left: 2px;
        display: inline-block;
        border: 2px solid transparent;
        border-radius: 8px;
        height: 12px;
        width: 12px;
        background: white;
        transition: all 0.1s;
        content: '▍▍';
        text-align: center;
        font-size: 10px;
        color: black;

        @media (prefers-reduced-motion) {
          transition: all 0s;
        }
      }
    }

    &[aria-checked="true"] .switch::before {
      left: 21px;
      content: '▶';
    }

    &:focus, &:hover {
      /* padding: 2px 2px 6px 6px;
      border-width: 2px; */
      outline: none;
      .switch {
        border-color: #def;
        &::before {
          background-color: #def;
        }
      }
      cursor: pointer;
    }

    &:focus .switch {
      background-color: gray;
    }
  }

</style>
