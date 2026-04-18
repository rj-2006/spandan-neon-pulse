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
    window.open("https://drive.google.com/", "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group relative overflow-hidden cursor-pointer flex flex-col h-full rounded-2xl hover-lift"
      onClick={handleCardClick}
      style={{
        background: "hsl(0 0% 6%)",
        border: "1px solid hsl(0 0% 14%)",
        transition: "all 0.35s ease",
      }}
      whileHover={{
        borderColor: "hsl(78 100% 50% / 0.35)",
        boxShadow: "0 0 0 1px hsl(78 100% 50% / 0.1), 0 0 40px hsl(78 100% 50% / 0.08)",
      }}
    >
      {/* ── Image ── */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, hsl(0 0% 6%) 0%, hsl(0 0% 6% / 0.5) 40%, transparent 100%)",
          }}
        />
        {/* Neon scanline on hover */}
        <div
          className="absolute inset-x-0 h-[1px] top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, hsl(78 100% 50% / 0.4), transparent)" }}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 text-[10px] font-display font-bold uppercase tracking-wider rounded-full"
            style={{
              background: "hsl(78 100% 50%)",
              color: "hsl(0 0% 4%)",
            }}
          >
            {category}
          </span>
        </div>

        {/* Arrow on hover */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          style={{
            background: "hsl(78 100% 50%)",
            boxShadow: "0 0 12px hsl(78 100% 50% / 0.5)",
          }}
        >
          <ArrowUpRight className="w-4 h-4 text-background" />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300 leading-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm font-body mb-5 line-clamp-2 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Meta + Rules */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid hsl(0 0% 12%)" }}
        >
          <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" style={{ color: "hsl(78 100% 50%)" }} />
              <span className="font-display">{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" style={{ color: "hsl(78 100% 50%)" }} />
              <span className="font-display">{teamSize}</span>
            </div>
          </div>

          <button
            onClick={handleViewRulesClick}
            className="flex items-center gap-1.5 text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-all duration-300"
            style={{
              background: "hsl(78 100% 50% / 0.08)",
              border: "1px solid hsl(78 100% 50% / 0.15)",
              color: "hsl(78 100% 50%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(78 100% 50% / 0.15)";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(78 100% 50% / 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "hsl(78 100% 50% / 0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(78 100% 50% / 0.15)";
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            Rules
          </button>
        </div>
      </div>

      {/* Bottom neon line reveal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "var(--gradient-neon)" }}
      />
    </motion.div>
  );
};

export default EventCard;
