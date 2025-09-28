// Post controller for blog management
const Post = require("../models/Post")

// Input validation helpers
const validatePostInput = (title, content) => {
  const errors = []

  if (!title || title.trim().length === 0) {
    errors.push("Title is required")
  } else if (title.length > 500) {
    errors.push("Title must be less than 500 characters")
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required")
  }

  return errors
}

// Create new post (Admin only)
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body
    const author = req.admin.name // From auth middleware

    // Validate input
    const validationErrors = validatePostInput(title, content)
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      })
    }

    // Create post
    const newPost = await Post.create(title.trim(), content.trim(), author)

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { post: newPost },
    })
  } catch (error) {
    console.error("Create post error:", error)
    res.status(500).json({
      success: false,
      message: "Error creating post",
    })
  }
}

// Get all posts (Public)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()

    res.json({
      success: true,
      data: {
        posts,
        count: posts.length,
      },
    })
  } catch (error) {
    console.error("Get all posts error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
    })
  }
}

// Get single post by ID (Public)
const getPostById = async (req, res) => {
  try {
    const { id } = req.params

    // Validate ID
    if (!id || isNaN(Number.parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid post ID is required",
      })
    }

    const post = await Post.findById(Number.parseInt(id))

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    res.json({
      success: true,
      data: { post },
    })
  } catch (error) {
    console.error("Get post by ID error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching post",
    })
  }
}

// Update post (Admin only)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const author = req.admin.name // From auth middleware

    // Validate ID
    if (!id || isNaN(Number.parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid post ID is required",
      })
    }

    // Validate input
    const validationErrors = validatePostInput(title, content)
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      })
    }

    // Check if post exists
    const existingPost = await Post.findById(Number.parseInt(id))
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    // Update post
    const updatedPost = await Post.update(Number.parseInt(id), title.trim(), content.trim(), author)

    res.json({
      success: true,
      message: "Post updated successfully",
      data: { post: updatedPost },
    })
  } catch (error) {
    console.error("Update post error:", error)
    res.status(500).json({
      success: false,
      message: "Error updating post",
    })
  }
}

// Delete post (Admin only)
const deletePost = async (req, res) => {
  try {
    const { id } = req.params

    // Validate ID
    if (!id || isNaN(Number.parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: "Valid post ID is required",
      })
    }

    // Check if post exists
    const existingPost = await Post.findById(Number.parseInt(id))
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    // Delete post
    await Post.delete(Number.parseInt(id))

    res.json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.error("Delete post error:", error)
    res.status(500).json({
      success: false,
      message: "Error deleting post",
    })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
}
