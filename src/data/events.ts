export interface EventCoordinator {
  name: string;
  phone: string;
}

export interface EventData {
  title: string;
  category: string;
  description: string;
  date: string;
  teamSize: string;
  image: string;
  rulebookUrl?: string;
  coordinators?: EventCoordinator[];
}

export const events: EventData[] = [
  {
    title: "GreenHack: Code for Impact",
    category: "Hackathon",
    description: "A 24-hour hackathon focused on sustainability. Build innovative software solutions to tackle global environmental challenges and reduce carbon footprints.",
    date: "May 1–2 (Day 1–2)",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    title: "AlgoRhythm",
    category: "DSA Problem Solving",
    description: "Test your analytical thinking and coding speed! Compete against top programmers to solve complex Data Structures and Algorithms problems under strict time constraints.",
    date: "May 2 (Day 2)",
    teamSize: "3-5 members",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1LKBdnXY13xYWwVQA23wo-PHkLY26vGU4/view?usp=drive_link",
    coordinators: [
      { name: "Utsav Kashyap",  phone: "8755051637" },
      { name: "Saket Kandari",  phone: "7668877496" },
    ],
  },
  {
    title: "AI Foresight",
    category: "ML Bot + Prediction Model",
    description: "Dive into the world of Machine Learning! Build, train, and optimize ML bots and predictive models to analyze complex datasets and solve real-world industry challenges.",
    date: "May 1 (Day 1)",
    teamSize: "1-3 members",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1ZF4XY_Vpgjbzi0VJXedNhoKgoWX2x0IO/view?usp=drive_link",
    coordinators: [
      { name: "Jiyanshi Batra", phone: "+91 8445021974" },
    ],
  },
  {
    title: "BridgeIt",
    category: "Bridge Making",
    description: "Put your civil engineering skills to the test. Design and construct structurally sound, weight-bearing bridges using limited materials and race against time.",
    date: "May 1 (Day 1)",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1MMKuKclmf2Fbmn4wBgaV5qub2f9XjgxH/view?usp=drive_link",
    coordinators: [
      { name: "Yuvraj Singh Makhloga", phone: "+91 7088305386" },
      { name: "Abhay Kumar",           phone: "+91 9325517255" },
    ],
  },
  {
    title: "TechScape Hunt",
    category: "Treasure Hunt",
    description: "An exhilarating campus-wide treasure hunt with a tech twist! Decipher intricate technical puzzles, crack codes, and unlock hidden clues to claim the ultimate prize.",
    date: "May 1 (Day 1)",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1Q4S0EX34m1A98AIwOLh6_dMBdfL3VZjo/view?usp=drive_link",
    coordinators: [
      { name: "Gaurav Pal", phone: "8439051108" },
    ],
  },
  {
    title: "GeoCraft Arena",
    category: "Terrain Manipulator Challenge",
    description: "Design mechanisms and robots capable of navigating and manipulating challenging simulated terrains. Speed, adaptability, and precision are the keys to victory!",
    date: "May 2 (Day 2)",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1ylT1-M35l92pXgryOpy1jpRKyp-zRuQQ/view?usp=drive_link",
    coordinators: [
      { name: "Anmol Dimri", phone: "+91 9389640540" },
    ],
  },
  {
    title: "NetRunnerz",
    category: "Robo Soccer",
    description: "The ultimate robotic sports event! Design, build, and program agile robots to compete in an intense, high-speed game of mechanical soccer.",
    date: "May 1 (Day 1)",
    teamSize: "2-3 members",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1TErG-jeiFyAED9FsWo2P1bZNXVx5LcYT/view?usp=drive_link",
    coordinators: [
      { name: "Sujal Singh Bisht", phone: "8218204560" },
    ],
  },
  {
    title: "EcoInnovate",
    category: "Innovation For Sustainable Future",
    description: "A pitching and innovation challenge. Present your hardware or software prototypes aimed at promoting green energy, sustainability, and ecological preservation.",
    date: "May 2–3 (Day 2–3)",
    teamSize: "1-5 members",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  },
  {
    title: "DesignForge",
    category: "Design Event",
    description: "Unleash your creativity! A UI/UX and product design competition where you wireframe, prototype, and build stunning user experiences to delight users.",
    date: "May 1–2 (Day 1–2)",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/1HkXIh7B5JgAkk1c3fwOYbbwd8adXjAPP/view?usp=drive_link",
    coordinators: [
      { name: "Yashpreet Singh", phone: "+91 6398150951" },
      { name: "Kriti Uniyal",    phone: "+91 7983173102" },
    ],
  },
  {
    title: "Circuit Chase",
    category: "Line Following Robot",
    description: "Construct autonomous robots built for speed and precision. Compete to navigate complex line-tracks with sharp turns and intersections in the fastest time possible.",
    date: "May 1 (Day 1)",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    rulebookUrl: "https://drive.google.com/file/d/10fs3mQpKnMuDn2bxMHNip7bQ5B27PkCN/view?usp=drive_link",
    coordinators: [
      { name: "Anubhav Dimri", phone: "7817832297" },
    ],
  },
  {
    title: "WALL-E",
    category: "Grafitti",
    description: "Express your creativity through the art of graffiti! Participants will create stunning murals and street-art inspired designs that blend technology with artistic expression.",
    date: "May 3 (Day 3)",
    teamSize: "1-3 members",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    coordinator: {
      name: "Zoe Parker",
      phone: "+1 (555) 901-2345",
      photo: "https://i.pravatar.cc/150?u=zoe"
    }
  },
];
