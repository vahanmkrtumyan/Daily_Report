const express = require("express");
const router = express.Router();
const pool = require("./pool");
//const { Pool } = require("pg");
const uuidv1 = require("uuid/v1");
const Joi = require("@hapi/joi");

// var pool = new Pool({
//   host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
//   user: "postgres",
//   password: "postgres",
//   database: "postgres"
// });

router.put("/", (req, res) => {
  console.log(req.body.id);

  pool
    .query(
      `UPDATE users SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', username = '${req.body.username}', password = '${req.body.password}', role = '${req.body.role}' WHERE _id = '${req.body._id}'`
    )
    .then(results => res.json(results.rows));
});

router.get("/", (req, res) => {
  console.log(JSON.parse(req.query.user));
  JSON.parse(req.query.user).role === "Admin"
    ? pool.query("select * from users").then(results => res.json(results.rows))
    : res.send([]);
});

router.delete("/", (req, res) => {
  pool
    .query(`DELETE FROM users WHERE _id = '${req.body.id}'`)
    .then(results => res.json(results.rows));
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .required(),
    lastname: Joi.string()
      .min(3)
      .required(),
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    role: Joi.string().required()
  });

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    pool.query(
      `SELECT * FROM users WHERE username = '${req.body.username}' limit 1`,
      //   `SELECT EXISTS(SELECT 1 FROM users WHERE username='asdasd')`,
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result.rows[0]) {
          return res.json({ userExists: true });
        } else {
          pool.query(
            `INSERT INTO users values('${req.body.firstname}', '${
              req.body.lastname
            }', '${uuidv1().toString()}', '${req.body.password}', '${
              req.body.username
            }', '${req.body.role}');`,
            (error, result) => {
              if (error) res.send(error);
              res.json({ userCreated: true });
            }
          );
        }
      }
    );
  }
});

module.exports = router;
