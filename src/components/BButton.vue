<script setup lang="ts">
import { type StyleValue, computed } from 'vue';

const props = defineProps<{
  disabled?: boolean;
}>();

// If disabled, opacity 0.5 and pointer-events: none
const buttonStyle = computed<StyleValue>(() => {
  if (props.disabled) {
    return {
      opacity: 0.5,
      pointerEvents: 'none',
    };
  }

  return {};
});
</script>

<template>
  <button
    :style="buttonStyle"
    class="search-button text-white py-1 px-4 rounded"
  >
    <slot />
  </button>
</template>

<style scoped>
.search-button {
  background-color: #3c2d1c;
}
</style>
