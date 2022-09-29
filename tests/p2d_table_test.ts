import { assertObjectMatch } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { compile, Permission2D } from "../mod.ts";

Deno.test("Permission table", () => {
  const RIGHTS = compile({
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

  const permission = new Permission2D();

  permission.allow(RIGHTS.TODO);
  permission.disallow(RIGHTS.TODO.DELETE);

  permission.allow(RIGHTS.APP);
  permission.disallow(RIGHTS.APP.WRITE);

  assertObjectMatch(
    permission.table(RIGHTS),
    {
      TODO: {
        CREATE: true,
        READ: true,
        UPDATE: true,
        DELETE: false,
        COMPLETE: true,
      },
      APP: {
        READ: true,
        WRITE: false,
        EXECUTE: true,
      },
    },
  );
});
