const express = require("express");
const router = express.Router();
const db = require("./db.js");

router
  .get("/students", async (req, res) => {
    res.send(db.getStudents());
  })
  .get("/schedule", async (req, res) => {
      res.send(db.getSchedule());
  });

module.exports = router;
