// Basic front-end validation and feedback for the contact form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // You can integrate with an email API here
      document.getElementById('formMessage').textContent = "Thank you for reaching out! I'll get back to you soon.";
      form.reset();
    });
  }
});