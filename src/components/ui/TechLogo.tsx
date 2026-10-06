"use client";

const BRAND_MAP: Record<string, string> = {
  "JavaScript (ES6+)": "javascript",
  "React": "react",
  "React Native": "react",
  "Node.js": "nodejs",
  "Express.js": "expressjs",
  "MongoDB": "mongodb",
  "SQL": "sql",
  "HTML5": "html5",
  "CSS3": "css3",
  "C++": "cplusplus",
  "SQLite": "sqlite",
  "Git": "git",
  "GitHub": "github",
  "Linux": "linux",
  "Supabase": "supabase"
};

const CONCEPT_MAP: Record<string, boolean> = {
  "Claude Code": true,
  "Cursor AI": true,
  "Antigravity": true,
};

export function isBrand(name: string) {
  return !!BRAND_MAP[name];
}

export function TechLogo({ name, size = 150 }: { name: string; size?: number }) {
  if (BRAND_MAP[name]) {
    return (
      <img 
        src={`/logos/${BRAND_MAP[name]}.svg`} 
        alt={`${name} logo`} 
        width={size} 
        height={size}
        style={{ objectFit: 'contain' }}
      />
    );
  }

  // Fallback for concepts
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
