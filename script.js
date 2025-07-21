document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav[role="navigation"]');
  const navList = document.getElementById('main-nav');

  hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
  });

  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 700) {
        nav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});