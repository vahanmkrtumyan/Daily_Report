const express = require("express");
const router = express.Router();
const { Client, Pool } = require("pg");
const uuidv1 = require("uuid/v1");
const Joi = require("@hapi/joi");

var pool = new Pool({
  host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
  user: "postgres",
  password: "postgres",
  database: "postgres"
});

pool.connect();


router.put("/", (req, res) => {
  console.log(req.body.username);
  pool
    .query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    .then(result => (result.rows[0] &&
      result.rows[0].password )=== req.body.password
        ? res.json(result.rows[0])
        : res.status(400).send("wrong username or password")
    );
});

module.exports = router;
