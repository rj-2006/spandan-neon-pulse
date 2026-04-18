import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Team", href: "/team" },
  { name: "Sponsors", href: "/sponsors" },
  { name: "Timeline", href: "/#timeline" },
  { name: "About", href: "/#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  const handleRegisterClick = () => {
    setIsOpen(false);
    navigate(isAuthenticated ? "/register" : "/signup");
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]) && !href.includes("#");
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-2xl border-b border-primary/10 shadow-[0_1px_30px_hsl(62_100%_52%/0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14" : "h-16 md:h-20"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/spandan-logo.png"
              alt="Spandan '26 — Engineering the Rhythm of a Greener World"
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
              style={{ filter: "drop-shadow(0 0 8px hsl(78 100% 50% / 0.3))" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const inner = (
                <span className={`relative px-4 py-2 rounded-lg font-display text-sm tracking-wide transition-all duration-300 ${
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}>
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-primary/8 rounded-lg border border-primary/20"
                      style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.1)" }}
                    />
                  )}
                </span>
              );
              return link.href.includes("#") ? (
                <HashLink key={link.name} to={link.href} smooth>{inner}</HashLink>
              ) : (
                <Link key={link.name} to={link.href}>{inner}</Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="font-display font-semibold tracking-wide border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-all"
                    style={{ boxShadow: "0 0 12px hsl(78 100% 50% / 0.1)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                    {user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "Profile"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-2xl border-border/50">
                  <DropdownMenuLabel className="font-display text-muted-foreground">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/register")}
                    className="font-display cursor-pointer"
                  >
                    Register for Event
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive cursor-pointer font-display"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="font-display font-semibold tracking-wide text-foreground/80 hover:text-foreground"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </Button>
                <Button
                  className="font-display font-bold tracking-wide pulse-glow"
                  onClick={handleRegisterClick}
                  style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)" }}
                >
                  Register Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-primary/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.href.includes("#") ? (
                    <HashLink
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-display text-base text-foreground/80 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-primary/5"
                      smooth
                    >
                      {link.name}
                    </HashLink>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block font-display text-base text-foreground/80 hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-primary/5"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="font-display border-primary/30 text-primary"
                      onClick={() => { setIsOpen(false); navigate("/register"); }}
                    >
                      My Registrations
                    </Button>
                    <Button
                      variant="ghost"
                      className="font-display text-destructive"
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="font-display"
                      onClick={() => { setIsOpen(false); navigate("/login"); }}
                    >
                      Log in
                    </Button>
                    <Button
                      className="font-display font-bold"
                      onClick={handleRegisterClick}
                      style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)" }}
                    >
                      Register Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
