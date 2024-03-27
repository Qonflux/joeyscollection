import { d as defineEventHandler } from '../../runtime.mjs';
import { g as gameModel } from '../../_/game.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const index_get = defineEventHandler(async (event) => {
  try {
    let games = await gameModel.find();
    games = games.reverse();
    return {
      games
    };
  } catch (err) {
    console.error(err);
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
