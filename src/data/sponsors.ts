export interface Sponsor {
  name: string;
  logo: string;         // initials or image URL
  tier: "platinum" | "gold" | "silver" | "bronze";
  website: string;
  tagline: string;
  color: string;
}

export const sponsors: Sponsor[] = [
  // Platinum
  {
    name: "NovaTech Solutions",
    logo: "NT",
    tier: "platinum",
    website: "https://example.com",
    tagline: "Empowering the next generation of engineers",
    color: "hsl(185 100% 50%)",
  },
  {
    name: "InfinityCloud",
    logo: "IC",
    tier: "platinum",
    website: "https://example.com",
    tagline: "The cloud infrastructure powering innovation",
    color: "hsl(78 100% 50%)",
  },

  // Gold
  {
    name: "CodeBase Inc.",
    logo: "CB",
    tier: "gold",
    website: "https://example.com",
    tagline: "Building the future, one commit at a time",
    color: "hsl(45 100% 55%)",
  },
  {
    name: "AI Frontier Labs",
    logo: "AF",
    tier: "gold",
    website: "https://example.com",
    tagline: "Pioneering artificial intelligence research",
    color: "hsl(270 100% 70%)",
  },
  {
    name: "DevSpark Technologies",
    logo: "DS",
    tier: "gold",
    website: "https://example.com",
    tagline: "Accelerating developer excellence",
    color: "hsl(200 100% 55%)",
  },

  // Silver
  {
    name: "RoboForge",
    logo: "RF",
    tier: "silver",
    website: "https://example.com",
    tagline: "Where robotics meets creativity",
    color: "hsl(150 80% 45%)",
  },
  {
    name: "DataStream Analytics",
    logo: "DA",
    tier: "silver",
    website: "https://example.com",
    tagline: "Turn data into decisions",
    color: "hsl(180 100% 40%)",
  },
  {
    name: "CircuitBoard Co.",
    logo: "CC",
    tier: "silver",
    website: "https://example.com",
    tagline: "Innovative hardware for a smarter world",
    color: "hsl(30 100% 55%)",
  },
  {
    name: "SyncLabs",
    logo: "SL",
    tier: "silver",
    website: "https://example.com",
    tagline: "Collaboration tools for modern teams",
    color: "hsl(320 100% 60%)",
  },

  // Bronze
  {
    name: "TechNation",
    logo: "TN",
    tier: "bronze",
    website: "https://example.com",
    tagline: "Connecting tech talent with opportunity",
    color: "hsl(0 0% 70%)",
  },
  {
    name: "CyberCore",
    logo: "CR",
    tier: "bronze",
    website: "https://example.com",
    tagline: "Security solutions for the digital age",
    color: "hsl(0 0% 65%)",
  },
  {
    name: "OpenSource Guild",
    logo: "OG",
    tier: "bronze",
    website: "https://example.com",
    tagline: "Championing open-source innovation",
    color: "hsl(0 0% 60%)",
  },
];

export const tierConfig = {
  platinum: {
    label: "Platinum",
    color: "hsl(185 100% 50%)",
    bg: "hsl(185 100% 50% / 0.08)",
    border: "hsl(185 100% 50% / 0.25)",
    glow: "0 0 30px hsl(185 100% 50% / 0.15)",
    cardSize: "lg" as const,
  },
  gold: {
    label: "Gold",
    color: "hsl(45 100% 55%)",
    bg: "hsl(45 100% 55% / 0.07)",
    border: "hsl(45 100% 55% / 0.2)",
    glow: "0 0 20px hsl(45 100% 55% / 0.1)",
    cardSize: "md" as const,
  },
  silver: {
    label: "Silver",
    color: "hsl(0 0% 75%)",
    bg: "hsl(0 0% 75% / 0.06)",
    border: "hsl(0 0% 75% / 0.15)",
    glow: "0 0 16px hsl(0 0% 75% / 0.08)",
    cardSize: "sm" as const,
  },
  bronze: {
    label: "Bronze",
    color: "hsl(30 80% 55%)",
    bg: "hsl(30 80% 55% / 0.06)",
    border: "hsl(30 80% 55% / 0.15)",
    glow: "0 0 12px hsl(30 80% 55% / 0.08)",
    cardSize: "sm" as const,
  },
};
