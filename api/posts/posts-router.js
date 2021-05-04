const Post = require("./posts-model");
const router = require("express").Router();

router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
