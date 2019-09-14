const express = require("express");
const router = express.Router();
const { Client, Pool } = require("pg");
const uuidv1 = require("uuid/v1");
const Joi = require("@hapi/joi");

var client = new Client({
  host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
  user: "postgres",
  password: "postgres",
  database: "postgres"
});

var pool = new Pool({
  host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
  user: "postgres",
  password: "postgres",
  database: "postgres"
});

client.connect();

router.put("/", (req, res) => {
  console.log(req.body);

  pool
    .query(
      `UPDATE reports SET name = '${req.body.name}', estimation = '${
        req.body.estimation
      }', spent = '${req.body.spent}', description = '${
        req.body.description
      }', confirmed = '${req.body.confirmed}', requested = '${
        req.body.requested
      }' WHERE _id = '${req.body._id}'`
    )
    .then(results => res.json(results.rows));
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
  client
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
  let userid = JSON.parse(req.body.user);
  console.log(req.body);
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
    name: req.body.name,
    estimation: req.body.estimation,
    spent: req.body.spent,
    description: req.body.description,
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
        }', '${req.body.name}','${req.body.description}', '${
          req.body.estimation
        }', '${req.body.spent}', '${false}', '${JSON.parse(req.body.user)
          .firstname +
          " " +
          JSON.parse(req.body.user).lastname}', '${req.body.requested}')`
      )
      .then(respond => {
        if (respond) {
          pool.query(
            `INSERT INTO notifications values('${uuidv1().toString()}', '${
              userid._id
            }', '${JSON.parse(req.body.user).firstname +
              " " +
              JSON.parse(req.body.user).lastname}', 'created a report', '${
              req.body.name
            }')`
          );
        } else {
          res.json({ reportCreated: false });
        }
      });
  }
});

module.exports = router;
