const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");

const app = express();

var cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connectionString = "postgressql://postgres:1990@localhost:5432/postgres";

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port}`);
