import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Users, Trophy, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI & Robotics",
    description: "Explore cutting-edge artificial intelligence and robotics competitions that push the boundaries of technology.",
    color: "hsl(62 100% 52%)",
    colorDim: "hsl(62 100% 52% / 0.1)",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "24-hour coding marathons with industry-grade challenges and life-changing prizes.",
    color: "hsl(185 100% 50%)",
    colorDim: "hsl(185 100% 50% / 0.1)",
  },
  {
    icon: Users,
    title: "Workshops",
    description: "Learn from industry experts through immersive, hands-on technical workshops.",
    color: "hsl(300 100% 60%)",
    colorDim: "hsl(300 100% 60% / 0.1)",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Showcase your ideas and compete with the brightest minds from across the country.",
    color: "hsl(62 100% 52%)",
    colorDim: "hsl(62 100% 52% / 0.1)",
  },
];

const stats = [
  { value: 2000, suffix: "+", label: "Participants" },
  { value: 50,   suffix: "+", label: "Events" },
  { value: 5,    prefix: "₹", suffix: "L+", label: "Prize Pool" },
  { value: 2,    suffix: "",  label: "Intense Days" },
];

// Animated number counter
function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{prefix}{count}{suffix}</div>;
}

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 30% 50%, hsl(62 100% 52% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-tag mb-5 mx-auto">About the Festival</div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
            What is <span className="neon-text">SPANDAN?</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-2xl mx-auto text-lg leading-relaxed">
            SPANDAN 3.0 is the flagship technical festival that brings together
            innovators, hackers, and tech enthusiasts for two days of intense
            competition and learning.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-xl p-6 text-center hover-lift cursor-default"
              style={{
                background: "hsl(0 0% 6%)",
                border: "1px solid hsl(0 0% 14%)",
                transition: "all 0.3s ease",
              }}
              whileHover={{ borderColor: feature.color + "40" }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-[1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
              />

              {/* Icon */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: feature.colorDim,
                  border: `1px solid ${feature.color}30`,
                  boxShadow: `0 0 20px ${feature.color}10`,
                }}
              >
                <feature.icon
                  className="w-7 h-7 transition-all duration-300"
                  style={{ color: feature.color }}
                />
              </div>

              <h3 className="text-lg font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "hsl(0 0% 6%)",
            border: "1px solid hsl(62 100% 52% / 0.15)",
            boxShadow: "0 0 60px hsl(62 100% 52% / 0.05)",
          }}
        >
          {/* Glow strip at top */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(62 100% 52% / 0.5), transparent)" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/40">
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-10 px-6 text-center">
                <div
                  className="text-3xl md:text-4xl lg:text-5xl font-heading font-black mb-2"
                  style={{
                    background: "var(--gradient-neon)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 10px hsl(62 100% 52% / 0.4))",
                  }}
                >
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-display text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
