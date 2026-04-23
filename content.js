// All site copy lives here. Edit and push — Pages redeploys automatically.
window.SITE_CONTENT = {
  meta: {
    name: "Veera Ravichandran",
    role: "Financial Economics · Binghamton University",
    location: "Binghamton, NY · Open to NYC, remote",
    availability: "Summer 2027",
    classOf: 2028,
    pronouns: "he/him",
    initials: "VR",
    photo: "", // Drop a square headshot at ./assets/veera.jpg and set "./assets/veera.jpg"
  },
  hero: {
    eyebrow: { dot: true, text: "Open for Summer 2027 internships · Finance · Analytics · Consulting" },
    overline: "Veera Ravichandran",
    headline: ["A student of", "markets, models,", "and good", "decisions."],
    sub:
      "I'm a Financial Economics sophomore at Binghamton University with a minor in Digital & Data Studies. I work where finance meets data — pulling signal out of noise, building models that hold up, and translating numbers into something a non-quant audience can act on.",
    primaryCta: { label: "View experience", href: "#experience" },
    secondaryCta: { label: "Download résumé", href: "#contact" }, // swap to /resume.pdf once uploaded
  },
  ticker: [
    "S&P 500", "NASDAQ 100", "Russell 2000", "US 10Y", "DXY",
    "Fed Funds", "Brent", "Gold", "BTC", "Earnings season",
    "M&A activity", "Private credit", "AI capex", "Treasury auctions",
  ],
  glance: [
    { value: 2028, suffix: "", label: "Class of", note: "Binghamton University" },
    { value: 2, suffix: "+", label: "Industry simulations", note: "BCG · Goldman Sachs" },
    { value: 2, suffix: "", label: "Roles to date", note: "Internship + part-time" },
    { value: 6, suffix: "", label: "Months of live broadcast experience", note: "ESPN / America East" },
  ],
  about: {
    lede:
      "I came to Binghamton to study finance because the questions felt important — how capital gets allocated, how risk gets priced, how a thesis survives contact with the market. I stayed in data because the answers, when you can find them, are usually quantitative.",
    body: [
      "My coursework focuses on quantitative analysis and financial modeling, and I'm pairing it with a Digital & Data Studies minor so I'm fluent in the tools — Excel deeply, SQL increasingly, and the analytical mindset that lets you ask better questions of either.",
      "Outside the classroom I'm picking up the practitioner side through Forage's job simulations from BCG and Goldman Sachs — case work in client analytics and risk that's gotten me closer to how the work actually feels. On the operations side, I've worked register and inventory at Lidl and now help produce live ESPN broadcasts at Binghamton — both jobs that taught me reps under pressure.",
      "I'm looking for a Summer 2027 internship in investment banking, asset management, equity research, consulting, or data/strategy at a financial institution. Open to New York and to remote, and very open to coffee chats.",
    ],
  },
  experience: [
    {
      role: "Livestream Production Assistant",
      org: "Binghamton University Athletics",
      orgHref: "https://binghamtonbearcats.com/",
      dates: "Feb 2026 — Present",
      location: "Binghamton, NY",
      type: "Part-time",
      bullets: [
        "Support live ESPN-distributed broadcasts of America East Conference athletic events.",
        "Operate on-site production gear and coordinate with directors, camera, and graphics in a live, no-retake environment.",
        "Built reliability and composure under deadline — the broadcast goes out whether or not it's convenient.",
      ],
      tags: ["Live Production", "ESPN", "America East", "Operations Under Pressure"],
    },
    {
      role: "Store Associate",
      org: "Lidl US",
      orgHref: "https://www.lidl.com/",
      dates: "May 2025 — Aug 2025",
      location: "Syosset, NY",
      type: "Part-time",
      bullets: [
        "Operated point-of-sale systems handling cash and electronic payments under strict reconciliation controls.",
        "Maintained accuracy across high-volume shifts; learned the operational discipline behind a single-store P&L.",
        "Worked customer service problems end-to-end — listened, diagnosed, resolved, escalated when warranted.",
      ],
      tags: ["POS Operations", "Cash Handling", "Customer Service", "Reliability"],
    },
  ],
  education: {
    school: "Binghamton University",
    schoolHref: "https://www.binghamton.edu/",
    degree: "Bachelor of Science, Financial Economics",
    minor: "Minor in Digital & Data Studies",
    dates: "Aug 2024 — May 2028 · Sophomore",
    summary:
      "Coursework concentrated in quantitative analysis, microeconomic theory, financial modeling in Excel, statistics, and an applied data studies track that pulls in SQL and analytical methods.",
    coursework: [
      "Quantitative Analysis (Finance)",
      "Financial Modeling in Excel",
      "Microeconomic Theory",
      "Statistics for Economics",
      "Data Studies & SQL",
      "Business Communication",
    ],
  },
  cases: [
    {
      sponsor: "BCG",
      title: "Data for Decision Makers",
      provider: "Forage Job Simulation",
      issued: "Dec 2025",
      credential: "RoLt8sBoqvE4vZKrw",
      problem:
        "How does a consulting team take a noisy client dataset and produce a recommendation a non-technical CXO will actually act on?",
      approach:
        "Worked the BCG playbook end-to-end: framed the business question, built the analytical structure, drew insight from the data, and translated findings into a stakeholder-ready narrative.",
      tools: ["Hypothesis-led analysis", "Client communication", "Data structuring"],
    },
    {
      sponsor: "Goldman Sachs",
      title: "Risk",
      provider: "Forage Job Simulation",
      issued: "Feb 2026",
      credential: "NtNqeFjcJXWTT7QTY",
      problem:
        "How do risk professionals at a global bank identify, size, and communicate exposures the rest of the firm depends on?",
      approach:
        "Stepped into the Goldman Sachs Risk function: assessed scenarios, framed exposures quantitatively, and produced communication tailored to a senior audience.",
      tools: ["Risk Assessment", "Scenario Analysis", "Executive Communication"],
    },
  ],
  skills: [
    {
      group: "Finance",
      items: [
        { name: "Financial Modeling (Excel)", level: 4 },
        { name: "Quantitative Analysis", level: 4 },
        { name: "Risk Assessment", level: 3 },
        { name: "Valuation Fundamentals", level: 3 },
      ],
    },
    {
      group: "Data & Analytics",
      items: [
        { name: "Microsoft Excel", level: 5 },
        { name: "SQL", level: 3 },
        { name: "Data Interpretation", level: 4 },
        { name: "Statistics", level: 3 },
      ],
    },
    {
      group: "Communication",
      items: [
        { name: "Translating analysis for executives", level: 4 },
        { name: "Written briefs & memos", level: 4 },
        { name: "Live, on-air operational comms", level: 4 },
      ],
    },
  ],
  themes: {
    intro:
      "What I read about when I'm not in class. Not predictions — just the questions I think are worth following.",
    items: [
      {
        title: "The path of US rates",
        body: "How the front end re-prices as the Fed's reaction function shifts and what that does to duration.",
      },
      {
        title: "Private credit's growing footprint",
        body: "Where direct lending is taking share from the syndicated market and how that's changing risk distribution.",
      },
      {
        title: "AI capex vs. earnings",
        body: "Whether hyperscaler infrastructure spend translates into the productivity numbers it's promising.",
      },
      {
        title: "Liquidity in small caps",
        body: "Why the Russell keeps lagging and what would have to change for that to reverse.",
      },
    ],
  },
  availability: {
    intro: "If you're hiring, here's the practical stuff up front.",
    items: [
      { label: "Looking for", value: "Summer 2027 internship — IB, asset management, equity research, consulting, or finance/strategy/data" },
      { label: "Available", value: "Full-time May — August 2027" },
      { label: "Location", value: "New York City preferred · Open to remote · Open to relocation" },
      { label: "Authorization", value: "US citizen — no sponsorship needed" },
      { label: "Best way to reach", value: "LinkedIn DM (fastest) or email via LinkedIn" },
    ],
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/veeraravichandran/", primary: true },
    { label: "GitHub", href: "https://github.com/vrchandran12-dev" },
  ],
  contact: {
    headline: "Let's talk.",
    body:
      "Whether it's an internship, a referral, or a 15-minute coffee chat — I read every message. The fastest channel is LinkedIn. Source code for this site is open if you're curious how it's built.",
    cta: { label: "Message on LinkedIn", href: "https://www.linkedin.com/in/veeraravichandran/" },
  },
  footer: {
    line: `© ${new Date().getFullYear()} Veera Ravichandran · Built and deployed by hand`,
    repoLabel: "View source",
    repoHref: "https://github.com/vrchandran12-dev/website-",
  },
};
