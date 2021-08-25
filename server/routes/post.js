const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth");

//GET ALL USERS POSTS
router.get("/all", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    if (!posts) {
      return res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//GET POSTS OF THE LOGGED IN USER
router.get("/my", auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.user.id,
    });
    if (!posts) {
      return res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//GET POSTS OF A SPECIFIC USER
router.get("/user/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.id,
    });
    if (!posts) {
      return res.status(400).json({ msg: "No posts found" });
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//GET A POST
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//CREATE A POST
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("text", "Text is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, text } = req.body;
      const user = await User.findById(req.user.id).select("-password");

      let data = new Post({
        title,
        text,
        name: user.name,
        user: req.user.id,
      });
      await data.save();
      res.json(data);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

//EDIT A POST
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, text } = req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not autorized" });
    }
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    post.title = title;
    post.text = text;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//DELETE A POST
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not autorized" });
    }
    await post.remove();
    res.send("Post deleted");
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//LIKE A POST
router.post("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    if (
      post.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      post.likes.unshift({ user: req.user.id });
      const index = post.dislikes.indexOf(req.user.id);
      post.dislikes.splice(index, 1);
    } else {
      post.likes.unshift({ user: req.user.id });
    }

    await post.save();
    res.send(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//DISLIKE A POST
router.post("/dislike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    if (
      post.dislikes.filter((dislike) => dislike.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already disliked" });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      post.dislikes.unshift({ user: req.user.id });
      const index = post.likes.indexOf(req.user.id);
      post.likes.splice(index, 1);
    } else {
      post.dislikes.unshift({ user: req.user.id });
    }

    await post.save();
    res.send(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//ADD A COMMENT
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ msg: "No post found" });
      }
      let comment = {
        text: req.body.text,
        user: req.user.id,
        name: user.name,
      };
      post.comments.unshift(comment);
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(400).json({ msg: "No post found" });
      }
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//EDIT A COMMENT
router.put("/comment/:id/:commentId", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    const comment = post.comments.find((comment) => {
      return comment.id == req.params.id;
    });
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    post.comments.forEach((comment) => {
      if (comment.id == req.params.commentId) {
        if (comment.user != req.user.id) {
          return res.status(400).json({ msg: "Not authorized" });
        }
        comment.text = req.body.text;
      }
    });
    await post.save();
    res.send(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

//DELETE COMMENT
router.delete("/comment/:id/:commentId", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: "No post found" });
    }
    const comment = post.comments.find((comment) => {
      return comment.id == req.params.commentId;
    });
    if (!comment) {
      return res.status(400).json({ msg: "Comment not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const index = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(index, 1);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "No post found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
