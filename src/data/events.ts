export interface EventCoordinator {
  name: string;
  phone: string;
  email?: string;
}

export interface EventData {
  title: string;
  category: string;
  description: string;
  date: string;
  teamSize: string;
  minTeam: number;
  maxTeam: number;
  image: string;
  rulebookUrl?: string;
  coordinators?: EventCoordinator[];
  coordinator?: {
    name: string;
    phone: string;
    photo: string;
  };
}

type RawEventData = Omit<EventData, "image">;

const rawEvents: RawEventData[] = [
  {
    title: "GreenHack: Code for Impact",
    category: "Coding",
    description: "A 24-hour hackathon focused on sustainability. Build innovative software solutions to tackle global environmental challenges and reduce carbon footprints.",
    date: "May 1–2 (Day 1–2)",
    teamSize: "4–6 members",
    minTeam: 4,
    maxTeam: 6,
    rulebookUrl: "https://drive.google.com/file/d/142oi_QH7YplUB89zhBhLwAFBhqYKahNZ/view?usp=drivesdk",
    coordinators: [
      { name: "Kritesh Purohit", phone: "+91 75057 53608", email: "kriteshpurohit151021@gmail.com" },
      { name: "Ayush Joshi", phone: "+91 90688 83799" },
    ],
  },
  {
    title: "AlgoRhythm",
    category: "Coding",
    description: "Test your analytical thinking and coding speed! Compete against top programmers to solve complex Data Structures and Algorithms problems under strict time constraints.",
    date: "May 2 (Day 2)",
    teamSize: "Solo (1 member)",
    minTeam: 1,
    maxTeam: 1,
    rulebookUrl: "https://drive.google.com/file/d/1LKBdnXY13xYWwVQA23wo-PHkLY26vGU4/view?usp=drivesdk",
    coordinators: [
      { name: "Utsav Kashyap", phone: "8755051637", email: "utsav.mlr@gmail.com" },
      { name: "Saket Kandari", phone: "7668877496", email: "saket12kandari@gmail.com" },
    ],
  },
  {
    title: "AI Foresight",
    category: "Coding",
    description: "Dive into the world of Machine Learning! Build, train, and optimize ML bots and predictive models to analyze complex datasets and solve real-world industry challenges.",
    date: "May 1 (Day 1)",
    teamSize: "1–4 members",
    minTeam: 1,
    maxTeam: 4,
    rulebookUrl: "https://drive.google.com/file/d/1ZF4XY_Vpgjbzi0VJXedNhoKgoWX2x0IO/view?usp=drivesdk",
    coordinators: [
      { name: "Jiyanshi Batra", phone: "+91 8445021974", email: "jiyanshibatra753@gmail.com" },
    ],
  },
  {
    title: "BridgeIt",
    category: "Innovation",
    description: "Put your civil engineering skills to the test. Design and construct structurally sound, weight-bearing bridges using limited materials and race against time.",
    date: "May 1 (Day 1)",
    teamSize: "2–6 members (branch-wise)",
    minTeam: 2,
    maxTeam: 6,
    rulebookUrl: "https://drive.google.com/file/d/1MMKuKclmf2Fbmn4wBgaV5qub2f9XjgxH/view?usp=drivesdk",
    coordinators: [
      { name: "Yuvraj Singh Makhloga", phone: "+91 70883 05386" },
      { name: "Abhay Kumar",           phone: "+91 93255 17255" },
    ],
  },
  {
    title: "TechScape Hunt",
    category: "Fun Tech",
    description: "An exhilarating campus-wide treasure hunt with a tech twist! Decipher intricate technical puzzles, crack codes, and unlock hidden clues to claim the ultimate prize.",
    date: "May 1 (Day 1)",
    teamSize: "2–5 members (same branch)",
    minTeam: 2,
    maxTeam: 5,
    rulebookUrl: "https://drive.google.com/file/d/1Q4S0EX34m1A98AIwOLh6_dMBdfL3VZjo/view?usp=drivesdk",
    coordinators: [
      { name: "Gaurav Pal", phone: "8439051108" },
    ],
  },
  {
    title: "GeoCraft Arena",
    category: "Robotics",
    description: "Design mechanisms and robots capable of navigating and manipulating challenging simulated terrains. Speed, adaptability, and precision are the keys to victory!",
    date: "May 2 (Day 2)",
    teamSize: "1–5 members",
    minTeam: 1,
    maxTeam: 5,
    rulebookUrl: "https://drive.google.com/file/d/1ylT1-M35l92pXgryOpy1jpRKyp-zRuQQ/view?usp=drivesdk",
    coordinators: [
      { name: "Anmol Dimri", phone: "+91 9389640540", email: "anmol.dimri29@gmail.com" },
    ],
  },
  {
    title: "NetRunnerz",
    category: "Robotics",
    description: "The ultimate robotic sports event! Design, build, and program agile robots to compete in an intense, high-speed game of mechanical soccer.",
    date: "May 1 (Day 1)",
    teamSize: "4–6 members (branch-wise)",
    minTeam: 4,
    maxTeam: 6,
    rulebookUrl: "https://drive.google.com/file/d/1TErG-jeiFyAED9FsWo2P1bZNXVx5LcYT/view?usp=drivesdk",
    coordinators: [
      { name: "Sujal Singh Bisht", phone: "8218204560", email: "sb1743816@gmail.com" },
    ],
  },
  {
    title: "EcoInnovate",
    category: "Innovation",
    description: "A pitching and innovation challenge. Present your hardware or software prototypes aimed at promoting green energy, sustainability, and ecological preservation.",
    date: "May 2–3 (Day 2–3)",
    teamSize: "4–8 members (same branch)",
    minTeam: 4,
    maxTeam: 8,
    rulebookUrl: "https://drive.google.com/file/d/15IkRZIyas-majx2q01FfaMm6JIOh0Rcj/view?usp=drivesdk",
    coordinators: [
      { name: "Jiyanshi Batra", phone: "+91 84450 21974" },
      { name: "Anubhav Dimri", phone: "+91 78178 32297" },
      { name: "Abhay Kumar", phone: "+91 93255 17255" },
      { name: "Yuvraj Singh Makhloga", phone: "+91 70883 05386" },
    ],
  },
  {
    title: "DesignForge",
    category: "Design",
    description: "Unleash your creativity! A UI/UX and product design competition where you wireframe, prototype, and build stunning user experiences to delight users.",
    date: "May 1–2 (Day 1–2)",
    teamSize: "2–4 members",
    minTeam: 2,
    maxTeam: 4,
    rulebookUrl: "https://drive.google.com/file/d/1fjTak93t28bBDSRHxOc-6C-rlCRDpIkm/view?usp=drivesdk",
    coordinators: [
      { name: "Yashpreet Singh", phone: "+91 63981 50951", email: "singhyashpreet22@gmail.com" },
      { name: "Kriti Uniyal", phone: "+91 79831 73102", email: "kritiuniyal28@gmail.com" },
      { name: "Paras Dhiman", phone: "+91 95480 88962", email: "prsdhiman015@gmail.com" },
    ],
  },
  {
    title: "AbsurdUX",
    category: "Design",
    description: "Build the weirdest functional interface possible. Create a funny, over-engineered volume control that blends technical execution, chaotic interaction design, and humour.",
    date: "To be announced",
    teamSize: "2–3 members",
    minTeam: 2,
    maxTeam: 3,
    rulebookUrl: "https://drive.google.com/file/d/1ERIWSVx8Tzm9GPRaIkjuj2qYbWvYMIH4/view?usp=drivesdk",
    coordinators: [
      { name: "Ansh Dhamija", phone: "+91 73005 95088" },
    ],
  },
  {
    title: "Electromaniac",
    category: "Innovation",
    description: "Race, reverse-engineer, and rebuild through hardware-focused challenges covering RC control, circuit analysis, and fast breadboard implementation.",
    date: "To be announced",
    teamSize: "3–4 members",
    minTeam: 3,
    maxTeam: 4,
    rulebookUrl: "https://drive.google.com/file/d/1i2xuFrFQeSii9RNCV_-AgbB8XYrOTTj1/view?usp=drivesdk",
    coordinators: [
      { name: "Ojasvi Thapa", phone: "+91 91493 56184", email: "ojthapa10@gmail.com" },
    ],
  },
  {
    title: "WikiRun",
    category: "Fun Tech",
    description: "Race through Wikipedia using only internal article links. Find the fastest path from a source page to a target page without search, shortcuts, or external tools.",
    date: "To be announced",
    teamSize: "Solo (1 member)",
    minTeam: 1,
    maxTeam: 1,
    rulebookUrl: "https://drive.google.com/file/d/1NX2yXDRZqWBkyYVCg7Aw0Ys1H9LXMxIn/view?usp=drivesdk",
    coordinators: [
      { name: "Ojasvi Arora", phone: "+91 87910 42614", email: "ojasviarora9926@gmail.com" },
      { name: "Priyanshu Nautiyal", phone: "+91 95202 13423", email: "priyanshu.nauti.0017@gmail.com" },
      { name: "Rahul Joshi", phone: "+91 79835 24131", email: "rahuljoshi190114@gmail.com" },
    ],
  },
  {
    title: "Circuit Chase",
    category: "Robotics",
    description: "Construct autonomous robots built for speed and precision. Compete to navigate complex line-tracks with sharp turns and intersections in the fastest time possible.",
    date: "May 1 (Day 1)",
    teamSize: "3–6 members (branch-wise)",
    minTeam: 3,
    maxTeam: 6,
    rulebookUrl: "https://drive.google.com/file/d/10fs3mQpKnMuDn2bxMHNip7bQ5B27PkCN/view?usp=drivesdk",
    coordinators: [
      { name: "Anubhav Dimri", phone: "7817832297", email: "dimrianubhav123@gmail.com" },
    ],
  },
  {
    title: "WALL-E",
    category: "Creative",
    description: "Express your creativity through the art of graffiti! Participants will create stunning murals and street-art inspired designs that blend technology with artistic expression.",
    date: "May 3 (Day 3)",
    teamSize: "1–3 members",
    minTeam: 1,
    maxTeam: 3,
    rulebookUrl: "https://drive.google.com/file/d/1ZQIqp7JXJ0fjJcZbtNVNDZ_iznd3AIJ7/view?usp=drivesdk",
    coordinators: [
      { name: "Shambhavi", phone: "+91 79836 90435" },
      { name: "Manas Kiran Singh Rathore", phone: "+91 85338 30880" },
      { name: "Abhay Kumar", phone: "+91 93255 17255" },
      { name: "Yuvraj Singh Makhloga", phone: "+91 70883 05386" },
    ],
  },
];

const imageMap: Record<string, string> = {
  "GreenHack: Code for Impact": "GreenHack.webp",
  "AlgoRhythm": "AlgoRhythm.webp",
  "AI Foresight": "AI-Foresight.webp",
  "BridgeIt": "BridgeIt.webp",
  "TechScape Hunt": "TechScape Hunt.webp",
  "GeoCraft Arena": "GeoCraftArena.webp",
  "NetRunnerz": "NetRunnerz.webp",
  "EcoInnovate": "EcoInnovate.webp",
  "DesignForge": "DesignForge.webp",
  "AbsurdUX": "DesignForge.webp",
  "Electromaniac": "Circuit Chase.webp",
  "WikiRun": "TechScape Hunt.webp",
  "Circuit Chase": "Circuit Chase.webp",
  "WALL-E": "WALL-E.webp",
};

export const events: EventData[] = rawEvents.map(event => ({
  ...event,
  image: `/event/${imageMap[event.title]}`
}));
