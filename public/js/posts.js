// Public posts display JavaScript

document.addEventListener("DOMContentLoaded", () => {
  loadPosts()
})

/**
 * Load and display all posts
 */
async function loadPosts() {
  const container = document.getElementById("posts-container")

  try {
    const response = await fetch("/api/posts")

    if (!response.ok) {
      throw new Error("Failed to load posts")
    }

    const posts = await response.json()

    if (posts.length === 0) {
      container.innerHTML = '<p class="loading">No posts yet. Check back soon!</p>'
      return
    }

    // Display posts
    container.innerHTML = posts.map((post) => createPostCard(post)).join("")

    // Add click handlers to post cards
    document.querySelectorAll(".post-card").forEach((card) => {
      card.addEventListener("click", () => {
        const postId = card.dataset.postId
        window.location.href = `/post.html?id=${postId}`
      })
    })
  } catch (error) {
    container.innerHTML = `<p class="error">Error loading posts: ${error.message}</p>`
  }
}

/**
 * Create HTML for a post card
 */
function createPostCard(post) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create excerpt (first 150 characters)
  const excerpt = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content

  return `
    <div class="post-card" data-post-id="${post.id}">
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">
        <span class="author">By ${escapeHtml(post.author)}</span>
        <span class="date">${date}</span>
      </div>
      <p class="post-excerpt">${escapeHtml(excerpt)}</p>
    </div>
  `
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}
