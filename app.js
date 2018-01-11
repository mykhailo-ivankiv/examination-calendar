const express = require("express");
const session = require("express-session");

const passport = require("passport");
const auth = require("./backend/auth");

const PORT = process.env.PORT || 3000;

express()
  .use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  )
  .use(passport.initialize())
  .use(passport.session())

  .use(express.static(__dirname + "/frontend"))
  .use(auth)
  .use("/api", require("./backend/api"))
  .listen(PORT, () => console.log(`Go to http://localhost:${PORT}/`));
