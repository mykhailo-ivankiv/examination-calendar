const router = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const GITHUB_CLIENT_ID = "c248798633e9dcc6d002";
const GITHUB_CLIENT_SECRET = "ade727b69c01e6a3ee9046823a8fd39db4e9d60e";
const CALBACK_URL =
  "https://examination-calendar.herokuapp.com/auth/github/callback";
const ADMIN_ID = "96634";

const users = {};

passport.serializeUser((user, done) => {
  users[user.id] = user._json;
  if (user.id === ADMIN_ID) {
    users[user.id].admin = true;
  }
  done(null, user.id);
});
passport.deserializeUser((obj, done) => {
  done(null, users[obj]);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => done(null, profile)
  )
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => res.redirect("/")
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
