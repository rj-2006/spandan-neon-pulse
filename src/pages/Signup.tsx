import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const perks = [
  "Register for 50+ technical events",
  "Track your event registrations",
  "Get priority notifications & updates",
  "Access exclusive workshop resources",
];

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect already-logged-in users
  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.register({ name, email, password });
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden relative">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, hsl(78 100% 50% / 0.06) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 20% 30%, hsl(185 100% 50% / 0.04) 0%, transparent 50%)",
        }}
      />

      {/* ── Left panel (form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="inline-block mb-8 lg:hidden">
            <img
              src="/spandan-logo.png"
              alt="Spandan '26"
              className="h-9 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 6px hsl(78 100% 50% / 0.3))" }}
            />
          </Link>

          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(0 0% 6%)",
              border: "1px solid hsl(78 100% 50% / 0.15)",
              boxShadow: "0 0 60px hsl(78 100% 50% / 0.04)",
            }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-heading font-black mb-2">Create account</h1>
              <p className="text-muted-foreground font-display text-sm">
                Join Spandan 3.0 and compete with the best
              </p>
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full mb-5 font-display font-semibold flex items-center justify-center gap-3 h-11 border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all"
              onClick={authAPI.googleAuth}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign up with Google
            </Button>

            {/* Divider */}
            <div className="relative flex items-center mb-5">
              <div className="flex-1 h-px" style={{ background: "hsl(0 0% 14%)" }} />
              <span className="px-3 text-xs font-display text-muted-foreground/60 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px" style={{ background: "hsl(0 0% 14%)" }} />
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 font-display bg-secondary/40 border-border/60 focus:border-primary/60 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 font-display bg-secondary/40 border-border/60 focus:border-primary/60 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="font-display text-xs uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 font-display bg-secondary/40 border-border/60 focus:border-primary/60 transition-all pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 mt-2 font-display font-bold text-sm gap-2"
                style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
                disabled={loading}
              >
                {loading ? "Creating account..." : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground font-display mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Right panel (branding) ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-col justify-between w-[45%] p-14 relative z-10"
        style={{ borderLeft: "1px solid hsl(78 100% 50% / 0.1)" }}
      >
        {/* Logo */}
        <Link to="/" className="inline-block group">
          <img
            src="/spandan-logo.png"
            alt="Spandan '26"
            className="h-10 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
            style={{ filter: "drop-shadow(0 0 8px hsl(78 100% 50% / 0.3))" }}
          />
        </Link>

        {/* Center */}
        <div>
          <div className="section-tag mb-6">Join 2000+ participants</div>
          <h2 className="text-4xl xl:text-5xl font-heading font-black mb-6 leading-tight">
            Your journey to{" "}
            <span
              style={{
                background: "var(--gradient-neon)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              greatness
            </span>{" "}
            starts here.
          </h2>
          <p className="text-muted-foreground font-display text-lg leading-relaxed max-w-sm mb-10">
            Create your account and unlock access to the biggest tech festival of the year.
          </p>

          {/* Perks */}
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-primary" />
                <span className="font-display text-sm text-foreground/80">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-body">
          © 2026 SPANDAN 3.0. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
