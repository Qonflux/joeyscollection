<template>
  <h2>{{ props.game.name }}</h2>
  <img :src="props.game.cover">
  <p class="mt-3">Release: {{ props.game.releaseDate }}</p>
  <p class="mt-3">Genre<span v-if="props.game.genres.length < 1">s</span>: {{ props.game.genres.join(', ') }}</p>
  <p class="mt-3">Beschikbaar op: {{ props.systems.join(', ') }}</p>
  <p class="mt-3 mb-1">Platform:</p>
  <select
    id="plaform"
    :value="props.game.platform"
    name="plaform"
    class="block p-4 pr-8 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-violet-600 focus:border-violet-600"
    @input="onChange($event)"
  >
    <option 
      v-for="platform in platforms" 
      :key="platform" 
      :value="platform"
    >
      {{ platform }}
    </option>
  </select>

  <input id="completed" :value="props.game.completed" type="checkbox" class="mt-3" @input="emit('update-completed', $event)">
  <label for="completed" class="text-sm"> Uitgespeeld</label><br>

  <button 
    class="bg-violet-600 hover:bg-violet-800 rounded-md font-bold py-2 px-4 my-3 transition duration-200" 
    @click="addGame"
  >
    Toevoegen
  </button>
</template>

<script setup>
const config = useRuntimeConfig() 
const { $showToast } = useNuxtApp()

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  systems: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update-platform', 'update-completed'])

const platforms = ref([
  'Nintendo Entertainment System (NES)',
  'Super Nintendo Entertainment System (SNES)',
  'Nintendo 64',
  'Nintendo GameCube',
  'Wii',
  'Wii U',
  'Nintendo Switch',
  'Game Boy',
  'Game Boy Color',
  'Game Boy Advance',
  'Nintendo DS',
  'Nintendo 3DS',
  'PlayStation',
  'PlayStation 2',
  'PlayStation 3',
  'PlayStation 4',
  'Xbox',
  'Xbox 360',
  'Xbox One',
  'Sega Mega Drive',
])

const onChange = (e) => {
  const name = e.target.options[e.target.options.selectedIndex].text
  emit('update-platform', name)
}

const addGame = async () => {
  try {
    await $fetch(`${config.public.API_URL}/api/games`, { method: 'POST', body: { ...props.game }})
    $showToast('Game succesvol toegevoegd', 'info');
  } catch (err) {
    console.error(err)
  }
}
</script>