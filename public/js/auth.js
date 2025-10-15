// Authentication JavaScript for admin panel

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken")
  if (token) {
    showDashboard()
  }

  // Toggle between login and register forms
  document.getElementById("show-register")?.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("login-form").style.display = "none"
    document.getElementById("register-form").style.display = "block"
    clearMessage("auth-message")
  })

  document.getElementById("show-login")?.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("register-form").style.display = "none"
    document.getElementById("login-form").style.display = "block"
    clearMessage("auth-message")
  })

  // Handle login form submission
  document.getElementById("login")?.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Save token to localStorage
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("adminEmail", data.admin.email)
        showMessage("auth-message", "Login successful!", "success")
        setTimeout(() => showDashboard(), 1000)
      } else {
        showMessage("auth-message", data.error, "error")
      }
    } catch (error) {
      showMessage("auth-message", "Network error. Please try again.", "error")
    }
  })

  // Handle register form submission
  document.getElementById("register")?.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.getElementById("register-email").value
    const password = document.getElementById("register-password").value

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        showMessage("auth-message", "Registration successful! Please login.", "success")
        setTimeout(() => {
          document.getElementById("register-form").style.display = "none"
          document.getElementById("login-form").style.display = "block"
        }, 1500)
      } else {
        showMessage("auth-message", data.error, "error")
      }
    } catch (error) {
      showMessage("auth-message", "Network error. Please try again.", "error")
    }
  })

  // Handle logout
  document.getElementById("logout-btn")?.addEventListener("click", (e) => {
    e.preventDefault()
    logout()
  })
})

/**
 * Show dashboard and hide auth forms
 */
function showDashboard() {
  document.getElementById("auth-section").style.display = "none"
  document.getElementById("admin-dashboard").style.display = "block"
  document.getElementById("logout-btn").style.display = "inline"
}

/**
 * Logout user
 */
function logout() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("adminEmail")
  location.reload()
}

/**
 * Get auth token from localStorage
 */
function getAuthToken() {
  return localStorage.getItem("authToken")
}

/**
 * Show message to user
 */
function showMessage(elementId, message, type) {
  const messageEl = document.getElementById(elementId)
  messageEl.textContent = message
  messageEl.className = `message ${type}`
  messageEl.style.display = "block"
}

/**
 * Clear message
 */
function clearMessage(elementId) {
  const messageEl = document.getElementById(elementId)
  messageEl.style.display = "none"
}
