<template>
  <div class="flex justify-between">
    <!-- Previous button -->
    <GamesPaginationButton 
      :is-disabled="props.currentPage === 0" 
      class="hidden sm:block"
      @click="emit('prev')"
    >
      <font-awesome-icon icon="fa-solid fa-angle-left" />
    </GamesPaginationButton>

    <div class="flex gap-2 mx-auto">
      <!-- First page -->
      <GamesPaginationButton :is-disabled="props.currentPage === 0" @click="emit('change', 0)">
        1
      </GamesPaginationButton>

      <p v-if="props.currentPage > 3" class="mt-auto mb-2.5">...</p>

      <!-- Previous pages -->
      <GamesPaginationButton 
        v-for="num in prevRange"
        :key="num"
        :is-disabled="num === props.currentPage"
        @click="emit('change', num)"
      >
        {{ num + 1 }}
      </GamesPaginationButton>

      <!-- Current page -->
      <GamesPaginationButton v-if="currentPage !== 0 && currentPage !== lastPage" is-disabled>
        {{ currentPage + 1 }}
      </GamesPaginationButton>

      <!-- Next pages -->
      <GamesPaginationButton 
        v-for="num in nextRange"
        :key="num"
        :is-disabled="num === props.currentPage"
        @click="emit('change', num)"
      >
        {{ num + 1 }}
      </GamesPaginationButton>

      <p v-if="lastPage - currentPage > 3" class="mt-auto mb-2.5">...</p>

      <!-- Last page -->
      <GamesPaginationButton :is-disabled="props.currentPage === lastPage" @click="emit('change', lastPage)">
        {{ lastPage + 1 }}
      </GamesPaginationButton>
    </div>

    <!-- Next button -->
    <GamesPaginationButton 
      class="hidden sm:block"
      :is-disabled="props.currentPage === lastPage" 
      @click="emit('next')"
    >
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </GamesPaginationButton>
  </div>
</template>

<script setup>
import { UseGameStore } from '~/store/games'
const gameStore = UseGameStore()

const props = defineProps({
  currentPage: {
    type: Number,
    default: 0
  },
  numPerPage: {
    type: Number,
    default: 30
  }
})

const emit = defineEmits(['next', 'prev', 'change'])

/* const visibleBtns = ref(7) */

const lastPage = computed(() => Math.ceil(gameStore.games.length / props.numPerPage) - 1)

const prevRange = computed(() => {
  const nums = []
  let curr = props.currentPage
  let i = 0
  while (i < 3 && curr >= 1) {
    if (curr !== props.currentPage)
    nums.push(curr)
    i++
    curr--
  }
  return nums.reverse()
})

const nextRange = computed(() => {
  const nums = []
  let curr = props.currentPage
  let i = 0
  while (i < 3 && curr < lastPage.value) {
    if (curr !== props.currentPage) nums.push(curr)
    i++
    curr++
  }
  return nums
})
</script>