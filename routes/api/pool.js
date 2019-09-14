const { Pool } = require("pg");

var pool = new Pool({
    host: "postgres.cheevgkmqkgg.us-east-2.rds.amazonaws.com",
    user: "postgres",
    password: "postgres",
    database: "postgres"
  });

  module.exports = pool