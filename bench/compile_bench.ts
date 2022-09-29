import { compile } from "../mod.ts";

Deno.bench("Compile 32 modules with 16 actions", () => {
  const model: { [name: string]: { [name: string]: null } } = {};

  for (let i = 0; i < 32; i++) {
    const horizontal: { [name: string]: null } = {};
    model["module" + i] = horizontal;
    for (let j = 0; j < 16; j++) {
      model["module" + i]["action" + j] = null;
    }
  }

  compile(model);
});
