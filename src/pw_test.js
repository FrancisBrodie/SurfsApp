import { passwordMatches } from "./password-helpers.js";

const password = "fdsa";
const hashedPassword =
  "$2b$10$ZlVyYlDxSnfdwEw3d1lYZeDngCpqpvSyMb1HAyYhFXP3qTUL8472.";

const matches = passwordMatches(password, hashedPassword);

if (matches) {
  console.log(`${password} is the right password`);
} else {
  console.log(`${password} is the wrong password`);
}
