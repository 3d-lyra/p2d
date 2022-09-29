import { ModelIn, ModelOut } from "./types.ts";

function compile(model: ModelIn): ModelOut {
  const out: ModelOut = {};
  const verticalKeys = Object.keys(model);

  for (let i = 0; i < verticalKeys.length; i++) {
    out[verticalKeys[i]] = {};

    const horizontalKeys = Object.keys(model[verticalKeys[i]]).slice(
      0,
      256,
    );

    for (let j = 0; j < horizontalKeys.length; j++) {
      out[verticalKeys[i]][horizontalKeys[j]] =
        (2n ** ((BigInt(i) * 256n) + BigInt(j))).toString(2).length
          .toString(16);
    }
  }

  return out;
}

export { compile };
