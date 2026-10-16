/**
 * Portfolio Vanilla JavaScript
 * Author: Abhinav Dasari
 * Features:
 * - Scroll progress bar
 * - Light / Dark Theme toggle with localStorage & system preference
 * - Accessible mobile hamburger navigation & scroll-spy
 * - Stats counter animation (IntersectionObserver)
 * - Projects filtering with fade & reflow
 * - Accessible project details modal (focus trap, Esc key, click outside)
 * - Copy Email to clipboard with visual feedback
 * - Respects prefers-reduced-motion
 */

// Single source of truth for CGPA
const PORTFOLIO_CGPA = '9.08';

document.addEventListener('DOMContentLoaded', () => {
  initCgpa();
  initTheme();
  initScrollProgress();
  initMobileMenu();
  initScrollSpy();
  initStatsCounter();
  initProjectFiltering();
  initProjectModal();
  initCopyEmail();
  initScrollFadeIn();
});

function initCgpa() {
  document.querySelectorAll('[data-cgpa]').forEach(el => {
    el.setAttribute('data-target', PORTFOLIO_CGPA);
  });
  document.querySelectorAll('.cgpa-value').forEach(el => {
    el.textContent = PORTFOLIO_CGPA;
  });
}

/* ==========================================================================
   1. THEME TOGGLE (Light / Dark)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');

  // Determine initial theme
  const initialTheme = storedTheme ? storedTheme : (prefersDark.matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Listen for system theme changes if user hasn't explicitly set a preference
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
}

/* ==========================================================================
   2. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDropdown = document.getElementById('mobileDropdown');
  if (!hamburgerBtn || !mobileDropdown) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !hamburgerBtn.classList.contains('active');
    hamburgerBtn.classList.toggle('active', isOpen);
    mobileDropdown.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileDropdown.setAttribute('aria-hidden', String(!isOpen));
  }

  hamburgerBtn.addEventListener('click', () => toggleMenu());

  // Close when clicking mobile links
  mobileDropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn.classList.contains('active')) {
      toggleMenu(false);
      hamburgerBtn.focus();
    }
  });

  // Close when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && hamburgerBtn.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* ==========================================================================
   4. SCROLL-SPY ACTIVE NAV HIGHLIGHTING
   ========================================================================== */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   5. STATS COUNTER ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatNumber = (val, format, decimals, suffix) => {
    let formatted = decimals ? val.toFixed(decimals) : Math.round(val).toString();
    if (format === 'comma') {
      formatted = Math.round(val).toLocaleString('en-US');
    }
    return `${formatted}${suffix || ''}`;
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(entry.target);
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        const format = el.getAttribute('data-format') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

        if (isReduced) {
          el.textContent = formatNumber(target, format, decimals, suffix);
          return;
        }

        const duration = 1200; // ms
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeProgress * target;
          el.textContent = formatNumber(currentVal, format, decimals, suffix);

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = formatNumber(target, format, decimals, suffix);
          }
        }

        requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/* ==========================================================================
   6. PROJECTS FILTERING
   ========================================================================== */
function initProjectFiltering() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterTabs.length || !projectCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const matches = filter === 'all' || categories.includes(filter);

        if (matches) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECT MODAL (Accessible Dialog)
   ========================================================================== */
const projectDetailsData = {
  neuroai: {
    title: "NeuroAI — Clinical Decision Support for ASD",
    badge: "96.55% Clinical Acc",
    category: "Machine Learning & Clinical Decision Support",
    problem: "Autism Spectrum Disorder (ASD) pre-screening frequently faces severe diagnostic backlogs, subjective assessments, and a persistent absence of interpretable clinical justifications for decision-makers.",
    actions: [
      "Engineered a multimodal diagnostic architecture integrating brain MRI neuroimaging, speech acoustic characteristics, and M-CHAT-R clinical questionnaire responses.",
      "Trained and benchmarked 17 individual classification architectures across clinical tabular data and neuroimaging datasets.",
      "Implemented SHAP (TreeExplainer) for clinical feature interpretability and Grad-CAM++ for MRI activation mapping, providing transparent heatmaps and feature attributions for pediatric specialists.",
      "Engineered an automated diagnostic PDF reporting pipeline connected to a FastAPI backend and React frontend."
    ],
    results: "Clinical ensemble (Random Forest) achieved 96.55% test accuracy. The neuroimaging ensemble (ResNet18 + EfficientNet-B0) achieved 84.21% accuracy and 0.9117 AUC, establishing a viable pre-clinical screening foundation.",
    tech: ["Python", "PyTorch", "FastAPI", "React", "Scikit-learn", "SHAP", "Librosa", "Grad-CAM++"],
    links: [
      { label: "View Source Code", url: "https://github.com/280205-Abhi/NeuroAI_ASD" }
    ]
  },
  hotel: {
    title: "Hotel Booking Cancellation & Revenue Analysis",
    badge: "119,390 Records Cleaned",
    category: "Exploratory Data Analysis & Business Intelligence",
    problem: "A major hospitality chain suffered high cancellation volumes, distorting inventory forecasting, skewing projected cash flow, and obscuring the root causes of revenue leakage.",
    actions: [
      "Cleaned an uncurated 119,390-record dataset, identifying and dropping 31,994 duplicate rows (~27%) first to guarantee metric integrity.",
      "Standardized data types, corrected inconsistent reservation status dates, and isolated non-cancelled reservations to derive true realized revenue.",
      "Created a dedicated revenue-lost KPI tracking cancellation losses across deposit types, customer segments, distribution channels, and seasonality.",
      "Identified the Non-Refundable Deposit Cancellation Paradox: bookings with non-refundable deposits displayed higher cancellation rates due to extended booking lead-times and third-party aggregator behaviors.",
      "Synthesized findings into 6 targeted business interventions regarding dynamic deposit scaling, cancellation buffer windows, and direct-booking incentives."
    ],
    results: "Quantified $22.97M in actual realized revenue earned (calculated from non-cancelled bookings only) vs. $11.47M lost to cancellations, equipping leadership with clear seasonality curves and lead-time mitigation policies.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Plotly", "EDA", "Data Cleaning"],
    links: [
      { label: "View GitHub Repo", url: "https://github.com/280205-Abhi/Hotel_Booking_Analysis" },
      { label: "View Executive Summary Report", url: "https://drive.google.com/file/d/1sXUeJZfLIHa84kZxPm1ZcQuG0lCqpnpA/view?usp=drive_link" }
    ]
  },
  github: {
    title: "GitHub Open-Source Ecosystem Analytics",
    badge: "In Progress",
    category: "Data Analysis & Dashboard",
    problem: "Star counts don't show whether an open-source project is actively maintained or quietly dying. I wanted a data-backed way to tell thriving projects from abandoned ones.",
    actions: [
      "Pulling repository, star, commit and contributor data through the official GitHub REST API.",
      "Designing a 'thriving vs abandoned' health score from signals like commit recency and contributor activity.",
      "Tracking language popularity shifts over time across a chosen topic.",
      "Building a searchable repo health dashboard with trend charts."
    ],
    results: "Results will be added once the dashboard is complete.",
    tech: ["GitHub REST API", "Python", "Pandas", "SQL"],
    links: [
      { label: "View Source Code", url: "https://github.com/280205-Abhi/YOUR_REPO" }, // TODO
      { label: "View Live Dashboard", url: "https://YOUR_DASHBOARD_LINK" } // TODO: only when deployed
    ]
  }
};

let previousActiveElement = null;

function openProjectModal(projectId) {
  const data = projectDetailsData[projectId];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  if (!modal || !modalTitle || !modalBody || !modalFooter) return;

  previousActiveElement = document.activeElement;

  modalBadge.textContent = data.badge;
  modalTitle.textContent = data.title;

  modalBody.innerHTML = `
    <div>
      <h4 class="modal-section-title">Problem Statement</h4>
      <p>${data.problem}</p>
    </div>

    <div>
      <h4 class="modal-section-title">Approach & What I Built</h4>
      <ul class="project-bullets" style="margin-top: 8px;">
        ${data.actions.map(action => `<li>${action}</li>`).join('')}
      </ul>
    </div>

    <div class="project-result">
      <strong>Key Result:</strong> ${data.results}
    </div>

    <div>
      <h4 class="modal-section-title">Technologies Used</h4>
      <div class="project-tech-chips" style="margin-top: 8px;">
        ${data.tech.map(t => `<span class="chip">${t}</span>`).join('')}
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    ${data.links.map(l => `
      <a href="${l.url}" class="btn btn-primary" ${l.url !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        ${l.label}
      </a>
    `).join('')}
    <button class="btn btn-secondary" onclick="closeProjectModal()">Close</button>
  `;

  modal.removeAttribute('hidden');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Focus trap: set focus to close button
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.focus();
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('hidden', 'true');
  document.body.style.overflow = '';

  if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
    previousActiveElement.focus();
  }
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProjectModal);
  }

  // Click outside dialog to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  // Esc key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeProjectModal();
    }
  });

  // Focus trap inside modal
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || modal.hasAttribute('hidden')) return;

    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
}

// Global hook for inline onclick handlers
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

/* ==========================================================================
   8. COPY EMAIL BUTTON
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyBtnText');
  const email = 'd.abhinav2802@gmail.com';

  if (!copyBtn || !copyText) return;

  let timeoutId = null;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      copyText.textContent = 'Copied!';
      copyBtn.classList.add('btn-primary');
      copyBtn.classList.remove('btn-secondary');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        copyText.textContent = 'Copy Email';
        copyBtn.classList.remove('btn-primary');
        copyBtn.classList.add('btn-secondary');
      }, 2000);
    } catch {
      copyText.textContent = 'Failed to copy';
      setTimeout(() => {
        copyText.textContent = 'Copy Email';
      }, 2000);
    }
  });
}

/* ==========================================================================
   9. SCROLL FADE-IN (Subtle & Non-blocking)
   ========================================================================== */
function initScrollFadeIn() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const elements = document.querySelectorAll('.card, .section-header, .stats-strip, .timeline-item');
  elements.forEach(el => el.classList.add('fade-in-scroll'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
