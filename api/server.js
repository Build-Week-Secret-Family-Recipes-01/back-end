const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const session = require("express-session");
const Store = require("connect-session-knex")(session);

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const recipesRouter = require("./recipes/recipes-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// server.use(
//   session({
//     name: "chocolatechip",
//     secret: process.env.SECRET || "keep it secret",
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       secure: false,
//       httpOnly: false,
//     },
//     rolling: true,
//     resave: false,
//     saveUninitialized: false,
//     store: new Store({
//       knex: require("./data/db-config"),
//       tablename: "sessions",
//       sidfieldname: "sid",
//       createtable: true,
//       clearInterval: 1000 * 60 * 60,
//     }),
//   })
// );

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/recipes", recipesRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
