import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { compile, Permission2D } from "../mod.ts";

Deno.test("Main", () => {
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
  permission.allow(RIGHTS.APP);

  permission.disallow(RIGHTS.TODO);

  assertEquals(permission.has(RIGHTS.TODO), false);
  assertEquals(permission.has(RIGHTS.TODO.CREATE), false);

  assertEquals(permission.has(RIGHTS.APP), true);
  assertEquals(permission.has(RIGHTS.APP.EXECUTE), true);
});
