import { d as defineEventHandler } from '../../../runtime.mjs';
import { g as gameModel } from '../../../_/game.model.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongoose';
import 'node:fs';
import 'node:url';

const _id__delete = defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    await gameModel.findByIdAndDelete(id);
    return { message: "Game verwijderd" };
  } catch (err) {
    throw showError({
      message: err.message
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
