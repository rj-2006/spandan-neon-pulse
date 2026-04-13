import { motion } from "framer-motion";
import { ArrowUpRight, Users, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface EventCardProps {
  title: string;
  category: string;
  description: string;
  date: string;
  teamSize: string;
  image: string;
  index: number;
  onViewDetails?: () => void;
}

const EventCard = ({
  title,
  category,
  description,
  date,
  teamSize,
  image,
  index,
  onViewDetails,
}: EventCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    } else if (isAuthenticated) {
      navigate(`/register?event=${encodeURIComponent(title)}`);
    } else {
      navigate("/login");
    }
  };

  const handleViewRulesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Replace this link with the actual Google Drive public PDF link.
    window.open("https://drive.google.com/", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glow-card overflow-hidden hover-lift cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-display font-semibold bg-primary text-primary-foreground rounded-full">
            {category}
          </span>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
          <ArrowUpRight className="w-5 h-5 text-foreground group-hover:text-primary-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-display">{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-display">{teamSize}</span>
            </div>
          </div>
          
          <button
            onClick={handleViewRulesClick}
            className="flex items-center gap-1 text-sm font-semibold hover:text-primary transition-colors bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-lg border border-border/50"
          >
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-display">Rules</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
