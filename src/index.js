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

app.post("/step1", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
});

app.post("/step2", (req, res) => {
  const user = {
    language: req.body.language,
    countries: req.body.countries,
    city: req.body.city,
  };
});

app.post("/step3", (req, res) => {
  res.redirect("/redirect.html");
});

app.listen(3000);
