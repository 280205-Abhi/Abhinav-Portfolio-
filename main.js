/* ============================
   MOUSE SPOTLIGHT TRACKER
============================ */
window.addEventListener('pointermove', (e) => {
  document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
  if (!document.body.classList.contains('mouse-active')) {
    document.body.classList.add('mouse-active');
  }
}, { passive: true });

/* ============================
       SCROLL PROGRESS BAR & NAVBAR PILL
    ============================ */
const progress = document.getElementById('scroll-progress');
const mainNavbar = document.getElementById('mainNavbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progress) progress.style.width = pct + '%';

  if (mainNavbar) {
    if (scrollTop > 150) {
      mainNavbar.classList.add('scrolled-pill');
    } else {
      mainNavbar.classList.remove('scrolled-pill');
    }
  }
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
  if (mainNavbar) mainNavbar.classList.toggle('menu-is-open', menuOpen);
  menuBtn.setAttribute('aria-expanded', menuOpen);
}

function closeMobileMenu() {
  menuOpen = false;
  menuBtn.classList.remove('open');
  mobileMenu.classList.remove('show');
  if (mainNavbar) mainNavbar.classList.remove('menu-is-open');
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
const scrollMouseEl = document.querySelector('.scroll-mouse');
if (scrollMouseEl) {
  scrollMouseEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') slowScroll('about');
  });
}

/* ============================
   TYPING ANIMATION
============================ */
const roles = [
  'Software Engineer',
  'Data Scientist',
  'Data Analyst',
  'ML Engineer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  if (!typingEl) return;
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
  { rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.about-subhead, .about-title-main, .about-grid-new')
  .forEach(el => aboutObserver.observe(el));

/* ============================
    PROFILE CARD — 3D TILT ANIMATION
============================ */
const profileCardWrapper = document.getElementById('profileCardWrapper');
const profileCard = document.getElementById('profileCard');

if (profileCardWrapper && profileCard) {
  profileCardWrapper.addEventListener('mousemove', (e) => {
    const rect = profileCardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    profileCard.style.setProperty('--glare-x', `${glareX}%`);
    profileCard.style.setProperty('--glare-y', `${glareY}%`);

    profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    profileCard.style.boxShadow = `${-rotateY * 1.8}px ${rotateX * 1.8}px 40px rgba(16, 185, 129, 0.25)`;
  });

  profileCardWrapper.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    profileCard.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.15)';
  });
}


/* ============================
    FOOTER — DYNAMIC YEAR & SCROLL TO TOP
============================ */
const footerYearEl = document.getElementById('footer-year');
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================
PROJECTS DATA — Code Inspector Component
============================ */
const projects = [
  {
    id: "neuroai",
    num: "01",
    shortTitle: "NeuroAI",
    tagline: "Multimodal XAI ASD Classifier",
    title: "NeuroAI — XAI ASD Classifier",
    filename: "asd_classifier.py",
    badge: "96.55% accuracy",
    codeSnippet: [
      { num: 1, text: '<span class="code-keyword">from</span> neuroai <span class="code-keyword">import</span> MultimodalClassifier' },
      { num: 2, text: 'pipe = MultimodalClassifier(modalities=[<span class="code-string">"mri"</span>, <span class="code-string">"audio"</span>])' },
      { num: 3, text: 'pipe.fit(X_train, y_train, explainability=<span class="code-bool">True</span>)' },
      { num: 4, text: 'metrics = pipe.evaluate(test_loader, shap=<span class="code-bool">True</span>)' }
    ],
    description:
      "Multimodal AI decision support system integrating brain MRI, speech, and behavioral data. Achieved 96.55% accuracy with SHAP & Grad-CAM++ explainability pipelines for transparent clinical insights.",
    tags: ["Python", "PyTorch", "FastAPI", "React", "SHAP", "Librosa"],
    github: "https://github.com/280205-Abhi/NeuroAI_ASD",
    live: "https://github.com/280205-Abhi/NeuroAI_ASD"
  },
  {
    id: "hotel",
    num: "02",
    shortTitle: "Hotel Analytics",
    tagline: "Cancellation & Revenue Analysis",
    title: "Hotel Booking Analysis — Revenue Insights",
    filename: "revenue_insights.py",
    badge: "119k+ records",
    codeSnippet: [
      { num: 1, text: '<span class="code-keyword">import</span> pandas <span class="code-keyword">as</span> pd, plotly.express <span class="code-keyword">as</span> px' },
      { num: 2, text: 'df = pd.read_csv(<span class="code-string">"hotel_bookings.csv"</span>)' },
      { num: 3, text: 'cancel_rate = df.groupby(<span class="code-string">"hotel"</span>)[<span class="code-string">"is_canceled"</span>].mean()' },
      { num: 4, text: 'lost_rev = df[df[<span class="code-string">"is_canceled"</span>] == 1][<span class="code-string">"adr"</span>].sum()' }
    ],
    description:
      "End-to-end EDA on 119K+ hotel bookings. Uncovered key cancellation drivers, quantified €11.5M in lost revenue, and delivered 6 actionable business recommendations.",
    tags: ["Python", "Pandas", "Plotly", "Seaborn", "Matplotlib"],
    github: "https://github.com/280205-Abhi/Hotel_Booking_Analysis",
    live: "https://drive.google.com/file/d/1sXUeJZfLIHa84kZxPm1ZcQuG0lCqpnpA/view?usp=drive_link"
  },
];

let activeProjectId = projects[0].id;

function renderProjects() {
  const selectorList = document.getElementById('projects-selector-list');
  const inspectorWindow = document.getElementById('projects-inspector-window');

  if (!selectorList || !inspectorWindow) return;

  // Render Left Column: Selectable Project Cards
  selectorList.innerHTML = projects.map(proj => {
    const isActive = proj.id === activeProjectId;
    return `
      <div 
        class="project-select-card ${isActive ? 'active' : ''}" 
        onclick="selectProject('${proj.id}')"
        role="tab"
        tabindex="0"
        aria-selected="${isActive}"
      >
        <div class="proj-select-header">
          <span class="proj-select-num">${proj.num}</span>
          <span class="proj-select-title">${proj.shortTitle}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="proj-arrow-icon">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
        <p class="proj-select-tagline">${proj.tagline}</p>
      </div>
    `;
  }).join('');

  // Render Right Column: Code & Details Inspector
  const current = projects.find(p => p.id === activeProjectId) || projects[0];

  inspectorWindow.innerHTML = `
    <div class="proj-win-header">
      <div class="proj-win-dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <span class="proj-win-filename">${current.filename}</span>
    </div>

    <div class="proj-win-body">
      <div class="code-snippet-box">
        ${current.codeSnippet.map(line => `
          <div class="code-line">
            <span class="line-num">${line.num}</span>
            <span class="line-content">${line.text}</span>
          </div>
        `).join('')}
      </div>

      <div class="proj-details-block">
        <div class="proj-details-title-row">
          <h3 class="proj-details-title">${current.title}</h3>
          ${current.badge ? `<span class="proj-badge-pill">${current.badge}</span>` : ''}
        </div>

        <p class="proj-details-desc">${current.description}</p>

        <div class="proj-tags-row">
          ${current.tags.map(tag => `<span class="proj-tag-pill">${tag}</span>`).join('')}
        </div>

        <div class="proj-actions-row">
          ${current.github ? `
            <a href="${current.github}" target="_blank" class="proj-btn proj-btn-dark" aria-label="View Source Code">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              <span>source</span>
            </a>
          ` : ''}
          ${current.live ? `
            <a href="${current.live}" target="_blank" class="proj-btn proj-btn-cyan" aria-label="View Live Project">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-svg">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span>live_demo</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function selectProject(id) {
  activeProjectId = id;
  renderProjects();
}

renderProjects();

/* Projects scroll reveal — reuses existing observer */
document.querySelectorAll('.projects-heading, .projects-layout')
  .forEach(el => aboutObserver.observe(el));

/* ============================
EXPERIENCE DATA — Git Terminal Style
============================ */
const experiences = [
  {
    id: "techasia",
    hash: "a1f9c2e",
    repo: "techasia/mechatronics",
    commitMsg: "feat: Full Stack Development Intern workflow suite",
    shortRole: "Full Stack Intern",
    year: "2025",
    role: "Full Stack Development Intern",
    company: "TechAsia Mechatronics Pvt Ltd",
    period: "JUNE 2025 — JULY 2025",
    additions: "+24,800",
    deletions: "-9,128",
    diffBars: { green: 7, red: 2 },
    bullets: [
      "Developed a full-stack web application to streamline the company's internal workflow and operational management.",
      "Engineered responsive React front-end components and integrated RESTful APIs with Node.js & Express.",
      "Managed database schema design and optimized SQL query execution for internal reporting modules."
    ],
    tags: ["React", "SQL", "Express", "Node.js"]
  }
];

let activeExpId = experiences[0].id;

function renderExperience() {
  const tabsContainer = document.getElementById('experience-tabs');
  const detailContainer = document.getElementById('experience-detail');
  const statusContainer = document.getElementById('git-term-status-text');

  if (statusContainer) {
    statusContainer.textContent = `main ↑ ${experiences.length} commits`;
  }

  if (!tabsContainer || !detailContainer) return;

  // Render Commit List (Left Column)
  tabsContainer.innerHTML = experiences.map((exp, index) => {
    const isActive = exp.id === activeExpId;
    return `
      <div 
        class="git-commit-card ${isActive ? 'active' : ''}" 
        onclick="selectExperience('${exp.id}')"
        role="tab"
        tabindex="0"
        aria-selected="${isActive}"
      >
        <div class="commit-graph-indicator">
          <span class="commit-dot ${isActive ? 'active' : ''}"></span>
          ${index < experiences.length - 1 ? '<span class="commit-graph-line"></span>' : ''}
        </div>
        <div class="commit-card-content">
          <div class="commit-meta-row">
            <span class="commit-hash">${exp.hash}</span>
            <span class="commit-repo-pill">${exp.repo}</span>
          </div>
          <h4 class="commit-msg-text">${exp.commitMsg}</h4>
          <p class="commit-subtext">${exp.shortRole} · ${exp.year}</p>
        </div>
      </div>
    `;
  }).join('');

  // Render Selected Commit Detail (Right Column)
  const current = experiences.find(e => e.id === activeExpId) || experiences[0];

  const greenBlocks = Array(current.diffBars.green).fill('<span class="diff-block green"></span>').join('');
  const redBlocks = Array(current.diffBars.red).fill('<span class="diff-block red"></span>').join('');

  detailContainer.innerHTML = `
    <div class="git-detail-header">
      <div class="git-detail-title-block">
        <h3 class="git-detail-role-title">${current.role}</h3>
        <p class="git-detail-company">@ ${current.company}</p>
      </div>
      <div class="git-detail-period">${current.period}</div>
    </div>

    <div class="git-detail-stats-row">
      <span class="stat-add">${current.additions}</span>
      <span class="stat-del">${current.deletions}</span>
      <div class="diff-blocks-grid">
        ${greenBlocks}${redBlocks}
      </div>
    </div>

    <ul class="git-detail-bullets-list">
      ${current.bullets.map(bullet => `
        <li class="git-bullet-item">
          <span class="git-plus-sign">+</span>
          <span class="git-bullet-content">${bullet}</span>
        </li>
      `).join('')}
    </ul>

    <div class="git-detail-tags">
      ${current.tags.map(tag => `<span class="git-tag-pill">${tag}</span>`).join('')}
    </div>
  `;
}

function selectExperience(id) {
  activeExpId = id;
  renderExperience();
}

renderExperience();

/* ============================
ACHIEVEMENTS DATA — Codified System Logs
============================ */
const achievements = [
  {
    id: "deloitte",
    title: "Data Analytics Simulation",
    issuer: "Deloitte (via Forage)",
    year: "2026",
    status: "[✓] VERIFIED",
    badgeType: "verified",
    icon: "chart",
    filename: "deloitte_simulation.json",
    logOutput: `> EXECUTE: analyze_client_datasets()
> CLIENT: Deloitte (Job Simulation)
> STATUS: COMPLETED & VERIFIED [April 2026]
> OUTCOME: Actionable business insights & data modeling`,
    description: "Completed a comprehensive job simulation analyzing complex client datasets, data modeling, and delivering strategic business recommendations.",
    tags: ["Data Analytics", "Data Modeling", "Deloitte", "Forage"]
  },
  {
    id: "sih",
    title: "Smart India Hackathon",
    issuer: "Ministry of Education / SIH",
    year: "2025",
    status: "[★] WINNER",
    badgeType: "winner",
    icon: "trophy",
    filename: "sih_ecosnap.json",
    logOutput: `> EXECUTE: deploy_hackathon_project()
> EVENT: Smart India Hackathon 2025
> RESULT: Winner – Institute Level Round
> PRODUCT: EcoSnap (AI Image Verified Eco App)`,
    description: "Winner – Institute Level Round. Developed EcoSnap, a rewards-based mobile app incentivizing eco-friendly actions via image verification and credit system.",
    tags: ["SIH Hackathon", "Winner", "EcoSnap", "AI Verification"]
  }
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
      <span class="hud-bracket top-left"></span>
      <span class="hud-bracket top-right"></span>
      <span class="hud-bracket bottom-left"></span>
      <span class="hud-bracket bottom-right"></span>

      <div class="achieve-card-header">
        <div class="achieve-icon-box">
          ${getAchievementIcon(ach.icon)}
        </div>
        <div class="achieve-meta-group">
          <span class="achieve-badge-pill ${ach.badgeType}">${ach.status}</span>
          <span class="achieve-year-tag">${ach.year}</span>
        </div>
      </div>

      <h3 class="achieve-card-title">${ach.title}</h3>
      <p class="achieve-card-issuer">@ ${ach.issuer}</p>

      <div class="achieve-log-box">
        <div class="log-line-header">
          <span class="log-dot red"></span>
          <span class="log-dot yellow"></span>
          <span class="log-dot green"></span>
          <span class="log-file-name">${ach.filename}</span>
        </div>
        <pre class="log-content-text">${ach.logOutput}</pre>
      </div>

      <p class="achieve-card-desc">${ach.description}</p>

      <div class="achieve-tags-row">
        ${ach.tags.map(t => `<span class="achieve-tag-pill">${t}</span>`).join('')}
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
  '.experience-heading, .git-terminal-window, .achievements-heading, .achievements-window, .contact-heading, .contact-grid'
).forEach(el => aboutObserver.observe(el));