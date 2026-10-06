export const PROFILE = {
  name: "Affan Ahmer",
  firstName: "Affan",
  role: "Full-Stack Developer",
  fullRole: "Full-Stack Developer | MERN Stack Graduate | Computer Science Undergraduate",
  email: "affan.ahmer999@gmail.com",
  phone: "+92 325 4180841",
  phoneHref: "tel:+923254180841",
  location: "Lahore, Pakistan",
  resumeSummary: "Fresh Computer Science graduate and passionate MERN Stack Developer skilled in MongoDB, Express.js, React, and Node.js. Experienced in building responsive web applications, developing RESTful APIs, and implementing user-focused digital solutions. Eager to contribute solid full-stack fundamentals and hands-on project experience to a collaborative engineering team.",
  github: "https://github.com/affanahmer",
  linkedin: "https://linkedin.com/in/affan-ahmer-b34779347",
  resumePath: "/resume-1.pdf"
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS = [
  {
    family: "Languages",
    skills: [
      { name: "JavaScript (ES6+)", symbol: "Js", projects: ["Collabryx", "CareSync", "AItravel", "Oasis Infobyte"] },
      { name: "C++", symbol: "C+", projects: [] },
      { name: "HTML5", symbol: "H5", projects: ["Oasis Infobyte"] },
      { name: "CSS3", symbol: "C3", projects: ["Oasis Infobyte"] },
      { name: "SQL", symbol: "Sq", projects: [] },
    ]
  },
  {
    family: "Frontend",
    skills: [
      { name: "React", symbol: "Re", projects: ["CareSync", "AItravel", "Oasis Infobyte"] },
      { name: "React Native", symbol: "Rn", projects: ["GarmentPOS"] },
    ]
  },
  {
    family: "Backend & Databases",
    skills: [
      { name: "Node.js", symbol: "No", projects: ["CareSync"] },
      { name: "Express.js", symbol: "Ex", projects: ["CareSync"] },
      { name: "MongoDB", symbol: "Mg", projects: ["CareSync", "AItravel"] },
      { name: "SQLite", symbol: "Sl", projects: ["GarmentPOS"] },
    ]
  },
  {
    family: "Tools & Platforms",
    skills: [
      { name: "Git", symbol: "Gt", projects: [] },
      { name: "GitHub", symbol: "Gh", projects: [] },
      { name: "Linux", symbol: "Lx", projects: [] },
      { name: "Supabase", symbol: "Sb", projects: ["GarmentPOS"] },
      { name: "Claude Code", symbol: "Cc", projects: [] },
      { name: "Cursor AI", symbol: "Ca", projects: [] },
      { name: "Antigravity", symbol: "Ag", projects: [] },
    ]
  }
];

export const EXPERIENCE = [
  {
    type: "experience",
    year: "Sep 2026 – Oct 2026",
    title: "Web Development & Design Intern (Remote)",
    place: "Oasis Infobyte",
    detail: "Developed and deployed responsive web interfaces using modern JavaScript (ES6+), React.js, and CSS frameworks, ensuring pixel-perfect execution from Figma design prototypes."
  }
];

export const EDUCATION = [
  {
    type: "education",
    year: "2022 – 2026",
    title: "Bachelors in Computer Science",
    place: "University of Central Punjab",
    detail: ""
  },
  {
    type: "education",
    year: "2020 – 2022",
    title: "Intermediate in (FSc) Pre-Engineering",
    place: "Punjab Group of Colleges",
    detail: ""
  },
  {
    type: "education",
    year: "2020",
    title: "Matriculation",
    place: "Divisional Public School",
    detail: ""
  }
];

export const TIMELINE = [
  ...EXPERIENCE,
  ...EDUCATION
];

export const PROJECTS = [
  {
    id: "collabryx",
    index: "01",
    title: "Collabryx",
    kicker: "Final Year Project - Networking Platform | 2025 – 2026",
    description: "Co-developed a networking platform connecting students and professionals via semantic vector matching. Engineered skill/goal-based search algorithms that outperformed simple keyword matching in user relevancy.",
    features: [
      "Semantic vector matching",
      "Skill/goal-based search algorithms"
    ],
    tech: ["Next.js", "Tailwind CSS", "OpenAI API", "Vector Database"],
    github: null
  },
  {
    id: "caresync",
    index: "02",
    title: "CareSync",
    kicker: "Hospital Management System | 2026",
    description: "Developed a full-stack hospital management web app with appointment scheduling and reporting modules.",
    features: [
      "Appointment scheduling",
      "Reporting modules"
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js (MERN)"],
    github: null
  },
  {
    id: "aitravel",
    index: "03",
    title: "AItravel",
    kicker: "AI Travel Planning Website | 2026",
    description: "Designed an AI itinerary generator delivering dynamic trip recommendations based on budget and dates.",
    features: [
      "AI itinerary generator",
      "Dynamic trip recommendations"
    ],
    tech: ["React", "MongoDB", "OpenAI API"],
    github: null
  },
  {
    id: "garmentpos",
    index: "04",
    title: "GarmentPOS",
    kicker: "Mobile Point-Of-Sale System | 2025",
    description: "Built an offline-first mobile POS with SQLite local caching, Supabase cloud sync, and thermal receipt printing.",
    features: [
      "Offline-first with SQLite local caching",
      "Supabase cloud sync",
      "Thermal receipt printing"
    ],
    tech: ["React Native", "Supabase", "SQLite"],
    github: null
  }
];

export const CERTIFICATIONS = [];
export const ACHIEVEMENTS = [];
