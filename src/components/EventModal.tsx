import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User as UserIcon, Calendar, Users, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { EventData } from "@/data/events";

interface EventModalProps {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  if (!event) return null;

  const handleRegister = () => {
    onClose();
    if (isAuthenticated) {
      navigate(`/register?event=${encodeURIComponent(event.title)}`);
    } else {
      navigate("/login");
    }
  };

  const handleViewRules = () => {
    window.open("https://drive.google.com/", "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "hsl(0 0% 0% / 0.75)", backdropFilter: "blur(8px)" }}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
              style={{
                background: "hsl(0 0% 6%)",
                border: "1px solid hsl(78 100% 50% / 0.2)",
                boxShadow: "0 0 60px hsl(78 100% 50% / 0.1), 0 0 0 1px hsl(78 100% 50% / 0.05)",
              }}
            >
              {/* Hero Image */}
              <div className="relative h-52 sm:h-64 shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, hsl(0 0% 6%) 0%, hsl(0 0% 6% / 0.3) 50%, transparent 100%)",
                  }}
                />
                {/* Neon top line */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px]"
                  style={{ background: "var(--gradient-neon)", opacity: 0.7 }}
                />

                {/* Category badge */}
                <div className="absolute bottom-4 left-5">
                  <span
                    className="px-3 py-1 text-xs font-display font-bold uppercase tracking-wider rounded-full"
                    style={{ background: "hsl(78 100% 50%)", color: "hsl(0 0% 4%)" }}
                  >
                    {event.category}
                  </span>
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    background: "hsl(0 0% 0% / 0.5)",
                    border: "1px solid hsl(0 0% 100% / 0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 0% / 0.8)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(78 100% 50% / 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "hsl(0 0% 0% / 0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(0 0% 100% / 0.1)";
                  }}
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-heading font-black leading-tight">
                  {event.title}
                </h2>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                  {event.date && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold"
                      style={{
                        background: "hsl(78 100% 50% / 0.08)",
                        border: "1px solid hsl(78 100% 50% / 0.15)",
                        color: "hsl(78 100% 50%)",
                      }}
                    >
                      <Calendar className="w-3 h-3" /> {event.date}
                    </div>
                  )}
                  {event.teamSize && (
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display font-semibold"
                      style={{
                        background: "hsl(185 100% 50% / 0.08)",
                        border: "1px solid hsl(185 100% 50% / 0.15)",
                        color: "hsl(185 100% 50%)",
                      }}
                    >
                      <Users className="w-3 h-3" /> {event.teamSize}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {event.description}
                </p>

                {/* Coordinator */}
                {event.coordinator && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "hsl(0 0% 8%)",
                      border: "1px solid hsl(0 0% 14%)",
                    }}
                  >
                    <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5" style={{ color: "hsl(78 100% 50%)" }} />
                      Event Coordinator
                    </h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={event.coordinator.photo}
                        alt={event.coordinator.name}
                        className="w-12 h-12 rounded-full object-cover"
                        style={{ border: "2px solid hsl(78 100% 50% / 0.3)" }}
                      />
                      <div>
                        <p className="font-display font-semibold text-foreground">
                          {event.coordinator.name}
                        </p>
                        <a
                          href={`tel:${event.coordinator.phone.replace(/[^0-9+]/g, "")}`}
                          className="flex items-center gap-1 text-sm mt-0.5 transition-colors"
                          style={{ color: "hsl(78 100% 50%)" }}
                        >
                          <Phone className="w-3 h-3" />
                          {event.coordinator.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Button
                    onClick={handleViewRules}
                    variant="outline"
                    className="flex-1 font-display border-border/50 hover:border-primary/40 gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Rules
                  </Button>
                  <Button
                    onClick={handleRegister}
                    className="flex-1 font-display font-bold gap-2"
                    style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventModal;
