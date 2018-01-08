const express = require("express");
const router = express.Router();

const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const users = [];

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser( (obj, cb) => {
    console.log("deserializeUser", obj.username);
    cb(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "c248798633e9dcc6d002",
      clientSecret: "ade727b69c01e6a3ee9046823a8fd39db4e9d60e",
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => cb(null, profile)
  )
);

router
  .get("/auth/github", passport.authenticate("github"))
  .get(
    "/auth/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

module.exports = router;
