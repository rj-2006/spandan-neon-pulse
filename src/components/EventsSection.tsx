import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

const featuredEvents = [
  {
    title: "Code Crusade",
    category: "Hackathon",
    description: "24-hour coding marathon to build innovative solutions for real-world problems.",
    date: "Day 1-2",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    title: "RoboWars",
    category: "Robotics",
    description: "Build and battle your robots in the ultimate robotic combat competition.",
    date: "Day 2",
    teamSize: "3-5 members",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    title: "AI Challenge",
    category: "AI/ML",
    description: "Develop AI models to solve complex challenges and compete for glory.",
    date: "Day 1",
    teamSize: "1-3 members",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Cyber Quest",
    category: "CTF",
    description: "Capture the flag competition testing your cybersecurity and hacking skills.",
    date: "Day 1",
    teamSize: "2-4 members",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Featured <span className="text-primary neon-text">Events</span>
            </h2>
            <p className="text-muted-foreground font-display max-w-xl">
              Compete in cutting-edge technical competitions and showcase your skills.
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="mt-6 md:mt-0 border-primary/30 hover:border-primary hover:bg-primary/10 font-display"
          >
            <Link to="/events">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEvents.map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
