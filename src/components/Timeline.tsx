import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const timelineData = {
  day1: [
    { time: "09:00 AM", event: "Inauguration Ceremony", venue: "Main Auditorium" },
    { time: "10:30 AM", event: "Hackathon Kickoff", venue: "Tech Block" },
    { time: "11:00 AM", event: "AI/ML Workshop", venue: "Lab 101" },
    { time: "02:00 PM", event: "Robotics Challenge — Round 1", venue: "Innovation Hub" },
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
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lineHeightValue = useMotionValue(0);
  const lineHeightSpring = useSpring(lineHeightValue, { stiffness: 250, damping: 28 });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const currentDots = dotRefs.current;
    currentDots.forEach((dot, index) => {
      if (dot) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) setActiveItemIndex(index);
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(dot);
        observers.push(observer);
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [activeDay]);

  useEffect(() => {
    if (activeItemIndex >= 0 && dotRefs.current[activeItemIndex] && timelineRef.current) {
      const dotRect = dotRefs.current[activeItemIndex]!.getBoundingClientRect();
      const timelineRect = timelineRef.current.getBoundingClientRect();
      lineHeightValue.set(dotRect.top - timelineRect.top + dotRect.height / 2);
    }
  }, [activeItemIndex, lineHeightValue]);

  return (
    <section
      id="timeline"
      className="py-24 md:py-36 relative overflow-hidden"
      ref={containerRef}
      style={{ background: "hsl(0 0% 4%)" }}
    >
      {/* Subtle gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, hsl(62 100% 52% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="section-tag mb-5 mx-auto">Schedule</div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
            Event <span className="neon-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-xl mx-auto text-lg">
            Two days packed with innovation, competition, and learning experiences.
          </p>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex justify-center gap-3 mb-14">
          {(["day1", "day2"] as const).map((day, index) => {
            const active = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => { setActiveDay(day); setActiveItemIndex(-1); lineHeightValue.set(0); }}
                className="relative flex items-center gap-2.5 px-7 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300"
                style={{
                  background: active ? "var(--gradient-neon)" : "hsl(0 0% 8%)",
                  color: active ? "hsl(0 0% 4%)" : "hsl(0 0% 60%)",
                  border: active ? "none" : "1px solid hsl(0 0% 16%)",
                  boxShadow: active ? "0 0 20px hsl(62 100% 52% / 0.3)" : "none",
                }}
              >
                <Calendar className="w-4 h-4" />
                Day 0{index + 1}
                {active && (
                  <span className="absolute inset-0 rounded-full animate-ping opacity-10"
                    style={{ background: "hsl(62 100% 52%)" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Items */}
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative" ref={timelineRef}>
            {/* Background Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
              style={{ background: "hsl(0 0% 14%)" }} />

            {/* Animated Progress Line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 w-px md:-translate-x-1/2 origin-top"
              style={{
                height: lineHeightSpring,
                background: "hsl(62 100% 52%)",
                boxShadow: "0 0 10px hsl(62 100% 52% / 0.6), 0 0 30px hsl(62 100% 52% / 0.3)",
              }}
            />

            {timelineData[activeDay].map((item, index) => (
              <motion.div
                key={item.event}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`relative flex items-start gap-4 mb-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <motion.div
                  ref={(el) => (dotRefs.current[index] = el)}
                  className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full md:-translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{
                    background: index <= activeItemIndex ? "hsl(62 100% 52%)" : "hsl(0 0% 20%)",
                    border: "2px solid hsl(0 0% 4%)",
                    boxShadow: index <= activeItemIndex ? "0 0 12px hsl(62 100% 52% / 0.7)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] rounded-xl p-5 group hover-lift ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                  style={{
                    background: "hsl(0 0% 6%)",
                    border: "1px solid hsl(0 0% 14%)",
                    borderLeft: "3px solid hsl(62 100% 52% / 0.6)",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{
                    borderLeftColor: "hsl(62 100% 52%)",
                    boxShadow: "0 0 20px hsl(62 100% 52% / 0.1)",
                  }}
                >
                  {/* Time */}
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(62 100% 52%)" }} />
                    <span className="font-display font-bold text-xs uppercase tracking-wider"
                      style={{ color: "hsl(62 100% 52%)" }}>
                      {item.time}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base mb-2 group-hover:text-primary transition-colors">
                    {item.event}
                  </h3>

                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="font-body">{item.venue}</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
