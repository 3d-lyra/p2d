import { assertObjectMatch } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { compile } from "../mod.ts";

Deno.test("Compile", () => {
  const permissions = compile({
    TODO: {
      CREATE: null,
      READ: null,
      UPDATE: null,
      DELETE: null,
      COMPLETE: null,
    },
    APP: {
      READ: null,
      WRITE: null,
      EXECUTE: null,
    },
  });

  assertObjectMatch(
    permissions,
    {
      TODO: {
        CREATE: "1",
        READ: "2",
        UPDATE: "3",
        DELETE: "4",
        COMPLETE: "5",
      },
      APP: {
        READ: "101",
        WRITE: "102",
        EXECUTE: "103",
      },
    },
  );
});
