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
  });

  const permission1 = new Permission2D();

  permission1.allow(RIGHTS.TODO.READ);
  permission1.allow(RIGHTS.TODO.COMPLETE);

  const permission2 = new Permission2D(permission1.value());

  assertEquals(permission2.has(RIGHTS.TODO.READ), true);
  assertEquals(permission2.has(RIGHTS.TODO.COMPLETE), true);
  assertEquals(permission2.has(RIGHTS.TODO.DELETE), false);
});
