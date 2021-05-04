// implement your server here
// require your posts router and connect it here
const express = require("express");
const server = express();
const postsRouter = require("./posts/posts-router");

server.use(express.json());

server.use("/posts", postsRouter);

server.use("*", (_req, res) => {
  res
    .status(400)
    .send(
      "lol bad request \n \n Ahem, \n \n Cannot locate specified resource, please check your url"
    );
});

module.exports = server;
