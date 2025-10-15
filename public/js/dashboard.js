// User Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Dashboard script loaded'); // Debug log
  
  const authSection = document.getElementById('auth-section');
  const userDashboard = document.getElementById('user-dashboard');
  const logoutBtn = document.getElementById('logout-btn');
  const userPostsContainer = document.getElementById('user-posts-container');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const clearFormBtn = document.getElementById('clear-form');

  let currentUser = null;
  let userPosts = [];
  let currentFilter = 'all';

  // Check if user is logged in
  checkUserAuth();

  // Listen for login events from auth.js
  window.addEventListener('userLoggedIn', function() {
    console.log('User logged in event received'); // Debug log
    checkUserAuth();
  });

  // Set up form event listener using event delegation for better reliability
  document.addEventListener('submit', function(e) {
    if (e.target.id === 'user-post-form') {
      handleUserPostSubmit(e);
    }
  });

  // Clear form button
  if (clearFormBtn) {
    clearFormBtn.addEventListener('click', clearPostForm);
  }

  // Tab filtering
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const status = this.dataset.status;
      filterPosts(status);
      
      // Update active tab
      tabButtons.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      logout();
    });
  }

  function checkUserAuth() {
    // Check for user token and data
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    console.log('Checking user auth, userToken:', userToken, 'userData:', userData); // Debug log
    
    if (userToken && userData) {
      currentUser = JSON.parse(userData);
      console.log('User is logged in:', currentUser); // Debug log
      showUserDashboard();
      loadUserPosts();
    } else {
      console.log('No user logged in'); // Debug log
      showAuthSection();
    }
  }

  function showUserDashboard() {
    console.log('Showing user dashboard'); // Debug log
    authSection.style.display = 'none';
    userDashboard.style.display = 'block';
    logoutBtn.style.display = 'block';
    
    // Update welcome message
    const dashboardHeader = document.querySelector('.dashboard-header h2');
    if (dashboardHeader && currentUser) {
      dashboardHeader.textContent = `Welcome back, ${currentUser.name || currentUser.email}!`;
    }
  }

  function showAuthSection() {
    authSection.style.display = 'block';
    userDashboard.style.display = 'none';
    logoutBtn.style.display = 'none';
  }

  function logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    currentUser = null;
    userPosts = [];
    showAuthSection();
    showMessage('user-post-message', 'You have been logged out successfully.', 'success');
  }

  async function handleUserPostSubmit(e) {
    e.preventDefault();
    console.log('Form submitted!'); // Debug log

    const title = document.getElementById('user-post-title').value;
    const category = document.getElementById('user-post-category').value;
    const content = document.getElementById('user-post-content').value;
    const tagsInput = document.getElementById('user-post-tags').value;
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    console.log('Form data:', { title, category, content, tags }); // Debug log
    console.log('Current user:', currentUser); // Debug log
    console.log('UserToken in localStorage:', localStorage.getItem('userToken')); // Debug log
    console.log('UserData in localStorage:', localStorage.getItem('userData')); // Debug log

    if (!title || !category || !content) {
      showMessage('user-post-message', 'Please fill in all required fields.', 'error');
      return;
    }

    if (!currentUser) {
      // Try to recover user data from localStorage
      const userData = localStorage.getItem('userData');
      const userToken = localStorage.getItem('userToken');
      
      if (userData && userToken) {
        console.log('Recovering user data from localStorage'); // Debug log
        currentUser = JSON.parse(userData);
        console.log('Recovered currentUser:', currentUser); // Debug log
      } else {
        showMessage('user-post-message', 'You must be logged in to submit a post.', 'error');
        return;
      }
    }

    try {
      // Get user token
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        showMessage('user-post-message', 'Authentication token not found. Please login again.', 'error');
        return;
      }

      // Submit post to API
      const response = await fetch('/api/users/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category: category,
          tags: tags
        })
      });

      const data = await response.json();
      console.log('API response:', data); // Debug log

      if (response.ok) {
        // Clear form
        clearPostForm();
        
        // Show success message
        showMessage('user-post-message', 'Your post has been submitted for review! Our team will review it within 24-48 hours.', 'success');
        
        // Reload posts
        loadUserPosts();
      } else {
        showMessage('user-post-message', data.error || 'Failed to submit post. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting post:', error); // Debug log
      showMessage('user-post-message', 'Network error. Please try again.', 'error');
    }
  }

  function clearPostForm() {
    document.getElementById('user-post-title').value = '';
    document.getElementById('user-post-category').value = '';
    document.getElementById('user-post-content').value = '';
    document.getElementById('user-post-tags').value = '';
  }

  async function loadUserPosts() {
    if (!currentUser) return;

    try {
      // Get user token
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.log('No user token found'); // Debug log
        return;
      }

      // Fetch posts from API
      const response = await fetch('/api/users/posts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        userPosts = data.posts || [];
        console.log('Loaded user posts from API:', userPosts); // Debug log
      } else {
        console.error('Failed to load posts:', response.status);
        userPosts = [];
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      userPosts = [];
    }

    displayUserPosts();
  }

  function getSampleUserPosts() {
    return [
      {
        id: 1,
        title: "My Journey with Anxiety: Finding Peace",
        category: "personal-story",
        content: "I wanted to share my experience dealing with anxiety and how I learned to manage it...",
        tags: ["anxiety", "mental-health", "personal-growth"],
        author: currentUser.name || currentUser.email,
        authorId: currentUser.id || currentUser.email,
        status: "approved",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        excerpt: "I wanted to share my experience dealing with anxiety and how I learned to manage it through therapy, mindfulness, and support...",
        adminFeedback: "Great post! Very inspiring and helpful for others going through similar experiences."
      },
      {
        id: 2,
        title: "5 Daily Habits That Changed My Mental Health",
        category: "tips-advice",
        content: "Here are five simple habits that completely transformed my mental wellbeing...",
        tags: ["wellness", "habits", "self-care"],
        author: currentUser.name || currentUser.email,
        authorId: currentUser.id || currentUser.email,
        status: "pending",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        excerpt: "Here are five simple habits that completely transformed my mental wellbeing and helped me build resilience..."
      },
      {
        id: 3,
        title: "Breaking the Stigma: Why Men Need to Talk",
        category: "mental-health-awareness",
        content: "Society often tells men to 'man up' and not show emotions...",
        tags: ["stigma", "men's-health", "awareness"],
        author: currentUser.name || currentUser.email,
        authorId: currentUser.id || currentUser.email,
        status: "rejected",
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        excerpt: "Society often tells men to 'man up' and not show emotions, but this harmful narrative needs to change...",
        adminFeedback: "Great topic, but please provide more personal examples and actionable advice. Consider adding resources for readers."
      }
    ];
  }

  function displayUserPosts() {
    const filteredPosts = currentFilter === 'all' ? userPosts : userPosts.filter(post => post.status === currentFilter);
    
    if (filteredPosts.length === 0) {
      userPostsContainer.innerHTML = `
        <div class="no-posts">
          <p>No posts found for the selected filter.</p>
          ${currentFilter === 'all' ? '<p>Start by creating your first post above!</p>' : ''}
        </div>
      `;
      return;
    }

    userPostsContainer.innerHTML = filteredPosts.map(post => `
      <div class="user-post-item">
        <div class="user-post-meta">
          <div>
            <span class="user-post-category">${formatCategory(post.category)}</span>
            <span class="post-status ${post.status}">${post.status}</span>
          </div>
          <span class="user-post-date">${formatDate(post.createdAt)}</span>
        </div>
        <h4>${post.title}</h4>
        <p class="user-post-excerpt">${post.excerpt}</p>
        ${post.tags && post.tags.length > 0 ? `
          <div class="post-tags">
            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
        ` : ''}
        <div class="user-post-actions">
          <div>
            <button class="btn btn-secondary" onclick="editPost(${post.id})">Edit</button>
            <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
          </div>
          ${post.status === 'approved' ? `<button class="btn btn-primary" onclick="viewPublishedPost(${post.id})">View Published</button>` : ''}
        </div>
        ${post.adminFeedback ? `
          <div class="admin-feedback">
            <h5>Admin Feedback:</h5>
            <p>${post.adminFeedback}</p>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  function filterPosts(status) {
    currentFilter = status;
    displayUserPosts();
  }

  function formatCategory(category) {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Global functions for post actions
  window.editPost = function(postId) {
    const post = userPosts.find(p => p.id === postId);
    if (post && post.status !== 'approved') {
      // Fill form with post data
      document.getElementById('user-post-title').value = post.title;
      document.getElementById('user-post-category').value = post.category;
      document.getElementById('user-post-content').value = post.content;
      document.getElementById('user-post-tags').value = post.tags.join(', ');
      
      // Remove the post from array (will be re-added when form is submitted)
      userPosts = userPosts.filter(p => p.id !== postId);
      localStorage.setItem('userPosts_' + currentUser.email, JSON.stringify(userPosts));
      loadUserPosts();
      
      // Scroll to form
      document.querySelector('.post-form-container').scrollIntoView({ behavior: 'smooth' });
      showMessage('user-post-message', 'Post loaded for editing. Make your changes and submit again.', 'info');
    } else {
      showMessage('user-post-message', 'Approved posts cannot be edited.', 'error');
    }
  };

  window.deletePost = function(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
      userPosts = userPosts.filter(p => p.id !== postId);
      localStorage.setItem('userPosts_' + currentUser.email, JSON.stringify(userPosts));
      loadUserPosts();
      showMessage('user-post-message', 'Post deleted successfully.', 'success');
    }
  };

  window.viewPublishedPost = function(postId) {
    // In a real app, this would navigate to the published post
    showMessage('user-post-message', 'This would navigate to your published post on the blog.', 'info');
  };

  function simulateApiCall() {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  function showMessage(containerId, message, type) {
    console.log('showMessage called:', { containerId, message, type }); // Debug log
    
    const messageContainer = document.getElementById(containerId);
    if (messageContainer) {
      messageContainer.className = `message ${type}`;
      messageContainer.textContent = message;
      messageContainer.style.display = 'block'; // Ensure it's visible
      
      console.log('Message displayed:', message); // Debug log
      
      setTimeout(() => {
        messageContainer.className = 'message';
        messageContainer.textContent = '';
        messageContainer.style.display = 'none';
      }, 5000);
    } else {
      console.error('Message container not found:', containerId); // Debug log
    }
  }
});

// Add tag styles
const style = document.createElement('style');
style.textContent = `
  .post-tags {
    margin: 1rem 0;
  }
  
  .tag {
    display: inline-block;
    background: #e6f3ff;
    color: #4a7ba7;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.25rem;
  }
  
  .no-posts {
    text-align: center;
    padding: 3rem;
    color: #4a5568;
  }
  
  .no-posts p {
    margin-bottom: 1rem;
  }
`;
document.head.appendChild(style);