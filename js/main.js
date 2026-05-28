/* ============================================================
   POOJA DANCE & ART ACADEMY — Main JavaScript
   ============================================================ */

// ── Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    // Animate hamburger → X
    const spans = hamburger.querySelectorAll('span');
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });
}

// ── Close mobile nav when a link is clicked
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── Active nav link highlighting
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
setActiveNav();

// ── Scroll-triggered fade-in animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .class-card, .step-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ── Counter animation for stats
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = start + (el.dataset.suffix || '');
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(counter => {
        animateCounter(counter, parseInt(counter.dataset.count));
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar, .hero-stats').forEach(el => statsObserver.observe(el));

// ── Enquiry Form Submission (WhatsApp redirect)
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('name')?.value    || '';
    const phone   = document.getElementById('phone')?.value   || '';
    const course  = document.getElementById('course')?.value  || '';
    const message = document.getElementById('message')?.value || '';

    // Format a WhatsApp message
    const text = `Hello! I am interested in enrolling at Pooja Dance & Art Academy.%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Phone:* ${phone}%0A` +
                 `*Interested In:* ${course}%0A` +
                 `*Message:* ${message}`;

    // ⚠️ REPLACE with your actual WhatsApp number (country code + number, no + or spaces)
    const whatsappNumber = '91XXXXXXXXXX';
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  });
}

// ── Gallery lightbox (simple)
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function () {
    const img = this.querySelector('img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; background:rgba(0,0,0,0.9);
      display:flex; align-items:center; justify-content:center;
      z-index:99999; cursor:zoom-out; padding:20px;
    `;
    const bigImg = document.createElement('img');
    bigImg.src   = img.src;
    bigImg.style.cssText = 'max-width:90vw; max-height:90vh; border-radius:8px; object-fit:contain;';
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});
