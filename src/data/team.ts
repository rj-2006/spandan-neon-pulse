export interface TeamMember {
  name: string;
  role: string;
  image: string;
  email: string;
  linkedin: string;
  instagram: string;
  department: string;
}

export const teamMembers: TeamMember[] = [
  // ── Core Committee ──
  {
    name: "Arjun Sharma",
    role: "Festival Director",
    department: "Core Committee",
    image: "https://i.pravatar.cc/300?u=arjun-sharma",
    email: "arjun.sharma@spandan.tech",
    linkedin: "https://linkedin.com/in/arjunsharma",
    instagram: "https://instagram.com/arjun.sharma",
  },
  {
    name: "Priya Nair",
    role: "Co-Director",
    department: "Core Committee",
    image: "https://i.pravatar.cc/300?u=priya-nair",
    email: "priya.nair@spandan.tech",
    linkedin: "https://linkedin.com/in/priyanair",
    instagram: "https://instagram.com/priya.nair",
  },
  {
    name: "Rohan Mehta",
    role: "Technical Lead",
    department: "Core Committee",
    image: "https://i.pravatar.cc/300?u=rohan-mehta",
    email: "rohan.mehta@spandan.tech",
    linkedin: "https://linkedin.com/in/rohanmehta",
    instagram: "https://instagram.com/rohan.mehta",
  },
  {
    name: "Sneha Patel",
    role: "Operations Head",
    department: "Core Committee",
    image: "https://i.pravatar.cc/300?u=sneha-patel",
    email: "sneha.patel@spandan.tech",
    linkedin: "https://linkedin.com/in/snehapatel",
    instagram: "https://instagram.com/sneha.patel",
  },

  // ── Tech Team ──
  {
    name: "Vikram Singh",
    role: "Web Developer",
    department: "Tech Team",
    image: "https://i.pravatar.cc/300?u=vikram-singh",
    email: "vikram.singh@spandan.tech",
    linkedin: "https://linkedin.com/in/vikramsingh",
    instagram: "https://instagram.com/vikram.singh",
  },
  {
    name: "Anjali Gupta",
    role: "UI / UX Designer",
    department: "Tech Team",
    image: "https://i.pravatar.cc/300?u=anjali-gupta",
    email: "anjali.gupta@spandan.tech",
    linkedin: "https://linkedin.com/in/anjaligupta",
    instagram: "https://instagram.com/anjali.gupta",
  },
  {
    name: "Karan Verma",
    role: "Backend Developer",
    department: "Tech Team",
    image: "https://i.pravatar.cc/300?u=karan-verma",
    email: "karan.verma@spandan.tech",
    linkedin: "https://linkedin.com/in/karanverma",
    instagram: "https://instagram.com/karan.verma",
  },
  {
    name: "Divya Rao",
    role: "AI & Robotics Lead",
    department: "Tech Team",
    image: "https://i.pravatar.cc/300?u=divya-rao",
    email: "divya.rao@spandan.tech",
    linkedin: "https://linkedin.com/in/divyarao",
    instagram: "https://instagram.com/divya.rao",
  },

  // ── Marketing Team ──
  {
    name: "Aditya Kumar",
    role: "Marketing Head",
    department: "Marketing Team",
    image: "https://i.pravatar.cc/300?u=aditya-kumar",
    email: "aditya.kumar@spandan.tech",
    linkedin: "https://linkedin.com/in/adityakumar",
    instagram: "https://instagram.com/aditya.kumar",
  },
  {
    name: "Meera Krishnan",
    role: "Social Media Manager",
    department: "Marketing Team",
    image: "https://i.pravatar.cc/300?u=meera-krishnan",
    email: "meera.krishnan@spandan.tech",
    linkedin: "https://linkedin.com/in/meerakrishnan",
    instagram: "https://instagram.com/meera.krishnan",
  },
  {
    name: "Rahul Joshi",
    role: "Content Creator",
    department: "Marketing Team",
    image: "https://i.pravatar.cc/300?u=rahul-joshi",
    email: "rahul.joshi@spandan.tech",
    linkedin: "https://linkedin.com/in/rahuljoshi",
    instagram: "https://instagram.com/rahul.joshi",
  },
  {
    name: "Kavya Reddy",
    role: "Graphic Designer",
    department: "Marketing Team",
    image: "https://i.pravatar.cc/300?u=kavya-reddy",
    email: "kavya.reddy@spandan.tech",
    linkedin: "https://linkedin.com/in/kavyareddy",
    instagram: "https://instagram.com/kavya.reddy",
  },

  // ── Events Team ──
  {
    name: "Nikhil Bose",
    role: "Events Coordinator",
    department: "Events Team",
    image: "https://i.pravatar.cc/300?u=nikhil-bose",
    email: "nikhil.bose@spandan.tech",
    linkedin: "https://linkedin.com/in/nikhilbose",
    instagram: "https://instagram.com/nikhil.bose",
  },
  {
    name: "Tanya Malhotra",
    role: "Logistics Head",
    department: "Events Team",
    image: "https://i.pravatar.cc/300?u=tanya-malhotra",
    email: "tanya.malhotra@spandan.tech",
    linkedin: "https://linkedin.com/in/tanyamalhotra",
    instagram: "https://instagram.com/tanya.malhotra",
  },
  {
    name: "Siddharth Roy",
    role: "Volunteer Coordinator",
    department: "Events Team",
    image: "https://i.pravatar.cc/300?u=siddharth-roy",
    email: "siddharth.roy@spandan.tech",
    linkedin: "https://linkedin.com/in/siddharthroy",
    instagram: "https://instagram.com/siddharth.roy",
  },
  {
    name: "Pooja Iyer",
    role: "Sponsorship Liaison",
    department: "Events Team",
    image: "https://i.pravatar.cc/300?u=pooja-iyer",
    email: "pooja.iyer@spandan.tech",
    linkedin: "https://linkedin.com/in/poojaiyer",
    instagram: "https://instagram.com/pooja.iyer",
  },
];

export const departments = ["All", ...Array.from(new Set(teamMembers.map((m) => m.department)))];
