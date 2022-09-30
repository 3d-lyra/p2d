import { ModelIn, ModelOut, Rights } from "../types.ts";
/**
 * Calculates exponent of some n numbers and creates unique hex values
 *
 * # Example
 *
 * ```ts
 * import { compile } from "../mod.ts"
 *
 * const model = { todo: { read: null, write: null } }
 * const out = compile( model )
 * console.log( out )
 * ```
 *
 * @param {ModelIn} model - Customizable helper object (a.k.a Compiled permission model)
 * @returns {ModelOut} - Object with unique hex values
 */
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
          .toString(16) as Rights;
    }
  }

  return out;
}

export { compile };
