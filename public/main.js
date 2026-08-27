document.addEventListener("DOMContentLoaded", () => {
  const base = window.ASSET_BASE || "/assets";

  const projectsData = {
    sentinel: {
      title: "SENTINEL: A Web-Based RFID Door Lock Access Control System for Comfac Global Group",
      shortTitle: "SENTINEL",
      year: "2026",
      discipline: "IoT / Web / Access Control",
      tech: ["Arduino", "C++", "MQTT", "Next.js", "PHP", "Blade"],
      type: "Project",
      featured: true,
      fullDescription: "RFID door-lock platform for Comfac Global Group. Smart door hardware, real-time monitoring, attendance tracking, and centralized security management.",
      images: [
        { src: "./projects/sentinel/SENTINEL1.webp", alt: "SENTINEL RFID door lock access control dashboard" },
        { src: "./projects/sentinel/SENTINEL2.webp", alt: "SENTINEL real-time monitoring interface" },
        { src: "./projects/sentinel/SENTINEL3.webp", alt: "SENTINEL attendance tracking screen" },
        { src: "./projects/sentinel/SENTINEL4.webp", alt: "SENTINEL centralized security management screen" }
      ]
    },
    salomed: {
      title: "SaloMed",
      shortTitle: "SaloMed",
      year: "2026",
      discipline: "Blockchain / Healthcare / Fintech",
      tech: ["Next.js", "TypeScript", "Python", "Rust", "PostgreSQL"],
      type: "Project",
      featured: true,
      fullDescription: "Healthcare savings and remittance platform for families and OFWs. Funds can be reserved, sent, and tracked for verified medical expenses.",
      proofBadge: "Presented at Rise In APAC Stellar Hackathon",
      images: [
        { src: "./projects/salomed/SALOMED1.webp", alt: "SaloMed healthcare savings platform interface" },
        { src: "./projects/salomed/SALOMED2.webp", alt: "SaloMed healthcare remittance workflow screen" }
      ]
    },
    "aws-build-over-nights": {
      title: "AWS Build Over Nights: Kiro x Quick Hackathon Website",
      shortTitle: "AWS Build Over Nights",
      year: "2026",
      discipline: "Event Platform / AWS Community",
      tech: ["TypeScript", "HTML", "CSS", "JavaScript"],
      type: "Project",
      featured: true,
      fullDescription: "Official website for AWS Build Over Nights: Kiro x Quick Hackathon. Event details, registration, schedules, sponsors, and participant resources in one place.",
      images: [{ src: "./projects/build_over.webp", alt: "AWS Build Over Nights Kiro x Quick Hackathon website" }]
    },
    "packet-capture": {
      title: "Packet Capture: CTF Platform",
      shortTitle: "Packet Capture",
      year: "2026",
      discipline: "Cybersecurity / Packet Analysis",
      tech: ["Next.js", "TypeScript", "CSS", "Python", "PostgreSQL"],
      type: "Project",
      featured: true,
      fullDescription: "Cybersecurity Capture the Flag platform developed in partnership with Macquarie University, Sydney, Australia. Built for packet-analysis challenges, participant access, scoring, and competition workflows.",
      proofBadge: "I lead this project",
      note: "Developed in partnership with Macquarie University, Sydney, Australia.",
      images: [
        { src: "./projects/ctf/CTF1.webp", alt: "Packet Capture CTF platform screen" },
        { src: "./projects/ctf/CTF2.webp", alt: "Packet Capture CTF challenge interface" },
        { src: "./projects/ctf/CTF3.webp", alt: "Packet Capture CTF participant workflow" },
        { src: "./projects/ctf/CTF4.webp", alt: "Packet Capture CTF platform detail" }
      ]
    },
    "project-zero": {
      title: "Project Zero",
      shortTitle: "Project Zero",
      year: "2025",
      discipline: "Job Platform / Web",
      tech: ["PHP", "Laravel", "Tailwind CSS", "SQL"],
      type: "Project",
      featured: false,
      fullDescription: "Job-listing site for IT professionals moving from entry-level roles toward better opportunities.",
      images: [{ src: "./projects/PROJECT ZERO.webp", alt: "Project Zero dashboard" }]
    },
    "rfid-report-card": {
      title: "Arduino-Based RFID System as an Efficient Tracker of the Students' Report Card",
      shortTitle: "RFID Report Card",
      year: "2023",
      discipline: "RFID / Arduino / SMS",
      tech: ["Arduino", "C++", "RFID", "GSM Module"],
      type: "Project",
      featured: false,
      fullDescription: "Arduino-based RFID report-card tracker. Tap a card, show grades on an LCD, then send updates through a GSM module.",
      proofBadge: "I lead this project",
      images: [{ src: "./projects/RFID_GRADE.webp", alt: "RFID grade system" }]
    },
    "rfid-passport": {
      title: "Arduino-Based RFID Technology as an Efficient Way of Passport Verification",
      shortTitle: "RFID Passport Verification",
      year: "2019",
      discipline: "RFID / Verification Prototype",
      tech: ["Arduino", "C++", "RFID"],
      type: "Project",
      featured: false,
      fullDescription: "RFID passport-verification prototype that displays passenger information after a passport tap.",
      proofBadge: "I lead this project",
      images: [{ src: "./projects/RFID_PASSPORT.webp", alt: "RFID passport verification prototype" }]
    },
    "project-yu": {
      title: "Project Yú",
      shortTitle: "Project Yú",
      year: "2019",
      discipline: "Robotics / Arduino",
      tech: ["Arduino", "C++", "Robotics"],
      type: "Project",
      featured: false,
      fullDescription: "Arduino-based robot concept for helping fishermen identify areas with higher fish abundance.",
      proofBadge: "Presented at Division Science and Technology Fair 2019 - Science Innovation Expo",
      images: [{ src: "./projects/PROJECT_YU.webp", alt: "Project Yú Arduino robot prototype" }]
    },
    "project-talakinesis": {
      title: "Project Talakinesis",
      shortTitle: "Project Talakinesis",
      year: "2019",
      discipline: "Arduino / Energy Efficiency",
      tech: ["Arduino", "C++", "PIR Motion Sensor"],
      type: "Project",
      featured: false,
      fullDescription: "Arduino-based motion-activated light source for more efficient energy use.",
      proofBadge: "Presented at 1st Filipino Ideas Expo (2019)",
      images: [{ src: "./projects/TALAKINESIS.webp", alt: "Project Talakinesis Arduino motion-activated light prototype" }]
    },
    atimonan: {
      title: "Municipal Website of Atimonan, Quezon",
      shortTitle: "Atimonan Municipal Website",
      year: "2025",
      discipline: "Civic Portal / Web",
      tech: ["HTML", "CSS", "JavaScript", "Google Apps Script", "Firebase"],
      type: "Project",
      featured: false,
      fullDescription: "Municipal web portal for Atimonan, Quezon. Services, news, announcements, emergency contacts, and community updates.",
      proofBadge: "I lead this project",
      images: [
        { src: "./projects/atimonan/ATIMONAN_LOGIN.webp", alt: "Atimonan website login page" },
        { src: "./projects/atimonan/ATIMONAN_HOME.webp", alt: "Atimonan website home page" },
        { src: "./projects/atimonan/ATIMONAN_SERVICES.webp", alt: "Atimonan website services page" },
        { src: "./projects/atimonan/ATIMONAN_NEWS.webp", alt: "Atimonan website news page" },
        { src: "./projects/atimonan/ATIMONAN_ABOUT.webp", alt: "Atimonan website about page" },
        { src: "./projects/atimonan/ATIMONAN_CONTACT.webp", alt: "Atimonan website contact page" }
      ]
    },
    surroundsense: {
      title: "SurroundSense",
      shortTitle: "SurroundSense",
      year: "2025",
      discipline: "LiDAR / IoT / Visualization",
      tech: ["Arduino", "C++", "Python", "LiDAR", "Data Visualization"],
      type: "Project",
      featured: false,
      fullDescription: "Arduino-Python LiDAR application for real-time mapping, object detection, and live sensor visualization.",
      images: [
        { src: "./projects/surroundsense/SURROUNDSENSE_WELCOME.webp", alt: "SurroundSense welcome screen" },
        { src: "./projects/surroundsense/SURROUNDSENSE2D.webp", alt: "SurroundSense 2D mapping" },
        { src: "./projects/surroundsense/SURROUNDSENSE_TEST.webp", alt: "SurroundSense testing" },
        { src: "./projects/surroundsense/SURROUNDSENSE3D.webp", alt: "SurroundSense 3D mapping" }
      ]
    },
    tedxpup: {
      title: "TEDxPUP Official Website",
      shortTitle: "TEDxPUP Official Website",
      year: "2026",
      discipline: "Event Website / Web",
      tech: ["React.js", "TypeScript", "Typeform"],
      type: "Project",
      featured: false,
      fullDescription: "Official website for TEDx events organized by PUP students. Event information and public-facing updates, kept clear.",
      proofBadge: "I managed this project",
      images: [{ src: "./projects/TEDXPUP.webp", alt: "TEDxPUP Official Website" }]
    },
    "photo-editing-projects": {
      title: "Photo Editing Projects",
      shortTitle: "Photo Editing",
      year: "",
      discipline: "Creative Multimedia / Photo Editing",
      tech: ["Photo Editing", "Creative Direction", "Visual Design", "Social Media"],
      type: "Project",
      featured: false,
      fullDescription: "A selected photo-editing portfolio showing visual work for events, communities, and personal creative projects. Color, layout, retouching, and social-ready edits in one archive.",
      images: [{ src: "./gallery/photo-portfolio.webp", alt: "Photo editing project portfolio collage" }]
    },
    lingap: {
      title: "Ledger for Integrity, Need-based Giving, Aid Provenance, and Protection (LINGAP)",
      shortTitle: "LINGAP",
      year: "2026",
      discipline: "Aid Platform / Records Management",
      tech: ["TypeScript", "Python", "HTML", "CSS", "Rust", "PostgreSQL"],
      type: "Project",
      featured: false,
      fullDescription: "Digital platform for community assistance and support services. Records, requests, and workflows, less scattered.",
      proofBadge: "Presented at Build on Stellar Philippines Hackathon 2026",
      images: [
        { src: "./projects/lingap/LINGAP1.webp", alt: "LINGAP aid governance platform interface" },
        { src: "./projects/lingap/LINGAP2.webp", alt: "LINGAP community assistance workflow screen" },
        { src: "./projects/lingap/LINGAP3.webp", alt: "LINGAP aid tracking and protection dashboard" },
        { src: "./projects/lingap/LINGAP4.webp", alt: "LINGAP platform detail screen" }
      ]
    },
    "gdg-pup-nexus": {
      title: "GDG PUP Nexus",
      shortTitle: "GDG PUP Nexus",
      year: "2026",
      discipline: "Community Platform / Events",
      tech: ["TypeScript", "JavaScript", "PLpgSQL", "CSS", "HCL"],
      type: "Project",
      featured: false,
      fullDescription: "Central platform for GDG PUP: community updates, events, resources, and member experiences in one place.",
      proofBadge: "I QA'd this project",
      images: [
        { src: "./projects/gdg/gdg1.webp", alt: "GDG PUP Nexus platform screen" },
        { src: "./projects/gdg/gdg2.webp", alt: "GDG PUP Nexus community page" },
        { src: "./projects/gdg/gdg3.webp", alt: "GDG PUP Nexus events page" },
        { src: "./projects/gdg/gdg4.webp", alt: "GDG PUP Nexus resources page" },
        { src: "./projects/gdg/gdg5.webp", alt: "GDG PUP Nexus member experience page" }
      ]
    },
    "awscc-pup-website": {
      title: "AWS Cloud Club PUP Official Website",
      shortTitle: "AWS Cloud Club PUP Website",
      year: "2026",
      discipline: "Cloud Community / Web",
      tech: ["TypeScript", "Astro", "Python", "CSS"],
      type: "Project",
      featured: false,
      fullDescription: "Online home for AWS Cloud Club PUP Manila: activities, events, projects, and team information.",
      images: [{ src: "./projects/AWSPUP.webp", alt: "AWS Cloud Club PUP Official Website" }]
    }
  };

  window.projectsData = projectsData;

  Object.values(projectsData).forEach((project) => {
    project.images.forEach((image) => {
      if (image.src.startsWith("./")) {
        image.src = image.src.replace("./", `${base}/`);
      } else if (image.src.startsWith("/")) {
        image.src = `${base}${image.src}`;
      }
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = siteNav ? Array.from(siteNav.querySelectorAll('a[href^="#"]')) : [];
  const themeToggle = document.getElementById("theme-toggle");
  const brandLink = document.querySelector(".brand");
  let refreshIndexActiveState = () => {};

  function getStoredTheme() {
    try {
      return localStorage.getItem("geinel-theme");
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem("geinel-theme", theme);
    } catch {
      // Theme still works for the current page if storage is unavailable.
    }
  }

  function applyTheme(theme, shouldPersist = false) {
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    if (themeToggle) {
      const nextLabel = nextTheme === "dark" ? "Light" : "Dark";
      themeToggle.dataset.mode = nextLabel.toLowerCase();
      themeToggle.setAttribute("aria-label", `Switch to ${nextLabel.toLowerCase()} mode`);
      themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    }

    if (shouldPersist) setStoredTheme(nextTheme);
  }

  applyTheme(getStoredTheme() || document.documentElement.dataset.theme || "light");

  themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark", true);
  });

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) refreshIndexActiveState();
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const hash = link.getAttribute("href") || "";
        const target = hash.startsWith("#") ? document.getElementById(hash.slice(1)) : null;

        if (target) {
          event.preventDefault();
        }

        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");

        if (!target) return;

        window.requestAnimationFrame(() => {
          target.scrollIntoView({ block: "start", behavior: "smooth" });
          window.history.pushState(null, "", hash);
        });
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (menuToggle.contains(target) || siteNav.contains(target)) return;

      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !siteNav.classList.contains("open")) return;

      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus({ preventScroll: true });
    });
  }

  const topReturn = document.querySelector(".top-return");
  const homeLinks = [brandLink, topReturn].filter(Boolean);

  function cleanHomeUrl() {
    return `${window.location.pathname}${window.location.search}`;
  }

  if (window.location.hash === "#home") {
    window.history.replaceState(null, "", cleanHomeUrl());
  }

  homeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", cleanHomeUrl());
    });
  });

  if (topReturn) {
    let topReturnTicking = false;

    function updateTopReturnVisibility() {
      topReturn.classList.toggle("is-visible", window.scrollY > 160);
      topReturnTicking = false;
    }

    function requestTopReturnUpdate() {
      if (topReturnTicking) return;
      topReturnTicking = true;
      window.requestAnimationFrame(updateTopReturnVisibility);
    }

    updateTopReturnVisibility();
    window.addEventListener("scroll", requestTopReturnUpdate, { passive: true });
    window.addEventListener("resize", requestTopReturnUpdate);
  }

  const featuredProjects = document.getElementById("featured-projects");
  const creativeProjects = document.getElementById("creative-projects");
  const projectOrder = [
    "packet-capture",
    "aws-build-over-nights",
    "sentinel",
    "salomed",
    "lingap",
    "gdg-pup-nexus",
    "awscc-pup-website",
    "tedxpup",
    "atimonan",
    "surroundsense",
    "project-zero",
    "rfid-report-card",
    "rfid-passport",
    "project-yu",
    "project-talakinesis"
  ];
  const creativeProjectOrder = ["photo-editing-projects"];
  const teamProjectNumbers = new Set([1, 2, 3, 5, 6, 7, 8, 9, 12, 13, 14, 15]);
  const projectEntries = projectOrder
    .map((id, index) => {
      const project = projectsData[id];
      if (!project) return null;
      project.classification = teamProjectNumbers.has(index + 1) ? "Team Project" : "Solo Project";
      return [id, project];
    })
    .filter(Boolean);
  const creativeProjectEntries = creativeProjectOrder.map((id) => [id, projectsData[id]]).filter(([, project]) => project);

  function projectInitials(title) {
    return title
      .replace(/\([^)]*\)/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  function projectMedia(project) {
    if (project.images.length > 0) {
      return `<img src="${project.images[0].src}" alt="${project.images[0].alt}" loading="lazy" decoding="async">`;
    }
    return `<span>${projectInitials(project.shortTitle || project.title)}</span>`;
  }

  function projectProofBadge(project) {
    if (!project.proofBadge) return "";
    return `
      <span class="project-proof-badge">
        <span class="project-proof-icon" aria-hidden="true">&#9733;</span>
        <span>${project.proofBadge}</span>
      </span>
    `;
  }

  function projectTechStack(project) {
    return `
      <span class="project-tech-line">
        <span class="project-tech-label">Stack</span>
        <span class="project-tech-items">${project.tech.join(" / ")}</span>
      </span>
    `;
  }

  function renderFeaturedProjects() {
    if (!featuredProjects) return;

    projectEntries.forEach(([id, project], index) => {
        const number = String(index + 1).padStart(3, "0");
        const card = document.createElement("button");
        card.type = "button";
        card.className = "featured-project";
        card.setAttribute("aria-label", `View ${project.title}`);
        card.innerHTML = `
          <span class="project-media" aria-hidden="true">${projectMedia(project)}</span>
          <span class="featured-project-copy">
            <span class="project-card-meta">
              <span>${number}</span>
              <span class="project-card-details">
                <span class="project-classification">${project.classification}</span>
                <span class="project-year">${project.year}</span>
              </span>
            </span>
            <span class="project-discipline">${project.discipline}</span>
            <h3>${project.title}</h3>
            <p>${project.fullDescription}</p>
            ${projectProofBadge(project)}
            ${projectTechStack(project)}
          </span>
        `;
        card.addEventListener("click", () => openProjectModal(id));
        featuredProjects.appendChild(card);
      });
  }

  renderFeaturedProjects();

  function renderCreativeProjects() {
    if (!creativeProjects) return;

    creativeProjectEntries.forEach(([id, project]) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "featured-project creative-project-card";
      card.setAttribute("aria-label", `View ${project.title}`);
      card.innerHTML = `
        <span class="project-media" aria-hidden="true">${projectMedia(project)}</span>
        <span class="featured-project-copy">
          <span class="project-card-meta">
            <span>Visual Work</span>
            ${project.year ? `<span>${project.year}</span>` : ""}
          </span>
          <span class="project-discipline">${project.discipline}</span>
          <h3>${project.title}</h3>
          <p>${project.fullDescription}</p>
          ${projectTechStack(project)}
        </span>
      `;
      card.addEventListener("click", () => openProjectModal(id));
      creativeProjects.appendChild(card);
    });
  }

  renderCreativeProjects();

  const fieldNotesGrid = document.getElementById("field-notes-grid");
  const fieldFrames = [
    { id: "1", file: "1_KIRO_FINALE.webp", w: 1170, h: 2080, c: 1, s: 4, r: 1, mt: 0, ms: 2, mmt: 0 },
    { id: "2", file: "2_WITH_BRYL.webp", w: 1170, h: 2080, c: 6, s: 2, r: 1, mt: 78, ms: 2, mmt: 22 },
    { id: "3", file: "3_APAC.webp", w: 1170, h: 2080, c: 9, s: 4, r: 1, mt: 18, ms: 4, mmt: 12 },
    { id: "3.1", file: "3.1_SEEKERS.webp", w: 1536, h: 2048, c: 3, s: 4, r: 2, mt: 18, ms: 2, mmt: 16 },
    { id: "4", file: "4_KIRO_NAME.webp", w: 1170, h: 2080, c: 8, s: 2, r: 2, mt: 70, ms: 2, mmt: 24 },
    { id: "5", file: "5_HUAWEI.webp", w: 1170, h: 2080, c: 10, s: 3, r: 2, mt: 32, ms: 2, mmt: 8 },
    { id: "6", file: "6_PBW.webp", w: 1170, h: 2080, c: 1, s: 2, r: 1, mt: 18, ms: 2, mmt: 16 },
    { id: "7", file: "7_CUMULUS.webp", w: 1170, h: 2080, c: 4, s: 3, r: 1, mt: 0, ms: 4, mmt: 8 },
    { id: "8", file: "8_PYTORCH.webp", w: 1170, h: 2080, c: 8, s: 2, r: 1, mt: 42, ms: 2, mmt: 18 },
    { id: "9", file: "9_CREATIVES.webp", w: 1170, h: 2080, c: 10, s: 3, r: 1, mt: 8, ms: 2, mmt: 4 },
    { id: "10", file: "10_ENOV.webp", w: 1170, h: 2080, c: 1, s: 2, r: 2, mt: 18, ms: 2, mmt: 20 },
    { id: "11", file: "11_PDAX.webp", w: 1170, h: 2080, c: 4, s: 3, r: 2, mt: 0, ms: 4, mmt: 10 },
    { id: "12", file: "12_PORTGCP.webp", w: 1170, h: 2080, c: 8, s: 2, r: 2, mt: 52, ms: 2, mmt: 18 },
    { id: "13", file: "13_WITH_AWSPORT.webp", w: 1170, h: 2080, c: 11, s: 2, r: 2, mt: 16, ms: 2, mmt: 6 },
    { id: "14", file: "14_BUILD_WITH_AI.webp", w: 1170, h: 2080, c: 1, s: 3, r: 1, mt: 0, ms: 2, mmt: 14 },
    { id: "15", file: "15_VERCEL.webp", w: 1170, h: 2080, c: 5, s: 2, r: 1, mt: 74, ms: 2, mmt: 2 },
    { id: "16", file: "16_AZURE.webp", w: 1170, h: 2080, c: 9, s: 3, r: 1, mt: 18, ms: 4, mmt: 16 },
    { id: "17", file: "17_BUILD_STELLAR.webp", w: 1170, h: 2080, c: 2, s: 4, r: 2, mt: 18, ms: 2, mmt: 18 },
    { id: "18", file: "18_SPARKZERO.webp", w: 1170, h: 2080, c: 7, s: 2, r: 2, mt: 58, ms: 2, mmt: 4, scale: 1.06 },
    { id: "19", file: "19_AI_MANILA_GDG.webp", w: 1170, h: 2080, c: 10, s: 3, r: 2, mt: 2, ms: 2, mmt: 20 },
    { id: "20", file: "20_GDG_COSMOS.webp", w: 1170, h: 2080, c: 1, s: 4, r: 3, mt: 14, ms: 4, mmt: 10 },
    { id: "21", file: "21_ARDUINODAY.webp", w: 1170, h: 2080, c: 6, s: 4, r: 3, mt: 44, ms: 2, mmt: 18 },
    { id: "22", file: "22_AZURE_NIGHT.webp", w: 1170, h: 2080, c: 11, s: 2, r: 3, mt: 16, ms: 2, mmt: 4 },
    { id: "23", file: "23_AWSSC_NIGHT.webp", w: 1170, h: 2080, c: 1, s: 3, r: 1, mt: 10, ms: 2, mmt: 10 },
    { id: "24", file: "24_CCIS_GDG.webp", w: 1170, h: 2080, c: 5, s: 4, r: 1, mt: 0, ms: 4, mmt: 8 },
    { id: "25", file: "25_TECH_KICKOFF.webp", w: 1170, h: 2080, c: 10, s: 2, r: 1, mt: 48, ms: 2, mmt: 18 },
    { id: "26", file: "26_AWSCCCLOUDAY.webp", w: 721, h: 1024, c: 2, s: 3, r: 2, mt: 24, ms: 2, mmt: 4 },
    { id: "27", file: "27_SURROUND.webp", w: 1170, h: 2080, c: 6, s: 3, r: 2, mt: 8, ms: 2, mmt: 18 },
    { id: "28", file: "28_GOOGLE_IO.webp", w: 1536, h: 2048, c: 10, s: 3, r: 2, mt: 58, ms: 4, mmt: 8 },
    { id: "29", file: "29_GOLD_ROBOTICS.webp", w: 1170, h: 1449, c: 2, s: 3, r: 1, mt: 10, ms: 2, mmt: 10 },
    { id: "30", file: "30_WEEMAKE.webp", w: 1169, h: 1443, c: 6, s: 4, r: 1, mt: 0, ms: 4, mmt: 8 },
    { id: "31", file: "31_SILVER_ROBOTICS.webp", w: 1169, h: 1454, c: 10, s: 3, r: 1, mt: 36, ms: 2, mmt: 16 },
    { id: "30.1", file: "30.1_TAGISAN.webp", w: 960, h: 720, c: 1, s: 4, r: 2, mt: 24, ms: 2, mmt: 14 },
    { id: "30.2", file: "30.2_TAGISAN_ROBOT1.webp", w: 2048, h: 1536, c: 6, s: 3, r: 2, mt: 62, ms: 2, mmt: 4 },
    { id: "30.3", file: "30.3_TAGISAN_ROBOT2.webp", w: 2048, h: 1536, c: 8, s: 4, r: 3, mt: 8, ms: 3, mmt: 18 },
    { id: "31.1", file: "31.1_MEDAL.webp", w: 1170, h: 1446, c: 2, s: 2, r: 3, mt: 16, ms: 2, mmt: 6 },
    { id: "31.2", file: "31.2_ID.webp", w: 1170, h: 1453, c: 6, s: 2, r: 4, mt: 8, ms: 2, mmt: 18 },
    { id: "31.3", file: "31.3_HUNGARY.webp", w: 1170, h: 1448, c: 10, s: 2, r: 5, mt: 2, ms: 2, mmt: 6 },
    { id: "32", file: "32_INTELLI_2018.webp", w: 1170, h: 1560, c: 1, s: 3, r: 6, mt: 12, ms: 2, mmt: 18 },
    { id: "33", file: "33_DELEGATE.webp", w: 1169, h: 1166, c: 5, s: 3, r: 6, mt: 42, ms: 2, mmt: 6 },
    { id: "34", file: "34_ATX.webp", w: 1170, h: 1158, c: 9, s: 3, r: 7, mt: 20, ms: 4, mmt: 16, end: true }
  ];

  function frameAlt(frame) {
    const label = frame.file
      .replace(/^\d+(?:\.\d+)?_/, "")
      .replace(/\.[^.]+$/, "")
      .replace(/_/g, " ")
      .toLowerCase();
    return `Active Record: ${label}`;
  }

  function renderFieldNotes() {
    if (!fieldNotesGrid) return;

    const spreads = [
      fieldFrames.slice(0, 6),
      fieldFrames.slice(6, 14),
      fieldFrames.slice(14, 23),
      fieldFrames.slice(23, 29),
      fieldFrames.slice(29)
    ];

    spreads.forEach((spreadFrames, spreadIndex) => {
      const spread = document.createElement("div");
      spread.className = `field-spread field-spread-${spreadIndex + 1}`;

      spreadFrames.forEach((frame) => {
        const index = fieldFrames.indexOf(frame);
        const figure = document.createElement("figure");
        figure.className = `field-frame${frame.end ? " field-frame-end" : ""}`;
        figure.style.setProperty("--col", frame.c);
        figure.style.setProperty("--span", frame.s);
        figure.style.setProperty("--row", frame.r);
        figure.style.setProperty("--mt", `${frame.mt}px`);
        figure.style.setProperty("--mspan", frame.ms);
        figure.style.setProperty("--mmt", `${frame.mmt}px`);
        figure.style.setProperty("--frame-scale", frame.scale || 1);
        figure.innerHTML = `
          <button class="field-frame-button" type="button" aria-label="Open ${frameAlt(frame)}">
            <img src="${base}/flex-images/${frame.file}" alt="${frameAlt(frame)}" width="${frame.w}" height="${frame.h}" loading="${index < 4 ? "eager" : "lazy"}" decoding="async">
          </button>
        `;
        figure.querySelector("button").addEventListener("click", () => openFieldViewer(index));
        spread.appendChild(figure);
      });

      fieldNotesGrid.appendChild(spread);
    });
  }

  renderFieldNotes();

  const scrollSections = Array.from(document.querySelectorAll(".section-shell"));
  const toneTargets = Array.from(document.querySelectorAll(".hero-portrait img, .project-media img, .field-frame img"));

  if (scrollSections.length > 0 || toneTargets.length > 0) {
    let scrollStateFrame = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const smoothStep = (value) => value * value * (3 - 2 * value);

    const setActiveSection = (activeSection) => {
      scrollSections.forEach((section) => {
        section.classList.toggle("section-active", section === activeSection);
      });

      const activeHref = activeSection?.id ? `#${activeSection.id}` : "";
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === activeHref;
        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const updateScrollState = () => {
      scrollStateFrame = 0;

      const viewportHeight = window.innerHeight || 1;
      const imageReadingLine = viewportHeight * 0.52;
      const imageFadeRange = Math.max(180, viewportHeight * 0.26);
      let nearestSection = scrollSections[0];
      const activeViewportLine = viewportHeight * 0.46;
      const isAtPageEnd = window.scrollY + viewportHeight >= document.documentElement.scrollHeight - 4;

      if (isAtPageEnd) {
        nearestSection = scrollSections[scrollSections.length - 1];
      } else {
        scrollSections.forEach((section) => {
          if (section.getBoundingClientRect().top <= activeViewportLine) {
            nearestSection = section;
          }
        });
      }

      if (nearestSection) setActiveSection(nearestSection);

      toneTargets.forEach((target) => {
        const rect = target.getBoundingClientRect();
        const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
        const enoughVisible = visibleHeight > Math.min(rect.height, viewportHeight) * 0.08;
        let distance = 0;

        if (rect.top > imageReadingLine) {
          distance = rect.top - imageReadingLine;
        } else if (rect.bottom < imageReadingLine) {
          distance = imageReadingLine - rect.bottom;
        }

        const rawProgress = enoughVisible ? clamp(1 - distance / imageFadeRange, 0, 1) : 0;
        const progress = smoothStep(rawProgress);
        const gray = 1 - progress;
        const contrast = 1.04 - progress * 0.04;

        target.style.setProperty("--tone-gray", gray.toFixed(3));
        target.style.setProperty("--tone-contrast", contrast.toFixed(3));
      });
    };

    refreshIndexActiveState = updateScrollState;

    const scheduleScrollStateUpdate = () => {
      if (scrollStateFrame) return;
      scrollStateFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", scheduleScrollStateUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollStateUpdate);
  }

  const modalOverlay = document.getElementById("modal-overlay");
  const projectModal = document.querySelector(".project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTypeBadge = document.getElementById("modal-type-badge");
  const modalYear = document.getElementById("modal-year");
  const modalClassification = document.getElementById("modal-classification");
  const modalTechs = document.getElementById("modal-techs");
  const modalImagesContainer = document.getElementById("modal-images-container");
  const modalImage = document.getElementById("modal-image");
  const modalImageControls = document.getElementById("modal-image-controls");
  const modalPrev = document.getElementById("modal-prev");
  const modalNext = document.getElementById("modal-next");
  const modalImageSlider = document.getElementById("modal-image-slider");
  const modalImageCount = document.getElementById("modal-image-count");
  const modalDescription = document.getElementById("modal-description");
  const modalProofBadge = document.getElementById("modal-proof-badge");
  const modalNoteContainer = document.getElementById("modal-note-container");
  const modalNote = document.getElementById("modal-note");
  const modalStatusType = document.getElementById("modal-status-type");
  const modalStatusTechCount = document.getElementById("modal-status-tech-count");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const fieldViewer = document.getElementById("field-viewer");
  const fieldViewerImage = document.getElementById("field-viewer-image");
  const fieldViewerCount = document.getElementById("field-viewer-count");
  const fieldViewerProgressCount = document.getElementById("field-viewer-progress-count");
  const fieldViewerSlider = document.getElementById("field-viewer-slider");
  const fieldViewerClose = document.getElementById("field-viewer-close");
  const fieldViewerPrev = document.getElementById("field-viewer-prev");
  const fieldViewerNext = document.getElementById("field-viewer-next");
  const cvOpenButton = document.getElementById("cv-open-button");
  const cvViewer = document.getElementById("cv-viewer");
  const cvCloseButton = document.getElementById("cv-close-button");
  const cvFrame = document.getElementById("cv-frame");

  let currentProjectImages = [];
  let currentImageIndex = 0;
  let currentFieldIndex = 0;
  let modalAutoplayTimer = 0;
  let modalTouchStartX = 0;
  let modalTouchStartY = 0;
  let modalTouchStartTime = 0;
  let modalTouchHandledUntil = 0;
  const modalAutoplayDelay = 5400;
  const modalReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function formatImageCount(index, total) {
    return `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
  let cvScrollY = 0;
  let cvLastFocused = null;
  let cvUnlockTimer = 0;
  let cvLocked = false;
  let cvPreviousBodyStyle = null;
  let cvPreviousHtmlScrollBehavior = "";
  const cvReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const cvPageStackQuery = window.matchMedia("(max-width: 860px), (hover: none) and (pointer: coarse)");

  function lockCvScroll() {
    if (cvLocked) return;

    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    cvScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    cvPreviousHtmlScrollBehavior = document.documentElement.style.scrollBehavior;
    cvPreviousBodyStyle = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    };

    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.position = "fixed";
    document.body.style.top = `-${cvScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`;
    cvLocked = true;
  }

  function unlockCvScroll() {
    if (!cvLocked || !cvPreviousBodyStyle) return;

    Object.assign(document.body.style, cvPreviousBodyStyle);
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, cvScrollY);
    window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = cvPreviousHtmlScrollBehavior;
    });
    cvPreviousBodyStyle = null;
    cvLocked = false;
  }

  function setCvPageInert(isInert) {
    [document.querySelector(".site-header"), document.querySelector("main"), document.querySelector(".site-footer")]
      .filter(Boolean)
      .forEach((element) => {
        if ("inert" in element) element.inert = isInert;
      });
  }

  function getCvFocusableElements() {
    if (!cvViewer) return [];
    return Array.from(cvViewer.querySelectorAll("a[href], button:not([disabled]), iframe"))
      .filter((element) => element.offsetParent !== null);
  }

  function openCvViewer() {
    if (!cvViewer) return;

    window.clearTimeout(cvUnlockTimer);
    cvLastFocused = document.activeElement;
    if (cvFrame && !cvPageStackQuery.matches && !cvFrame.getAttribute("src")) cvFrame.src = cvFrame.dataset.src;

    lockCvScroll();
    setCvPageInert(true);
    cvViewer.classList.add("active");
    cvViewer.setAttribute("aria-hidden", "false");
    cvCloseButton?.focus({ preventScroll: true });
  }

  function closeCvViewer() {
    if (!cvViewer?.classList.contains("active")) return;

    cvViewer.classList.remove("active");
    cvViewer.setAttribute("aria-hidden", "true");
    setCvPageInert(false);

    cvUnlockTimer = window.setTimeout(() => {
      unlockCvScroll();
      if (cvLastFocused instanceof HTMLElement) cvLastFocused.focus({ preventScroll: true });
    }, cvReducedMotion.matches ? 1 : 260);
  }

  cvOpenButton?.addEventListener("click", openCvViewer);
  cvCloseButton?.addEventListener("click", closeCvViewer);
  cvViewer?.addEventListener("click", (event) => {
    if (event.target === cvViewer || event.target instanceof Element && event.target.classList.contains("cv-pdf-shell")) {
      closeCvViewer();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!cvViewer?.classList.contains("active")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeCvViewer();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getCvFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  function canAutoplayModalImages() {
    return Boolean(
      modalOverlay?.classList.contains("active") &&
      currentProjectImages.length > 1 &&
      !modalReducedMotion.matches &&
      !document.hidden &&
      !shouldHoldModalAutoplay()
    );
  }

  function pauseModalAutoplay() {
    window.clearTimeout(modalAutoplayTimer);
    modalAutoplayTimer = 0;
  }

  function scheduleModalAutoplay() {
    pauseModalAutoplay();
    if (!canAutoplayModalImages()) return;

    modalAutoplayTimer = window.setTimeout(() => {
      moveModalImage(1, { source: "auto" });
      scheduleModalAutoplay();
    }, modalAutoplayDelay);
  }

  function shouldHoldModalAutoplay() {
    return Boolean(
      modalImagesContainer?.matches(":hover") ||
      modalImagesContainer?.contains(document.activeElement)
    );
  }

  function resumeModalAutoplay() {
    if (shouldHoldModalAutoplay()) return;
    scheduleModalAutoplay();
  }

  function updateModalImage(options = {}) {
    if (!modalImage || !modalImageCount || currentProjectImages.length === 0) return;
    const image = currentProjectImages[currentImageIndex];
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalImageCount.textContent = formatImageCount(currentImageIndex, currentProjectImages.length);
    if (modalImageSlider) {
      modalImageSlider.max = String(currentProjectImages.length);
      modalImageSlider.value = String(currentImageIndex + 1);
      modalImageSlider.style.setProperty("--slider-progress", `${(currentImageIndex / Math.max(currentProjectImages.length - 1, 1)) * 100}%`);
    }
    if (options.animate && !modalReducedMotion.matches) {
      modalImage.animate(
        [
          { opacity: 0.76, transform: "translateY(2px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 220,
          easing: "cubic-bezier(0.23, 1, 0.32, 1)"
        }
      );
    }
  }

  function moveModalImage(direction, options = {}) {
    if (currentProjectImages.length === 0) return;
    currentImageIndex = (currentImageIndex + direction + currentProjectImages.length) % currentProjectImages.length;
    updateModalImage({ animate: true });
    if (options.source !== "auto") scheduleModalAutoplay();
  }

  function getImageEdgeDirection(imageElement, clientX) {
    if (!imageElement) return 0;
    const rect = imageElement.getBoundingClientRect();
    if (rect.width <= 0 || clientX < rect.left || clientX > rect.right) return 0;

    const edgeWidth = Math.min(Math.max(rect.width * 0.24, 72), 160);
    if (clientX <= rect.left + edgeWidth) return -1;
    if (clientX >= rect.right - edgeWidth) return 1;
    return 0;
  }

  function setImageEdgeCursor(container, imageElement, clientX) {
    if (!container || !imageElement) return;
    const direction = getImageEdgeDirection(imageElement, clientX);
    container.classList.toggle("is-prev-zone", direction === -1);
    container.classList.toggle("is-next-zone", direction === 1);
  }

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !modalOverlay) return;
    const isVisualArchive = projectId === "photo-editing-projects";

    projectModal?.classList.toggle("project-modal-visual", isVisualArchive);
    modalTitle.textContent = project.title;
    modalTypeBadge.textContent = project.type;
    if (modalClassification) {
      modalClassification.textContent = project.classification || "";
      modalClassification.hidden = !project.classification;
    }
    modalYear.textContent = project.year;
    modalYear.hidden = !project.year;
    modalDescription.textContent = project.fullDescription;
    if (modalProofBadge) {
      const proofLabel = modalProofBadge.querySelector("[data-proof-label]");
      if (proofLabel) proofLabel.textContent = project.proofBadge || "";
      modalProofBadge.hidden = !project.proofBadge;
    }
    modalStatusType.textContent = project.discipline;
    modalStatusTechCount.textContent = `${project.tech.length} tech(s)`;

    modalTechs.innerHTML = "";
    project.tech.forEach((tech) => {
      const tag = document.createElement("span");
      tag.textContent = tech;
      modalTechs.appendChild(tag);
    });

    currentProjectImages = project.images;
    currentImageIndex = 0;

    if (currentProjectImages.length > 0) {
      modalImagesContainer.hidden = false;
      modalImageControls.hidden = currentProjectImages.length < 2;
      updateModalImage();
    } else {
      modalImagesContainer.hidden = true;
      modalImage.removeAttribute("src");
      modalImage.alt = "";
    }

    if (project.note) {
      modalNoteContainer.hidden = false;
      modalNote.textContent = project.note;
    } else {
      modalNoteContainer.hidden = true;
      modalNote.textContent = "";
    }

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    scheduleModalAutoplay();
  }

  function closeProjectModal() {
    if (!modalOverlay) return;
    pauseModalAutoplay();
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  modalCloseBtn?.addEventListener("click", closeProjectModal);
  modalOverlay?.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeProjectModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay?.classList.contains("active")) {
      closeProjectModal();
    }
  });
  modalPrev?.addEventListener("click", () => {
    moveModalImage(-1);
  });
  modalNext?.addEventListener("click", () => {
    moveModalImage(1);
  });
  modalImageSlider?.addEventListener("input", () => {
    if (currentProjectImages.length === 0) return;
    currentImageIndex = Math.min(Math.max(Number(modalImageSlider.value) - 1, 0), currentProjectImages.length - 1);
    updateModalImage({ animate: true });
    scheduleModalAutoplay();
  });
  modalImagesContainer?.addEventListener("pointerenter", pauseModalAutoplay);
  modalImagesContainer?.addEventListener("pointerleave", resumeModalAutoplay);
  modalImagesContainer?.addEventListener("focusin", pauseModalAutoplay);
  modalImagesContainer?.addEventListener("focusout", () => {
    window.requestAnimationFrame(resumeModalAutoplay);
  });
  modalImagesContainer?.addEventListener("touchstart", (event) => {
    if (currentProjectImages.length < 2 || event.touches.length !== 1) return;
    modalTouchStartX = event.touches[0].clientX;
    modalTouchStartY = event.touches[0].clientY;
    modalTouchStartTime = Date.now();
    pauseModalAutoplay();
  }, { passive: true });
  modalImagesContainer?.addEventListener("touchend", (event) => {
    if (currentProjectImages.length < 2 || modalTouchStartTime === 0) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - modalTouchStartX;
    const deltaY = touch.clientY - modalTouchStartY;
    const elapsed = Math.max(Date.now() - modalTouchStartTime, 1);
    const velocity = Math.abs(deltaX) / elapsed;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY) * 1.35;
    const isSwipe = Math.abs(deltaX) > 46 || velocity > 0.42;

    if (isHorizontal && isSwipe) {
      moveModalImage(deltaX > 0 ? -1 : 1);
      modalTouchHandledUntil = Date.now() + 420;
    } else {
      scheduleModalAutoplay();
    }

    modalTouchStartTime = 0;
  }, { passive: true });
  modalImagesContainer?.addEventListener("click", (event) => {
    if (Date.now() < modalTouchHandledUntil || currentProjectImages.length < 2) return;
    if (event.target instanceof Element && event.target.closest(".modal-image-controls")) return;

    const direction = getImageEdgeDirection(modalImage, event.clientX);
    if (!direction) return;

    event.preventDefault();
    moveModalImage(direction);
  });
  modalImagesContainer?.addEventListener("pointermove", (event) => {
    if (currentProjectImages.length < 2 || event.pointerType === "touch") return;
    setImageEdgeCursor(modalImagesContainer, modalImage, event.clientX);
  });
  modalImagesContainer?.addEventListener("pointerleave", () => {
    modalImagesContainer.classList.remove("is-prev-zone", "is-next-zone");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      pauseModalAutoplay();
    } else {
      resumeModalAutoplay();
    }
  });

  function updateFieldViewer() {
    if (!fieldViewerImage || !fieldViewerCount) return;
    const frame = fieldFrames[currentFieldIndex];
    fieldViewerImage.src = `${base}/flex-images/${frame.file}`;
    fieldViewerImage.alt = frameAlt(frame);
    fieldViewerImage.width = frame.w;
    fieldViewerImage.height = frame.h;
    fieldViewerCount.textContent = "Active Record";
    if (fieldViewerProgressCount) {
      fieldViewerProgressCount.textContent = formatImageCount(currentFieldIndex, fieldFrames.length);
    }
    if (fieldViewerSlider) {
      fieldViewerSlider.max = String(fieldFrames.length);
      fieldViewerSlider.value = String(currentFieldIndex + 1);
      fieldViewerSlider.style.setProperty("--slider-progress", `${(currentFieldIndex / Math.max(fieldFrames.length - 1, 1)) * 100}%`);
    }
  }

  function openFieldViewer(index) {
    if (!fieldViewer) return;
    currentFieldIndex = index;
    updateFieldViewer();
    fieldViewer.classList.add("active");
    fieldViewer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeFieldViewer() {
    if (!fieldViewer) return;
    fieldViewer.classList.remove("active");
    fieldViewer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function moveFieldViewer(direction) {
    currentFieldIndex = (currentFieldIndex + direction + fieldFrames.length) % fieldFrames.length;
    updateFieldViewer();
  }

  fieldViewerClose?.addEventListener("click", closeFieldViewer);
  fieldViewerPrev?.addEventListener("click", () => moveFieldViewer(-1));
  fieldViewerNext?.addEventListener("click", () => moveFieldViewer(1));
  fieldViewerSlider?.addEventListener("input", () => {
    currentFieldIndex = Math.min(Math.max(Number(fieldViewerSlider.value) - 1, 0), fieldFrames.length - 1);
    updateFieldViewer();
  });
  fieldViewer?.addEventListener("click", (event) => {
    if (event.target === fieldViewer) closeFieldViewer();
  });
  fieldViewerImage?.addEventListener("click", (event) => {
    const direction = getImageEdgeDirection(fieldViewerImage, event.clientX);
    if (!direction) return;

    event.preventDefault();
    event.stopPropagation();
    moveFieldViewer(direction);
  });
  fieldViewerImage?.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    setImageEdgeCursor(fieldViewerImage, fieldViewerImage, event.clientX);
  });
  fieldViewerImage?.addEventListener("pointerleave", () => {
    fieldViewerImage.classList.remove("is-prev-zone", "is-next-zone");
  });
  document.addEventListener("keydown", (event) => {
    if (!fieldViewer?.classList.contains("active")) return;
    if (event.key === "Escape") closeFieldViewer();
    if (event.key === "ArrowLeft") moveFieldViewer(-1);
    if (event.key === "ArrowRight") moveFieldViewer(1);
  });
});
