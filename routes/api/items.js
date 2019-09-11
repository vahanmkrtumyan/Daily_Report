const express = require("express");
const router = express.Router();
const { Client, Pool } = require("pg");
const uuidv1 = require("uuid/v1");

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

client
  .connect()
  .then(() => console.log("Connected"))
  .then(() => client.query("select * from users"))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end());

router.get("/", (req, res) => {
  res.json({ 1: "asd" });
});

router.get("/users", (req, res) => {
  res.json({ 1: "asd" });
});

router.post("/users", (req, res) => {
  let id = uuidv1();
  console.log("req.body", req.body);
  res.json(req.body);
  let a =pool.query(
    "select * from users"
    //    `INSERT INTO users(_id, firstname, lastname, username, role)values(44445, firstname, lastname, username, role)`
    // id,
    // req.body.First_Name,
    // req.body.Last_Name,
    // req.body.username,
    // req.body.role
  ).then
  console.log(a);
});

module.exports = router;
