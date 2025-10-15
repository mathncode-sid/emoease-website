// Admin dashboard JavaScript for managing posts and submissions

let editingPostId = null;
let currentSubmissionFilter = 'pending';

// Declare getAuthToken function
function getAuthToken() {
  // Implementation to get auth token
  return localStorage.getItem("authToken");
}

// Declare showMessage function
function showMessage(elementId, message, type) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = message;
  messageElement.className = `message ${type}`;
}

// Declare clearMessage function
function clearMessage(elementId) {
  const messageElement = document.getElementById(elementId);
  messageElement.textContent = "";
  messageElement.className = "message";
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize admin tabs
  initializeAdminTabs();
  
  // Only load content if dashboard is visible (user is logged in)
  if (document.getElementById("admin-dashboard").style.display !== "none") {
    loadAdminPosts();
    loadSubmissions();
  }

  // Handle post form submission
  document.getElementById("post-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("post-title").value;
    const author = document.getElementById("post-author").value;
    const content = document.getElementById("post-content").value;
    const category = document.getElementById("post-category").value;
    const tags = document.getElementById("post-tags").value;

    const token = getAuthToken();
    if (!token) {
      showMessage("post-message", "Please login first", "error");
      return;
    }

    try {
      const url = editingPostId ? `/api/posts/${editingPostId}` : "/api/posts";
      const method = editingPostId ? "PUT" : "POST";

      const postData = {
        title,
        author,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: 'published',
        createdAt: new Date().toISOString()
      };

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

// Additional functions for submission management
function initializeAdminTabs() {
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTab + '-tab') {
          content.classList.add('active');
        }
      });
      
      // Load content based on tab
      if (targetTab === 'submissions') {
        loadSubmissions();
      } else if (targetTab === 'published') {
        loadAdminPosts();
      }
    });
  });

  // Handle submission filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      currentSubmissionFilter = filter;
      
      // Update active filter
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      loadSubmissions();
    });
  });
}

async function loadSubmissions() {
  const container = document.getElementById('submissions-container');
  if (!container) return;

  try {
    // Get admin token
    const token = localStorage.getItem('authToken');
    if (!token) {
      container.innerHTML = '<div class="no-submissions"><p>Authentication required. Please login.</p></div>';
      return;
    }

    // Fetch submissions from API
    const url = currentSubmissionFilter === 'all' 
      ? '/api/admin/submissions' 
      : `/api/admin/submissions?status=${currentSubmissionFilter}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const submissions = data.submissions || [];

    if (submissions.length === 0) {
      container.innerHTML = `
        <div class="no-submissions">
          <p>No submissions found for the selected filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = submissions.map(submission => `
      <div class="submission-item" data-id="${submission.id}">
        <div class="submission-header">
          <div>
            <h4 class="submission-title">${submission.title}</h4>
            <div class="submission-meta">
              <span class="submission-author">By: ${submission.author}</span>
              <span class="user-post-category">${formatCategory(submission.category)}</span>
              <span class="post-status ${submission.status}">${submission.status}</span>
              <span>${formatDate(submission.createdAt)}</span>
            </div>
          </div>
        </div>
        <div class="submission-content" id="content-${submission.id}">
          ${submission.content.length > 300 ? 
            submission.content.substring(0, 300) + '...' : 
            submission.content}
        </div>
        ${submission.content.length > 300 ? `
          <button class="read-more-btn" onclick="toggleContent(${submission.id})">
            Read More
          </button>
        ` : ''}
        ${submission.tags && submission.tags.length > 0 ? `
          <div class="submission-tags">
            ${submission.tags.map(tag => `<span class="submission-tag">#${tag}</span>`).join('')}
          </div>
        ` : ''}
        <div class="submission-actions">
          ${submission.status === 'pending' ? `
            <button class="btn btn-approve" onclick="approveSubmission(${submission.id})">
              Approve & Publish
            </button>
            <button class="btn btn-reject" onclick="showRejectModal(${submission.id})">
              Reject
            </button>
          ` : ''}
          <button class="btn btn-secondary" onclick="viewSubmissionDetails(${submission.id})">
            View Details
          </button>
          <button class="btn btn-danger" onclick="deleteSubmission(${submission.id})">
            Delete
          </button>
        </div>
        ${submission.adminFeedback ? `
          <div class="admin-feedback">
            <h5>Previous Feedback:</h5>
            <p>${submission.adminFeedback}</p>
          </div>
        ` : ''}
      </div>
    `).join('');

  } catch (error) {
    console.error('Error loading submissions:', error);
    container.innerHTML = '<p class="error">Failed to load submissions</p>';
  }
}

function getAllUserSubmissions() {
  // Simulate getting submissions from all users
  const submissions = [];
  
  // Get submissions from localStorage (in a real app, this would be an API call)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('userPosts_')) {
      const userPosts = JSON.parse(localStorage.getItem(key));
      submissions.push(...userPosts);
    }
  }
  
  // Sort by creation date (newest first)
  return submissions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Global functions for submission management
window.toggleContent = function(submissionId) {
  const contentEl = document.getElementById(`content-${submissionId}`);
  const btnEl = contentEl.nextElementSibling;
  
  if (contentEl.classList.contains('expanded')) {
    contentEl.classList.remove('expanded');
    btnEl.textContent = 'Read More';
    // Get original content and truncate
    const submission = getAllUserSubmissions().find(s => s.id === submissionId);
    if (submission) {
      contentEl.innerHTML = submission.content.substring(0, 300) + '...';
    }
  } else {
    contentEl.classList.add('expanded');
    btnEl.textContent = 'Read Less';
    // Get full content
    const submission = getAllUserSubmissions().find(s => s.id === submissionId);
    if (submission) {
      contentEl.innerHTML = submission.content;
    }
  }
};

window.approveSubmission = function(submissionId) {
  if (confirm('Are you sure you want to approve and publish this submission?')) {
    updateSubmissionStatus(submissionId, 'approved', 'Great post! Thanks for contributing to our community.');
  }
};

window.showRejectModal = function(submissionId) {
  const modal = createFeedbackModal(submissionId, 'reject');
  document.body.appendChild(modal);
};

window.deleteSubmission = function(submissionId) {
  if (confirm('Are you sure you want to permanently delete this submission?')) {
    removeSubmissionFromStorage(submissionId);
    loadSubmissions();
    showMessage('post-message', 'Submission deleted successfully', 'success');
  }
};

window.viewSubmissionDetails = function(submissionId) {
  // In a real app, this would open a detailed view
  const submission = getAllUserSubmissions().find(s => s.id === submissionId);
  if (submission) {
    alert(`Title: ${submission.title}\nAuthor: ${submission.author}\nCategory: ${submission.category}\nSubmitted: ${formatDate(submission.createdAt)}`);
  }
};

function createFeedbackModal(submissionId, action) {
  const modal = document.createElement('div');
  modal.className = 'feedback-modal show';
  modal.innerHTML = `
    <div class="feedback-content">
      <h3>${action === 'reject' ? 'Reject Submission' : 'Provide Feedback'}</h3>
      <p>Please provide feedback to help the author improve their submission:</p>
      <textarea class="feedback-textarea" placeholder="Explain why you're rejecting this submission and provide constructive feedback..."></textarea>
      <div class="feedback-actions">
        <button class="btn btn-secondary" onclick="closeFeedbackModal()">Cancel</button>
        <button class="btn btn-${action === 'reject' ? 'reject' : 'primary'}" onclick="submitFeedback(${submissionId}, '${action}')">
          ${action === 'reject' ? 'Reject' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  `;
  
  return modal;
}

window.closeFeedbackModal = function() {
  const modal = document.querySelector('.feedback-modal');
  if (modal) {
    modal.remove();
  }
};

window.submitFeedback = function(submissionId, action) {
  const textarea = document.querySelector('.feedback-textarea');
  const feedback = textarea.value.trim();
  
  if (!feedback) {
    alert('Please provide feedback before submitting.');
    return;
  }
  
  const status = action === 'reject' ? 'rejected' : 'pending';
  updateSubmissionStatus(submissionId, status, feedback);
  closeFeedbackModal();
};

async function updateSubmissionStatus(submissionId, status, feedback) {
  try {
    // Get admin token
    const token = localStorage.getItem('authToken');
    if (!token) {
      showMessage('admin-message', 'Authentication required. Please login.', 'error');
      return;
    }

    // Update submission via API
    const response = await fetch(`/api/admin/submissions/${submissionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
        feedback: feedback
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Show success message
    showMessage('admin-message', `Submission ${status} successfully!`, 'success');
    
    // Reload submissions to reflect changes
    loadSubmissions();
    
  } catch (error) {
    console.error('Error updating submission status:', error);
    showMessage('admin-message', 'Failed to update submission. Please try again.', 'error');
  }
  
  loadSubmissions();
  showMessage('post-message', `Submission ${status} successfully`, 'success');
}

function addToPublishedPosts(post) {
  // Add approved post to published posts storage
  const publishedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
  const publishedPost = {
    ...post,
    id: Date.now(), // New ID for published post
    publishedAt: new Date().toISOString()
  };
  
  publishedPosts.unshift(publishedPost);
  localStorage.setItem('posts', JSON.stringify(publishedPosts));
}

function removeSubmissionFromStorage(submissionId) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('userPosts_')) {
      const userPosts = JSON.parse(localStorage.getItem(key));
      const filteredPosts = userPosts.filter(p => p.id !== submissionId);
      
      if (filteredPosts.length !== userPosts.length) {
        localStorage.setItem(key, JSON.stringify(filteredPosts));
        break;
      }
    }
  }
}

function formatCategory(category) {
  return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
