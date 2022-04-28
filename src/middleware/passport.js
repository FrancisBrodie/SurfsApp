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
    if (!foundUser) {
      const userId = await createUser({ email, password });
      return done(null, { id: userId });
    } else if (checkPassword(password, foundUser.hashedPassword)) {
      return done(null, foundUser)
    } else {
      return done(null, null)
    }
  } catch (e) {
    done(e, null);
  }
};

const strategy = new Strategy(
  { passwordField: "password", usernameField: "email" },
  verifyUser
);
const serializeUser = (user, done) => {
  done(null, user.id);
};
const deserializeUser = async (id, done) => {
  try {
    const user = await findUserById(id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, null);
    }
  } catch (e) {
    return done(e, null);
  }
};
passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

export default passport;
