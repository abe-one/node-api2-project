const { route } = require("../server");
const Post = require("./posts-model");
const router = require("express").Router();

router.get("/", (_req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The posts information could not be retrieved" });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    Post.insert(req.body)
      .then((newId) => {
        Post.findById(newId.id)
          .then((post) => res.status(201).json(post))
          .catch(() => res.status(201).json(newId));
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error while saving the post" });
      });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await Post.findById(id)
    .then((post) => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      } else {
        const { title, contents } = req.body;
        if (!title || !contents) {
          res.status(400).json({
            message: "Please provide title and contents for the post",
          });
        } else {
          Post.update(id, req.body)
            .then((result) =>
              result
                ? res.status(200).json(post)
                : res.status(500).json({
                    message: "The post information could not be modified",
                  })
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                message: "The post information could not be modified",
              });
            });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The post information could not be modified" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.remove(id)
    .then((result) => {
      result
        ? res.status(200).json({
            message: `The post with the specified ID has been deleted`,
          })
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "The post could not be removed" });
    });
});

router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Post.findPostComments(id)
    .then((result) => {
      result.length === 0
        ? res.status(404).json({
            message: "The post with the specified ID does not contain comments",
          })
        : res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "The information could not be retrieved" });
    });
});

module.exports = router;
