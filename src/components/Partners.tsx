import { motion } from "framer-motion";

const partners = [
  { name: "TechCorp", logo: "TC", color: "hsl(78 100% 50%)" },
  { name: "InnovateLabs", logo: "IL", color: "hsl(185 100% 50%)" },
  { name: "FutureTech", logo: "FT", color: "hsl(300 100% 60%)" },
  { name: "CodeBase", logo: "CB", color: "hsl(78 100% 50%)" },
  { name: "AI Solutions", logo: "AI", color: "hsl(185 100% 50%)" },
  { name: "RoboTech", logo: "RT", color: "hsl(300 100% 60%)" },
  { name: "DataFlow", logo: "DF", color: "hsl(78 100% 50%)" },
  { name: "CloudSpark", logo: "CS", color: "hsl(185 100% 50%)" },
];

// Duplicated for seamless infinite loop
const allPartners = [...partners, ...partners];

const Partners = () => {
  return (
    <section id="partners" className="py-24 md:py-36 relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 60%, hsl(185 100% 50% / 0.04) 0%, transparent 55%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="section-tag mb-5 mx-auto">Sponsors & Partners</div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5">
            Our <span className="neon-text">Partners</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-xl mx-auto text-lg">
            Proudly supported by leading tech companies and organizations who share our vision.
          </p>
        </motion.div>

        {/* Marquee Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="marquee-wrapper mb-12"
        >
          <div className="marquee-track">
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-xl cursor-default"
                style={{
                  background: "hsl(0 0% 6%)",
                  border: "1px solid hsl(0 0% 14%)",
                  minWidth: "180px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = partner.color + "40";
                  e.currentTarget.style.boxShadow = `0 0 20px ${partner.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(0 0% 14%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: partner.color + "15", border: `1px solid ${partner.color}30` }}
                >
                  <span
                    className="text-sm font-heading font-bold"
                    style={{ color: partner.color }}
                  >
                    {partner.logo}
                  </span>
                </div>
                <span className="font-display font-semibold text-sm text-foreground/80 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground font-display mb-4">
            Interested in partnering with us?
          </p>
          <a
            href="mailto:partners@spandan.tech"
            className="inline-flex items-center gap-2 font-display font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300"
            style={{
              background: "hsl(78 100% 50% / 0.08)",
              border: "1px solid hsl(78 100% 50% / 0.2)",
              color: "hsl(78 100% 50%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(78 100% 50% / 0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(78 100% 50% / 0.5)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px hsl(78 100% 50% / 0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(78 100% 50% / 0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(78 100% 50% / 0.2)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Become a Partner →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
