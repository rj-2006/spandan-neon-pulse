import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";

const allEvents = [
  {
    title: "Code Crusade",
    category: "Hackathon",
    description: "24-hour coding marathon to build innovative solutions for real-world problems. Form your team and code your way to victory.",
    date: "Day 1-2",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    title: "RoboWars",
    category: "Robotics",
    description: "Build and battle your robots in the ultimate robotic combat competition. Design, build, and fight!",
    date: "Day 2",
    teamSize: "3-5 members",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    title: "AI Challenge",
    category: "AI/ML",
    description: "Develop AI models to solve complex challenges and compete for glory. Push the boundaries of machine learning.",
    date: "Day 1",
    teamSize: "1-3 members",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Cyber Quest",
    category: "CTF",
    description: "Capture the flag competition testing your cybersecurity and hacking skills. Find vulnerabilities, capture flags!",
    date: "Day 1",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
  {
    title: "Web Dev Sprint",
    category: "Web Development",
    description: "Build stunning websites in record time. Showcase your frontend and backend development skills.",
    date: "Day 1",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Drone Racing",
    category: "Robotics",
    description: "Race your drones through challenging obstacle courses. Speed, precision, and control matter!",
    date: "Day 2",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
  },
  {
    title: "Data Science Bowl",
    category: "AI/ML",
    description: "Analyze datasets and extract meaningful insights. Compete with data science enthusiasts.",
    date: "Day 1",
    teamSize: "2-3 members",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Gaming Tournament",
    category: "Gaming",
    description: "Compete in popular esports titles. Show your gaming prowess and win exciting prizes.",
    date: "Day 2",
    teamSize: "1-5 members",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  },
  {
    title: "IoT Innovation",
    category: "IoT",
    description: "Build smart IoT solutions using sensors and microcontrollers. Connect the physical and digital worlds.",
    date: "Day 1-2",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    title: "UI/UX Design",
    category: "Design",
    description: "Design intuitive and beautiful user interfaces. Create experiences that delight users.",
    date: "Day 1",
    teamSize: "1-2 members",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    title: "Blockchain Build",
    category: "Blockchain",
    description: "Develop decentralized applications on blockchain platforms. Innovate with Web3 technologies.",
    date: "Day 2",
    teamSize: "2-3 members",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    title: "Tech Quiz",
    category: "Quiz",
    description: "Test your technical knowledge across various domains. Quick thinking and deep knowledge win!",
    date: "Day 1",
    teamSize: "2-3 members",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80",
  },
];

const categories = ["All", "Hackathon", "Robotics", "AI/ML", "CTF", "Gaming", "IoT", "Design", "Web Development", "Blockchain", "Quiz"];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 relative cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
              All <span className="text-primary neon-text">Events</span>
            </h1>
            <p className="text-muted-foreground font-display text-lg mb-8">
              Explore our diverse range of technical competitions and find your battlefield.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:outline-none font-display text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-display text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-foreground hover:bg-secondary border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.title} {...event} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground font-display text-lg">
                No events found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 font-display border-primary/30 hover:border-primary"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
