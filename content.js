// Edit this file to update the site. Push to main and GitHub Actions redeploys.
window.SITE_CONTENT = {
  nav: {
    brand: "Veera Ravichandran",
  },
  hero: {
    eyebrow: "Available for new opportunities",
    firstName: "Veera",
    lastName: "Ravichandran.",
    tagline:
      "Engineer and builder. I design systems, ship products, and turn hard problems into clean software.",
    primaryCta: { label: "View work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/veeraravichandran/" },
    { label: "GitHub", href: "https://github.com/vrchandran12-dev" },
  ],
  about: {
    paragraph1:
      "I'm Veera — an engineer who likes the parts of software that actually move the needle: the right abstraction, a tight feedback loop, a system that holds up under load.",
    paragraph2:
      "I work end-to-end across product, infrastructure, and the messy seams between them. I care about clarity, momentum, and shipping things that people use.",
    facts: [
      { label: "Based in", value: "—" },
      { label: "Focus", value: "Software engineering" },
      { label: "Currently", value: "Open to roles" },
    ],
  },
  experience: [
    {
      role: "Your role",
      org: "Company",
      orgHref: "",
      dates: "Year — Present",
      summary:
        "One or two sentences on impact and scope. Replace this with a real entry from your résumé.",
      tags: ["Edit", "content.js", "to update"],
    },
    {
      role: "Previous role",
      org: "Previous Company",
      orgHref: "",
      dates: "Year — Year",
      summary: "What you owned, what shipped, what changed because you were there.",
      tags: ["Add", "real", "tags"],
    },
  ],
  projects: [
    {
      title: "Project name",
      description:
        "A short description of the project: the problem, your approach, the result. One or two sentences.",
      tags: ["TypeScript", "Postgres"],
      links: [
        { label: "Code", href: "https://github.com/vrchandran12-dev" },
        { label: "Live", href: "#" },
      ],
    },
    {
      title: "Another project",
      description: "Replace these placeholder cards with your actual work. Two to six cards reads best.",
      tags: ["Python", "AWS"],
      links: [{ label: "Code", href: "https://github.com/vrchandran12-dev" }],
    },
    {
      title: "A third project",
      description: "Highlight the projects you're proudest of and that map to the roles you want.",
      tags: ["React", "Node"],
      links: [{ label: "Code", href: "https://github.com/vrchandran12-dev" }],
    },
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "Python", "Go", "SQL"] },
    { group: "Frameworks", items: ["React", "Next.js", "Node.js", "FastAPI"] },
    { group: "Infrastructure", items: ["AWS", "Docker", "Postgres", "Redis"] },
    { group: "Practice", items: ["System design", "Code review", "Mentoring"] },
  ],
  contact: {
    blurb:
      "The fastest way to reach me is LinkedIn. I read every message and try to reply within a couple of days.",
    actions: [
      { label: "Message on LinkedIn", href: "https://www.linkedin.com/in/veeraravichandran/", primary: true },
      { label: "GitHub", href: "https://github.com/vrchandran12-dev", primary: false },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Veera Ravichandran`,
    repoLabel: "Source",
    repoHref: "https://github.com/vrchandran12-dev/website-",
  },
};
