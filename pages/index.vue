<template>
  <div>
    <FilterOverlay :show="openFilters" @reset-page="page = 0" @close="openFilters = false" />

    <!-- Stats and filters -->
    <div class="flex justify-between text-sm mb-3">
      <div class="text-gray-500">{{ gameStore.games?.length }} game<span v-if="gameStore.games?.length > 1">s</span></div>
      <p class="flex gap-1 items-center">
        Sorteren: <span class="text-gray-500 cursor-pointer" @click="changeSorting">{{ sortingValue }}</span> 
        <font-awesome-layers class="cursor-pointer" @click="toggleSorted">
          <font-awesome-icon :icon="['fas', 'sort-down']" class="h-4 w-4" :class="{'text-gray-500': isSortedUp}" />
          <font-awesome-icon :icon="['fas', 'sort-up']" class="h-4 w-4" :class="{'text-gray-500': !isSortedUp}" />
        </font-awesome-layers>
      </p>
      <div class="flex gap-1 items-center">
        <p class="text-violet-500 cursor-pointer flex gap-1 items-center" @click="openFilters = true">
          <font-awesome-icon icon="fa-solid fa-filter" class="h-4 w-4" /> <span>Filters</span>
        </p>
        <font-awesome-icon v-if="gameStore.hasFiltered" icon="fa-solid fa-circle-xmark" class="h-4 w-4 text-gray-500 ml-1" @click="gameStore.removeFilters()" />
      </div>
    </div>

    <div class="grid grid-cols-12 gap-4 mb-1">
      <div v-for="game in gamesArray.slice(page * numPerPage, page * numPerPage + numPerPage)" id="game" :key="game._id" class="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2 relative">
        <img :src="game.cover" class="mx-auto rounded-md transition duration-200 border-2 border-gray-700 h-full">
        <div class="info absolute top-4 left-0 opacity-0 transition duration-200 w-full">
          <h3 class="text-center">{{ game.name }}</h3>
          <p class="text-center mt-3">Release: {{ game.releaseDate }}</p>
          <p class="text-center mt-3">Platform: <img :src="getImage(game.platform)" class="inline"></p>
          <p class="text-center mt-3 flex gap-1 items-center justify-center">
            <span>Uitgespeeld:</span> 
            <font-awesome-icon :icon="`fa-solid fa-${game.completed ? 'check-circle' : 'circle-xmark'}`" class="w-4 h-4" :class="game.completed ? 'text-green-500' : 'text-red-500'" />
          </p>
        </div>

        <!-- Tags -->
        <div class="info absolute bottom-2 left-2 opacity-0 transition duration-200 text-xxs flex gap-2 flex-wrap">
          <div v-for="genre in game.genres" :key="genre" class="bg-violet-600 pt-1 pb-0.5 px-2 rounded-full">
            {{ genre }}
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <GamesPagination 
      v-if="gameStore.games.length > numPerPage" 
      :current-page="page"
      :num-per-page="numPerPage"
      :num-games="gameStore.games.length"
      @next="nextPage"
      @prev="previousPage"
      @change="page = $event"
    />
  </div>
</template>

<script setup>
import { UseGameStore } from '~/store/games'
const gameStore = UseGameStore()

// Get and set games in store 
const games = await gameStore.getAllGames()
gameStore.setGames(games)

const openFilters = ref(false)
const page = ref(0)
const numPerPage = ref(30)
const isSortedUp = ref(false)
const sorting = ref('date')

const getImage = (platform) => {
  let img = '/images/'
  if (platform === 'Nintendo Entertainment System (NES)') {
    img += 'nes.png'
  } else if (platform === 'Super Nintendo Entertainment System (SNES)') {
    img += 'snes.png'
  } else if (platform === 'Nintendo 64') {
    img += 'n64.png'
  } else if (platform === 'Nintendo GameCube') {
    img += 'gc.png'
  } else if (platform === 'Wii') {
    img += 'wii.png'
  } else if (platform === 'Wii U') {
    img += 'wii-u.png'
  } else if (platform === 'Nintendo Switch') {
    img += 'switch.png'
  } else if (platform === 'Game Boy') {
    img += 'gb.png'
  } else if (platform === 'Game Boy Color') {
    img += 'gbc.png'
  } else if (platform === 'Game Boy Advance') {
    img += 'gba.png'
  } else if (platform === 'Nintendo DS') {
    img += 'ds.png'
  } else if (platform === 'Nintendo 3DS') {
    img += '3ds.png'
  } else if (platform === 'PlayStation') {
    img += 'ps.png'
  } else if (platform === 'PlayStation 2') {
    img += 'ps2.png'
  } else if (platform === 'PlayStation 3') {
    img += 'ps3.png'
  } else if (platform === 'PlayStation 4') {
    img += 'ps4.png'
  } else if (platform === 'Xbox') {
    img += 'xbox.png'
  } else if (platform === 'Xbox 360') {
    img += 'xbox-360.png'
  } else if (platform === 'Xbox One') {
    img += 'xbox-one.png'
  } else {
    img += 'md.png'
  }
  return img
}

const sortingValue = computed(() => {
  return sorting.value === 'date' ? 'Toegevoegd' : 'Alfabetisch'
})

const gamesArray = computed(() => {
  let games = [...gameStore.games]
  if (sorting.value === 'alphabet') {
    games = games.sort((a, b) => a.name.localeCompare(b.name))
  }
  const reversedGames = games.slice().reverse()
  return isSortedUp.value ? reversedGames : games
})

const previousPage = () => {
  if (page.value !== 0) page.value--
}

const nextPage = () => {
  page.value++
}

const toggleSorted = () => {
  isSortedUp.value = !isSortedUp.value
}

const changeSorting = () => {
  if (sorting.value === 'date') sorting.value = 'alphabet'
  else sorting.value = 'date'
}
</script>

<style scoped lang="postcss">
#game:hover > .info {
  opacity: 100%;
}

#game:hover > img {
  @apply brightness-50;
}

.text-xxs {
  font-size: 0.625rem;
}
</style>