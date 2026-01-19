import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const timelineData = {
  day1: [
    { time: "09:00 AM", event: "Inauguration Ceremony", venue: "Main Auditorium" },
    { time: "10:30 AM", event: "Hackathon Kickoff", venue: "Tech Block" },
    { time: "11:00 AM", event: "AI/ML Workshop", venue: "Lab 101" },
    { time: "02:00 PM", event: "Robotics Challenge - Round 1", venue: "Innovation Hub" },
    { time: "04:00 PM", event: "Coding Competition", venue: "Computer Lab" },
    { time: "06:00 PM", event: "Tech Talk: Future of AI", venue: "Seminar Hall" },
  ],
  day2: [
    { time: "09:00 AM", event: "Hackathon Continues", venue: "Tech Block" },
    { time: "10:00 AM", event: "Gaming Tournament Finals", venue: "Gaming Arena" },
    { time: "12:00 PM", event: "Robotics Challenge Finals", venue: "Innovation Hub" },
    { time: "02:00 PM", event: "Project Showcase", venue: "Exhibition Hall" },
    { time: "04:00 PM", event: "Hackathon Presentations", venue: "Main Auditorium" },
    { time: "06:00 PM", event: "Prize Distribution & Closing", venue: "Main Auditorium" },
  ],
};

const Timeline = () => {
  const [activeDay, setActiveDay] = useState<"day1" | "day2">("day1");

  return (
    <section id="timeline" className="py-20 md:py-32 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Event <span className="text-primary neon-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-xl mx-auto">
            Two days packed with innovation, competition, and learning experiences.
          </p>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {["day1", "day2"].map((day, index) => (
            <button
              key={day}
              onClick={() => setActiveDay(day as "day1" | "day2")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold transition-all duration-300 ${
                activeDay === day
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground hover:bg-secondary border border-border"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Day 0{index + 1}
            </button>
          ))}
        </div>

        {/* Timeline Items */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {timelineData[activeDay].map((item, index) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start gap-4 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background md:-translate-x-1/2 z-10" />

                {/* Content Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] glow-card p-4 ${
                    index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                  }`}
                >
                  <div className={`flex items-center gap-2 text-primary mb-2 ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span className="font-display font-semibold text-sm">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-1">
                    {item.event}
                  </h3>
                  <div className={`flex items-center gap-1 text-muted-foreground text-sm ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}>
                    <MapPin className="w-3 h-3" />
                    <span className="font-body">{item.venue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
