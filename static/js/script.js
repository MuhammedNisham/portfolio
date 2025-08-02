// Galaxy background animation
const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

const PARTICLE_COUNT = 160; // Number of "cosmic dust" particles
const particles = [];

function randomColor() {
  const colors = [
    'rgba(255,255,255,0.5)',
    'rgba(180,200,255,0.35)',
    'rgba(220,180,255,0.28)',
    'rgba(140,200,255,0.33)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.6,
    dx: (Math.random() - 0.5) * 0.17,
    dy: (Math.random() - 0.5) * 0.17,
    color: randomColor()
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
}

function update() {
  for (let p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;
  }
}

function animate() {
  draw();
  update();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

animate();

// -------- SPA navigation with blur transition --------

function initResumeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  if (tabs.length === 0) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      contents.forEach(c => c.classList.remove('active'));
      const tabId = this.getAttribute('data-tab');
      const content = document.getElementById(tabId);
      if (content) content.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  function loadPage(page, push = true) {
    const main = document.getElementById('main-content');
    main.classList.add('fade-blur-out');
    setTimeout(() => {
      fetch(`partials/${page}.html`)
        .then(res => {
          if (!res.ok) throw new Error('Partial not found');
          return res.text();
        })
        .then(html => {
          main.innerHTML = html;
          // Initialize resume tabs only for resume page
          if (page === 'resume') {
            initResumeTabs();
          }
          void main.offsetWidth;
          main.classList.remove('fade-blur-out');
          if (push) history.pushState({ page }, '', `#${page}`);
        })
        .catch(() => {
          main.innerHTML = '<p style="color:red">Page not found.</p>';
          main.classList.remove('fade-blur-out');
        });
    }, 300);
  }

  // Initial load
  let initialPage = location.hash ? location.hash.substr(1) : 'home';
  loadPage(initialPage, false);

  // Handle nav clicks
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      loadPage(page);
    });
  });

  // Back/forward navigation
  window.addEventListener('popstate', function (e) {
    const page = (e.state && e.state.page) ? e.state.page : 'home';
    loadPage(page, false);
  });
});

// Optional: fade-in effect after load
document.getElementById('main-content').classList.add('fade-blur-out');
setTimeout(() => {
  document.getElementById('main-content').classList.remove('fade-blur-out');
}, 1000);