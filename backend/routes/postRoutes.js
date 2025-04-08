const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");

const router = express.Router();

// POST route to create a post
router.post("/", createPost);

// GET route to fetch posts
router.get("/", getAllPosts);

module.exports = router;
