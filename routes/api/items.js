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
//client.connect().then(() => console.log("Connected"));
//  .then(() => client.query("select * from users"))
//  .then(results => console.table(results.rows))
//  .catch(e => console.log(e));
// .finally(() => client.end());

router.put("/users", (req, res) => {
  console.log(req.body);

  client
    .query(
      `UPDATE users SET firstname = '${req.body.firstname}', lastname = '${req.body.lastname}', username = '${req.body.username}', password = '${req.body.password}', role = '${req.body.role}' WHERE _id = '${req.body._id}'`
    )
    .then(results => res.json(results.rows));
});

router.get("/users", (req, res) => {
  client.query("select * from users").then(results => res.json(results.rows));
});

router.delete("/users", (req, res) => {
  client
    .query(`DELETE FROM users WHERE _id = '${req.body.id}'`)
    .then(results => res.json(results.rows));
});

router.post("/users", (req, res) => {
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
