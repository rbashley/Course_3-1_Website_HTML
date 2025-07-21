document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav[role="navigation"]');
  const navList = document.getElementById('main-nav');

  // Toggle navigation menu on hamburger click
  hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
  });

  // Close navigation menu when a link is clicked (on mobile)
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Custom smooth scroll for anchor links (slower and adjustable)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 20; // Offset for fixed header
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 500; // Duration in ms (increase for slower scroll)
        let start = null;

        // Animation step function
        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          const percent = Math.min(progress / duration, 1);
          window.scrollTo(0, startPosition + distance * percent);
          if (progress < duration) {
            window.requestAnimationFrame(step);
          }
        }
        window.requestAnimationFrame(step);
      }
    });
  });

  // Project filter feature (by name and skill)
  const filterName = document.getElementById('filter-name');
  const filterSkill = document.getElementById('filter-skill');
  const projects = document.querySelectorAll('#projects-list article');

  // Filter projects based on input and select
  function filterProjects() {
    const nameValue = filterName.value.toLowerCase();
    const skillValue = filterSkill.value;

    projects.forEach(project => {
      const projectName = project.getAttribute('data-name').toLowerCase();
      const projectSkills = project.getAttribute('data-skills');
      const matchesName = projectName.includes(nameValue);
      const matchesSkill = !skillValue || projectSkills.includes(skillValue);

      // Show or hide project based on filter
      if (matchesName && matchesSkill) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  }

  // Listen for filter changes
  filterName.addEventListener('input', filterProjects);
  filterSkill.addEventListener('change', filterProjects);

  // Contact form validation with granular user feedback
  const contactForm = document.querySelector('#contact form');
  const feedbackDiv = document.getElementById('form-feedback');

  contactForm.addEventListener('submit', function(e) {
    let valid = true;
    const name = contactForm.elements['name'];
    const email = contactForm.elements['email'];
    const message = contactForm.elements['message'];
    let feedbackMsg = '';

    // Name validation
    if (!name.value.trim()) {
      valid = false;
      name.setCustomValidity('Please enter your name.');
      feedbackMsg += 'Name is required.<br>';
    } else {
      name.setCustomValidity('');
    }

    // Email validation (required and format)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      valid = false;
      email.setCustomValidity('Please enter your email.');
      feedbackMsg += 'Email is required.<br>';
    } else if (!emailPattern.test(email.value)) {
      valid = false;
      email.setCustomValidity('Please enter a valid email address.');
      feedbackMsg += 'Email format is invalid.<br>';
    } else {
      email.setCustomValidity('');
    }

    // Message validation
    if (!message.value.trim()) {
      valid = false;
      message.setCustomValidity('Please enter your message.');
      feedbackMsg += 'Message is required.<br>';
    } else {
      message.setCustomValidity('');
    }

    // Show feedback or success message
    if (!valid) {
      contactForm.reportValidity();
      feedbackDiv.style.color = '#c0392b';
      feedbackDiv.innerHTML = feedbackMsg;
      e.preventDefault();
    } else {
      feedbackDiv.style.color = '#27ae60';
      feedbackDiv.innerHTML = 'Thank you! Your message has been submitted.';
      setTimeout(() => {
        feedbackDiv.innerHTML = '';
        contactForm.reset();
        feedbackDiv.style.color = '#c0392b';
      }, 3000);
      e.preventDefault(); // Remove this line to allow real submission
    }
  });
});