<template>
  <div>
    <input v-model="search" type="text" placeholder="Zoeken op naam..." class="rounded-md p-2 text-black w-full mb-4">

    <table class="text-sm">
      <tr v-for="game, i in gamesArray" :key="game._id" :class="{'bg-gray-700': i % 2}">
        <td class="w-96">
          {{ game.name }}
        </td>
        <td class="w-80">{{ game.platform }}</td>
        <td class="w-32">
          <input type="checkbox" :checked="game.completed" @input="toggleCompleted(game)">
          <button @click="deleteGame(game._id)">
            <font-awesome-icon 
              icon="fa-solid fa-circle-xmark" 
              class="w-4 h-4 text-red-500 ml-4 mb-0.5 cursor-pointer"
            />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
const config = useRuntimeConfig() 
const { $showToast } = useNuxtApp()

// Get and set games in store 
const { data: games, refresh } = await useFetch(`${config.public.API_URL}/api/games`, { initialCache: false })

const search = ref('')

const gamesArray = computed(() => {
  let filtered = games.value
  if (search.value.length > 0) {
    filtered = filtered.filter(game => game.name.toLowerCase().includes(search.value.toLowerCase()))
  }
  return filtered
})

const toggleCompleted = async (game) => {
  try {
    await $fetch(`/api/games/${game._id}`, { method: 'PUT', body: { ...game, completed: !game.completed }})
    $showToast('Game succesvol geüpdatet', 'info')
    refresh()
  } catch (err) {
    console.error(err)
  }
}

const deleteGame = async (id) => {
  try {
    await $fetch(`/api/games/${id}`, { method: 'DELETE' })
    $showToast('Game succesvol verwijderd', 'info')
    refresh()
  } catch (err) {
    console.error(err)
  }
}
</script>