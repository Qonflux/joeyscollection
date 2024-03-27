import { d as defineEventHandler } from '../../../runtime.mjs';
import { g as gameModel } from '../../../_/game.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const _id__put = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const id = event.context.params.id;
  try {
    await gameModel.findByIdAndUpdate(id, body);
    return { message: "Game ge\xFCpdatet" };
  } catch (err) {
    throw showError({
      message: err.message
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
