import cookieSession from "cookie-session";
import express from "express";
import passport from "./passport";

export const configureMiddleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cookieSession({
      keys: ["fdsa"],
      secret: "rewq",
      maxAge: 1000 * 60 * 60,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static("src/public"));
};
