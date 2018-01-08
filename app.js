const express = require("express");
const passport = require("passport");
const app = express();

const auth = require("./backend/auth");

app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize())
    .use(passport.session())


app
  .use(express.static(__dirname + "/frontend"))
  .use(auth)
  .use("/api", require("./backend/api"))
  .listen(process.env.PORT || 3000, () =>
    console.log("Example app listening on port 3000!")
  );
