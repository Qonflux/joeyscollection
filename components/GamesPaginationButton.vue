<template>
  <button 
    class="rounded-md font-bold py-2 px-2.5 sm:px-4 my-3 transition duration-200 text-sm" 
    :class="props.isDisabled ? 'bg-violet-800 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-800'"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false
  }
})
</script>