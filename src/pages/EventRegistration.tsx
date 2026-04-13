import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { eventsAPI } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// We can define the categories/events array or fetch it, for now we will hardcode a few common ones matching Event.tsx
const eventOptions = [
  "Code Crusade",
  "RoboWars",
  "AI Challenge",
  "Cyber Quest",
  "Web Dev Sprint",
  "Drone Racing",
  "Data Science Bowl",
  "Gaming Tournament",
  "IoT Innovation",
  "UI/UX Design",
  "Blockchain Build",
  "Tech Quiz"
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await eventsAPI.registerParticipant(formData);
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${formData.event}!`,
      });
      navigate("/events");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: err.response?.data?.message || "An error occurred during registration.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="mb-6">
            <Button
              variant="ghost"
              className="pl-0 hover:bg-transparent hover:text-primary transition-colors text-muted-foreground"
              onClick={() => navigate("/events")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>

          <div className="glow-card p-8 bg-card/50 backdrop-blur-md rounded-xl border border-border/50">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Event Registration
            </h1>
            <p className="text-muted-foreground mb-8 font-body">
              Fill out the details below to register for your selected event.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary/50 border-white/10 text-foreground"
                  />
                </div>

                {/* Branch */}
                <div className="space-y-2">
                  <label htmlFor="branch" className="text-sm font-medium">
                    Branch
                  </label>
                  <Input
                    id="branch"
                    name="branch"
                    required
                    placeholder="e.g. Computer Science"
                    value={formData.branch}
                    onChange={handleChange}
                    className="bg-secondary/50 border-white/10 text-foreground"
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <label htmlFor="year" className="text-sm font-medium">
                    Year
                  </label>
                  <Input
                    id="year"
                    name="year"
                    required
                    placeholder="e.g. 3rd Year"
                    value={formData.year}
                    onChange={handleChange}
                    className="bg-secondary/50 border-white/10 text-foreground"
                  />
                </div>

                {/* Event */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="event" className="text-sm font-medium">
                    Event
                  </label>
                  <select
                    id="event"
                    name="event"
                    required
                    value={formData.event}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-secondary/50 px-3 py-2 text-base md:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="" disabled>Select an event</option>
                    {eventOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background text-foreground">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Team Leader */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="teamLeader" className="text-sm font-medium text-muted-foreground">
                    Team Leader (if applicable)
                  </label>
                  <Input
                    id="teamLeader"
                    name="teamLeader"
                    placeholder="Name of Team Leader"
                    value={formData.teamLeader}
                    onChange={handleChange}
                    className="bg-secondary/50 border-white/10 text-foreground"
                  />
                </div>

                {/* Team Members */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label htmlFor="teamMembers" className="text-sm font-medium text-muted-foreground">
                    Team Members (if applicable)
                  </label>
                  <Input
                    id="teamMembers"
                    name="teamMembers"
                    placeholder="Comma separated names"
                    value={formData.teamMembers}
                    onChange={handleChange}
                    className="bg-secondary/50 border-white/10 text-foreground"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Completing Registration...
                  </>
                ) : (
                  "Register for Event"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default EventRegistration;
