// Navigation scroll effect
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav__toggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  // Add mobile menu functionality here if needed
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animate-up class
document.querySelectorAll('.animate-up').forEach((el, index) => {
  el.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(el);
});

// Hero staggered animation on load
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero__text .animate-up');
  heroElements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 200);
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.goals) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours to discuss your fitness goals.');
      this.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
  
  btn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(0) scale(0.98)';
  });
  
  btn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero__image');
  
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
  }
});

// Service cards enhanced hover effect
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statsNumbers = entry.target.querySelectorAll('.stats__number');
      statsNumbers.forEach(number => {
        const finalValue = number.textContent;
        const isPercentage = finalValue.includes('%');
        const isRating = finalValue.includes('.');
        const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
        
        let currentValue = 0;
        const increment = numericValue / 60; // 60 frames for 1 second at 60fps
        
        const animate = () => {
          currentValue += increment;
          if (currentValue >= numericValue) {
            number.textContent = finalValue;
          } else {
            if (isRating) {
              number.textContent = currentValue.toFixed(1);
            } else if (isPercentage) {
              number.textContent = Math.floor(currentValue) + '%';
            } else {
              number.textContent = Math.floor(currentValue) + '+';
            }
            requestAnimationFrame(animate);
          }
        };
        
        animate();
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}