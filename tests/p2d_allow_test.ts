import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { Permission2D } from "../mod.ts";

Deno.test("Allow permission", () => {
  const permissions = new Permission2D();

  permissions.allow("0");
  permissions.allow("1");

  assertEquals(permissions.has("0"), true);
  assertEquals(permissions.has("1"), true);

  assertThrows(
    () => permissions.allow("hello"),
    Error,
  );
});
