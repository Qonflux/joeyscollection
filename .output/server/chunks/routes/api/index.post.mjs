import { d as defineEventHandler } from '../../runtime.mjs';
import { g as gameModel } from '../../_/game.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  const body = await useBody(event);
  if (!body.igdbId) {
    throw showError({
      message: "Geen game meegestuurd",
      statusCode: 400
    });
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
    });
    return { message: "Game toegevoegd" };
  } catch (err) {
    throw showError({
      message: err.message
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
