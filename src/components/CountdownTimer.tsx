import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  // Event: May 1, 2026
  const eventDate = new Date("2026-05-01T09:00:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const diff = eventDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [prev, setPrev]         = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(timeLeft);
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const units: { label: string; key: keyof TimeLeft }[] = [
    { label: "Days",    key: "days"    },
    { label: "Hours",   key: "hours"   },
    { label: "Mins",    key: "minutes" },
    { label: "Secs",    key: "seconds" },
  ];

  return (
    /* Single row, no wrapping, evenly fills available width */
    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 w-full max-w-xs sm:max-w-sm md:max-w-none">
      {units.map((unit, i) => {
        const value   = timeLeft[unit.key];
        const changed = value !== prev[unit.key];
        const display = String(value).padStart(2, "0");

        return (
          <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1">
            {/* Box — flex-1 so all 4 fill the row equally */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center justify-center rounded-xl flex-1"
              style={{
                padding: "clamp(6px, 2vw, 16px)",
                background: "hsl(78 100% 50% / 0.04)",
                border: "1px solid hsl(78 100% 50% / 0.2)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                minWidth: 0,           // allow shrinking below content size
              }}
              whileHover={{
                borderColor: "hsl(78 100% 50% / 0.55)",
                boxShadow: "0 0 8px hsl(78 100% 50% / 0.45), 0 0 24px hsl(78 100% 50% / 0.2)",
              }}
            >
              {/* Animated number */}
              <motion.span
                key={display}
                initial={changed ? { y: -12, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.4rem, 5vw, 3rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "hsl(78 100% 50%)",
                  textShadow: "0 0 8px hsl(78 100% 50% / 0.45), 0 0 24px hsl(78 100% 50% / 0.2)",
                }}
              >
                {display}
              </motion.span>

              {/* Label */}
              <span
                className="uppercase tracking-widest mt-1.5 leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                  color: "hsl(0 0% 52%)",
                  letterSpacing: "0.12em",
                  whiteSpace: "nowrap",
                }}
              >
                {unit.label}
              </span>

              {/* Corner accent dots */}
              <span
                className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full opacity-40"
                style={{ background: "hsl(78 100% 50%)" }}
              />
              <span
                className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full opacity-40"
                style={{ background: "hsl(78 100% 50%)" }}
              />
            </motion.div>

            {/* Colon separator — not after last item */}
            {i < units.length - 1 && (
              <span
                className="font-heading font-bold shrink-0 pb-4 select-none"
                style={{
                  fontSize: "clamp(1rem, 3.5vw, 2rem)",
                  color: "hsl(78 100% 50% / 0.5)",
                  lineHeight: 1,
                }}
              >
                :
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CountdownTimer;
