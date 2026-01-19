import { motion } from "framer-motion";

const partners = [
  { name: "TechCorp", logo: "TC" },
  { name: "InnovateLabs", logo: "IL" },
  { name: "FutureTech", logo: "FT" },
  { name: "CodeBase", logo: "CB" },
  { name: "AI Solutions", logo: "AI" },
  { name: "RoboTech", logo: "RT" },
];

const Partners = () => {
  return (
    <section id="partners" className="py-20 md:py-32 relative bg-secondary/20">
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
            Our <span className="text-primary neon-text">Partners</span>
          </h2>
          <p className="text-muted-foreground font-display max-w-xl mx-auto">
            Proudly supported by leading tech companies and organizations.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover-lift group"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {partner.logo}
                  </span>
                </div>
                <span className="text-sm font-display text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground font-display mb-4">
            Interested in partnering with us?
          </p>
          <a
            href="mailto:partners@spandan.tech"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-display font-semibold transition-colors"
          >
            Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
