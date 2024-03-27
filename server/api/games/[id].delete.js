import gameModel from '~/server/models/game.model'

export default defineEventHandler(async (event) => {
  // Get id from params
  const id = event.context.params.id

  /* const game = await gameModel.findById(id)

  if (game) {
    throw showError({
      message: 'Geen game gevonden',
      statusCode: 400
    })
  } */

  // Delete game
  try {
    await gameModel.findByIdAndDelete(id)
    return { message: 'Game verwijderd'}
  } catch (err) {
    throw showError({
      message: err.message
    })
  }
})