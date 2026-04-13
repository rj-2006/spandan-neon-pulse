import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import { EventData, events } from "@/data/events";
import { Button } from "@/components/ui/button";



const categories = ["All", "Hackathon", "DSA Problem Solving", "ML Prediction Model", "Bridge Building", "Treasure Hunt", "Terrain Manipulator Challenge", "Robo Soccer", "Innovation For Sustainable Future", "Design Event", "Line Following Robot", "Blockchain", "Quiz"];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
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
                <EventCard 
                  key={event.title} 
                  {...event} 
                  index={index} 
                  onViewDetails={() => {
                    setSelectedEvent(event as EventData);
                    setIsModalOpen(true);
                  }}
                />
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
