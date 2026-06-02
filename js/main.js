const WA_NUMBER = '919373235550';

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Hamburger — works with navLinks (ul) on all pages
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
}

// Active nav link
function setActiveNav() {
  const p = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === p || (p === '' && l.getAttribute('href') === 'index.html'));
  });
}
setActiveNav();

// Scroll fade-in
const obs = new IntersectionObserver(entries => {
  entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Counter animation
function animateCounter(el, target, dur = 1800) {
  let s = 0;
  const step = Math.max(1, Math.ceil(target / (dur / 16)));
  const suf = el.dataset.suffix || '';
  const t = setInterval(() => {
    s += step;
    if (s >= target) { s = target; clearInterval(t); }
    el.textContent = s.toLocaleString('en-IN') + suf;
  }, 16);
}
const sobs = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) {
      x.target.querySelectorAll('[data-count]').forEach(c => animateCounter(c, parseInt(c.dataset.count)));
      sobs.unobserve(x.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-bar, .stats-inner, .hero-stats').forEach(el => sobs.observe(el));

// Enquiry form → WhatsApp
const ef = document.getElementById('enquiryForm');
if (ef) {
  ef.addEventListener('submit', function (e) {
    e.preventDefault();
    const n = document.getElementById('name')?.value || '';
    const p = document.getElementById('phone')?.value || '';
    const c = document.getElementById('course')?.value || '';
    const b = document.getElementById('batch')?.value || '';
    const m = document.getElementById('message')?.value || '';
    window.open(`https://wa.me/${WA_NUMBER}?text=Hello! I am interested in enrolling at Pooja Dance %26 Art Academy.%0A%0A*Name:* ${encodeURIComponent(n)}%0A*Phone:* ${encodeURIComponent(p)}%0A*Interested In:* ${encodeURIComponent(c)}%0A*Preferred Batch:* ${encodeURIComponent(b)}%0A*Message:* ${encodeURIComponent(m)}`, '_blank');
  });
}

// Gallery lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function () {
    const img = this.querySelector('img');
    if (!img || !img.src || img.style.display === 'none') return;
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;z-index:99999;cursor:zoom-out;padding:20px;';
    const bi = document.createElement('img');
    bi.src = img.src;
    bi.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;object-fit:contain;';
    overlay.appendChild(bi);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.remove(); }, { once: true });
    document.body.appendChild(overlay);
  });
});
