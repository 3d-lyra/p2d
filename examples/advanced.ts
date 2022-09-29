import { compile, Permission2D } from "../mod.ts";

// Permission model
const model = {
  TODO: {
    CREATE: null,
    READ: null,
    UPDATE: null,
    DELETE: null,
    COMPLETE: null,
  },
  APP: { READ: null, WRITE: null, EXECUTE: null },
};
// Permission rights
const RIGHTS = compile(model);

// Permissions for Catarina
const catarina = new Permission2D(); // initial value: string( 0 )
catarina.allow(RIGHTS.TODO.READ);
catarina.allow(RIGHTS.TODO.COMPLETE);
catarina.allow(RIGHTS.APP.READ);
catarina.allow(RIGHTS.APP.WRITE);

catarina.disallow(RIGHTS.APP.WRITE);

console.log(catarina.has(RIGHTS.TODO.READ)); // true
console.log(catarina.has(RIGHTS.TODO.COMPLETE)); // true
console.log(catarina.has(RIGHTS.APP.READ)); // true
console.log(catarina.has(RIGHTS.APP.WRITE)); // false

// New instance
const p = new Permission2D(catarina.value());

if (p.has(RIGHTS.TODO.READ)) {
  console.info('User has permission "TODO.READ"');
} else {
  console.log("User does not have permission `TODO.READ`");
}
if (p.has(RIGHTS.APP.WRITE)) {
  console.info('User has permission "APP.WRITE"');
} else {
  console.log("User does not have permission `APP.WRITE`");
}
