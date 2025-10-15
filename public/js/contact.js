// Contact form handling
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault()

  const formMessage = document.getElementById("formMessage")
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }

  // Simulate form submission (in production, this would send to a backend)
  formMessage.className = "message success"
  formMessage.textContent = "Thank you for your message! We'll get back to you soon."

  // Reset form
  document.getElementById("contactForm").reset()

  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.className = "message"
    formMessage.textContent = ""
  }, 5000)
})
