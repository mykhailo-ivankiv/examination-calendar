const router = require("express").Router();
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const GITHUB_CLIENT_ID = "c248798633e9dcc6d002";
const GITHUB_CLIENT_SECRET = "ade727b69c01e6a3ee9046823a8fd39db4e9d60e";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
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

