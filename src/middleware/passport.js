import passport from "passport";
import { Strategy } from "passport-local";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../db/users-repository.js";
import { checkPassword } from "../utils/crypto.js";

const verifyUser = async (email, password, done) => {
  try {
    const foundUser = await findUserByEmail(email);

    if (foundUser && checkPassword(password, foundUser.hashedPassword))
      return done(null, foundUser);

    const userId = await createUser({ email, password });
    done(null, { id: userId });
  } catch (e) {
    done(e, null);
  }
};

const strategy = new Strategy(
  { passwordField: "password", usernameField: "email" },
  verifyUser
);
const serializeUser = (user, done) => {
  console.log(user);
  done(null, user.id);
};
const deserializeUser = async (id, done) => {
  try {
    const user = await findUserById(id);
    if (user) return done(null, user);
  } catch (e) {
    return done(e, null);
  }
};
passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
