const express = require("express");
const router = express.Router();
const pool = require("./pool");

// var pool = new Pool({
//     host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
//     user: "postgres",
//     password: "postgres",
//     database: "postgres"
//   });

router.get("/", (req, res) => {
  console.log(JSON.parse(req.query.user)._id);

  if (
    JSON.parse(req.query.user).role === "Admin" ||
    JSON.parse(req.query.user).role === "PM"
  ) {
    pool
      .query(
        `select * from notifications where "type" in ('edited a report', 'created a report', 'deleted a report')`
      )
      .then(results => res.json(results.rows));
  } else if (JSON.parse(req.query.user).role === "Developer") {
    pool
      .query(`select * from notifications`)
      .then(results => res.json(results.rows));
  }
});

module.exports = router;
