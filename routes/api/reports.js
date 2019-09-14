const express = require("express");
const router = express.Router();
//const { Pool } = require("pg");
const uuidv1 = require("uuid/v1");
const Joi = require("@hapi/joi");
const pool = require("./pool");

// var pool = new Pool({
//   host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
//   user: "postgres",
//   password: "postgres",
//   database: "postgres"
// });

router.put("/", (req, res) => {
  console.log(req.body);

  let type = req.body.data.confirmed
    ? "confirmed a report"
    : req.body.data.requested
    ? "requested a change on report"
    : "edited a report";

  pool
    .query(
      `UPDATE reports SET name = '${req.body.data.name}', estimation = '${
        req.body.data.estimation
      }', spent = '${req.body.data.spent}', description = '${
        req.body.data.description
      }', confirmed = '${req.body.data.confirmed}', requested = '${
        req.body.data.requested
      }' WHERE _id = '${req.body.data._id}'`
    )
    .then(
      pool.query(
        `INSERT INTO notifications values('${uuidv1().toString()}', '${
          req.body.data.user
        }', '${req.body.user.firstname +
          " " +
          req.body.user.lastname}', '${type}', '${req.body.data.name}')`
      )
    );
});

router.get("/", (req, res) => {
  console.log(JSON.parse(req.query.user)._id);

  if (
    JSON.parse(req.query.user).role === "Admin" ||
    JSON.parse(req.query.user).role === "PM"
  ) {
    pool.query("select * from reports").then(results => res.json(results.rows));
  } else if (JSON.parse(req.query.user).role === "Developer") {
    pool
      .query(
        `select * from reports WHERE "user" = '${
          JSON.parse(req.query.user)._id
        }'`
      )
      .then(results => res.json(results.rows));
  }
});

router.delete("/", (req, res) => {
  console.log(req.body);
  pool
    .query(`DELETE FROM reports WHERE _id = '${req.body.report._id}'`)
    .then(results =>
      pool.query(
        `INSERT INTO notifications values('${uuidv1().toString()}', '${
          req.body.report.user._id
        }', '${req.body.report.user.firstname +
          " " +
          req.body.report.user.lastname}', 'deleted a report', '${
          req.body.report.name
        }')`
      )
    );
});

router.post("/", (req, res) => {
  let userid = req.body.user;

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(3)
      .required(),
    estimation: Joi.string()
      .min(3)
      .required(),
    spent: Joi.string()
      .min(3)
      .required(),
    userid: Joi.object().required(),
    confirmed: Joi.boolean().required(),
    requested: Joi.boolean()
  });

  let data = {
    name: req.body.data.name,
    estimation: req.body.data.estimation,
    spent: req.body.data.spent,
    description: req.body.data.description,
    userid: userid,
    confirmed: false,
    requested: false
  };

  const result = schema.validate(data);

  if (result.error) {
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
  } else {
    pool
      .query(
        `INSERT INTO reports values('${uuidv1().toString()}', '${
          userid._id
        }', '${req.body.data.name}','${req.body.data.description}', '${
          req.body.data.estimation
        }', '${req.body.data.spent}', '${false}', '${req.body.user.firstname +
          " " +
          req.body.user.lastname}', '${req.body.data.requested}')`
      )
      .then(respond => {
        if (respond) {
          pool.query(
            `INSERT INTO notifications values('${uuidv1().toString()}', '${
              userid._id
            }', '${req.body.user.firstname +
              " " +
              req.body.user.lastname}', 'created a report', '${
              req.body.data.name
            }')`
          );
        } else {
          res.json({ reportCreated: false });
        }
      });
  }
});

module.exports = router;
