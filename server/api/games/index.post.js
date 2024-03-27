import gameModel from '~/server/models/game.model'

export default defineEventHandler(async (event) => {
  // Get data from body
  const body = await useBody(event)

  if (!body.igdbId) {
    throw showError({
      message: 'Geen game meegestuurd',
      statusCode: 400
    })
  }

  try {
    await gameModel.create({
      completed: body.completed,
      cover: body.cover,
      genres: body.genres,
      idgbId: body.igdbId,
      name: body.name,
      platform: body.platform,
      releaseDate: body.releaseDate
    })
    return { message: 'Game toegevoegd'}
  } catch (err) {
    throw showError({
      message: err.message
    })
  }
})