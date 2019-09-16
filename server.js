//const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const login = require("./routes/api/login");
const reports = require("./routes/api/reports");
const notifications = require("./routes/api/notifications");
const socket = require("socket.io");

var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(5000);

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

app.use("/api/users", users);
app.use("/api/login", login);
app.use("/api/reports", reports);
app.use("/api/notifications", notifications);

// const port = process.env.PORT || 5000;

// let server = app.listen(port, () => `Server running on port ${port}`);

// const io = socket.listen(server);

let userss = [];
let connections = [];

io.on("connection", function(socket) {
  let user = socket.handshake.query._id
    ? { user: socket.handshake.query, id: socket.id }
    : null;

  //console.log(user);
  let newusers = userss.filter(function(e) {
    return e !== null;
  });

  if (user) {
    if (newusers.filter(e => e.user._id === user.user._id).length === 0) {
      userss.push(user);
    }
  }

  // console.log(newusers);

  socket.on("report", function(data) {
    if (data.user.role === "Developer") {
      socket.emit("report", data);
      console.log("devel");
    }
    console.log("adsdf");
    // console.log("report", data);
    socket.emit("report", data);
  });
});
