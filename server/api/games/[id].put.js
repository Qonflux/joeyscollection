import gameModel from '~/server/models/game.model'

export default defineEventHandler(async (event) => {
  // Get data from body
  const body = await useBody(event)
  // Get id from params
  const id = event.context.params.id

  /* const game = await gameModel.findById(id, body)

  if (game) {
    throw showError({
      message: 'Geen game gevonden',
      statusCode: 400
    })
  } */

  // Update game
  try {
    await gameModel.findByIdAndUpdate(id, body)
    return { message: 'Game geüpdatet'}
  } catch (err) {
    throw showError({
      message: err.message
    })
  }
})