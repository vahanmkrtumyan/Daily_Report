const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const login = require("./routes/api/login");
const reports = require("./routes/api/reports");
const notifications = require("./routes/api/notifications");
const socket = require("socket.io");

const app = express();

var cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//const connectionString = "postgressql://postgres:1990@localhost:5432/postgres";

app.use("/api/items", items);
app.use("/api/login", login);
app.use("/api/reports", reports);
app.use("/api/notifications", notifications);

const port = process.env.PORT || 5000;

let server = app.listen(port, () => `Server running on port ${port}`);

const io = socket(server);



io.on("connection", function(socket) {
 // console.log("made socket connection", socket.id);
  socket.on("report", function(data) {
    io.sockets.emit("report", data);
  });
});
