import express from "express";
import { configureMiddleware } from "./middleware/configure.js";
import passport from "./middleware/passport.js";
import { createUserPreferences } from "./db/usersPreferences-repository.js";

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

app.post("/preferences", (req, res) => {
  const userPreferences = {
    language: req.body.language,
    countries: req.body.countries,
    city: req.body.city,
    userId: req.body.userId
  };

  const dbQueryResult = createUserPreferences(userPreferences);

  dbQueryResult.then((actualResult) => {
    if (actualResult) {
      res.redirect("/metrics.html");
    }
  }).catch((err) => {
    console.error(`Something went wrong ${err}`);
  });
  
});

app.post("/metrics", (req, res) => {
  res.redirect("/redirect.html");
});

app.listen(3000);
