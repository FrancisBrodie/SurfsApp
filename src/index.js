import express from "express";
import { configureMiddleware } from "./middleware/configure.js";
import passport from "./middleware/passport.js";

const app = express();
configureMiddleware(app);

app.post(
  "/sign-up",
  passport.authenticate("local", {
    failureRedirect: "/sign-up-error.html",
  }),
  (req, res) => {
    res.redirect("/preferences.html");
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

app.post(
  "/preferences",
  (req, res) => {
    res.redirect("/step3.html");
  }
);

app.post("/preferences", (req, res) => {
  const userPreferences = {
    language: req.body.language,
    countries: req.body.countries,
    city: req.body.city,
  };
});

app.post("/step3", (req, res) => {
  res.redirect("/redirect.html");
});

app.listen(3000);
