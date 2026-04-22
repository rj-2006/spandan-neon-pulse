import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const getRouteLabel = (pathname: string) => {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
};

const faahAudioSrc = "/assets/fahhhhh.mp3";
const faahLoopDelayMs = 2500;

const NotFound = () => {
  const location = useLocation();
  const routeLabel = useMemo(() => getRouteLabel(location.pathname), [location.pathname]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const unlockedRef = useRef(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const audio = new Audio(faahAudioSrc);
    audio.preload = "auto";
    audio.playsInline = true;
    audio.loop = false;
    audioRef.current = audio;

    const clearLoop = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const playClip = async () => {
      if (!audioRef.current) return;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      try {
        await audioRef.current.play();
      } catch {
        // Android and some desktop browsers gate audio until a user gesture.
      }
    };

    const startLoop = () => {
      clearLoop();
      void playClip();
      intervalRef.current = window.setInterval(() => {
        if (!document.hidden) {
          void playClip();
        }
      }, faahLoopDelayMs);
    };

    const unlockSound = () => {
      unlockedRef.current = true;
      startLoop();
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause();
        return;
      }

      if (unlockedRef.current) {
        startLoop();
      } else {
        void playClip();
      }
    };

    audio.addEventListener("canplaythrough", startLoop, { once: true });
    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("touchstart", unlockSound, { once: true, passive: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    document.addEventListener("visibilitychange", handleVisibility);
    audio.load();

    return () => {
      clearLoop();
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      audioRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <style>{notFoundStyles}</style>

      <main className="relative min-h-screen pt-28 pb-12 cyber-grid">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0 0% 3% / 0.42), hsl(0 0% 3%))," +
              "radial-gradient(ellipse 70% 48% at 48% 35%, hsl(78 100% 50% / 0.08) 0%, transparent 62%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-9 lg:gap-14 items-center min-h-[calc(100vh-9rem)]">
            <section className="max-w-2xl">
              <div className="section-tag mb-5">404 ka scene</div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-5">
                Route gaya
                <span
                  className="block"
                  style={{
                    background: "var(--gradient-neon)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 22px hsl(78 100% 50% / 0.34))",
                  }}
                >
                  tel lene
                </span>
              </h1>

              <p className="font-display text-lg sm:text-xl text-foreground/86 w-full max-w-sm sm:max-w-xl mb-3 break-words">
                Chhote se Ghurdauri ki galiyon mein bhi bhatak gaye tum?
              </p>
              <p className="font-display text-base sm:text-lg text-muted-foreground w-full max-w-sm sm:max-w-xl mb-7 break-words">
                <span className="text-foreground font-semibold break-all">{routeLabel}</span> hi mila aane ko? Bhai, yeh page exist hi nahi karta.
              </p>

              <Button
                asChild
                className="font-display font-bold"
                style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)" }}
              >
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Ghar chalo
                </Link>
              </Button>
            </section>

            <section
              className="meme-frame mx-auto w-full max-w-xl"
              aria-label="Jaldi chal Panvel nikalna hai meme animation"
            >
              <div className="meme-road">
                <div className="meme-sun" />
                <div className="meme-sign">404 bypass</div>
                <div className="meme-auto">
                  <div className="meme-auto-top" />
                  <div className="meme-wheel meme-wheel-left" />
                  <div className="meme-wheel meme-wheel-right" />
                </div>
                <div className="meme-speed speed-one" />
                <div className="meme-speed speed-two" />
                <div className="meme-speed speed-three" />
              </div>

              <div className="meme-caption">
                Jaldi chal, Panvel nikalna hai
              </div>
              <div className="meme-subcaption">faaaaaaah... faaaaaaah...</div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const notFoundStyles = `
@keyframes memeDrive {
  0%, 100% { transform: translateX(-8px) translateY(0) rotate(-1deg); }
  42% { transform: translateX(12px) translateY(-3px) rotate(1deg); }
  68% { transform: translateX(4px) translateY(2px) rotate(-0.5deg); }
}
@keyframes wheelSpin {
  to { transform: rotate(360deg); }
}
@keyframes speedLine {
  0% { transform: translateX(22px); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateX(-260px); opacity: 0; }
}
@keyframes captionPop {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.025); }
}
.meme-frame {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid hsl(78 100% 50% / 0.28);
  background: linear-gradient(145deg, hsl(0 0% 9% / 0.96), hsl(0 0% 4% / 0.98));
  box-shadow: 0 30px 90px hsl(0 0% 0% / 0.42), 0 0 42px hsl(78 100% 50% / 0.1);
}
.meme-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, hsl(0 0% 100% / 0.025) 4px);
  z-index: 5;
}
.meme-road {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  background:
    linear-gradient(180deg, hsl(185 100% 50% / 0.12), transparent 42%),
    linear-gradient(180deg, hsl(0 0% 12%), hsl(0 0% 5%) 58%, hsl(0 0% 2%) 58%);
}
.meme-road::before {
  content: "";
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: 26%;
  height: 4px;
  background: linear-gradient(90deg, transparent, hsl(78 100% 50% / 0.7), transparent);
  box-shadow: 0 44px 0 hsl(78 100% 50% / 0.18), 0 88px 0 hsl(78 100% 50% / 0.12);
}
.meme-sun {
  position: absolute;
  right: 13%;
  top: 13%;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: 2px solid hsl(78 100% 50% / 0.48);
  box-shadow: 0 0 30px hsl(78 100% 50% / 0.18), inset 0 0 20px hsl(78 100% 50% / 0.08);
}
.meme-sign {
  position: absolute;
  left: 7%;
  top: 17%;
  padding: 9px 13px;
  border-radius: 8px;
  background: hsl(0 0% 3%);
  border: 1px solid hsl(78 100% 50% / 0.42);
  color: hsl(78 100% 58%);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  box-shadow: 0 0 18px hsl(78 100% 50% / 0.12);
}
.meme-auto {
  position: absolute;
  left: 18%;
  bottom: 21%;
  width: 230px;
  height: 112px;
  animation: memeDrive 0.72s ease-in-out infinite;
}
.meme-auto::before {
  content: "";
  position: absolute;
  left: 18px;
  right: 8px;
  bottom: 22px;
  height: 58px;
  border-radius: 24px 32px 12px 12px;
  background: linear-gradient(180deg, hsl(78 100% 50%), hsl(100 100% 36%));
  border: 3px solid hsl(0 0% 3%);
  box-shadow: 0 0 26px hsl(78 100% 50% / 0.3);
}
.meme-auto::after {
  content: "";
  position: absolute;
  right: -4px;
  bottom: 38px;
  width: 28px;
  height: 22px;
  border-radius: 0 999px 999px 0;
  background: hsl(185 100% 56%);
  border: 3px solid hsl(0 0% 3%);
}
.meme-auto-top {
  position: absolute;
  left: 52px;
  bottom: 72px;
  width: 106px;
  height: 40px;
  border-radius: 34px 34px 4px 4px;
  background: linear-gradient(180deg, hsl(185 100% 58%), hsl(185 100% 28%));
  border: 3px solid hsl(0 0% 3%);
}
.meme-wheel {
  position: absolute;
  bottom: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: radial-gradient(circle, hsl(0 0% 80%) 0 18%, hsl(0 0% 5%) 20% 100%);
  border: 4px solid hsl(0 0% 2%);
  animation: wheelSpin 0.42s linear infinite;
}
.meme-wheel-left { left: 48px; }
.meme-wheel-right { right: 28px; }
.meme-speed {
  position: absolute;
  right: 6%;
  height: 3px;
  width: 190px;
  border-radius: 99px;
  background: linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.85), hsl(78 100% 50% / 0.85));
  animation: speedLine 0.58s linear infinite;
}
.speed-one { top: 40%; }
.speed-two { top: 52%; animation-delay: 0.14s; width: 140px; }
.speed-three { top: 64%; animation-delay: 0.27s; width: 220px; }
.meme-caption {
  padding: 20px 22px 6px;
  color: hsl(0 0% 98%);
  font-family: var(--font-heading);
  font-size: clamp(1.35rem, 5vw, 2.45rem);
  font-weight: 900;
  line-height: 1.12;
  text-transform: uppercase;
  white-space: normal;
  word-break: break-word;
  animation: captionPop 1.1s ease-in-out infinite;
}
.meme-subcaption {
  padding: 0 22px 22px;
  color: hsl(78 100% 58%);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}
@media (max-width: 640px) {
  .meme-frame {
    max-width: calc(100vw - 2rem);
  }
  .meme-road { min-height: 255px; }
  .meme-auto {
    left: 10%;
    bottom: 20%;
    width: 196px;
    transform-origin: center bottom;
  }
  .meme-sun {
    width: 64px;
    height: 64px;
  }
  .meme-sign {
    font-size: 0.62rem;
  }
  .meme-caption {
    font-size: 1rem;
    line-height: 1.22;
    overflow-wrap: anywhere;
  }
}
`;

export default NotFound;
