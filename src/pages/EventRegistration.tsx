import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, CheckCircle2, User, BookOpen, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { eventsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const eventOptions = [
  "GreenHack: Code for Impact",
  "AlgoRhythm",
  "AI Foresight",
  "BridgeIt",
  "TechScape Hunt",
  "GeoCraft Arena",
  "NetRunnerz",
  "EcoInnovate",
  "DesignForge",
  "Circuit Chase",
  "WALL-E",
];

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-display font-semibold uppercase tracking-widest text-muted-foreground mb-2">
    {children}
  </label>
);

const FieldGroup = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className="rounded-xl p-6"
    style={{ background: "hsl(0 0% 6%)", border: "1px solid hsl(0 0% 14%)" }}
  >
    <div className="flex items-center gap-2.5 mb-5 pb-4" style={{ borderBottom: "1px solid hsl(0 0% 11%)" }}>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "hsl(78 100% 50% / 0.1)", border: "1px solid hsl(78 100% 50% / 0.2)" }}
      >
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h2 className="font-heading font-bold text-sm uppercase tracking-wider">{title}</h2>
    </div>
    <div className="space-y-5">{children}</div>
  </div>
);

const StyledInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <Input
    {...props}
    className="h-11 font-display text-sm bg-transparent transition-all"
    style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 18%)" }}
    onFocus={(e) => {
      e.target.style.borderColor = "hsl(78 100% 50% / 0.5)";
      e.target.style.boxShadow = "0 0 0 3px hsl(78 100% 50% / 0.07)";
    }}
    onBlur={(e) => {
      e.target.style.borderColor = "hsl(0 0% 18%)";
      e.target.style.boxShadow = "none";
    }}
  />
);

const EventRegistration = () => {
  const [searchParams] = useSearchParams();
  const preSelectedEvent = searchParams.get("event") || "";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    year: "",
    event: preSelectedEvent,
    teamLeader: "",
    teamMembers: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await eventsAPI.registerParticipant(formData);
      setSubmitted(true);
      toast({
        title: "Registration Successful! 🎉",
        description: `You've registered for ${formData.event}. See you on May 1–3!`,
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: err.response?.data?.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Success state ──
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 20 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "hsl(78 100% 50% / 0.1)",
                border: "2px solid hsl(78 100% 50% / 0.4)",
                boxShadow: "0 0 40px hsl(78 100% 50% / 0.2)",
              }}
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-heading font-black mb-3 neon-text">
              You're In!
            </h1>
            <p className="text-muted-foreground font-display mb-2">
              Successfully registered for
            </p>
            <p className="text-foreground font-heading font-bold text-xl mb-8">
              {formData.event}
            </p>
            <div
              className="rounded-xl p-4 mb-8 text-sm font-display text-muted-foreground"
              style={{ background: "hsl(78 100% 50% / 0.06)", border: "1px solid hsl(78 100% 50% / 0.15)" }}
            >
              📅 Mark your calendar — <span className="text-foreground font-semibold">May 1–3, 2026</span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 font-display border-border/50 hover:border-primary/40"
                onClick={() => navigate("/events")}
              >
                Browse More Events
              </Button>
              <Button
                className="flex-1 font-display font-bold"
                style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
                onClick={() => { setSubmitted(false); setFormData({ name: "", branch: "", year: "", event: "", teamLeader: "", teamMembers: "" }); }}
              >
                Register Another
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-50" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, hsl(78 100% 50% / 0.05) 0%, transparent 60%)",
        }}
      />

      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-28 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mx-auto"
        >
          {/* Back */}
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 text-sm font-display text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="section-tag mb-4">May 1–3, 2026</div>
            <h1 className="text-3xl md:text-4xl font-heading font-black mb-2">
              Event <span className="neon-text">Registration</span>
            </h1>
            <p className="text-muted-foreground font-display text-sm">
              Fill out the details below to secure your spot at Spandan 3.0.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <FieldGroup icon={User} title="Personal Information">
              <div>
                <FormLabel>Full Name *</FormLabel>
                <StyledInput
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Branch *</FormLabel>
                  <StyledInput
                    id="branch"
                    name="branch"
                    required
                    placeholder="e.g. Computer Science"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FormLabel>Year *</FormLabel>
                  <div className="relative">
                    <select
                      id="year"
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full h-11 px-3 pr-9 rounded-md font-display text-sm text-foreground appearance-none outline-none transition-all"
                      style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 18%)" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "hsl(78 100% 50% / 0.5)";
                        e.target.style.boxShadow = "0 0 0 3px hsl(78 100% 50% / 0.07)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "hsl(0 0% 18%)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="" disabled className="bg-background text-muted-foreground">Select year</option>
                      {yearOptions.map((y) => (
                        <option key={y} value={y} className="bg-background">{y}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </FieldGroup>

            {/* Event Selection */}
            <FieldGroup icon={Calendar} title="Event Selection">
              <div>
                <FormLabel>Select Event *</FormLabel>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    id="event"
                    name="event"
                    required
                    value={formData.event}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-9 rounded-md font-display text-sm text-foreground appearance-none outline-none transition-all"
                    style={{ background: "hsl(0 0% 8%)", border: "1px solid hsl(0 0% 18%)" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "hsl(78 100% 50% / 0.5)";
                      e.target.style.boxShadow = "0 0 0 3px hsl(78 100% 50% / 0.07)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "hsl(0 0% 18%)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="" disabled className="bg-background text-muted-foreground">Choose an event</option>
                    {eventOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background">{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Date badge */}
              {formData.event && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-display"
                  style={{
                    background: "hsl(78 100% 50% / 0.06)",
                    border: "1px solid hsl(78 100% 50% / 0.15)",
                  }}
                >
                  <Calendar className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">
                    Event dates: <span className="text-foreground font-semibold">May 1–3, 2026</span>
                  </span>
                </motion.div>
              )}
            </FieldGroup>

            {/* Team Info */}
            <FieldGroup icon={Users} title="Team Information">
              <p className="text-xs text-muted-foreground font-display -mt-2">
                Leave blank if participating individually.
              </p>
              <div>
                <FormLabel>Team Leader Name</FormLabel>
                <StyledInput
                  id="teamLeader"
                  name="teamLeader"
                  placeholder="Name of Team Leader"
                  value={formData.teamLeader}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FormLabel>Team Members</FormLabel>
                <StyledInput
                  id="teamMembers"
                  name="teamMembers"
                  placeholder="Comma-separated names"
                  value={formData.teamMembers}
                  onChange={handleChange}
                />
              </div>
            </FieldGroup>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 font-display font-black text-base tracking-wide gap-2"
              style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Securing Your Spot...
                </>
              ) : (
                "Complete Registration"
              )}
            </Button>

            <p className="text-center text-xs font-display text-muted-foreground">
              By registering, you agree to the{" "}
              <a href="#" className="text-primary hover:underline">Terms & Conditions</a> of Spandan 3.0.
            </p>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default EventRegistration;
