(function () {
  const C = window.SITE_CONTENT;
  if (!C) return;

  const get = (path) => path.split(".").reduce((a, k) => (a == null ? a : a[k]), C);
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const escAttr = esc;

  // ---- Bind text/href ----
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = get(el.getAttribute("data-bind"));
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const v = get(el.getAttribute("data-bind-href"));
    if (v != null) el.setAttribute("href", v);
  });

  // ---- Display headline (word-by-word reveal) ----
  const headline = document.getElementById("displayHeadline");
  if (headline && Array.isArray(C.hero.headline)) {
    headline.innerHTML = C.hero.headline
      .map((w, i) => `<span class="word${i === C.hero.headline.length - 1 ? " accent" : ""}">${esc(w)}</span>`)
      .join(" ");
  }

  // ---- Hero ID photo ----
  const idPhoto = document.getElementById("idPhoto");
  if (idPhoto) {
    idPhoto.setAttribute("data-initials", C.meta.initials || "");
    if (C.meta.photo) {
      idPhoto.style.backgroundImage = `url("${C.meta.photo}")`;
      idPhoto.classList.add("has-photo");
    }
  }

  // ---- Hero socials (small chips inside id card) ----
  const heroSocials = document.getElementById("heroSocials");
  if (heroSocials && Array.isArray(C.socials)) {
    heroSocials.innerHTML = C.socials
      .map((s) => `<a href="${escAttr(s.href)}" target="_blank" rel="noopener">${esc(s.label)} →</a>`)
      .join("");
  }

  // ---- Ticker ----
  const ticker = document.getElementById("tickerTrack");
  if (ticker && Array.isArray(C.ticker)) {
    const items = C.ticker
      .map((t) => `<span class="ticker-item">${esc(t)}</span>`)
      .join("");
    // duplicate for seamless loop
    ticker.innerHTML = items + items;
  }

  // ---- At-a-glance strip ----
  const glance = document.getElementById("glanceStrip");
  if (glance && Array.isArray(C.glance)) {
    glance.innerHTML = C.glance
      .map(
        (g) => `
      <div class="glance">
        <div class="glance-num" data-count="${g.value}">${esc(g.value)}${esc(g.suffix || "")}</div>
        <div class="glance-label">${esc(g.label)}</div>
        <div class="glance-note">${esc(g.note || "")}</div>
      </div>`
      )
      .join("");
  }

  // ---- About body paragraphs ----
  const aboutBody = document.getElementById("aboutBody");
  if (aboutBody && Array.isArray(C.about.body)) {
    aboutBody.innerHTML = C.about.body.map((p) => `<p>${esc(p)}</p>`).join("");
  }

  // ---- Experience timeline ----
  const tl = document.getElementById("timeline");
  if (tl && Array.isArray(C.experience)) {
    tl.innerHTML = C.experience
      .map(
        (e) => `
      <li class="t-item reveal">
        <div class="t-meta">
          <span>${esc(e.dates || "")}</span>
          ${e.location ? `<span>${esc(e.location)}</span>` : ""}
          ${e.type ? `<span class="t-meta-type">${esc(e.type)}</span>` : ""}
        </div>
        <div>
          <h3 class="t-role">${esc(e.role || "")}</h3>
          ${
            e.org
              ? e.orgHref
                ? `<a class="t-org" href="${escAttr(e.orgHref)}" target="_blank" rel="noopener">${esc(e.org)}</a>`
                : `<span class="t-org">${esc(e.org)}</span>`
              : ""
          }
          ${
            Array.isArray(e.bullets) && e.bullets.length
              ? `<ul class="t-bullets">${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            Array.isArray(e.tags) && e.tags.length
              ? `<div class="t-tags">${e.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`
              : ""
          }
        </div>
      </li>`
      )
      .join("");
  }

  // ---- Education ----
  const edu = document.getElementById("eduCard");
  if (edu && C.education) {
    const e = C.education;
    edu.innerHTML = `
      <div>
        <h3 class="edu-school">${esc(e.school)}</h3>
        <p class="edu-degree">${esc(e.degree)}</p>
        ${e.minor ? `<p class="edu-minor">${esc(e.minor)}</p>` : ""}
        <p class="edu-dates">${esc(e.dates)}</p>
        <p class="edu-summary">${esc(e.summary)}</p>
      </div>
      <div class="edu-coursework">
        <h4>Selected coursework</h4>
        <ul class="edu-courses">${(e.coursework || []).map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
      </div>
    `;
  }

  // ---- Cases ----
  const cases = document.getElementById("casesGrid");
  if (cases && Array.isArray(C.cases)) {
    cases.innerHTML = C.cases
      .map(
        (c) => `
      <article class="case reveal">
        <div class="case-sponsor">${esc(c.sponsor)}</div>
        <h3 class="case-title">${esc(c.title)}</h3>
        <div class="case-meta">${esc(c.provider)} · Issued ${esc(c.issued)} · Credential ${esc(c.credential)}</div>
        <dl>
          <div><dt>Problem</dt><dd>${esc(c.problem)}</dd></div>
          <div><dt>Approach</dt><dd>${esc(c.approach)}</dd></div>
        </dl>
        <div class="case-tools">${(c.tools || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </article>`
      )
      .join("");
  }

  // ---- Skills (with proficiency dots) ----
  const skills = document.getElementById("skillsGrid");
  if (skills && Array.isArray(C.skills)) {
    skills.innerHTML = C.skills
      .map(
        (s) => `
      <div class="skill-cluster reveal">
        <h3>${esc(s.group)}</h3>
        ${s.items
          .map((it) => {
            const lvl = Math.max(0, Math.min(5, it.level || 0));
            const dots = Array.from({ length: 5 }, (_, i) => `<span class="skill-dot${i < lvl ? " on" : ""}"></span>`).join("");
            return `<div class="skill-row"><span class="skill-name">${esc(it.name)}</span><span class="skill-bar" aria-label="${lvl} of 5">${dots}</span></div>`;
          })
          .join("")}
      </div>`
      )
      .join("");
  }

  // ---- Themes ----
  const themes = document.getElementById("themesGrid");
  if (themes && C.themes && Array.isArray(C.themes.items)) {
    themes.innerHTML = C.themes.items
      .map(
        (t) => `
      <article class="theme reveal">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.body)}</p>
      </article>`
      )
      .join("");
  }

  // ---- Availability ----
  const av = document.getElementById("availabilityList");
  if (av && C.availability && Array.isArray(C.availability.items)) {
    av.innerHTML = C.availability.items
      .map((i) => `<div><dt>${esc(i.label)}</dt><dd>${esc(i.value)}</dd></div>`)
      .join("");
  }

  // ---- Contact ----
  const cr = document.getElementById("contactRow");
  if (cr && C.contact && Array.isArray(C.socials)) {
    cr.innerHTML = C.socials
      .map(
        (s) =>
          `<a class="btn ${s.primary ? "btn-primary" : "btn-ghost"}" href="${escAttr(s.href)}" target="_blank" rel="noopener">${esc(s.label)}</a>`
      )
      .join("");
  }

  // ---- Reveal observer ----
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---- Headline word reveal (delayed slightly so it lands after first paint) ----
  requestAnimationFrame(() => {
    setTimeout(() => headline?.classList.add("played"), 80);
  });

  // ---- Counter animation for at-a-glance ----
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = (el.textContent.match(/[^\d.-]+$/) || [""])[0];
        if (Number.isNaN(target)) return;
        const dur = 1000;
        const start = performance.now();
        const from = 0;
        function tick(now) {
          const t = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = Math.round(from + (target - from) * eased);
          el.textContent = v + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".glance-num").forEach((el) => counterIO.observe(el));

  // ---- Sticky nav border ----
  const nav = document.getElementById("nav");
  const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 4);
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Theme toggle ----
  const themeKey = "veera-site-theme";
  const apply = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(themeKey, t); } catch (_) {}
  };
  let stored = null;
  try { stored = localStorage.getItem(themeKey); } catch (_) {}
  if (stored === "dark" || stored === "light") apply(stored);
  else if (matchMedia("(prefers-color-scheme: dark)").matches) apply("dark");
  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || "light";
    apply(cur === "dark" ? "light" : "dark");
  });

  // ---- Easter egg for any dev recruiter who opens devtools ----
  try {
    const css = "color:#d9b75a;font:600 14px/1.4 ui-sans-serif,system-ui";
    console.log("%cHi.", css);
    console.log(
      "%cBuilt by Veera Ravichandran. Open to Summer 2027 internships in finance / analytics / consulting.\nSource: https://github.com/vrchandran12-dev/website-",
      "color:#5a6478;font:13px ui-sans-serif,system-ui"
    );
  } catch (_) {}
})();
