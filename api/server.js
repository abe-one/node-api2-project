const express = require("express");
const server = express();
const postsRouter = require("./posts/posts-router");

server.use(express.json());

server.use("/api/posts", postsRouter);

server.use("*", (_req, res) => {
  res
    .status(404)
    .send("Cannot locate specified resource, please check your url");
});

module.exports = server;
