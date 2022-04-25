import express from "express";
import { configureMiddleware } from "./middleware/configure.js";
import passport from "./middleware/passport.js";

const app = express();
configureMiddleware(app);

app.post(
  "/sign-up",
  passport.authenticate("local", {
    failureRedirect: "/user-already-exists.html",
  }),
  (req, res) => {
    res.redirect("/step1");
  }
);
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/bad-username-or-password.html",
  }),
  (req, res) => {
    res.redirect("/home.html");
  }
);

app.listen(3000);
