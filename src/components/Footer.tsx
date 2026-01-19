import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
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
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-heading font-bold text-primary neon-text">
                SPANDAN
              </span>
              <span className="text-sm font-display text-muted-foreground ml-1">
                3.0
              </span>
            </Link>
            <p className="text-muted-foreground font-body text-sm max-w-sm mb-6">
              The ultimate technical festival bringing together innovators, 
              hackers, and tech enthusiasts for two days of intense competition 
              and learning experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-body">contact@spandan.tech</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-body">College Campus, City, State</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-display text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © 2026 SPANDAN 3.0. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground font-body">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
