/* ============================
       SCROLL PROGRESS BAR
    ============================ */
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progress.style.width = pct + '%';
}, { passive: true });

/* ============================
   SMOOTH SCROLL
============================ */
function slowScroll(id) {
  // Close the mobile menu first, then wait for it to fully collapse
  // before calculating scroll position — otherwise the open menu's
  // extra height throws off the offset measurement.
  const wasOpen = menuOpen;
  closeMobileMenu();

  const MENU_COLLAPSE_DELAY = wasOpen ? 420 : 0; // matches 0.4s CSS transition

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;

    // Extra padding so the section heading isn't flush against the navbar
    const OFFSET_PADDING = 24;

    // getBoundingClientRect().top is relative to viewport,
    // so add current scrollY to get absolute document position
    const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
    const targetY = absoluteTop - navbarHeight - OFFSET_PADDING;

    // Use smooth-scroll polyfill approach for reliable mobile support
    smoothScrollTo(targetY, 600);
  }, MENU_COLLAPSE_DELAY);
}

// Custom smooth scroll — browser smooth behavior is unreliable on some
// mobile browsers (especially inside setTimeout), so we drive it manually
// with requestAnimationFrame for consistent cross-device behaviour.
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  // Ease-in-out cubic for a natural deceleration feel
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ============================
   MOBILE MENU TOGGLE
============================ */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  menuBtn.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('show', menuOpen);
  menuBtn.setAttribute('aria-expanded', menuOpen);
}

function closeMobileMenu() {
  menuOpen = false;
  menuBtn.classList.remove('open');
  mobileMenu.classList.remove('show');
  menuBtn.setAttribute('aria-expanded', 'false');
}

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (menuOpen && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuOpen) {
    closeMobileMenu();
  }
});

// Keyboard support for scroll indicator
document.querySelector('.scroll-indicator').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') slowScroll('about');
});

/* ============================
   TYPING ANIMATION
============================ */
const roles = [
  'IT Student',
  'Data Scientist',
  'Data Analyst',
  'Data Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 40 : 70);
}

typeEffect();

/* ============================
    ABOUT SECTION — SCROLL REVEAL
============================ */
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  },
  { rootMargin: '-100px' }
);

document.querySelectorAll('.about-label, .about-title, .about-grid')
  .forEach(el => aboutObserver.observe(el));


/* ============================
TECH STACK DATA — add new tech here
============================ */
const techStack = [
  "React",
  "Node.js",
  "MongoDB",
  "Next.js",
  "Python",
  "SQL",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Power BI",
  "Git",
  "Flask",
  "Scikit-learn",
];

/* ============================
TECH STACK RENDERER
============================ */
function renderTechStack() {
  const container = document.getElementById('tech_stack');
  container.innerHTML = techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
}

renderTechStack();

/* ============================
    FOOTER — DYNAMIC YEAR & SCROLL TO TOP
============================ */
document.getElementById('footer-year').textContent = new Date().getFullYear();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================
PROJECTS DATA — add new projects here
============================ */
const projects = [
  {
    title: "Hotel Booking Analysis — Cancellation & Revenue Analysis",
    description: "End-to-end EDA on 119K+ hotel bookings across Resort & City hotels (2015–2017), uncovering cancellation drivers, pricing patterns, and seasonal demand — with €11.5M in lost revenue quantified and 6 business recommendations delivered.",
    tags: ["Python", "Pandas", "Seaborn", "Plotly", "Matplotlib"],
    category: "EDA",
    metric: "↘ €11.5M",
    image: "./files/12_revenue_by_cancellation_status.png",
    github: "https://github.com/280205-Abhi/Hotel_Booking_Analysis",
    live: "https://drive.google.com/file/d/1sXUeJZfLIHa84kZxPm1ZcQuG0lCqpnpA/view?usp=drive_link",
  },
];

/* ============================
PROJECTS RENDERER
============================ */
function renderProjects() {
  const grid = document.getElementById('projects-grid');

  grid.innerHTML = projects.map(project => `
        <div class="project-card">
          <div class="project-card-glow"></div>
          <div class="project-card-content">

            <!-- Insight image visual area at the top -->
            <div class="project-card-chart-area">
              <div class="chart-header">
                <span class="project-category-badge">${project.category}</span>
                <span class="project-metric">${project.metric}</span>
              </div>
              <div class="project-insight-container">
                <img src="${project.image}" alt="${project.title} Insight" class="project-insight-image" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f3f4f6%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-family=%22sans-serif%22 font-size=%2212%22>Insight Image Placeholder</text></svg>'">
              </div>
            </div>

            <!-- Card text and tags below chart -->
            <div class="project-card-body">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-desc">${project.description}</p>

              <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
              </div>

              <div class="project-footer-links">
                <a href="${project.github}" class="project-footer-link" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  <span>Code</span>
                </a>
                <a href="${project.live}" class="project-footer-link" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  <span>View</span>
                </a>
              </div>
            </div>

          </div>
        </div>
    `).join('');
}

renderProjects();

/* Projects scroll reveal — reuses existing observer */
document.querySelectorAll('.projects-heading, .projects-grid')
  .forEach(el => aboutObserver.observe(el));

/* ============================
EXPERIENCE DATA — add new entries here
============================ */
const experiences = [
  {
    period: "JUNE 2025 — JULY 2025",
    role: "Full Stack Development Intern",
    org: "TechAsia Mechatronics Pvt Ltd",
    description: "Developed a full-stack web application to streamline the company's internal workflow and operational management.",
    tags: ["React", "SQL", "Express", "Node"],
    side: "left",
  },
];

/* ============================
EXPERIENCE RENDERER
============================ */
function renderExperience() {
  const timeline = document.getElementById('timeline');

  timeline.innerHTML = experiences.map(exp => `
        <div class="timeline-item ${exp.side === 'right' ? 'right' : ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
            <p class="timeline-period">${exp.period}</p>
            <h3 class="timeline-role">${exp.role}</h3>
            <p class="timeline-org">${exp.org}</p>
            <p class="timeline-desc">${exp.description}</p>
            <div class="timeline-tags">
            ${exp.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
            </div>
        </div>
        </div>
    `).join('');
}

renderExperience();

/* ============================
ACHIEVEMENTS DATA — add new entries here
============================ */
const achievements = [
  {
    title: "Data Analytics Simulation",
    year: "2026",
    icon: "chart",
    description: "Deloitte (via Forage) — Completed a job simulation analyzing client datasets and delivering insights. (April 2026)"
  },
  {
    title: "Smart India Hackathon",
    year: "2025",
    icon: "trophy",
    description: "Winner – Institute Level Round. Developed EcoSnap, a rewards-based mobile app incentivizing eco-friendly actions via image verification and credit system."
  },
];

/* Icon helper */
function getAchievementIcon(iconName) {
  const icons = {
    trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a6 6 0 0 1 6 6c0 3-2 6-6 6S6 11 6 8a6 6 0 0 1 6-6z"></path></svg>`,
    award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    medal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path><path d="M12 2v6"></path><path d="M12 8L9 5h6z"></path></svg>`,
    target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path></svg>`,
    chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
  };
  return icons[iconName] || icons.star;
}

/* ============================
ACHIEVEMENTS RENDERER
============================ */
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;

  grid.innerHTML = achievements.map(ach => `
    <div class="achievement-card">
      <div class="achievement-card-glow"></div>
      <div class="achievement-card-content">
        <div class="achievement-card-top">
          <div class="achievement-icon-wrapper">
            ${getAchievementIcon(ach.icon)}
          </div>
          <span class="achievement-year">${ach.year}</span>
        </div>
        <h3 class="achievement-title">${ach.title}</h3>
        <p class="achievement-desc">${ach.description}</p>
      </div>
    </div>
  `).join('');
}

renderAchievements();

/* ============================
CONTACT FORM
============================ */
async function handleFormSubmit() {
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const note = document.getElementById('form-note');
  const btn = document.getElementById('form-submit');
  const text = document.getElementById('submit-text');

  // Reset classes
  [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('invalid', 'valid'));

  let isValid = true;

  if (!name) { nameInput.classList.add('invalid'); isValid = false; } else { nameInput.classList.add('valid'); }
  if (!message) { messageInput.classList.add('invalid'); isValid = false; } else { messageInput.classList.add('valid'); }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    emailInput.classList.add('invalid');
    isValid = false;
  } else {
    emailInput.classList.add('valid');
  }

  if (!isValid) {
    note.textContent = '⚠ Please check the highlighted fields.';
    note.className = 'form-note error';
    return;
  }

  btn.disabled = true;
  text.textContent = 'Sending...';
  note.textContent = '';

  try {
    const response = await fetch('https://formspree.io/f/xnjbzbog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      note.textContent = '✓ Message sent! I\'ll get back to you soon.';
      note.className = 'form-note success';
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      [nameInput, emailInput, messageInput].forEach(el => el.classList.remove('invalid', 'valid'));
    } else {
      throw new Error('Failed');
    }
  } catch {
    note.textContent = '✗ Something went wrong. Try emailing me directly.';
    note.className = 'form-note error';
  } finally {
    btn.disabled = false;
    text.textContent = 'Send Message';
  }
}

/* Scroll reveal — reuses existing observer */
document.querySelectorAll(
  '.experience-heading, .timeline, .achievements-heading, .achievements-grid, .contact-heading, .contact-grid'
).forEach(el => aboutObserver.observe(el));