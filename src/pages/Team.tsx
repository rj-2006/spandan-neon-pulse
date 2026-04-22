import { type CSSProperties, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Mail, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { teamMembers, departments, TeamMember } from "@/data/team";

const deptColors: Record<string, string> = {
  "Event Coordinators": "hsl(45 100% 55%)",
  "Devign": "hsl(185 100% 50%)",
  "Photography": "hsl(210 100% 56%)",
  "Discipline": "hsl(0 100% 60%)",
  "Volunteers": "hsl(280 100% 60%)",
};

const defaultTeamImagePosition = "center 36%";

const teamImagePositions: Record<string, string> = {
  "Aniket": "center 68%",
  "Anshika Rawat": "center 44%",
  "Aastha Joshi": "center 42%",
  "Gaurav Pal": "center 0%",
  "Harshit goswami": "center 34%",
  "Kriti Uniyal": "center 40%",
  "Mitali bijalwan": "center 42%",
  "Priyanshi Bisht": "center 40%",
  "Riya singh": "center 0%",
  "Ritik negi": "center 44%",
  "Shambhavi pandey": "center 44%",
  "Suhani Janoti": "center 0%",
  "Sucheta Singh": "center 8%",
};

const allStyles = `
@keyframes room105Bob {
  0%, 100% { transform: translateY(0) rotate(var(--room-tilt)); }
  50% { transform: translateY(-4px) rotate(var(--room-tilt)); }
}
.room105-card {
  isolation: isolate;
}
.room105-shell {
  background: hsl(0 0% 6%);
  border: 1px solid hsl(0 0% 14%);
  transition: border-color 260ms ease, box-shadow 260ms ease;
}
.room105-card:hover .room105-shell {
  border-color: hsl(185 100% 50% / 0.42);
  box-shadow: 0 16px 48px hsl(185 100% 50% / 0.12);
}
.room105-reveal {
  position: absolute;
  left: 50%;
  top: -92px;
  z-index: 0;
  width: min(112%, 330px);
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 22px);
  transition: opacity 180ms ease, transform 320ms cubic-bezier(0.2, 0.85, 0.25, 1);
  transition-delay: 0ms;
}
.room105-card:hover .room105-reveal {
  opacity: 1;
  transform: translate(-50%, 0);
  transition-delay: 1500ms;
}
.room105-bubble {
  width: max-content;
  max-width: 100%;
  margin: 0 auto 7px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid hsl(78 100% 50% / 0.34);
  background: hsl(0 0% 5% / 0.9);
  box-shadow: 0 8px 28px hsl(78 100% 50% / 0.12);
  color: hsl(78 100% 62%);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: lowercase;
}
.room105-row {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.28rem;
}
.room105-pal {
  --room-tilt: -2deg;
  width: 54px;
  height: 72px;
  position: relative;
  transform: translateY(14px) rotate(var(--room-tilt));
  filter: drop-shadow(0 10px 10px hsl(0 0% 0% / 0.28));
}
.room105-card:hover .room105-pal {
  animation: room105Bob 1.9s ease-in-out infinite;
  animation-delay: var(--room-delay);
}
.room105-head {
  position: absolute;
  left: 50%;
  top: 0;
  width: 38px;
  height: 38px;
  transform: translateX(-50%);
  border-radius: 44% 44% 48% 48%;
  background: hsl(34 92% 78%);
  border: 2px solid hsl(0 0% 4%);
  box-shadow: inset 0 -4px 0 hsl(24 85% 64% / 0.34);
}
.room105-head::before {
  content: "";
  position: absolute;
  inset: -5px -3px 22px;
  border-radius: 50% 50% 42% 42%;
  background: var(--room-hair);
  border: 2px solid hsl(0 0% 4%);
  border-bottom: 0;
}
.room105-eye {
  position: absolute;
  top: 20px;
  width: 4px;
  height: 6px;
  border-radius: 99px;
  background: hsl(0 0% 5%);
}
.room105-eye:first-of-type {
  left: 11px;
}
.room105-eye:last-of-type {
  right: 11px;
}
.room105-smile {
  position: absolute;
  left: 50%;
  top: 27px;
  width: 10px;
  height: 5px;
  transform: translateX(-50%);
  border-bottom: 2px solid hsl(0 0% 5%);
  border-radius: 0 0 999px 999px;
}
.room105-body {
  position: absolute;
  left: 50%;
  top: 34px;
  width: 34px;
  height: 28px;
  transform: translateX(-50%);
  border-radius: 11px 11px 8px 8px;
  background: linear-gradient(180deg, var(--room-shirt), hsl(0 0% 8%));
  border: 2px solid hsl(0 0% 4%);
}
.room105-name {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  padding: 2px 6px;
  border-radius: 999px;
  background: hsl(0 0% 4%);
  border: 1px solid var(--room-shirt);
  color: hsl(0 0% 96%);
  font-family: var(--font-display);
  font-size: 0.55rem;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
}
`;

const room105Mates = [
  { name: "rahul", shirt: "hsl(185 100% 48%)", hair: "hsl(18 45% 16%)", tilt: "-5deg" },
  { name: "kamal", shirt: "hsl(78 100% 48%)", hair: "hsl(0 0% 12%)", tilt: "3deg" },
  { name: "vaibhav", shirt: "hsl(320 100% 60%)", hair: "hsl(32 42% 18%)", tilt: "-2deg" },
  { name: "priyanshu", shirt: "hsl(45 100% 55%)", hair: "hsl(0 0% 8%)", tilt: "5deg" },
];

const MemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const accentColor = deptColors[member.department] || "hsl(78 100% 50%)";
  const showCaptions = member.department === "Devign";
  const disableExternalSocials = member.department === "Devign";
  const isRahul = member.department === "Devign" && member.name === ["Rahul", "Joshi"].join(" ");
  const imagePosition = teamImagePositions[member.name] || defaultTeamImagePosition;
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className={`group relative rounded-2xl hover-lift ${isRahul ? "room105-card overflow-visible" : "overflow-hidden"}`}
      style={{
        background: isRahul ? "transparent" : "hsl(0 0% 6%)",
        border: isRahul ? "none" : "1px solid hsl(0 0% 14%)",
      }}
      whileHover={{
        borderColor: isRahul ? undefined : accentColor + "35",
        boxShadow: isRahul ? undefined : `0 0 40px ${accentColor}0D`,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isRahul && (
        <div className="room105-reveal" aria-hidden="true">
          <div className="room105-bubble">room 105 says hi</div>
          <div className="room105-row">
            {room105Mates.map((mate, mateIndex) => (
              <div
                key={mate.name}
                className="room105-pal"
                style={{
                  "--room-shirt": mate.shirt,
                  "--room-hair": mate.hair,
                  "--room-tilt": mate.tilt,
                  "--room-delay": `${1500 + mateIndex * 85}ms`,
                } as CSSProperties}
              >
                <div className="room105-head">
                  <span className="room105-eye" />
                  <span className="room105-eye" />
                  <span className="room105-smile" />
                </div>
                <div className="room105-body" />
                <div className="room105-name">{mate.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div
        className={isRahul ? "room105-shell relative z-10 rounded-2xl overflow-hidden" : "contents"}
      >
      {/* Top accent line */}
      <div
        className="absolute top-0 inset-x-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Image area */}
      <div className="relative h-56 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{
              objectPosition: imagePosition,
              ...(isRahul ? { filter: "contrast(1.06) brightness(1.04) saturate(1.08)" } : {}),
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
            style={{
              background:
                `radial-gradient(circle at 50% 36%, ${accentColor}24, transparent 34%), ` +
                "linear-gradient(145deg, hsl(0 0% 11%), hsl(0 0% 4%))",
            }}
          >
            <span
              className="font-heading text-5xl font-black"
              style={{
                color: accentColor,
                textShadow: `0 0 24px ${accentColor}55`,
              }}
            >
              {initials}
            </span>
          </div>
        )}
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
            href={disableExternalSocials ? "#" : member.linkedin}
            target={disableExternalSocials ? undefined : "_blank"}
            rel={disableExternalSocials ? undefined : "noopener noreferrer"}
            title="LinkedIn"
            aria-disabled={disableExternalSocials}
            onClick={(e) => {
              e.stopPropagation();
              if (disableExternalSocials) e.preventDefault();
            }}
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
            href={disableExternalSocials ? "#" : member.instagram}
            target={disableExternalSocials ? undefined : "_blank"}
            rel={disableExternalSocials ? undefined : "noopener noreferrer"}
            title="Instagram"
            aria-disabled={disableExternalSocials}
            onClick={(e) => {
              e.stopPropagation();
              if (disableExternalSocials) e.preventDefault();
            }}
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
      <div className="relative z-10 p-5">
        <h3 className="font-heading font-bold text-base mb-0.5 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        {showCaptions && (
          <p className="font-display text-sm font-medium" style={{ color: accentColor }}>
            {member.role}
          </p>
        )}
      </div>
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
      <style>{allStyles}</style>
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
            {["All", ...departments].map((dept) => {
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
                      {/* Member count removed */}
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
