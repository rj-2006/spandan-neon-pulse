import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";
import { events } from "@/data/events";



const EventsSection = () => {
  return (
    <section className="py-20 md:py-32 relative scroll-snap-start">
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
          {events.slice(0, 4).map((event, index) => (
            <EventCard key={event.title} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
