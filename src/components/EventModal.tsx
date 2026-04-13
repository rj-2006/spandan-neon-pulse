import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User as UserIcon } from "lucide-react";
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
            >
              {/* Event Image and Header */}
              <div className="relative h-48 sm:h-56 shrink-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 hover:bg-background/80 text-foreground transition-colors backdrop-blur-md z-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Event Content container */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col">
                {/* Event Title and Category */}
                <div className="mb-6 flex flex-col items-center text-center">
                  <span className="px-3 py-1 text-xs font-display font-semibold bg-primary text-primary-foreground rounded-full mb-3 inline-block shadow-sm">
                    {event.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    {event.title}
                  </h2>
                </div>

                <p className="text-muted-foreground font-body text-sm sm:text-base mb-6 leading-relaxed text-center">
                  {event.description}
                </p>

                {/* Coordinator Section */}
                {event.coordinator && (
                  <div className="bg-secondary/30 rounded-xl p-4 mb-6 border border-border/50">
                    <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-primary" />
                      Coordinator
                    </h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={event.coordinator.photo}
                        alt={event.coordinator.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 bg-muted"
                      />
                      <div>
                        <p className="font-display font-medium text-foreground">
                          {event.coordinator.name}
                        </p>
                        <a
                          href={`tel:${event.coordinator.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors mt-1"
                        >
                          <Phone className="w-3 h-3" />
                          {event.coordinator.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-2">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 border-primary/30 hover:border-primary font-display"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleRegister}
                    className="flex-1 font-display hover-lift"
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
