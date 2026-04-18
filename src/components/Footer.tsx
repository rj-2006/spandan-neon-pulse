import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Twitter, Mail, MapPin, Zap, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hsl(330 100% 60%)" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hsl(200 100% 55%)" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hsl(210 100% 56%)" },
  { icon: Github, href: "#", label: "GitHub", color: "hsl(0 0% 80%)" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Timeline", href: "/#timeline" },
  { name: "About", href: "/#about" },
  { name: "Partners", href: "/#partners" },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "hsl(0 0% 3%)",
        borderTop: "1px solid hsl(62 100% 52% / 0.1)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(62 100% 52% / 0.4), transparent)" }}
      />

      {/* Orb bg accent */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "hsl(62 100% 52%)",
          filter: "blur(100px)",
          opacity: 0.03,
        }}
      />

      <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">

          {/* Brand — wider col */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all group-hover:border-primary/60"
                style={{
                  background: "hsl(62 100% 52% / 0.1)",
                  border: "1px solid hsl(62 100% 52% / 0.25)",
                }}
              >
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-2xl font-heading font-black neon-text tracking-wider">SPANDAN</span>
              <span className="text-sm font-display text-primary/50 font-bold">3.0</span>
            </Link>

            <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed mb-6">
              The ultimate technical festival bringing together innovators, hackers, and tech
              enthusiasts for two days of intense competition and learning.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <a
                href="mailto:contact@spandan.tech"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0 text-primary/60 group-hover:text-primary" />
                <span className="font-body">contact@spandan.tech</span>
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 text-primary/60" />
                <span className="font-body">College Campus, City, State</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3
              className="font-heading font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: "hsl(62 100% 52%)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm font-display text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div className="md:col-span-4">
            <h3
              className="font-heading font-bold text-xs uppercase tracking-widest mb-5"
              style={{ color: "hsl(62 100% 52%)" }}
            >
              Follow Us
            </h3>
            <div className="flex gap-2.5 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "hsl(0 0% 9%)",
                    border: "1px solid hsl(0 0% 16%)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = social.color + "18";
                    el.style.borderColor = social.color + "50";
                    el.style.boxShadow = `0 0 16px ${social.color}25`;
                    el.style.transform = "translateY(-2px)";
                    el.querySelector("svg")!.style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "hsl(0 0% 9%)";
                    el.style.borderColor = "hsl(0 0% 16%)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                    el.querySelector("svg")!.style.color = "hsl(0 0% 60%)";
                  }}
                >
                  <social.icon className="w-4 h-4 transition-colors" style={{ color: "hsl(0 0% 60%)" }} />
                </a>
              ))}
            </div>

            {/* Newsletter / partner CTA */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "hsl(62 100% 52% / 0.05)",
                border: "1px solid hsl(62 100% 52% / 0.12)",
              }}
            >
              <p className="text-xs font-display font-semibold text-foreground/80 mb-1">
                Become a partner
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Reach 2000+ students and innovators.
              </p>
              <a
                href="mailto:partners@spandan.tech"
                className="inline-flex items-center gap-1 text-xs font-display font-bold transition-all"
                style={{ color: "hsl(62 100% 52%)" }}
              >
                Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid hsl(0 0% 10%)" }}
        >
          <p className="text-muted-foreground text-xs font-body">
            © 2026 SPANDAN 3.0. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground font-body">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-muted/30">·</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
