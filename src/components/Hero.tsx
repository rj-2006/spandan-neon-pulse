import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import heroImage from "@/assets/hero-robot.png";
import { useAuthStore } from "@/store/authStore";

const Hero = () => {
  const { isAuthenticated } = useAuthStore();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const registerHref = isAuthenticated ? "/register" : "/signup";

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid scanlines"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Gradient Overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 40%, hsl(78 100% 50% / 0.07) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 40% at 20% 70%, hsl(185 100% 50% / 0.05) 0%, transparent 50%), " +
            "linear-gradient(180deg, hsl(0 0% 3%) 0%, transparent 40%, hsl(0 0% 3%) 100%)",
        }}
      />

      {/* ── Orb Blobs ── */}
      <div className="orb orb-yellow absolute w-80 h-80 -top-20 -right-20 opacity-[0.12]" />
      <div className="orb orb-cyan absolute w-60 h-60 bottom-20 left-10 opacity-[0.08]" />
      <div className="orb orb-magenta absolute w-40 h-40 top-1/3 left-1/4 opacity-[0.06]" />

      {/* ── Hero Robot Image & 3D Model ── */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-auto hidden lg:block"
      >
        <img
          src={heroImage}
          alt="Futuristic Robot — Spandan 3.0"
          className="w-full h-auto object-contain pointer-events-none relative z-0"
          style={{
            opacity: 0.35,
            filter: "drop-shadow(0 0 40px hsl(78 100% 50% / 0.2)) drop-shadow(0 0 80px hsl(185 100% 50% / 0.1))",
          }}
        />
        <model-viewer
          src="/spanlogo.glb"
          auto-rotate
          rotation-per-second="30deg"
          style={{
            position: "absolute",
            top: "-55%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "45%",
            height: "45%",
            zIndex: 10,
            pointerEvents: "none",
            backgroundColor: "transparent"
          }}
        ></model-viewer>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-36 pb-20">
        <div className="max-w-3xl mx-auto lg:mx-0 lg:max-w-2xl text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "hsl(78 100% 50% / 0.08)",
              border: "1px solid hsl(78 100% 50% / 0.2)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-display font-semibold text-primary/90 uppercase tracking-widest">
              May 1–3, 2026 &bull; College Campus
            </span>
          </motion.div>

          {/* Main Title */}
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black leading-none tracking-tight">
              <motion.span
                className="neon-shimmer neon-text inline-block"
                data-text="SPANDAN"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "clip-path" }}
              >
                SPANDAN
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl inline-block"
                style={{
                  background: "var(--gradient-neon)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px hsl(78 100% 50% / 0.5))",
                }}
              >
                3.0
              </motion.span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl font-display text-muted-foreground mb-3 max-w-lg"
          >
            The Ultimate Tech Festival — Where{" "}
            <span className="text-foreground font-semibold">Innovation</span> Meets{" "}
            <span className="text-foreground font-semibold">Competition.</span>
          </motion.p>

          {/* Theme line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="font-display font-semibold text-sm md:text-base mb-8 max-w-lg"
            style={{
              background: "var(--gradient-neon)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 12px hsl(78 100% 50% / 0.35))",
            }}
          >
            ✦ Engineering the Rhythm of a Greener World
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
          >
            {["AI", "Robotics", "Hackathons", "Sustainability", "Design"].map((tag, i) => (
              <span
                key={tag}
                className="section-tag"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10"
          >
            <p className="text-xs font-display text-muted-foreground mb-4 uppercase tracking-[0.2em] text-center lg:text-left">
              Event Starts In
            </p>
            <div className="flex justify-center lg:justify-start w-full">
              <CountdownTimer />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button
              size="lg"
              asChild
              className="font-display font-bold text-base px-8 h-12 pulse-glow relative overflow-hidden group"
              style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
            >
              <Link to={registerHref} id="hero-register-btn">
                <span className="relative z-10 flex items-center">
                  Register Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="font-display font-medium text-base px-8 h-12 border-white/15 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
            >
              <Link to="/events">
                Explore Events
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs font-display text-muted-foreground/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
