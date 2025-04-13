const Post = require("../models/Post");
const Application = require("../models/Application"); // ✅ required to count applications

// Create a new post
const createPost = async (req, res) => {
  try {
    const {
      jobRole,
      description,
      skills,
      duration,
      stipend,
      openings,
      entrepreneurEmail,
    } = req.body;

    if (!entrepreneurEmail) {
      return res.status(400).json({ message: "Entrepreneur email is required" });
    }

    const newPost = new Post({
      jobRole,
      description,
      skills,
      duration,
      stipend,
      openings,
      entrepreneurEmail,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all posts with application counts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    // Attach application count for each post
    const postsWithApplicationCount = await Promise.all(
      posts.map(async (post) => {
        const applicationCount = await Application.countDocuments({ postId: post._id });

        return {
          ...post._doc, // spread original post data
          applicationCount, // attach application count
        };
      })
    );

    res.status(200).json(postsWithApplicationCount);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
