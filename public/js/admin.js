// Admin dashboard JavaScript for managing posts

let editingPostId = null

// Declare getAuthToken function
function getAuthToken() {
  // Implementation to get auth token
  return localStorage.getItem("authToken")
}

// Declare showMessage function
function showMessage(elementId, message, type) {
  const messageElement = document.getElementById(elementId)
  messageElement.textContent = message
  messageElement.classList.add(type)
}

// Declare clearMessage function
function clearMessage(elementId) {
  const messageElement = document.getElementById(elementId)
  messageElement.textContent = ""
  messageElement.classList.remove("success", "error")
}

document.addEventListener("DOMContentLoaded", () => {
  // Only load posts if dashboard is visible (user is logged in)
  if (document.getElementById("admin-dashboard").style.display !== "none") {
    loadAdminPosts()
  }

  // Handle post form submission
  document.getElementById("post-form")?.addEventListener("submit", async (e) => {
    e.preventDefault()

    const title = document.getElementById("post-title").value
    const author = document.getElementById("post-author").value
    const content = document.getElementById("post-content").value

    const token = getAuthToken()
    if (!token) {
      showMessage("post-message", "Please login first", "error")
      return
    }

    try {
      const url = editingPostId ? `/api/posts/${editingPostId}` : "/api/posts"

      const method = editingPostId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, content }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage("post-message", data.message, "success")
        document.getElementById("post-form").reset()
        editingPostId = null
        updateFormTitle("Create New Post")
        document.getElementById("submit-btn").textContent = "Create Post"
        document.getElementById("cancel-btn").style.display = "none"
        loadAdminPosts()
      } else {
        showMessage("post-message", data.error, "error")
      }
    } catch (error) {
      showMessage("post-message", "Network error. Please try again.", "error")
    }
  })

  // Handle cancel button
  document.getElementById("cancel-btn")?.addEventListener("click", () => {
    cancelEdit()
  })
})

/**
 * Load all posts for admin management
 */
async function loadAdminPosts() {
  const container = document.getElementById("admin-posts-container")

  try {
    const response = await fetch("/api/posts")

    if (!response.ok) {
      throw new Error("Failed to load posts")
    }

    const posts = await response.json()

    if (posts.length === 0) {
      container.innerHTML = '<p class="loading">No posts yet. Create your first post above!</p>'
      return
    }

    container.innerHTML = posts.map((post) => createAdminPostItem(post)).join("")

    // Add event listeners to edit and delete buttons
    document.querySelectorAll(".edit-post-btn").forEach((btn) => {
      btn.addEventListener("click", () => editPost(btn.dataset.postId))
    })

    document.querySelectorAll(".delete-post-btn").forEach((btn) => {
      btn.addEventListener("click", () => deletePost(btn.dataset.postId))
    })
  } catch (error) {
    container.innerHTML = `<p class="error">Error loading posts: ${error.message}</p>`
  }
}

/**
 * Create HTML for admin post item
 */
function createAdminPostItem(post) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return `
    <div class="admin-post-item">
      <h4>${escapeHtml(post.title)}</h4>
      <div class="post-meta">
        <span>By ${escapeHtml(post.author)}</span>
        <span>${date}</span>
      </div>
      <div class="admin-post-actions">
        <button class="btn btn-secondary edit-post-btn" data-post-id="${post.id}">Edit</button>
        <button class="btn btn-danger delete-post-btn" data-post-id="${post.id}">Delete</button>
      </div>
    </div>
  `
}

/**
 * Edit a post
 */
async function editPost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`)

    if (!response.ok) {
      throw new Error("Failed to load post")
    }

    const post = await response.json()

    // Fill form with post data
    document.getElementById("post-title").value = post.title
    document.getElementById("post-author").value = post.author
    document.getElementById("post-content").value = post.content

    editingPostId = postId
    updateFormTitle("Edit Post")
    document.getElementById("submit-btn").textContent = "Update Post"
    document.getElementById("cancel-btn").style.display = "inline-block"

    // Scroll to form
    document.getElementById("post-form").scrollIntoView({ behavior: "smooth" })
  } catch (error) {
    showMessage("post-message", "Error loading post for editing", "error")
  }
}

/**
 * Delete a post
 */
async function deletePost(postId) {
  if (!confirm("Are you sure you want to delete this post?")) {
    return
  }

  const token = getAuthToken()
  if (!token) {
    showMessage("post-message", "Please login first", "error")
    return
  }

  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      showMessage("post-message", data.message, "success")
      loadAdminPosts()
    } else {
      showMessage("post-message", data.error, "error")
    }
  } catch (error) {
    showMessage("post-message", "Network error. Please try again.", "error")
  }
}

/**
 * Cancel editing
 */
function cancelEdit() {
  document.getElementById("post-form").reset()
  editingPostId = null
  updateFormTitle("Create New Post")
  document.getElementById("submit-btn").textContent = "Create Post"
  document.getElementById("cancel-btn").style.display = "none"
  clearMessage("post-message")
}

/**
 * Update form title
 */
function updateFormTitle(title) {
  document.getElementById("form-title").textContent = title
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}
