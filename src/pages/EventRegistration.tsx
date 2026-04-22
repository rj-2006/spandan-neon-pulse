import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  User,
  BookOpen,
  Calendar,
  Users,
  ChevronDown,
  Plus,
  Trash2,
  Building2,
  Info,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { eventsAPI } from "@/lib/api";
import { events } from "@/data/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Options ──────────────────────────────────────────────────────────────────
// Event list is derived from the shared events data (single source of truth)
const eventOptions = events.map((e) => e.title);

const collegeOptions = ["GBPIET", "Others"];
const branchOptions = ["CSE", "AIML", "BT", "ME", "MCA", "Civil", "EE", "ECE", "Others"];
const yearOptions = ["1st Year", "2nd Year", "3rd Year", "Final Year"];

// ── Shared style helpers ──────────────────────────────────────────────────────
const selectStyle: React.CSSProperties = {
  background: "hsl(0 0% 8%)",
  border: "1px solid hsl(0 0% 18%)",
};
const selectFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
  e.target.style.borderColor = "hsl(78 100% 50% / 0.5)";
  e.target.style.boxShadow = "0 0 0 3px hsl(78 100% 50% / 0.07)";
};
const selectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
  e.target.style.borderColor = "hsl(0 0% 18%)";
  e.target.style.boxShadow = "none";
};

// ── Sub-components ────────────────────────────────────────────────────────────
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

const StyledSelect = ({
  id,
  name,
  value,
  onChange,
  required,
  children,
  icon: Icon,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  children: React.ReactNode;
  icon?: React.ElementType;
}) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
    )}
    <select
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      className={`w-full h-11 ${Icon ? "pl-10" : "px-3"} pr-9 rounded-md font-display text-sm text-foreground appearance-none outline-none transition-all`}
      style={selectStyle}
      onFocus={selectFocus}
      onBlur={selectBlur}
    >
      {children}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
  </div>
);

// ── Team Member interface ─────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  college: string;
  otherCollege: string;
  branch: string;
  otherBranch: string;
  year: string;
}

const emptyMember = (): TeamMember => ({
  name: "",
  college: "",
  otherCollege: "",
  branch: "",
  otherBranch: "",
  year: "",
});

// ── Main Component ────────────────────────────────────────────────────────────
const EventRegistration = () => {
  const [searchParams] = useSearchParams();
  const preSelectedEvent = searchParams.get("event") || "";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    otherCollege: "",
    branch: "",
    otherBranch: "",
    year: "",
    event: preSelectedEvent,
    teamLeader: "",
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Derived event limits ─────────────────────────────────────────────────────
  const selectedEventData = useMemo(
    () => events.find((e) => e.title === formData.event) ?? null,
    [formData.event]
  );

  // registrant counts as member #1, so additional slots = maxTeam - 1
  const maxAdditional = selectedEventData ? selectedEventData.maxTeam - 1 : 10;
  const minAdditional = selectedEventData ? selectedEventData.minTeam - 1 : 0;
  const isSolo = selectedEventData?.maxTeam === 1;
  const atMax = teamMembers.length >= maxAdditional;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "event") {
      // When event changes, trim excess team members to fit new limit
      const newEvent = events.find((ev) => ev.title === value);
      const newMax = newEvent ? newEvent.maxTeam - 1 : 10;
      setTeamMembers((prev) => prev.slice(0, newMax));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTeamMember = () => {
    if (atMax) return;
    setTeamMembers((prev) => [...prev, emptyMember()]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setTeamMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate minimum team size
    if (selectedEventData && minAdditional > 0 && teamMembers.length < minAdditional) {
      toast({
        variant: "destructive",
        title: "Team Too Small",
        description: `${selectedEventData.title} requires at least ${selectedEventData.minTeam} members. Please add ${minAdditional - teamMembers.length} more team member(s).`,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        teamMembers: teamMembers.map((m) => ({
          name: m.name,
          college: m.college,
          otherCollege: m.otherCollege,
          branch: m.branch,
          otherBranch: m.otherBranch,
          year: m.year,
        })),
      };
      await eventsAPI.registerParticipant(payload);
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

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      college: "",
      otherCollege: "",
      branch: "",
      otherBranch: "",
      year: "",
      event: "",
      teamLeader: "",
    });
    setTeamMembers([]);
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-6">
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
            <h1 className="text-3xl font-heading font-black mb-3 neon-text">You're In!</h1>
            <p className="text-muted-foreground font-display mb-2">Successfully registered for</p>
            <p className="text-foreground font-heading font-bold text-xl mb-8">{formData.event}</p>
            <div
              className="rounded-xl p-4 mb-8 text-sm font-display text-muted-foreground"
              style={{ background: "hsl(78 100% 50% / 0.06)", border: "1px solid hsl(78 100% 50% / 0.15)" }}
            >
              📅 Mark your calendar —{" "}
              <span className="text-foreground font-semibold">May 1–3, 2026</span>
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
                onClick={resetForm}
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

  // ── Main form ────────────────────────────────────────────────────────────────
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
            {/* ── Personal Info ── */}
            <FieldGroup icon={User} title="Personal Information">
              {/* Full Name */}
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

              {/* College */}
              <div>
                <FormLabel>College *</FormLabel>
                <StyledSelect
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  icon={Building2}
                >
                  <option value="" disabled className="bg-background text-muted-foreground">
                    Select your college
                  </option>
                  {collegeOptions.map((c) => (
                    <option key={c} value={c} className="bg-background">
                      {c}
                    </option>
                  ))}
                </StyledSelect>
              </div>

              <AnimatePresence>
                {formData.college === "Others" && (
                  <motion.div
                    key="otherCollege"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <FormLabel>Mention Your College *</FormLabel>
                    <StyledInput
                      id="otherCollege"
                      name="otherCollege"
                      required
                      placeholder="Enter your college name"
                      value={formData.otherCollege}
                      onChange={handleChange}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Branch & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Branch */}
                <div>
                  <FormLabel>Branch *</FormLabel>
                  <StyledSelect
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled className="bg-background text-muted-foreground">
                      Select branch
                    </option>
                    {branchOptions.map((b) => (
                      <option key={b} value={b} className="bg-background">
                        {b}
                      </option>
                    ))}
                  </StyledSelect>
                </div>

                {/* Year */}
                <div>
                  <FormLabel>Year *</FormLabel>
                  <StyledSelect
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled className="bg-background text-muted-foreground">
                      Select year
                    </option>
                    {yearOptions.map((y) => (
                      <option key={y} value={y} className="bg-background">
                        {y}
                      </option>
                    ))}
                  </StyledSelect>
                </div>
              </div>

              <AnimatePresence>
                {formData.branch === "Others" && (
                  <motion.div
                    key="otherBranch"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <FormLabel>Mention Your Branch *</FormLabel>
                    <StyledInput
                      id="otherBranch"
                      name="otherBranch"
                      required
                      placeholder="Enter your branch name"
                      value={formData.otherBranch}
                      onChange={handleChange}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </FieldGroup>

            {/* ── Event Selection ── */}
            <FieldGroup icon={Calendar} title="Event Selection">
              <div>
                <FormLabel>Select Event *</FormLabel>
                <StyledSelect
                  id="event"
                  name="event"
                  value={formData.event}
                  onChange={handleChange}
                  required
                  icon={BookOpen}
                >
                  <option value="" disabled className="bg-background text-muted-foreground">
                    Choose an event
                  </option>
                  {eventOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-background">
                      {opt}
                    </option>
                  ))}
                </StyledSelect>
              </div>

              {formData.event && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2"
                >
                  {/* Date badge */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-display"
                    style={{
                      background: "hsl(78 100% 50% / 0.06)",
                      border: "1px solid hsl(78 100% 50% / 0.15)",
                    }}
                  >
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      Event dates:{" "}
                      <span className="text-foreground font-semibold">May 1–3, 2026</span>
                    </span>
                  </div>
                  {/* Team size badge */}
                  {selectedEventData && (
                    <div
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-display"
                      style={{
                        background: isSolo
                          ? "hsl(45 100% 50% / 0.06)"
                          : "hsl(185 100% 50% / 0.06)",
                        border: isSolo
                          ? "1px solid hsl(45 100% 50% / 0.2)"
                          : "1px solid hsl(185 100% 50% / 0.15)",
                      }}
                    >
                      <Info
                        className="w-4 h-4 shrink-0"
                        style={{ color: isSolo ? "hsl(45 100% 55%)" : "hsl(185 100% 50%)" }}
                      />
                      <span className="text-muted-foreground">
                        Team size:{" "}
                        <span
                          className="font-semibold"
                          style={{ color: isSolo ? "hsl(45 100% 65%)" : "hsl(185 100% 60%)" }}
                        >
                          {selectedEventData.teamSize}
                        </span>
                      </span>
                    </div>
                  )}
                </motion.div>
              )}
            </FieldGroup>

            {/* ── Team Info ── */}
            <FieldGroup icon={Users} title="Team Information">
              {/* Solo event notice */}
              {isSolo ? (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-display"
                  style={{
                    background: "hsl(45 100% 50% / 0.06)",
                    border: "1px solid hsl(45 100% 50% / 0.2)",
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" style={{ color: "hsl(45 100% 55%)" }} />
                  <span className="text-muted-foreground">
                    This is a{" "}
                    <span className="font-semibold" style={{ color: "hsl(45 100% 65%)" }}>
                      solo event
                    </span>
                    {" "}— no team members can be added.
                  </span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground font-display -mt-2">
                  {minAdditional > 0
                    ? `This event requires at least ${selectedEventData?.minTeam ?? minAdditional + 1} members total. Add at least ${minAdditional} team member(s).`
                    : "Optional — add team members using the + button below."}
                  {maxAdditional < 10 && ` Max ${maxAdditional} additional member(s).`}
                </p>
              )}

              {/* Team Leader — hidden for solo events */}
              {!isSolo && (
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
              )}

              {/* Dynamic Team Members */}
              <AnimatePresence>
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-lg p-4 space-y-4"
                    style={{
                      background: "hsl(0 0% 8%)",
                      border: "1px solid hsl(0 0% 16%)",
                    }}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-display font-bold uppercase tracking-widest"
                        style={{ color: "hsl(78 100% 50% / 0.8)" }}
                      >
                        Team Member {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10 hover:text-red-400 text-muted-foreground"
                        style={{ border: "1px solid hsl(0 0% 20%)" }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Name */}
                    <div>
                      <FormLabel>Full Name *</FormLabel>
                      <StyledInput
                        placeholder="Member's full name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                        required
                      />
                    </div>

                    {/* College */}
                    <div>
                      <FormLabel>College *</FormLabel>
                      <StyledSelect
                        value={member.college}
                        onChange={(e) => updateTeamMember(index, "college", e.target.value)}
                        required
                        icon={Building2}
                      >
                        <option value="" disabled className="bg-background text-muted-foreground">
                          Select college
                        </option>
                        {collegeOptions.map((c) => (
                          <option key={c} value={c} className="bg-background">
                            {c}
                          </option>
                        ))}
                      </StyledSelect>
                    </div>

                    <AnimatePresence>
                      {member.college === "Others" && (
                        <motion.div
                          key={`otherCollege-${index}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <FormLabel>Mention College *</FormLabel>
                          <StyledInput
                            placeholder="College name"
                            value={member.otherCollege}
                            onChange={(e) => updateTeamMember(index, "otherCollege", e.target.value)}
                            required
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Branch & Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Branch *</FormLabel>
                        <StyledSelect
                          value={member.branch}
                          onChange={(e) => updateTeamMember(index, "branch", e.target.value)}
                          required
                        >
                          <option value="" disabled className="bg-background text-muted-foreground">
                            Select branch
                          </option>
                          {branchOptions.map((b) => (
                            <option key={b} value={b} className="bg-background">
                              {b}
                            </option>
                          ))}
                        </StyledSelect>
                      </div>
                      <div>
                        <FormLabel>Year *</FormLabel>
                        <StyledSelect
                          value={member.year}
                          onChange={(e) => updateTeamMember(index, "year", e.target.value)}
                          required
                        >
                          <option value="" disabled className="bg-background text-muted-foreground">
                            Select year
                          </option>
                          {yearOptions.map((y) => (
                            <option key={y} value={y} className="bg-background">
                              {y}
                            </option>
                          ))}
                        </StyledSelect>
                      </div>
                    </div>

                    <AnimatePresence>
                      {member.branch === "Others" && (
                        <motion.div
                          key={`otherBranch-${index}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <FormLabel>Mention Branch *</FormLabel>
                          <StyledInput
                            placeholder="Branch name"
                            value={member.otherBranch}
                            onChange={(e) => updateTeamMember(index, "otherBranch", e.target.value)}
                            required
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Add Member Button — hidden for solo events, disabled at max */}
              {!isSolo && (
                <>
                  <button
                    type="button"
                    onClick={addTeamMember}
                    disabled={atMax}
                    className="w-full h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-display font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background: atMax ? "hsl(0 0% 8%)" : "hsl(78 100% 50% / 0.05)",
                      border: atMax
                        ? "1px dashed hsl(0 0% 25%)"
                        : "1px dashed hsl(78 100% 50% / 0.3)",
                      color: atMax ? "hsl(0 0% 40%)" : "hsl(78 100% 50% / 0.8)",
                    }}
                    onMouseEnter={(e) => {
                      if (atMax) return;
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(78 100% 50% / 0.1)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(78 100% 50% / 0.6)";
                      (e.currentTarget as HTMLButtonElement).style.color = "hsl(78 100% 50%)";
                    }}
                    onMouseLeave={(e) => {
                      if (atMax) return;
                      (e.currentTarget as HTMLButtonElement).style.background = "hsl(78 100% 50% / 0.05)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "hsl(78 100% 50% / 0.3)";
                      (e.currentTarget as HTMLButtonElement).style.color = "hsl(78 100% 50% / 0.8)";
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    {atMax
                      ? `Max ${maxAdditional} member${maxAdditional !== 1 ? "s" : ""} reached`
                      : `Add Team Member (${teamMembers.length}/${maxAdditional})`}
                  </button>

                  {/* Min-member warning shown before submit */}
                  {selectedEventData && minAdditional > 0 && teamMembers.length < minAdditional && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-display"
                      style={{
                        background: "hsl(15 100% 50% / 0.06)",
                        border: "1px solid hsl(15 100% 50% / 0.2)",
                        color: "hsl(15 100% 65%)",
                      }}
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      Add at least {minAdditional - teamMembers.length} more member
                      {minAdditional - teamMembers.length !== 1 ? "s" : ""} to meet the minimum.
                    </motion.div>
                  )}
                </>
              )}
            </FieldGroup>

            {/* ── Submit ── */}
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
              <a href="#" className="text-primary hover:underline">
                Terms &amp; Conditions
              </a>{" "}
              of Spandan 3.0.
            </p>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default EventRegistration;
