const express = require("express");
const router = express.Router();
const db = require("./db.js");
const bodyParser = require("body-parser");
const passport = require("passport");

router
  .use(bodyParser.json())
  .get(
    "/students",
    async (req, res) => {
      console.log("user", req.isAuthenticated());
      res.send(db.getStudents());
    }
  )
  .get("/schedule", async (req, res) => {
    res.send(db.getSchedule());
  })
  .post("/schedule", async (req, res) => {
    db.setSchedule(req.body);
    res.send(req.body);
  });

module.exports = router;
