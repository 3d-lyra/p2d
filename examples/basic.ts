import { Permission2D } from "https://deno.land/x/p2d/mod.ts";

// Permissions for Catarina
const catarina = new Permission2D(); // initial value: string( 0 )
catarina.allow("a");
catarina.allow("66");
catarina.allow("f");
catarina.allow("10");

catarina.disallow("10");

console.log(catarina.has("a")); // true
console.log(catarina.has("66")); // true
console.log(catarina.has("f")); // true
console.log(catarina.has("10")); // false

// You can save the result in your database
console.log(catarina.value()); // 40000000000000000000008400
console.log(typeof catarina.value()); // string

// New instance
const p = new Permission2D("40000000000000000000008400"); // from db

if (p.has("a")) {
  console.info('User has permission "a"');
} else {
  console.log("User does not have permission `a`");
}
if (p.has("10")) {
  console.info('User has permission "10"');
} else {
  console.log("User does not have permission `10`");
}
