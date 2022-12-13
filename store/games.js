import { defineStore } from 'pinia'

const state = () => ({
  games: [],
  filteredGames: [],
  hasFiltered: false
})

const getters = {}

const actions = {
  setGames (games) {
    this.games = games
  },
  setFilteredGames (games) {
    this.games = games
  },
  setHasFiltered (bool) {
    this.hasFiltered = bool
  },
  async getAllGames () {
    const baseUrl = useRuntimeConfig().public.API_URL;
    const { data: games } = await useFetch(`${baseUrl}/api/games`)
    return games
  },
  async removeFilters () {
    this.hasFiltered = false
    const games = await this.getAllGames()
    this.setGames(games.value)
  }
}

export const UseGameStore = defineStore('gameStore', {
  state,
  getters,
  actions
}) 