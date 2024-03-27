import gameModel from '~/server/models/game.model'

export default defineEventHandler(async (event) => {
  try {
    let games = await gameModel.find()
    games = games.reverse()
  
    return {
      games
    }
  } catch (err) {
    console.error(err)
  }
})