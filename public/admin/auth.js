// Authentication utilities for admin dashboard

// Check if user is authenticated
function isAuthenticated() {
  const token = localStorage.getItem("adminToken")
  const user = localStorage.getItem("adminUser")
  return token && user
}

// Get authentication headers for API requests
function getAuthHeaders() {
  const token = localStorage.getItem("adminToken")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// Make authenticated API request
async function authenticatedFetch(url, options = {}) {
  const headers = getAuthHeaders()

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  })

  // Handle unauthorized responses
  if (response.status === 401) {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "login.html"
    return
  }

  return response
}

// Logout function
function logout() {
  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminUser")
  window.location.href = "login.html"
}

// Check authentication on page load for protected pages
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html"
  }
}
