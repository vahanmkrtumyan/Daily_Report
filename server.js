const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const connectionString = "postgressql://postgres:1990@localhost:5432/postgres";

// const client = new Client({
//   connectionString: connectionString
//   // user: "postgres",
//   // password: "1990"
//   // host: "Vahan",
//   // port: 5432,
//   // database: "postgres"
// });

var client = new Client({
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

// app.get("/api/customers", (req, res) => {
//   const customers = [
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Brad", lastName: "Traversy" },
//     { id: 3, firstName: "Mary", lastName: "Swanson" }
//   ];

//   res.json(customers);
// });

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
