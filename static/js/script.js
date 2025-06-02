// Handles smooth SPA navigation between sections
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-link[data-target]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Switch section
      document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(this.getAttribute('data-target')).classList.add('active');
      // Active nav
      document.querySelectorAll('.nav-link[data-target]').forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// javascript for loading next page
