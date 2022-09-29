import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { Permission2D } from "../mod.ts";

Deno.test("Disallow permission", () => {
  const permissions = new Permission2D();

  permissions.allow("0");
  permissions.allow("1");
  permissions.allow("2");

  permissions.disallow("1");

  assertEquals(permissions.has("0"), true);
  assertEquals(permissions.has("1"), false);
  assertEquals(permissions.has("2"), true);

  assertThrows(
    () => permissions.disallow("hello"),
    Error,
  );
});
