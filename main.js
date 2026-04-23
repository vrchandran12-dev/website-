(function () {
  const C = window.SITE_CONTENT;
  if (!C) return;

  // ---- Bind text/href by data attribute ----
  const get = (path) => path.split(".").reduce((a, k) => (a ? a[k] : undefined), C);
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = get(el.getAttribute("data-bind"));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const v = get(el.getAttribute("data-bind-href"));
    if (v != null) el.setAttribute("href", v);
  });

  // ---- Socials ----
  const socials = document.getElementById("socials");
  if (socials && Array.isArray(C.socials)) {
    socials.innerHTML = C.socials
      .map(
        (s) =>
          `<li><a href="${escapeAttr(s.href)}" target="_blank" rel="noopener">↗ ${escapeHtml(s.label)}</a></li>`
      )
      .join("");
  }

  // ---- About facts ----
  const aboutFacts = document.getElementById("aboutFacts");
  if (aboutFacts && C.about?.facts) {
    aboutFacts.innerHTML = C.about.facts
      .map((f) => `<div><dt>${escapeHtml(f.label)}</dt><dd>${escapeHtml(f.value)}</dd></div>`)
      .join("");
  }

  // ---- Timeline ----
  const timeline = document.getElementById("timeline");
  if (timeline && Array.isArray(C.experience)) {
    timeline.innerHTML = C.experience
      .map(
        (e) => `
      <li class="t-item reveal">
        <div class="t-meta">
          <span>${escapeHtml(e.dates || "")}</span>
        </div>
        <h3 class="t-role">${escapeHtml(e.role || "")} ${
          e.org
            ? `<span class="t-org">· ${
                e.orgHref
                  ? `<a href="${escapeAttr(e.orgHref)}" target="_blank" rel="noopener">${escapeHtml(e.org)}</a>`
                  : escapeHtml(e.org)
              }</span>`
            : ""
        }</h3>
        ${e.summary ? `<p class="t-summary">${escapeHtml(e.summary)}</p>` : ""}
        ${
          Array.isArray(e.tags) && e.tags.length
            ? `<div class="t-tags">${e.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
            : ""
        }
      </li>`
      )
      .join("");
  }

  // ---- Education & Certifications ----
  const grid = document.getElementById("education-grid");
  if (grid && Array.isArray(C.education)) {
    grid.innerHTML = C.education
      .map(
        (p) => `
      <article class="project reveal">
        <h3>${escapeHtml(p.title || "")}</h3>
        ${p.subtitle ? `<p class="project-subtitle">${escapeHtml(p.subtitle)}</p>` : ""}
        ${p.meta ? `<p class="project-meta">${escapeHtml(p.meta)}</p>` : ""}
        ${
          Array.isArray(p.tags) && p.tags.length
            ? `<div class="project-tags">${p.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join("")}</div>`
            : ""
        }
        <p>${escapeHtml(p.description || "")}</p>
        ${
          Array.isArray(p.links) && p.links.length
            ? `<div class="project-links">${p.links
                .map(
                  (l) => `<a href="${escapeAttr(l.href)}" target="_blank" rel="noopener">${escapeHtml(l.label)} →</a>`
                )
                .join("")}</div>`
            : ""
        }
      </article>`
      )
      .join("");
  }

  // ---- Skills ----
  const skills = document.getElementById("skillsGrid");
  if (skills && Array.isArray(C.skills)) {
    skills.innerHTML = C.skills
      .map(
        (s) => `
      <div class="skill-cluster reveal">
        <h3>${escapeHtml(s.group)}</h3>
        <ul>${s.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
      </div>`
      )
      .join("");
  }

  // ---- Contact ----
  const contact = document.getElementById("contactActions");
  if (contact && Array.isArray(C.contact?.actions)) {
    contact.innerHTML = C.contact.actions
      .map(
        (a) =>
          `<a class="btn ${a.primary ? "btn-primary" : "btn-ghost"}" href="${escapeAttr(
            a.href
          )}" target="_blank" rel="noopener">${escapeHtml(a.label)}</a>`
      )
      .join("");
  }

  // ---- Reveal on scroll ----
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- Sticky nav border ----
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 4);
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Theme toggle ----
  const themeKey = "site-theme";
  const setTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(themeKey, t); } catch (_) {}
  };
  let stored = null;
  try { stored = localStorage.getItem(themeKey); } catch (_) {}
  if (stored === "light" || stored === "dark") setTheme(stored);
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(cur === "light" ? "dark" : "light");
    drawBg();
  });

  // ---- Animated gradient background ----
  const canvas = document.getElementById("bg");
  const ctx = canvas?.getContext("2d");
  let blobs = [];
  let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  let raf = 0;
  function resize() {
    if (!canvas) return;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  function makeBlobs() {
    const colors = readAccentColors();
    blobs = colors.map((c, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.32 + Math.random() * 0.18,
      vx: (Math.random() - 0.5) * 0.00018,
      vy: (Math.random() - 0.5) * 0.00018,
      color: c,
      phase: i,
    }));
  }
  function readAccentColors() {
    const cs = getComputedStyle(document.documentElement);
    return [
      cs.getPropertyValue("--accent").trim(),
      cs.getPropertyValue("--accent-2").trim(),
      cs.getPropertyValue("--accent-warm").trim(),
    ].filter(Boolean);
  }
  function drawBg() {
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    blobs.forEach((b) => {
      const cx = b.x * W;
      const cy = b.y * H;
      const rad = Math.min(W, H) * b.r;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, hexToRgba(b.color, 0.55));
      grd.addColorStop(1, hexToRgba(b.color, 0));
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  function step(t) {
    blobs.forEach((b) => {
      b.x += b.vx + Math.sin(t * 0.0002 + b.phase) * 0.0004;
      b.y += b.vy + Math.cos(t * 0.00018 + b.phase) * 0.0004;
      if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
      if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;
    });
    drawBg();
    raf = requestAnimationFrame(step);
  }
  function hexToRgba(hex, a) {
    const m = hex.replace("#", "");
    if (m.length === 3) {
      const r = parseInt(m[0] + m[0], 16),
        g = parseInt(m[1] + m[1], 16),
        b = parseInt(m[2] + m[2], 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    if (m.length === 6) {
      const r = parseInt(m.slice(0, 2), 16),
        g = parseInt(m.slice(2, 4), 16),
        b = parseInt(m.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    return hex;
  }
  if (canvas) {
    resize();
    makeBlobs();
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(step);
    } else {
      drawBg();
    }
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      resize();
      makeBlobs();
      raf = requestAnimationFrame(step);
    });
  }

  // After dynamic content is rendered, pick up new .reveal nodes
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }
})();
