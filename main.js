/* =========================================================================
   ABHINAV DASARI — CONSOLE PORTFOLIO ENGINE & DATA CONFIGURATION
   =========================================================================
   TABLE OF CONTENTS:
   -------------------------------------------------------------------------
   PART 1: PORTFOLIO DATA CONFIGURATION
     1. heroRoles       — Dynamic typing role titles under your name
     2. kpiMetrics      — 4 Top dashboard metric cards with animated sparklines
     3. quickFacts      — Profile facts (Degree, College, CGPA, Status)
     4. nowStatus       — Current focus & real-time learning goals
     5. skills          — Categorized skill clusters (Analysis, Visualisation, etc.)
     6. projects        — Showcase projects & interactive Case Study modals
     7. journey         — Career timeline (Education, Internships, Experience)
     8. wins            — Hackathon victories & competition honors
     9. certifications  — Verified certificates & licenses

   PART 2: INTERACTIVE ENGINE & UI LOGIC
     - Section Renderers (KPIs, Facts, Now, Skills, Projects, Journey, Wins, Certs)
     - Scroll-Spy Rail Navigation (IntersectionObserver)
     - Mobile Drawer Navigation (Toggle, Auto-close, Escape key)
     - Real-Time Asia/Kolkata Clock (Live 24h IST indicator)
     - Typewriter Role Ticker (Smooth typing & backspacing loop)
     - Scroll Entrance Reveals & Number Count-Up Rollups
     - Case Study Modal Controller (Dynamic mounting, Focus trap, ESC key)
     - Toast Alerts & Email Clipboard Copy (with Fallback)
     - Real-Time Contact Form Validation (Regex validation & inline feedback)
     - Smooth Scrolling & Dynamic Copyright Year
   ========================================================================= */

/* =========================================================================
   PART 1: PORTFOLIO DATA CONFIGURATION
   👉 To add or edit content, update the fields below.
   JavaScript automatically renders and formats every card and section!
   ========================================================================= */
const PORTFOLIO_DATA = {

  /* -----------------------------------------------------------------------
     1. HERO TYPING ROLES
     These titles cycle automatically in the animated typewriter under your name.
     ----------------------------------------------------------------------- */
  heroRoles: [
    "data analyst",
    "data scientist",
    "software engineer",
  ],

  /* -----------------------------------------------------------------------
     2. KPI METRICS
     4 Highlights on your dashboard with live animated counter rollups & sparklines.
     Available tones: "lime" | "cyan" | "amber" | "red"
     ----------------------------------------------------------------------- */
  kpiMetrics: [
    {
      tone: "lime",
      label: "Ensemble accuracy",
      value: 96.55,
      decimals: 2,
      suffix: "%",
      delta: "▲ 17 models benchmarked",
      sparkline: {
        color: "#c8f751",
        path: "M0 28 L20 24 L40 26 L60 16 L80 18 L100 8 L120 6"
      }
    },
    {
      tone: "cyan",
      label: "Rows cleaned",
      value: 31994,
      decimals: 0,
      suffix: "",
      delta: "27% were duplicates",
      sparkline: {
        color: "#57c7e8",
        path: "M0 10 L20 12 L40 9 L60 18 L80 14 L100 26 L120 24"
      }
    },
    {
      tone: "amber",
      label: "Models tested",
      value: 17,
      decimals: 0,
      suffix: "",
      delta: "1 shipped ensemble",
      sparkline: {
        color: "#f5a65b",
        path: "M0 30 L20 26 L40 22 L60 20 L80 12 L100 10 L120 8"
      }
    },
    {
      tone: "red",
      label: "B.Tech CGPA",
      value: 9.08,
      decimals: 2,
      suffix: "",
      delta: "of 10 · 2027",
      sparkline: {
        color: "#ff6b5e",
        path: "M0 22 L20 20 L40 18 L60 16 L80 14 L100 12 L120 10"
      }
    }
  ],

  /* -----------------------------------------------------------------------
     3. QUICK FACTS
     Key metadata displayed in the "Profile / Facts" card in your overview.
     ----------------------------------------------------------------------- */
  quickFacts: [
    { k: "Degree", v: "B.Tech IT" },
    { k: "Graduating", v: "2027" },
    { k: "Focus", v: "EDA · SQL · ML" },
    { k: "Open to", v: "SDE · Data" }
  ],

  /* -----------------------------------------------------------------------
     4. NOW STATUS
     Real-time learning, research, or development status.
     ----------------------------------------------------------------------- */
  nowStatus: [
    { text: "OSS health score", tag: "building" },
    { text: "SHAP + Grad-CAM", tag: "reading" },
    { text: "Mumbai, IN", tag: "location" }
  ],

  /* -----------------------------------------------------------------------
     5. SKILLS MATRIX
     Categorized clusters. Adding or removing skills updates count badges automatically.
     Available tones: "lime" | "cyan" | "amber" | "red"
     ----------------------------------------------------------------------- */
  skills: [
    {
      title: "Data Science & Analytics",
      tone: "lime",
      skills: [
        "SQL",
        "Python",
        "Pandas",
        "NumPy",
        "Exploratory Data Analysis (EDA)",
        "Data Cleaning",
        "Feature Engineering",
        "Power BI",
        "Tableau",
        "Matplotlib",
        "Seaborn",
        "Plotly",
        "Statistics",
        "Excel"
      ]
    },
    {
      title: "Machine Learning (ML)",
      tone: "amber",
      skills: [
        "Scikit-learn",
        "PyTorch",
        "Classification",
        "Model Evaluation",
        "SHAP & Explainability",
        "Grad-CAM++",
        "ResNet18",
        "EfficientNet-B0",
        "Benchmarking"
      ]
    },
    {
      title: "Software & Web Dev",
      tone: "cyan",
      skills: [
        "FastAPI",
        "REST APIs",
        "Flask",
        "React.js",
        "JavaScript",
        "Python",
        "Data Structures (DSA)",
        "OOP Principles",
        "C",
        "Java (Basics)"
      ]
    },
    {
      title: "Databases & Tools",
      tone: "red",
      skills: [
        "MySQL",
        "MongoDB",
        "ChromaDB",
        "SQL Joins & Subqueries",
        "CTEs & Window Functions",
        "Git & GitHub",
        "Postman",
        "Jupyter Notebook",
        "Linux / CLI"
      ]
    }
  ],

  /* -----------------------------------------------------------------------
     6. PROJECTS & CASE STUDIES (SINGLE UNIFIED LAYOUT UI)
     👉 To add a new project, simply copy the template below and paste it into
     this array. The card in the Work grid AND the Case Study modal popup are
     both generated automatically with full responsive styling!

     TEMPLATE TO COPY:
     {
       id: "my-project-slug",
       title: "Project Name",
       category: "Domain · Specialization",
       tone: "lime", // "lime" | "cyan" | "amber" | "red"
       year: "2026",
       highlight: "KEY METRIC / RESULT",
       desc: "Concise summary of problem and solution.",
       metrics: [
         { value: "99%", label: "Metric 1" },
         { value: "45ms", label: "Metric 2" }
       ],
       tags: ["Python", "SQL", "FastAPI"],
       links: [
         { label: "Code", url: "https://github.com/..." }
       ],
       // Optional custom SVG diagram or screenshot image:
       // chartSvg: `<svg ...></svg>`,
       // image: "files/screenshot.png",
       caseStudy: {
         eyebrow: "Domain · Category · 2026",
         title: "Full Deep-Dive Title",
         lede: "Introductory overview...",
         stats: [{ value: "99%", label: "Accuracy" }],
         problem: "The problem statement...",
         approach: "Your methodology...",
         highlights: ["Achievement 1", "Achievement 2"],
         learnings: "What this project proves...",
         actions: [{ label: "View on GitHub", url: "https://..." }]
       }
     }
     ----------------------------------------------------------------------- */
  projects: [
    {
      id: "neuroai",
      title: "NeuroAI",
      category: "Healthcare ML · Clinical Decision Support",
      tone: "lime",
      year: "2026",
      highlight: "96.55% CLINICAL ENSEMBLE",
      desc: "Multimodal ASD pre-screening — MRI, speech and questionnaire signals in one recommendation, with SHAP and Grad-CAM++ to show why.",
      metrics: [
        { value: "96.55%", label: "Ensemble" },
        { value: "0.9117", label: "AUC" },
        { value: "17", label: "Models" }
      ],
      tags: ["Python", "PyTorch", "FastAPI"],
      links: [
        { label: "Code", url: "https://github.com/280205-Abhi/NeuroAI_ASD" }
      ],
      chartSvg: `<svg viewBox="0 0 420 150" role="img" aria-label="Three signals fusing into a prediction">
        <rect width="420" height="150" fill="#16212c" />
        <g fill="none" stroke="#2b3c4c" stroke-width="1.2">
          <rect x="16" y="26" width="82" height="24" rx="4" />
          <rect x="16" y="63" width="82" height="24" rx="4" />
          <rect x="16" y="100" width="82" height="24" rx="4" />
        </g>
        <g fill="#8a9aab" font-family="'IBM Plex Mono',monospace" font-size="8">
          <text x="26" y="41">MRI</text><text x="26" y="78">SPEECH</text><text x="26" y="115">M-CHAT</text>
        </g>
        <g stroke="#c8f751" stroke-width="1.2" fill="none" opacity=".9">
          <path d="M98 38 H132 V75 H160" />
          <path d="M98 75 H160" />
          <path d="M98 112 H132 V79 H160" />
          <path d="M248 75 H276" />
          <path d="M270 71 L277 75 L270 79" />
        </g>
        <rect x="160" y="56" width="88" height="38" rx="4" fill="#c8f751" opacity=".16" stroke="#c8f751" />
        <text x="204" y="79" text-anchor="middle" fill="#c8f751" font-family="'IBM Plex Mono',monospace" font-size="8">FUSION</text>
        <rect x="277" y="46" width="128" height="58" rx="4" fill="#0a0e13" stroke="#2b3c4c" />
        <text x="341" y="76" text-anchor="middle" fill="#e9eff5" font-family="Sora,sans-serif" font-size="17" font-weight="600">96.55%</text>
        <text x="341" y="92" text-anchor="middle" fill="#7f92a4" font-family="'IBM Plex Mono',monospace" font-size="7">CLINICAL ENSEMBLE</text>
      </svg>`,
      caseStudy: {
        eyebrow: "Machine Learning · Interpretable AI · 2026",
        title: "NeuroAI — Multimodal Pre-Screening for Autism Spectrum Disorder",
        lede: "A clinician-first screening pipeline that pairs neuroimaging, acoustic features, and screening responses into an ensemble recommendation — backed by SHAP and Grad-CAM++ explanations instead of black-box scores.",
        stats: [
          { value: "96.55%", label: "Ensemble Accuracy" },
          { value: "0.9117", label: "ROC-AUC Score" },
          { value: "17", label: "Models Benchmarked" },
          { value: "3", label: "Fused Modalities" }
        ],
        problem: "ASD diagnosis today faces substantial waiting lists and subjectively scored questionnaires. Single-modality machine learning approaches (e.g. MRI only) struggle to generalize, while clinician trust requires full transparency into why an algorithm flagged risk.",
        approach: "Engineered three independent feature streams: structural MRI feature embeddings, acoustic speech prosody metrics, and scored behavioral questions. Trained diverse base estimators and fused them via a meta-learner, producing patient-specific SHAP force plots for every prediction.",
        highlights: [
          "Outperformed all 17 single-modality baselines (random forest, SVM, standard CNNs) by at least 4.2% accuracy.",
          "Implemented Grad-CAM++ heatmaps to reveal localized activation regions in neuroimaging scans.",
          "Built a lightweight FastAPI inference microservice delivering predictions and explanation assets in <450ms."
        ],
        learnings: "In clinical tooling, explainability is not an afterthought — it's the product. Clinicians embraced the tool when feature attributions aligned with diagnostic criteria.",
        actions: [
          { label: "View on GitHub", url: "https://github.com/280205-Abhi/NeuroAI_ASD" }
        ]
      }
    },
    {
      id: "hotel",
      title: "Hotel booking EDA",
      category: "Data Analytics · Revenue Risk Modeling",
      tone: "cyan",
      year: "2026",
      highlight: "119,390 RECORDS · $11.47M LEAKAGE",
      desc: "119,390 bookings cleaned into a revenue picture the hotel could trust — and six policy recommendations that follow from it.",
      metrics: [
        { value: "119,390", label: "Rows" },
        { value: "31,994", label: "Dupes" },
        { value: "$11.47M", label: "Lost" }
      ],
      tags: ["Pandas", "Plotly", "Seaborn"],
      links: [
        { label: "Code", url: "https://github.com/280205-Abhi/Hotel_Booking_Analysis" }
      ],
      chartSvg: `<svg viewBox="0 0 420 150" role="img" aria-label="Bar chart of hotel revenue">
        <rect width="420" height="150" fill="#16212c" />
        <path d="M24 128 H396" stroke="#2b3c4c" stroke-width="1" />
        <g fill="#57c7e8" opacity=".85">
          <rect x="34" y="88" width="26" height="40" rx="2" />
          <rect x="70" y="66" width="26" height="62" rx="2" />
          <rect x="106" y="98" width="26" height="30" rx="2" />
          <rect x="142" y="48" width="26" height="80" rx="2" />
          <rect x="178" y="76" width="26" height="52" rx="2" />
          <rect x="214" y="94" width="26" height="34" rx="2" />
        </g>
        <rect x="250" y="60" width="26" height="68" rx="2" fill="#ff6b5e" />
        <text x="24" y="30" fill="#e9eff5" font-family="Sora,sans-serif" font-size="15" font-weight="600">$22.97M</text>
        <text x="24" y="44" fill="#7f92a4" font-family="'IBM Plex Mono',monospace" font-size="7">EARNED · $11.47M LOST</text>
        <rect x="286" y="36" width="86" height="16" rx="3" fill="#c8f751" opacity=".18" stroke="#c8f751" stroke-opacity=".5" />
        <text x="292" y="47" fill="#c8f751" font-family="'IBM Plex Mono',monospace" font-size="7">31,994 DUPES</text>
      </svg>`,
      caseStudy: {
        eyebrow: "Data Analytics · Revenue Intelligence · 2025",
        title: "Hotel Booking Cancellation & Revenue Risk Analytics",
        lede: "Comprehensive exploratory data analysis and modeling on 119,390 hotel booking records across city and resort properties, identifying key cancellation patterns and $11.47M in revenue leakage.",
        stats: [
          { value: "119,390", label: "Raw Records" },
          { value: "31,994", label: "Duplicates Cleaned" },
          { value: "37.04%", label: "Cancellation Rate" },
          { value: "$11.47M", label: "Identified Leakage" }
        ],
        problem: "Hotels face chronic revenue volatility due to late cancellations, no-shows, and third-party distribution commissions without clear visibility into root causes.",
        approach: "Audited data integrity, eliminated 31,994 duplicate bookings, treated negative and 5,000+ ADR outliers, and mapped cancellation probability against lead time, deposit type, and distribution channel.",
        highlights: [
          "Identified non-refundable deposit anomalies where cancellations still spiked due to rigid policy mismatches.",
          "Uncovered that lead times exceeding 90 days yielded a 58% cancellation rate compared to 18% for short bookings.",
          "Delivered interactive Tableau dashboards enabling operational teams to monitor lead-time risk buckets."
        ],
        learnings: "Data hygiene is 80% of actionable analytics. Removing misleading duplicate bookings completely reshaped our ADR and revenue projections.",
        actions: [
          { label: "View GitHub Repo", url: "https://github.com/280205-Abhi/Hotel_Booking_Analysis" },
          { label: "View Report", url: "https://drive.google.com/file/d/1sXUeJZfLIHa84kZxPm1ZcQuG0lCqpnpA/view" }
        ]
      }
    },
    {
      id: "oss",
      title: "OSS health analytics",
      category: "Developer Tooling · Pipeline Automation",
      tone: "amber",
      year: "In progress",
      highlight: "COMMITS & CONTRIBUTORS VELOCITY",
      desc: "Stars don't tell you if a repo is healthy. Scoring “thriving vs abandoned” from real GitHub activity data.",
      metrics: [
        { value: "REST", label: "API" },
        { value: "1", label: "Score" },
        { value: "Monthly", label: "Signals" }
      ],
      tags: ["GitHub API", "Pandas", "SQL"],
      links: [
        { label: "GitHub", url: "https://github.com/280205-Abhi" }
      ],
      chartSvg: `<svg viewBox="0 0 420 150" role="img" aria-label="Line chart of a health score">
        <rect width="420" height="150" fill="#16212c" />
        <g stroke="#2b3c4c" stroke-width="1" opacity=".7">
          <path d="M24 50 H396" />
          <path d="M24 90 H396" />
          <path d="M24 130 H396" />
        </g>
        <path d="M24 116 C 70 96, 96 106, 130 84 S 190 62, 224 76 S 286 96, 320 62 S 370 34, 396 40 L396 130 L24 130 Z" fill="#c8f751" opacity=".1" />
        <path d="M24 116 C 70 96, 96 106, 130 84 S 190 62, 224 76 S 286 96, 320 62 S 370 34, 396 40" fill="none" stroke="#c8f751" stroke-width="2" stroke-linecap="round" />
        <g fill="#e9eff5">
          <circle cx="130" cy="84" r="3" />
          <circle cx="224" cy="76" r="3" />
          <circle cx="320" cy="62" r="3" />
        </g>
        <text x="24" y="30" fill="#e9eff5" font-family="Sora,sans-serif" font-size="13" font-weight="600">HEALTH SCORE</text>
        <text x="300" y="30" fill="#7f92a4" font-family="'IBM Plex Mono',monospace" font-size="7">COMMITS · CONTRIBUTORS</text>
      </svg>`,
      caseStudy: {
        eyebrow: "Engineering · Developer Analytics · 2026",
        title: "OSS Ecosystem Analytics & Trend Pipeline",
        lede: "A reproducible pipeline that ingests GitHub metadata, computes commit and star velocities, and clusters emerging software ecosystems.",
        stats: [
          { value: "Realtime", label: "Data Stream" },
          { value: "JSON/CSV", label: "Export Formats" },
          { value: "Local-First", label: "Zero Cloud Cost" }
        ],
        problem: "Identifying fast-growing developer tooling early requires parsing noisy commit data and filtering synthetic activity.",
        approach: "Built modular Python extractors using the GitHub REST API, normalized engagement signals into a localized DuckDB store, and computed rolling velocity metrics.",
        highlights: [
          "Automated rate-limit handling with exponential backoff and localized cache tiers.",
          "Tracked language popularity drift across topics over quarterly time windows.",
          "Designed clean CLI reports providing instant repo trajectory summaries."
        ],
        learnings: "Building lean, local-first analytics tools often beats bloated cloud data warehouses for focused developer analysis.",
        actions: [
          { label: "Follow on GitHub", url: "https://github.com/280205-Abhi" }
        ]
      }
    }
  ],

  /* -----------------------------------------------------------------------
     7. JOURNEY & EXPERIENCE
     Career milestones, internships, simulations, and education history.
     Each milestone supports: when, title, org, orgSub, location, type, tone, badge,
     points (bullet achievements), and skills (technologies & domains).
     ----------------------------------------------------------------------- */
  journey: [
    {
      when: "Apr 2026",
      title: "Data Analytics Job Simulation",
      org: "Deloitte",
      orgSub: "via Forage",
      location: "Virtual Experience",
      type: "Simulation",
      tone: "lime",
      badge: null,
      skills: ["Tableau", "Data Cleaning", "Business Analytics", "KPI Dashboards"],
      points: [
        "Cleaned and preprocessed raw business datasets by resolving anomalies, nulls, and formatting errors for reliable downstream analytics.",
        "Engineered an interactive executive Tableau dashboard tracking operational KPIs and telemetry metrics."
      ]
    },
    {
      when: "Jun — Jul 2025",
      title: "Full Stack Developer Intern",
      org: "TechAsia Mechatronics Pvt. Ltd.",
      orgSub: null,
      location: "Mumbai, India",
      type: "Internship",
      tone: "cyan",
      badge: null,
      skills: ["React.js", "SQL", "REST APIs", "Component Architecture"],
      points: [
        "Built modular React.js frontend components for a live industrial showcase platform featuring hardware catalogs.",
        "Queried and managed relational SQL product database records behind the interface to structure dynamic catalog specs."
      ]
    },
    {
      when: "2023 — 2027",
      title: "B.Tech, Information Technology",
      org: "K. J. Somaiya Institute of Technology",
      orgSub: null,
      location: "Mumbai, India",
      type: "Education",
      tone: "amber",
      badge: "CGPA 9.08 / 10",
      skills: ["DSA", "DBMS", "Statistics & Probability", "Operating Systems", "Computer Networks"],
      points: [
        "Ranked top tier with CGPA 9.08 / 10 across foundational and advanced computer engineering disciplines.",
        "Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Applied Statistics, and Operating Systems."
      ]
    }
  ],

  /* -----------------------------------------------------------------------
     8. WINS & HACKATHONS
     Competitions, awards, and hackathons.
     Set 'wide: true' for prominent full-width card layout.
     ----------------------------------------------------------------------- */
  wins: [
    {
      wide: true,
      rank: "Institute round winner · 2025",
      title: "Smart India Hackathon — EcoSnap",
      year: "2025",
      desc: "A rewards app that verifies eco-friendly actions through automated image checks and pays out community credits. Won the institute-level round with a three-person team."
    }
  ],

  /* -----------------------------------------------------------------------
     9. CERTIFICATIONS
     Verified professional credentials and licenses with verification links.
     ----------------------------------------------------------------------- */
  certifications: [
    {
      name: "SQL (Intermediate) — HackerRank",
      issuer: "Nov 2026",
      url: "https://www.hackerrank.com/certificates/iframe/0903453d30cb"
    },
    {
      name: "Python (Basic) — HackerRank",
      issuer: "Nov 2026",
      url: "https://www.hackerrank.com/certificates/iframe/29b56dc13e5c"
    },
    {
      name: "Programming, DSA using Python — NPTEL (IIT)",
      issuer: "8-week course · 2026",
      url: "files/nptel-python-dsa.pdf"
    }
  ]
};

// Export to window for global availability
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

/* =========================================================================
   PART 2: INTERACTIVE ENGINE & UI LOGIC
   Handles dynamic rendering, animations, navigation, modals, and forms.
   ========================================================================= */
(() => {
  "use strict";

  /* ---------- DOM & Math Utility Helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = (typeof window !== "undefined" && typeof window.matchMedia === "function")
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };
  const clamp = (n, a, b) => Math.min(Math.max(n, a), b);

  /* Reference data from configuration */
  const DATA = window.PORTFOLIO_DATA = PORTFOLIO_DATA;

  /* ---------- Section Renderers (Hydrates DOM from PORTFOLIO_DATA) ---------- */

  // 1. Render Dashboard KPI Cards
  const renderKPIs = () => {
    const container = $("#kpiContainer");
    if (!container || !DATA.kpiMetrics) return;
    container.innerHTML = DATA.kpiMetrics.map((k) => `
      <div class="tile tile--kpi" data-reveal>
        <p class="kpi__label">${k.label}</p>
        <p class="kpi__value"><span data-count="${k.value}" data-decimals="${k.decimals || 0}" data-suffix="${k.suffix || ''}">0</span></p>
        <p class="kpi__delta">${k.delta}</p>
        <svg class="kpi__spark" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
          <path class="area" d="${k.sparkline?.path || 'M0 20 L120 10'} L120 34 L0 34 Z" fill="${k.sparkline?.color || '#c8f751'}" />
          <path class="line" d="${k.sparkline?.path || 'M0 20 L120 10'}" stroke="${k.sparkline?.color || '#c8f751'}" />
        </svg>
      </div>
    `).join("");
  };

  // 2. Render Profile Quick Facts
  const renderFacts = () => {
    const container = $("#factsContainer");
    if (!container || !DATA.quickFacts) return;
    container.innerHTML = DATA.quickFacts.map((f) => `
      <li><span class="k">${f.k}</span><span class="v">${f.v}</span></li>
    `).join("");
  };

  // 3. Render "Now" Learning & Research Focus
  const renderNow = () => {
    const container = $("#nowContainer");
    if (!container || !DATA.nowStatus) return;
    container.innerHTML = DATA.nowStatus.map((item) => `
      <li>${item.text} <span>${item.tag}</span></li>
    `).join("");
  };

  // 4. Render Categorized Stack & Skills Matrix
  const renderSkills = () => {
    const container = $("#skillsContainer");
    if (!container || !DATA.skills) return;
    container.innerHTML = DATA.skills.map((g) => `
      <div class="skillgroup" data-tone="${g.tone || 'lime'}">
        <div class="skillgroup__head">
          <span class="skillgroup__dot" aria-hidden="true"></span>
          <h3>${g.title}</h3>
          <span class="skillgroup__count">${g.skills ? g.skills.length : 0}</span>
        </div>
        <ul class="pills">
          ${(g.skills || []).map((s) => `<li class="pill">${s}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  };

  // 5. Render Featured Work & Projects
  // Single Unified Layout UI for all Project Cards
  const createProjectCard = (p) => {
    const tone = p.tone || "lime";
    const tagsHtml = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
    const linksHtml = (p.links || []).map((l) => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("");
    const detailsBtn = p.caseStudy ? `<button class="project__open" type="button" data-project="${p.id}">Details →</button>` : "";

    // Metric summary pills
    const metricsHtml = p.metrics && p.metrics.length ? `
      <div class="project__metrics">
        ${p.metrics.map((m) => `<div class="project__metric"><b>${m.value}</b><span>${m.label}</span></div>`).join("")}
      </div>
    ` : "";

    // Single unified visual header: custom SVG, image, or auto-generated tech banner
    let visualHtml = "";
    if (p.chartSvg) {
      visualHtml = `<div class="project__chart">${p.chartSvg}</div>`;
    } else if (p.image) {
      visualHtml = `<div class="project__chart"><img src="${p.image}" alt="${p.title}" style="width:100%;height:150px;object-fit:cover;" /></div>`;
    } else {
      visualHtml = `
        <div class="project__banner" data-tone="${tone}">
          <div class="project__banner-top">
            <span class="project__banner-cat">${p.category || 'FEATURED PROJECT'}</span>
            <span class="project__banner-year">${p.year || ''}</span>
          </div>
          <div class="project__banner-mid">
            ${p.highlight ? `<span class="project__banner-highlight">${p.highlight}</span>` : ''}
            <h3 class="project__banner-title">${p.title}</h3>
          </div>
          <div class="project__banner-wave" aria-hidden="true">
            <svg viewBox="0 0 380 24" preserveAspectRatio="none">
              <path d="M0 16 Q 95 2, 190 14 T 380 8" fill="none" stroke="currentColor" stroke-width="2" />
              <circle cx="376" cy="8" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      `;
    }

    return `
      <article class="project" data-reveal>
        ${visualHtml}
        <div class="project__body">
          <div class="project__top">
            <h3 class="project__title">${p.title}</h3>
            <span class="project__year">${p.year || ''}</span>
          </div>
          <p class="project__desc">${p.desc || ''}</p>
          ${metricsHtml}
          <div class="project__foot">
            <div class="tags">${tagsHtml}</div>
            <div class="project__links">
              ${linksHtml}
              ${detailsBtn}
            </div>
          </div>
        </div>
      </article>
    `;
  };

  // Render Projects Grid using the unified single layout UI
  const renderProjects = () => {
    const container = $("#projectsContainer");
    if (!container || !DATA.projects) return;
    container.innerHTML = DATA.projects.map(createProjectCard).join("");
    const countMeta = $("#projectCountMeta");
    if (countMeta) {
      countMeta.textContent = `03 — ${DATA.projects.length} projects · public code`;
    }
  };

  // 6. Render Career Journey Timeline
  const renderJourney = () => {
    const container = $("#journeyContainer");
    if (!container || !DATA.journey) return;
    container.innerHTML = DATA.journey.map((j) => {
      const tone = j.tone || "cyan";
      const typeBadge = j.type ? `<span class="row__type">${j.type}</span>` : "";
      const gpaBadge = j.badge ? `<span class="row__badge">${j.badge}</span>` : "";
      const locationMeta = j.location ? `
        <span class="row__location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${j.location}
        </span>
      ` : "";
      const orgLine = j.org ? `
        <span class="row__org">
          ${j.org}${j.orgSub ? ` <span class="row__org-sub">· ${j.orgSub}</span>` : ""}
        </span>
      ` : "";
      const tags = (j.skills && j.skills.length) ? `
        <div class="row__tags">
          ${j.skills.map((s) => `<span class="tag">${s}</span>`).join("")}
        </div>
      ` : "";

      return `
        <article class="row" data-tone="${tone}" data-reveal>
          <div class="row__side">
            <div class="row__side-top">
              <span class="row__dot" aria-hidden="true"></span>
              <span class="row__when">${j.when}</span>
            </div>
            ${typeBadge}
          </div>
          <div class="row__main">
            <div class="row__header">
              <div class="row__title-wrap">
                <h3 class="row__title">${j.title}</h3>
                <div class="row__meta">
                  ${orgLine}
                  ${locationMeta}
                </div>
              </div>
              ${gpaBadge ? `<div class="row__header-extra">${gpaBadge}</div>` : ""}
            </div>
            <ul class="row__desc">
              ${(j.points || []).map((pt) => `
                <li>
                  <span class="row__prompt" aria-hidden="true">▹</span>
                  <span>${pt}</span>
                </li>
              `).join("")}
            </ul>
            ${tags}
          </div>
        </article>
      `;
    }).join("");
  };

  // 7. Render Competition Wins & Honors
  const renderWins = () => {
    const container = $("#winsContainer");
    if (!container || !DATA.wins) return;
    container.innerHTML = DATA.wins.map((w) => `
      <article class="win ${w.wide ? 'win--wide' : ''}" data-reveal>
        <p class="win__rank">${w.rank}</p>
        <div class="win__main">
          <h3 class="win__title">${w.title}</h3>
          <p class="win__desc">${w.desc}</p>
        </div>
        <p class="win__year">${w.year}</p>
      </article>
    `).join("");
  };

  // 8. Render Verified Certifications
  const renderCertifications = () => {
    const container = $("#certsContainer");
    if (!container || !DATA.certifications) return;
    container.innerHTML = DATA.certifications.map((c) => `
      <a class="cert" href="${c.url}" target="_blank" rel="noopener noreferrer" data-reveal>
        <span class="cert__seal" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <span>
          <span class="cert__name">${c.name}</span>
          <span class="cert__issuer">${c.issuer}</span>
        </span>
        <svg class="cert__arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </a>
    `).join("");
  };

  // Execute Initial Render
  renderKPIs();
  renderFacts();
  renderNow();
  renderSkills();
  renderProjects();
  renderJourney();
  renderWins();
  renderCertifications();

  /* =========================================================================
     2. NAVIGATION & ACTIVE SECTION SCROLL-SPY
     Monitors section visibility and highlights corresponding dots in sidebar rail
     ========================================================================= */
  const links = $$("[data-navlink]");
  const sections = $$("section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const ratios = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => ratios.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
        let best = "";
        let top = 0;
        ratios.forEach((r, id) => {
          if (r > top) {
            top = r;
            best = id;
          }
        });
        if (!best) return;
        links.forEach((l) => {
          if (l.getAttribute("href") === `#${best}`) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.5, 1] }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* =========================================================================
     3. MOBILE NAVIGATION DRAWER
     Toggles dropdown drawer navigation on smaller viewports (<= 900px)
     ========================================================================= */
  const menuBtn = $("#menuBtn");
  const drawer = $("#drawer");
  const setDrawer = (open) => {
    if (!menuBtn || !drawer) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.hidden = !open;
  };
  if (menuBtn) menuBtn.addEventListener("click", () => setDrawer(menuBtn.getAttribute("aria-expanded") !== "true"));
  if (drawer) $$("a", drawer).forEach((a) => a.addEventListener("click", () => setDrawer(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBtn && menuBtn.getAttribute("aria-expanded") === "true") setDrawer(false);
  });

  /* =========================================================================
     4. REALTIME IST CLOCK
     Displays current Asia/Kolkata 24-hour time and updates every 20 seconds
     ========================================================================= */
  const clock = $("#clock");
  if (clock) {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
      clock.textContent = `${t} IST`;
    };
    tick();
    setInterval(tick, 20000);
  }

  /* =========================================================================
     5. TYPEWRITER ANIMATION LOOP
     Cycles through configured roles with humanized variable typing delays
     ========================================================================= */
  const typedEl = $("#typed");
  const roles = DATA.heroRoles || ["data analyst", "data scientist", "software engineer"];

  if (typedEl && roles.length) {
    if (reduced.matches) {
      typedEl.textContent = roles[0];
    } else {
      let roleIdx = 0;
      let charIdx = roles[0].length;
      let deleting = true;

      const step = () => {
        const current = roles[roleIdx];
        if (deleting) {
          charIdx--;
          typedEl.textContent = current.slice(0, charIdx);
          if (charIdx <= 0) {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(step, 350);
            return;
          }
          setTimeout(step, 35);
        } else {
          charIdx++;
          typedEl.textContent = current.slice(0, charIdx);
          if (charIdx >= current.length) {
            deleting = true;
            setTimeout(step, 2000); // Pause reading time when word finishes
            return;
          }
          setTimeout(step, 65 + Math.random() * 40);
        }
      };
      setTimeout(step, 1800);
    }
  }

  /* =========================================================================
     6. SCROLL REVEALS & NUMERIC COUNTER ROLLUPS
     IntersectionObserver detects entrance and runs smooth cubic rollup on metrics
     ========================================================================= */
  const reveals = $$("[data-reveal]");
  reveals.forEach((el, i) => {
    // Stagger initial items in viewport
    if (i < 4 && !reduced.matches) el.style.transitionDelay = `${i * 60}ms`;
  });

  const counters = $$("[data-count]");
  const fmt = (el, n) => {
    const d = Number(el.dataset.decimals || 0);
    return n.toLocaleString("en-IN", { minimumFractionDigits: d, maximumFractionDigits: d });
  };
  const runCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const step = (now) => {
      const p = clamp((now - start) / 1100, 0, 1);
      const e = 1 - Math.pow(1 - p, 3); // Smooth cubic ease-out
      el.textContent = fmt(el, target * e) + (p < 1 ? "" : suffix);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && !reduced.matches) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-in");
          $$("[data-count]", en.target).forEach(runCount);
          obs.unobserve(en.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
    counters.forEach((c) => (c.textContent = fmt(c, Number(c.dataset.count || 0)) + (c.dataset.suffix || "")));
  }

  /* =========================================================================
     7. CASE STUDY MODAL CONTROLLER
     Dynamic population from DATA.projects with focus trapping and body scroll locking
     ========================================================================= */
  const modal = $("#modal");
  const modalBody = $("#modalBody");
  const modalPanel = $("#modalPanel");
  const modalClose = $("#modalClose");
  let lastFocused = null;
  let open = false;

  // Query focusable elements for keyboard accessibility trap
  const focusables = (root) =>
    $$('a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])', root).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );

  const openModal = (id) => {
    if (!modal || !modalBody) return;

    // 1. Locate project in DATA.projects
    const project = (DATA.projects || []).find((p) => p.id === id);
    if (project && project.caseStudy) {
      const cs = project.caseStudy;
      lastFocused = document.activeElement;
      modalBody.innerHTML = `
        <div class="modal__body">
          ${cs.eyebrow ? `<div class="modal__eyebrow"><span>${cs.eyebrow}</span></div>` : ''}
          <h2>${cs.title || project.title}</h2>
          ${cs.lede ? `<p class="modal__lede">${cs.lede}</p>` : ''}
          ${cs.stats && cs.stats.length ? `
            <div class="modal__stats">
              ${cs.stats.map((s) => `<div class="modal__stat"><b>${s.value}</b><span>${s.label}</span></div>`).join("")}
            </div>
          ` : ''}
          ${cs.problem || cs.approach ? `
            <div class="modal__grid">
              ${cs.problem ? `<div><h4>The Problem</h4><p>${cs.problem}</p></div>` : ''}
              ${cs.approach ? `<div><h4>The Approach</h4><p>${cs.approach}</p></div>` : ''}
            </div>
          ` : ''}
          ${cs.highlights && cs.highlights.length ? `
            <h4>Key Highlights</h4>
            <ul class="modal__list">
              ${cs.highlights.map((h) => `<li>${h}</li>`).join("")}
            </ul>
          ` : ''}
          ${cs.learnings ? `
            <div class="modal__learn"><b>What this proves</b>${cs.learnings}</div>
          ` : ''}
          ${cs.actions && cs.actions.length ? `
            <div class="modal__actions">
              ${cs.actions.map((a) => `<a class="btn btn--sm ${a.ghost ? 'btn--ghost' : ''}" href="${a.url}" target="_blank" rel="noopener noreferrer">${a.label}</a>`).join("")}
            </div>
          ` : ''}
        </div>
      `;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      modalPanel.scrollTop = 0;
      open = true;
      setTimeout(() => modalClose && modalClose.focus(), 50);
    }
  };

  const closeModal = () => {
    if (!modal || !open) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore background scrolling
    open = false;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  };

  // Event Delegation for "Details →" Case Study buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-project]");
    if (btn) {
      e.preventDefault();
      openModal(btn.dataset.project);
    }
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    const bd = $(".modal__backdrop", modal);
    if (bd) bd.addEventListener("click", closeModal);
  }

  // Keyboard accessibility: ESC to close, Tab to cycle focus inside modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) closeModal();
    if (e.key === "Tab" && open && modalPanel) {
      const items = focusables(modalPanel);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* =========================================================================
     8. TOAST NOTIFICATIONS & EMAIL CLIPBOARD COPY
     ========================================================================= */
  const toast = $("#toast");
  const toastMsg = $("#toastMsg");
  let toastTimer = null;

  const showToast = (msg) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2800);
  };

  const copyBtn = $("#copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const email = "d.abhinav2802@gmail.com";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for non-https / file protocol
          const ta = document.createElement("textarea");
          ta.value = email;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        showToast("Email copied to clipboard");
        copyBtn.textContent = "Copied!";
        setTimeout(() => (copyBtn.textContent = "Copy"), 2000);
      } catch (err) {
        showToast("Press Ctrl+C to copy");
      }
    });
  }

  /* =========================================================================
     9. CONTACT FORM VALIDATION & SUBMISSION HANDLER
     Validates name, email format, and message length with clear inline error alerts
     ========================================================================= */
  const form = $("#contactForm");
  if (form) {
    const nameInput = $("#name", form);
    const emailInput = $("#email", form);
    const msgInput = $("#message", form);
    const nameErr = $("#nameErr", form);
    const emailErr = $("#emailErr", form);
    const msgErr = $("#messageErr", form);
    const submitBtn = $("#submitBtn", form);

    const emailRe = /^[^s@]+@[^s@]+.[^s@]{2,}$/;

    const setErr = (input, errEl, msg) => {
      if (!input || !errEl) return false;
      if (msg) {
        input.setAttribute("aria-invalid", "true");
        errEl.textContent = msg;
        return false;
      }
      input.removeAttribute("aria-invalid");
      errEl.textContent = "";
      return true;
    };

    // Live validation clearing upon input
    if (nameInput) nameInput.addEventListener("input", () => setErr(nameInput, nameErr, ""));
    if (emailInput) emailInput.addEventListener("input", () => setErr(emailInput, emailErr, ""));
    if (msgInput) msgInput.addEventListener("input", () => setErr(msgInput, msgErr, ""));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const msgVal = msgInput ? msgInput.value.trim() : "";

      if (!nameVal) {
        ok = setErr(nameInput, nameErr, "Please share your name.") && ok;
      } else {
        setErr(nameInput, nameErr, "");
      }

      if (!emailVal) {
        ok = setErr(emailInput, emailErr, "Please provide an email address.") && ok;
      } else if (!emailRe.test(emailVal)) {
        ok = setErr(emailInput, emailErr, "Please enter a valid email format.") && ok;
      } else {
        setErr(emailInput, emailErr, "");
      }

      if (!msgVal) {
        ok = setErr(msgInput, msgErr, "Please write a brief note.") && ok;
      } else if (msgVal.length < 10) {
        ok = setErr(msgInput, msgErr, "A few more words helps me reply faster.") && ok;
      } else {
        setErr(msgInput, msgErr, "");
      }

      if (!ok) return;

      // Construct mailto link as reliable client-side submission
      const subject = encodeURIComponent(`Portfolio inquiry from ${nameVal}`);
      const body = encodeURIComponent(`Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${msgVal}`);
      const mailtoUrl = `mailto:d.abhinav2802@gmail.com?subject=${subject}&body=${body}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        const lbl = $(".label", submitBtn);
        if (lbl) lbl.textContent = "Opening mail client…";
      }

      window.location.href = mailtoUrl;
      showToast("Drafted in your email app");

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          const lbl = $(".label", submitBtn);
          if (lbl) lbl.textContent = "Send message";
        }
      }, 2000);
    });
  }

  /* =========================================================================
     10. DYNAMIC COPYRIGHT YEAR & SMOOTH SCROLLING
     ========================================================================= */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for in-page anchors
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = $(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced.matches ? "auto" : "smooth", block: "start" });
      if (history.pushState) history.pushState(null, "", id);
    }
  });

})();
