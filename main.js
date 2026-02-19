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
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      closeMobileMenu();
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
    'Aspiring Data Scientist',
    'ML Enthusiast',
    'Python Programmer',
    'Data Analytics Student',
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
          setTimeout(typeEffect, 1800);
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

      setTimeout(typeEffect, isDeleting ? 55 : 90);
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
        const container = document.getElementById('techstack');
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
        title: "Faket — Fake News Detection & Verification Tool",
        description: "A web application that detects and verifies the authenticity of news articles using advanced NLP techniques and machine learning models.",
        tags: ["Next.js", "Node.js", "MySQL", "FastAPI", "Tailwind CSS"],
        github: "https://github.com/280205-Abhi/Faktet-WebApp",
        live: "#",
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

            <div class="project-card-top">
            <div class="project-folder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
                </svg>
            </div>
            <div class="project-links">
                <a href="${project.github}" aria-label="GitHub" class="project-link" target='_blank'>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                </svg>
                </a>
                <a href="${project.live}" aria-label="Live Demo" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                </svg>
                </a>
            </div>
            </div>

            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>

            <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
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
        role: "Full Stack Deveopment Intern",
        org: "TechAisa Mechatronics Pvt Ltd",
        description: "Built a Website for the company Workflow",
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
    CONTACT FORM
    ============================ */
    async function handleFormSubmit() {
    const name    = document.getElementById('form-name').value.trim();
    const email   = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();
    const note    = document.getElementById('form-note');
    const btn     = document.getElementById('form-submit');
    const text    = document.getElementById('submit-text');

    if (!name || !email || !message) {
        note.textContent = '⚠ Please fill in all fields.';
        note.className = 'form-note error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        note.textContent = '⚠ Please enter a valid email.';
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
        document.getElementById('form-name').value    = '';
        document.getElementById('form-email').value   = '';
        document.getElementById('form-message').value = '';
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
    '.experience-heading, .timeline, .contact-heading, .contact-grid'
    ).forEach(el => aboutObserver.observe(el));

