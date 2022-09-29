import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { Permission2D } from "../mod.ts";

Deno.test("Has permission", () => {
  assertEquals(new Permission2D().has("ffa500"), false);
  assertEquals(new Permission2D().has("0"), false);

  assertThrows(
    () => new Permission2D().has("hello"),
    Error,
  );
});
