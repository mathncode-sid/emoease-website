// Contact form handling with animations
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("contactForm");
  const formGroups = document.querySelectorAll('.form-group');
  const submitBtn = form.querySelector('.btn-primary');

  // Ensure buttons are stable after initial animations
  setTimeout(() => {
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => {
      btn.classList.add('loaded');
    });
  }, 2000); // After initial animations complete

  // Add focus animations to form groups
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    
    input.addEventListener('focus', function() {
      group.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!input.value) {
        group.classList.remove('focused');
      }
    });

    // Real-time validation
    input.addEventListener('input', function() {
      validateField(group, input);
    });
  });

  // Form submission with enhanced animations
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formMessage = document.getElementById("formMessage");
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Validate all fields
    let isValid = true;
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      if (!validateField(group, input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      shakeForm();
      return;
    }

    // Animate button during submission
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.pointerEvents = 'none';

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    formMessage.className = "message success";
    formMessage.innerHTML = '<span class="success-icon">✓</span> Thank you for your message! We\'ll get back to you soon.';
    
    // Celebrate success
    celebrateSuccess();

    // Reset form with animation
    setTimeout(() => {
      resetFormAnimated();
      submitBtn.innerHTML = 'Send Message';
      submitBtn.disabled = false;
      submitBtn.style.pointerEvents = 'auto';
    }, 1000);

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.className = "message";
      formMessage.textContent = "";
    }, 5000);
  });

  function validateField(group, input) {
    const value = input.value.trim();
    group.classList.remove('error', 'success');

    if (!value) {
      group.classList.add('error');
      return false;
    }

    if (input.type === 'email' && !isValidEmail(value)) {
      group.classList.add('error');
      return false;
    }

    group.classList.add('success');
    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function shakeForm() {
    form.style.animation = 'shake 0.6s ease-in-out';
    setTimeout(() => {
      form.style.animation = '';
    }, 600);
  }

  function celebrateSuccess() {
    // Create confetti effect
    createConfetti();
    
    // Add success class to form
    form.classList.add('form-success');
    setTimeout(() => {
      form.classList.remove('form-success');
    }, 2000);
  }

  function resetFormAnimated() {
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
          const input = group.querySelector('input, textarea');
          input.value = '';
          group.classList.remove('focused', 'success', 'error');
          
          group.style.opacity = '1';
          group.style.transform = 'translateY(0)';
        }, 200);
      }, index * 100);
    });
  }

  function createConfetti() {
    const colors = ['#4a7ba7', '#3d6a8f', '#5a8bb7', '#ffffff'];
    
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          left: ${Math.random() * 100}vw;
          top: -10px;
          z-index: 1000;
          border-radius: 50%;
          animation: confettiFall 3s linear forwards;
          pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }, i * 50);
    }
  }

  // Add CSS for confetti animation if not exists
  if (!document.querySelector('#confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
      
      .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .form-success {
        animation: successPulse 2s ease-in-out;
      }
      
      @keyframes successPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      .success-icon {
        display: inline-block;
        margin-right: 8px;
        animation: bounceIn 0.6s ease-out;
      }
      
      @keyframes bounceIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
});
