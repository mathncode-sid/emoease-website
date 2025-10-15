// Authentication JavaScript for admin panel and user dashboard

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const userToken = localStorage.getItem("userToken");
  const userData = localStorage.getItem("userData");
  
  if (token || userToken || userData) {
    showDashboard();
  }

  // Toggle between login and register forms
  document.getElementById("show-register")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    clearMessage("auth-message");
  });

  document.getElementById("show-login")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    clearMessage("auth-message");
  });

  // Handle login form submission
  document.getElementById("login")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log('Login form submitted'); // Debug log
    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    console.log('Login attempt:', { email, password: '***' }); // Debug log

    try {
      // Check if this is admin login (admin.html) or user login (dashboard.html)
      const isAdminPage = window.location.pathname.includes('admin.html');
      
      console.log('Is admin page:', isAdminPage); // Debug log
      
      if (isAdminPage) {
        // Admin login
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Save admin token to localStorage
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("adminEmail", data.admin.email);
          showMessage("auth-message", "Login successful!", "success");
          setTimeout(() => showDashboard(), 1000);
        } else {
          showMessage("auth-message", data.error, "error");
        }
      } else {
        // User login - use database API
        const response = await fetch("/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('User login response:', data); // Debug log

        if (response.ok) {
          // Save user token and data to localStorage
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          console.log('Saved user data:', data.user); // Debug log
          
          showMessage("auth-message", "Login successful!", "success");
          setTimeout(() => showDashboard(), 1000);
        } else {
          showMessage("auth-message", data.error, "error");
        }
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      showMessage("auth-message", "Network error. Please try again.", "error");
    }
  })

  // Handle register form submission
  document.getElementById("register")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log('Register form submitted'); // Debug log
    
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const name = document.getElementById("register-name")?.value;
    
    console.log('Registration attempt:', { email, name, password: '***' }); // Debug log

    try {
      // Check if this is admin registration or user registration
      const isAdminPage = window.location.pathname.includes('admin.html');
      
      if (isAdminPage) {
        // Admin registration
        const response = await fetch("/api/admin/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          showMessage("auth-message", "Registration successful! Please login.", "success");
          setTimeout(() => {
            document.getElementById("register-form").style.display = "none";
            document.getElementById("login-form").style.display = "block";
          }, 1500);
        } else {
          showMessage("auth-message", data.error, "error");
        }
      } else {
        // User registration - use database API
        const response = await fetch("/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        console.log('User registration response:', data); // Debug log
        
        if (response.ok) {
          showMessage("auth-message", "Registration successful! Please login.", "success");
          setTimeout(() => {
            document.getElementById("register-form").style.display = "none";
            document.getElementById("login-form").style.display = "block";
          }, 1500);
        } else {
          showMessage("auth-message", data.error, "error");
        }
      }
    } catch (error) {
      showMessage("auth-message", "Network error. Please try again.", "error");
    }
  });

  // Handle logout
  document.getElementById("logout-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
});

/**
 * Show dashboard and hide auth forms
 */
function showDashboard() {
  const authSection = document.getElementById("auth-section");
  const adminDashboard = document.getElementById("admin-dashboard");
  const userDashboard = document.getElementById("user-dashboard");
  const logoutBtn = document.getElementById("logout-btn");
  
  if (authSection) authSection.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline";
  
  // Show appropriate dashboard based on page
  if (adminDashboard) {
    adminDashboard.style.display = "block";
  } else if (userDashboard) {
    userDashboard.style.display = "block";
    
    // Trigger dashboard refresh if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
      // Trigger a custom event to refresh the dashboard
      window.dispatchEvent(new CustomEvent('userLoggedIn'));
    }
  }
}

/**
 * Logout user
 */
function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("adminEmail");
  localStorage.removeItem("userData");
  localStorage.removeItem("userToken");
  location.reload();
}

/**
 * Get auth token from localStorage
 */
function getAuthToken() {
  return localStorage.getItem("authToken");
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
