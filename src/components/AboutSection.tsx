import { motion } from "framer-motion";
import { Cpu, Users, Trophy, Zap } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI & Robotics",
    description: "Explore cutting-edge artificial intelligence and robotics competitions.",
  },
  {
    icon: Trophy,
    title: "Hackathons",
    description: "24-hour coding marathons with exciting prizes and challenges.",
  },
  {
    icon: Users,
    title: "Workshops",
    description: "Learn from industry experts through hands-on technical workshops.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Showcase your ideas and compete with the brightest minds.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            What is <span className="text-primary neon-text">SPANDAN?</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-2xl mx-auto text-lg">
            SPANDAN 3.0 is the flagship technical festival that brings together 
            innovators, hackers, and tech enthusiasts for two days of intense 
            competition and learning.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glow-card p-6 text-center hover-lift"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "2000+", label: "Participants" },
            { value: "50+", label: "Events" },
            { value: "₹5L+", label: "Prize Pool" },
            { value: "2", label: "Days" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-heading font-bold text-primary neon-text">
                {stat.value}
              </div>
              <div className="text-sm font-display text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
