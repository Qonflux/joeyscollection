<template>
  <Teleport to="body">
    <!-- Black background -->
    <transition name="dialog">
      <div
        v-if="show"
        class="z-50 fixed w-full h-screen flex items-center"
        style="background: rgba(0,0,0,0.5);"
        @click.self="handleClose"
      >
        <!-- Slide -->
        <transition 
          enter-class="translate-x-full" 
          leave-to-class="-translate-x-full"
          enter-active-class="transition-all duration-200 ease-in"
          leave-active-class="transition-all duration-200 ease-out"
        >
          <div
            v-if="showOverlay"
            class="flex flex-col h-screen z-70 shadow-md bg-gray-800 text-sm relative mr-auto w-screen sm:w-100 transform p-4 overflow-y-auto overflow-x-hidden"
          >
            <!-- Head -->
            <div class="flex text-lg">
              <h2>Filters</h2>
              <div class="ml-auto cursor-pointer font-bold" @click="emit('close')">X</div>
            </div>

            <hr class="my-3">
            <input v-model="search" type="text" placeholder="Zoeken op naam..." class="rounded-md p-2 text-black">
            <hr class="my-3">            

            <!-- Genres -->
            <h3>Genres</h3>
            <div v-for="qty, genre in genres" :key="genre" class="flex gap-1.5 w-60">
              <input :id="genre" v-model="checkedGenres" type="checkbox" :value="genre">
              <label :for="genre" class="text-sm"> {{ genre }}</label><br>
              <p class="ml-auto text-gray-500">{{ qty }}</p>
            </div>

            <!-- Finished -->
            <h3 class="mt-6">Uitgespeeld</h3>
            <div v-for="qty, complete in completed" :key="complete" class="flex gap-1.5 w-40">
              <input :id="complete" v-model="checkedCompleted" type="checkbox" :value="complete">
              <label :for="complete" class="text-sm"> {{ complete }}</label><br>
              <p class="ml-auto text-gray-500">{{ qty }}</p>
            </div>

            <!-- Platforms -->
            <h3 class="mt-6">Platformen</h3>
            <div v-for="qty, platform in platforms" :key="platform" class="flex gap-1.5 w-88">
              <input :id="platform" v-model="checkedPlatforms" type="checkbox" :value="platform">
              <label :for="platform" class="text-sm"> {{ platform }}</label><br>
              <p class="ml-auto text-gray-500">{{ qty }}</p>
            </div>

            <button 
              class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200" 
              @click="setFilters(false)"
            >
              Filters toepassen
            </button>

            <div class="flex gap-3">
              <button 
                class="bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full" 
                @click="setFilters(true)"
              >
                Kies game!
              </button>
              <button 
                class="bg-gray-600 hover:bg-gray-700 rounded-md font-bold py-2 px-4 transition duration-200 w-full" 
                @click="gameStore.removeFilters()"
              >
                Filters verwijderen
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { UseGameStore } from '~/store/games'
const gameStore = UseGameStore()
const { $showToast } = useNuxtApp()

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'reset-page'])

const search = ref('')

const genres = reactive({})
gameStore.games.forEach(game => {
  game.genres.forEach(genre => {
    if (!Object.prototype.hasOwnProperty.call(genres, genre)) genres[genre] = 1
    else genres[genre]++
  })
})

const completed = reactive({})
gameStore.games.forEach(game => {
  if (game.completed) {
    if (!Object.prototype.hasOwnProperty.call(completed, 'Uitgespeeld')) completed['Uitgespeeld'] = 1
    else completed['Uitgespeeld']++
  } else { 
    if (!Object.prototype.hasOwnProperty.call(completed, 'Niet uitgespeeld')) completed['Niet uitgespeeld'] = 1
    else completed['Niet uitgespeeld']++
  }
})

const platforms = reactive({})
gameStore.games.forEach(game => {
  if (!Object.prototype.hasOwnProperty.call(platforms, game.platform)) platforms[game.platform] = 1
    else platforms[game.platform]++
})

const checkedGenres = ref([])
const checkedCompleted = ref([])
const checkedPlatforms = ref([])

const showOverlay = ref(false)

watch(() => props.show, (newVal) => {
  nextTick(() => {
    if (newVal) {
      showOverlay.value = true
      toggleHtmlClass('add', 'overflow-y-hidden')
    } else {
      toggleHtmlClass('remove', 'overflow-y-hidden')
    }
  })
})

const toggleHtmlClass = (addRemoveClass, className) => {
  const el = document.documentElement
  addRemoveClass === 'add' ? el.classList.add(className) : el.classList.remove(className)
}

const handleClose = () => {
  showOverlay.value = false
  setTimeout(() => {
    emit('close')
  }, 200)
}

const setFilters = async (pickRandom) => {
  let filteredGames = []
  let games
  if (gameStore.hasFiltered)  {
    ({ value: games } = await gameStore.getAllGames())
  } else {
    games = JSON.parse(JSON.stringify(gameStore.games))
  } 

  // Filter genres
  if (checkedGenres.value.length > 0) {
    filteredGames = games.filter(game => game.genres.some(game => checkedGenres.value.includes(game)))
  }

  // Filter search
  if (search.value.length > 0) {
    filteredGames = filteredGames.length > 0 ? filteredGames : games
    filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Filter completed
  if (checkedCompleted.value.length > 0) {
    filteredGames = filteredGames.length > 0 ? filteredGames : games
    filteredGames = filteredGames.filter((game) => {
      return (checkedCompleted.value.includes('Uitgespeeld') && game.completed) ||
        (checkedCompleted.value.includes('Niet uitgespeeld') && !game.completed)
    })
  }

  // Filter platforms
  if (checkedPlatforms.value.length > 0) {
    filteredGames = filteredGames.length > 0 ? filteredGames : games
    filteredGames = filteredGames.filter(game => checkedPlatforms.value.includes(game.platform))
  }

  if (filteredGames.length > 0) {
    gameStore.setHasFiltered(true)
    if (pickRandom) {
      filteredGames = [filteredGames[Math.floor(Math.random() * filteredGames.length)]]
    }
    gameStore.setGames(filteredGames)
    emit('reset-page')
    handleClose()
  } else {
    $showToast('Niks gevonden!', 'warning');
  }
}
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.dialog-enter-active {
  transition: all 0.2s ease-out;
}

.dialog-leave-active {
  transition: all 0.2s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.w-88 {
  width: 22rem;
}
</style>