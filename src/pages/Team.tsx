import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamMembers, departments, TeamMember } from "@/data/team";

const deptColors: Record<string, string> = {
  "Event Coordinators": "hsl(45 100% 55%)",
  "Devign": "hsl(300 100% 60%)",
  "Art nd Craft": "hsl(330 100% 60%)",
  "Photography": "hsl(210 100% 56%)",
  "Tech Team": "hsl(185 100% 50%)",
  "Management": "hsl(78 100% 50%)",
  "Discipline": "hsl(0 100% 60%)",
};

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const accentColor = deptColors[member.department] || "hsl(78 100% 50%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative rounded-2xl overflow-hidden hover-lift"
      style={{
        background: "hsl(0 0% 6%)",
        border: "1px solid hsl(0 0% 14%)",
        transition: "all 0.35s ease",
      }}
      whileHover={{
        borderColor: accentColor + "35",
        boxShadow: `0 0 40px ${accentColor}0D`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Image area */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(0 0% 6%) 0%, hsl(0 0% 6% / 0.3) 50%, transparent 100%)`,
          }}
        />

        {/* Social links — slide up on hover */}
        <motion.div
          className="absolute bottom-4 inset-x-0 flex justify-center gap-2.5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <a
            href={`mailto:${member.email}`}
            onClick={(e) => e.stopPropagation()}
            title={`Email ${member.name}`}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "hsl(0 0% 0% / 0.7)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = accentColor + "80")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 100% / 0.15)")}
          >
            <Mail className="w-4 h-4 text-foreground/80" />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "hsl(0 0% 0% / 0.7)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(210 100% 56% / 0.8)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 100% / 0.15)")}
          >
            <Linkedin className="w-4 h-4 text-foreground/80" />
          </a>
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "hsl(0 0% 0% / 0.7)",
              border: "1px solid hsl(0 0% 100% / 0.15)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(330 100% 60% / 0.8)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 100% / 0.15)")}
          >
            <Instagram className="w-4 h-4 text-foreground/80" />
          </a>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-base mb-0.5 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="font-display text-sm font-medium mb-3" style={{ color: accentColor }}>
          {member.role}
        </p>
        {/* Email shown */}
        <p className="text-xs font-body text-muted-foreground truncate">{member.email}</p>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [activeDept, setActiveDept] = useState("All");

  const filtered =
    activeDept === "All"
      ? teamMembers
      : teamMembers.filter((m) => m.department === activeDept);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-28 md:pt-36 pb-12 relative cyber-grid overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0 0% 3% / 0.4), hsl(0 0% 3%))," +
              "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(78 100% 50% / 0.05) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-tag mb-5 mx-auto">
              <Users className="w-3 h-3" /> Behind Spandan 3.0
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-5">
              Meet the{" "}
              <span
                style={{
                  background: "var(--gradient-neon)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px hsl(78 100% 50% / 0.4))",
                }}
              >
                Team
              </span>
            </h1>
            <p className="text-muted-foreground font-display text-lg max-w-xl mx-auto">
              The passionate minds who work tirelessly to bring Spandan 3.0 to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Department Filter ── */}
      <div
        className="sticky top-14 z-40 border-b"
        style={{
          background: "hsl(0 0% 4% / 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "hsl(0 0% 12%)",
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            {departments.map((dept) => {
              const active = activeDept === dept;
              const color = dept === "All" ? "hsl(78 100% 50%)" : deptColors[dept] || "hsl(78 100% 50%)";
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className="px-4 py-1.5 rounded-full font-display text-xs whitespace-nowrap transition-all duration-200 shrink-0"
                  style={{
                    background: active ? color : "hsl(0 0% 9%)",
                    color: active ? "hsl(0 0% 4%)" : "hsl(0 0% 60%)",
                    border: active ? "none" : "1px solid hsl(0 0% 16%)",
                    fontWeight: active ? 700 : 500,
                    boxShadow: active ? `0 0 12px ${color}55` : "none",
                  }}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          {/* Group by department */}
          <AnimatePresence mode="wait">
            {activeDept === "All" ? (
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Array.from(new Set(teamMembers.map((m) => m.department))).map((dept) => (
                  <div key={dept} className="mb-16">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 mb-8"
                    >
                      <div
                        className="w-1 h-6 rounded-full"
                        style={{ background: deptColors[dept] || "hsl(78 100% 50%)" }}
                      />
                      <h2 className="font-heading font-bold text-lg" style={{ color: deptColors[dept] }}>
                        {dept}
                      </h2>
                      <span className="text-xs font-display text-muted-foreground">
                        ({teamMembers.filter((m) => m.department === dept).length} members)
                      </span>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {teamMembers
                        .filter((m) => m.department === dept)
                        .map((member, i) => (
                          <MemberCard key={member.name} member={member} index={i} />
                        ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={activeDept}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs font-display text-muted-foreground mb-8">
                  <span className="text-primary font-semibold">{filtered.length}</span> members in{" "}
                  <span className="text-foreground font-semibold">{activeDept}</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filtered.map((member, i) => (
                    <MemberCard key={member.name} member={member} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
