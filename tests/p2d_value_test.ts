import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { Permission2D } from "../mod.ts";

Deno.test("Current value", () => {
  assertEquals(new Permission2D().value(), "0");
  assertEquals(new Permission2D("FFA500").value(), "ffa500");

  assertThrows(
    () => new Permission2D("-1"),
    Error,
  );

  assertThrows(
    () => new Permission2D("hello"),
    Error,
  );
});
