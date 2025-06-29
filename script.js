document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const boxes = document.querySelectorAll('.box');
  const sections = document.querySelectorAll('.content-section');
  const darkModeToggle = document.getElementById('toggle-dark');
  
  // Initialize first section as active
  document.getElementById('about').classList.add('active');
  
  // Navigation Box Click Handler
  boxes.forEach(box => {
    box.addEventListener('click', function() {
      // Remove active class from all boxes
      boxes.forEach(b => b.classList.remove('active-box'));
      
      // Add active class to clicked box
      this.classList.add('active-box');
      
      // Get target section ID
      const targetId = this.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      
      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });
      
      // Show target section with animation
      setTimeout(() => {
        targetSection.style.display = 'block';
        setTimeout(() => {
          targetSection.classList.add('active');
          
          // Scroll to section smoothly
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 10);
      }, 300);
      
      // Click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1) translateY(-3px)';
      }, 200);
    });
  });
  
  // Dark Mode Toggle
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Change icon and text
    if (document.body.classList.contains('dark-mode')) {
      this.innerHTML = '☀️ Light Mode';
      localStorage.setItem('darkMode', 'enabled');
    } else {
      this.innerHTML = '🌙 Dark Mode';
      localStorage.setItem('darkMode', 'disabled');
    }
  });
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️ Light Mode';
  }
  
  // Add hover effect to boxes
  boxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active-box')) {
        this.style.transform = 'translateY(-3px)';
      }
    });
    
    box.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active-box')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Animation for content when section becomes active
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.animated-content').style.animation = 'slideUp 0.5s ease-out forwards';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
});