const router = require("express").Router();
const db = require("./db.js");
const bodyParser = require("body-parser");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({
    error: "Unauthorized"
  });
};

router
  .use(bodyParser.json());

router.get("/students", async (req, res) => {
    res.send(db.getStudents());
  });

router
  .get("/schedule", async (req, res) => res.send(db.getSchedule()))
  .post("/schedule", ensureAuthenticated, async (req, res) => {
    if (req.user.admin) {
        db.setSchedule(req.body);
        res.send(req.body);
    } else {
        res.status(405).send({
            error: "Method Not Allowed"
        });
    }

  })

  .get("/profile", ensureAuthenticated, async (req, res) => {
    res.send(req.user);
  });

module.exports = router;
