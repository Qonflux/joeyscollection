<template>
  <div>
    <!-- Search bar -->
    <div class="relative mb-4">
      <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg>
      </div>
      <input
        v-model="searchTerm"
        type="search"
        class="block p-4 pl-10 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-600 focus:border-violet-600"
        placeholder="Zoek spel"
        @input="searchGame"
      >
    </div>

    <!-- Search results loading spinner -->
    <BaseLoadingSpinner v-if="isLoadingSearch" size="3" line-size="0.375" />

    <!-- Search results -->
    <div v-else-if="foundGames && foundGames.length > 0 && !game.igdbId" class="text-sm">
      <h2>Gevonden games:</h2>
      <a
        v-for="foundGame in foundGames"
        :key="foundGame.id"
        @click="getGame(foundGame)"
      >
        {{ foundGame.name }} ({{ extractYear(convertDate(foundGame.first_release_date)) }})<br>
      </a>
    </div>

    <!-- Game details and form -->
    <AdminGameDetail 
      v-else-if="game.igdbId" 
      :game="game"
      :systems="platforms"
      class="mt-4 text-sm"
      @update-platform="game.platform = $event"
      @update-completed="game.completed = !game.completed"
    />
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const searchTerm = ref('')
const foundGames = ref([])
const debounce = ref(null)
const token = ref(null)
const isLoadingSearch = ref(false)

const defaultGame = {
  completed: false,
  cover: null,
  genres: [],
  igdbId: null,
  name: null,
  platform: 'Nintendo Switch',
  releaseDate: null
}

const platforms = ref([])

const game = reactive({ ...defaultGame })

const getGame = async (selectedGame) => {
  game.igdbId = selectedGame.id
  game.name = selectedGame.name
  game.releaseDate = convertDate(selectedGame.first_release_date)
  const cover = await fetchApi('covers', `fields url; where id = ${selectedGame.cover};`)
  game.cover = cover[0]?.url.replace('thumb', 'cover_big')
  selectedGame.genres.forEach(genre => {
    setTimeout(async () => {
      const gen = await fetchApi('genres', `fields name; where id = ${genre};`)
      game.genres.push(gen[0]?.name)
    }, 250);
  })
  platforms.value = []
  selectedGame.platforms.forEach(platform => {
    setTimeout(async () => {
      const plat = await fetchApi('platforms', `fields name; where id = ${platform};`)
      platforms.value.push(plat[0]?.name)
    }, 250);
  })
}

const convertDate = (date) => {
  date = new Date(Number(date * 1000))
  return date.toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' })
} 

const extractYear = (date) => {
  return date.split('-')[2]
}

const searchGame = async () => {
  if (searchTerm.value.length < 3) return
  isLoadingSearch.value = true
  clearTimeout(debounce.value)
  debounce.value = setTimeout(async () => {
    resetGame()
    foundGames.value = await fetchApi('games', `fields name,cover,first_release_date,genres,platforms; search "${searchTerm.value}"; limit 50;`)
    isLoadingSearch.value = false
  }, 250)
}

const resetGame = () => {
  Object.assign(game, defaultGame);
  game.genres = []
}

const fetchApi = async (endpoint, body) => {
  try {
    if (!token.value) {
      ({ access_token: token.value } = await $fetch(`https://id.twitch.tv/oauth2/token?client_secret=${config.public.IGDB_CLIENT_SECRET}&client_id=${config.public.IGDB_CLIENT_ID}&grant_type=client_credentials`, { method: 'POST' }))
    }

    return await $fetch(`${config.public.PROXY}https://api.igdb.com/v4/${endpoint}`, {
      'method': 'POST',
      'headers': {
        'Client-ID': config.public.IGDB_CLIENT_ID,
        'Authorization': `Bearer ${token.value}`
      },
      'body': body
    })
  } catch (err) {
    console.error(err)
  }
}
</script>