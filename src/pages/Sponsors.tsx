import { motion } from "framer-motion";
import { ExternalLink, Award, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sponsors, tierConfig, Sponsor } from "@/data/sponsors";

type Tier = "platinum" | "gold" | "silver" | "bronze";

const tierOrder: Tier[] = ["platinum", "gold", "silver", "bronze"];

// ── Platinum Card (large) ──
const PlatinumCard = ({ sponsor, index }: { sponsor: Sponsor; index: number }) => {
  const cfg = tierConfig.platinum;
  return (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl p-8 flex flex-col items-center text-center hover-lift cursor-pointer"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        transition: "all 0.35s ease",
      }}
      whileHover={{ boxShadow: cfg.glow, borderColor: cfg.color + "50" }}
    >
      {/* Glow blob */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${cfg.color}08, transparent 70%)` }}
      />
      {/* Top line */}
      <div
        className="absolute top-0 inset-x-8 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}70, transparent)` }}
      />

      {/* Logo circle */}
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
        style={{ background: cfg.bg, border: `2px solid ${cfg.border}` }}
      >
        <span className="text-4xl font-heading font-black" style={{ color: cfg.color }}>
          {sponsor.logo}
        </span>
      </div>

      <h3 className="font-heading font-black text-2xl mb-3 group-hover:text-primary transition-colors">
        {sponsor.name}
      </h3>
      <p className="text-muted-foreground font-display text-sm mb-5 max-w-xs leading-relaxed">
        {sponsor.tagline}
      </p>
      <div
        className="flex items-center gap-2 text-xs font-display font-semibold px-4 py-2 rounded-full transition-all"
        style={{ background: cfg.color + "15", color: cfg.color }}
      >
        <ExternalLink className="w-3 h-3" />
        Visit Website
      </div>
    </motion.a>
  );
};

// ── General Sponsor Card ──
const SponsorCard = ({ sponsor, index, tier }: { sponsor: Sponsor; index: number; tier: Tier }) => {
  const cfg = tierConfig[tier];
  return (
    <motion.a
      href={sponsor.website}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative rounded-xl p-6 flex flex-col items-center text-center hover-lift cursor-pointer"
      style={{
        background: "hsl(0 0% 6%)",
        border: `1px solid hsl(0 0% 14%)`,
        transition: "all 0.35s ease",
      }}
      whileHover={{
        borderColor: cfg.color + "35",
        boxShadow: cfg.glow,
      }}
    >
      <div
        className="absolute top-0 inset-x-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }}
      />

      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <span className="text-2xl font-heading font-black" style={{ color: cfg.color }}>
          {sponsor.logo}
        </span>
      </div>

      <h3 className="font-heading font-bold text-base mb-1.5 group-hover:text-primary transition-colors">
        {sponsor.name}
      </h3>
      <p className="text-muted-foreground font-body text-xs mb-4 leading-relaxed line-clamp-2">
        {sponsor.tagline}
      </p>
      <div
        className="flex items-center gap-1.5 text-xs font-display font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: cfg.color }}
      >
        <ExternalLink className="w-3 h-3" />
        Visit
      </div>
    </motion.a>
  );
};

const TierBadge = ({ tier }: { tier: Tier }) => {
  const cfg = tierConfig[tier];
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-widest"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
    >
      <Award className="w-3 h-3" />
      {cfg.label} Sponsors
    </div>
  );
};

const Sponsors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-28 md:pt-36 pb-16 relative cyber-grid overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0 0% 3% / 0.5), hsl(0 0% 3%))," +
              "radial-gradient(ellipse 70% 50% at 50% 40%, hsl(185 100% 50% / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Orbs */}
        <div
          className="absolute -top-20 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "hsl(185 100% 50%)", filter: "blur(120px)", opacity: 0.05 }}
        />
        <div
          className="absolute bottom-0 left-10 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "hsl(78 100% 50%)", filter: "blur(100px)", opacity: 0.05 }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-tag mb-5 mx-auto">
              <Handshake className="w-3 h-3" /> Powering Spandan 3.0
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-5">
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(185 100% 50%), hsl(78 100% 50%))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px hsl(185 100% 50% / 0.3))",
                }}
              >
                Sponsors
              </span>
            </h1>
            <p className="text-muted-foreground font-display text-lg max-w-xl mx-auto mb-8">
              Visionary companies making Spandan 3.0 possible. We thank every partner who believes
              in the power of student innovation.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { value: `${sponsors.length}+`, label: "Sponsors" },
                { value: "₹5L+", label: "Prize Pool" },
                { value: "2000+", label: "Participants Reached" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-heading font-black neon-text">{s.value}</div>
                  <div className="text-xs font-display text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tier Sections ── */}
      <div className="container mx-auto px-4 pb-24 space-y-20">
        {tierOrder.map((tier) => {
          const tierSponsors = sponsors.filter((s) => s.tier === tier);
          if (!tierSponsors.length) return null;

          const isPlatinum = tier === "platinum";
          const cols = {
            platinum: "grid-cols-1 md:grid-cols-2",
            gold: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            silver: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
            bronze: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          }[tier];

          return (
            <section key={tier}>
              {/* Section header */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center mb-10"
              >
                <TierBadge tier={tier} />

                {/* Divider */}
                <div
                  className="mt-5 w-24 h-[1px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tierConfig[tier].color}, transparent)`,
                  }}
                />
              </motion.div>

              <div className={`grid ${cols} gap-5`}>
                {tierSponsors.map((sponsor, i) =>
                  isPlatinum ? (
                    <PlatinumCard key={sponsor.name} sponsor={sponsor} index={i} />
                  ) : (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} index={i} tier={tier} />
                  )
                )}
              </div>
            </section>
          );
        })}

        {/* ── Become a Sponsor CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden text-center py-16 px-8"
          style={{
            background: "hsl(0 0% 5%)",
            border: "1px solid hsl(78 100% 50% / 0.15)",
          }}
        >
          {/* Glows */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "hsl(78 100% 50%)", filter: "blur(80px)", opacity: 0.06 }}
          />
          <div
            className="absolute top-0 inset-x-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, hsl(78 100% 50% / 0.4), transparent)" }}
          />

          <div className="relative z-10">
            <div className="section-tag mb-5 mx-auto">Partner With Us</div>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
              Become a <span className="neon-text">Sponsor</span>
            </h2>
            <p className="text-muted-foreground font-display text-lg max-w-xl mx-auto mb-8">
              Reach 2000+ of India's brightest tech students and position your brand at the
              forefront of innovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:sponsors@spandan.tech"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-bold text-sm transition-all duration-300"
                style={{
                  background: "var(--gradient-neon)",
                  color: "hsl(0 0% 4%)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px hsl(78 100% 50% / 0.4)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
              >
                <Handshake className="w-4 h-4" />
                Partner With Us
              </a>
              <a
                href="mailto:sponsors@spandan.tech"
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm transition-all duration-300"
                style={{
                  background: "hsl(0 0% 8%)",
                  border: "1px solid hsl(0 0% 18%)",
                  color: "hsl(0 0% 70%)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(78 100% 50% / 0.3)";
                  el.style.color = "hsl(78 100% 50%)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "hsl(0 0% 18%)";
                  el.style.color = "hsl(0 0% 70%)";
                }}
              >
                Download Brochure
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
};

export default Sponsors;
