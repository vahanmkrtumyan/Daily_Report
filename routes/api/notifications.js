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
  console.log("id", JSON.parse(req.query.user)._id);

  let id = JSON.parse(req.query.user)._id;

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
      .query(
        `select * from notifications 
        where "user" = '${id}' and type in ('requested a change on report', 'confirmed a report')
        `
      )
      .then(results => res.json(results.rows));
  }
});

router.delete("/", (req, res) => {
  console.log(req.body);

  if (req.body.id === "all") {
    if (JSON.parse(req.body.user).role === "Developer") {
      pool
        .query(
          `DELETE FROM notifications WHERE "user" = '${
            JSON.parse(req.body.user)._id
          }' and type in ('requested a change on report', 'confirmed a report')`
        )
        .then(results => console.log(results));
    } else {
      pool
        .query(
          `DELETE FROM notifications WHERE type in ('edited a report', 'created a report', 'deleted a report')`
        )
        .then(results => console.log(results));
    }
  } else {
    pool
      .query(`DELETE FROM notifications WHERE "_id" = '${req.body.id}'`)
      .then(results => console.log(results));
  }
});

module.exports = router;
