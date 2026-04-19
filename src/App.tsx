import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { authAPI } from "./lib/api";
import Index from "./pages/Index";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventRegistration from "./pages/EventRegistration";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const { setUser, setToken, setIsLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const oauthCode = params.get("code");
      const googleError = params.get("error");

      // Clean query params from the URL immediately
      if (oauthCode || googleError) {
        window.history.replaceState({}, "", window.location.pathname);
      }

      // ── Google OAuth error ───────────────────────────────────────────────
      if (googleError === "google_auth_failed") {
        import("sonner").then(({ toast }) => {
          toast.error("Google sign-in failed. Please try again.");
        });
        setUser(null);
        setToken(null);
        setIsLoading(false);
        return;
      }

      // ── Google OAuth success — exchange one-time code for tokens ─────────
      // The backend set no cookie during the redirect (Brave blocks those).
      // Instead it redirected here with ?code=XYZ. We POST it to /auth/exchange-code
      // which sets the refreshToken cookie via a direct credentialed XHR —
      // browsers including Brave accept cookies set this way.
      if (oauthCode) {
        try {
          const response = await authAPI.exchangeCode(oauthCode);
          setUser(response.data.user);
          setToken(response.data.accessToken);
          import("sonner").then(({ toast }) => {
            toast.success("Signed in with Google!");
          });
        } catch {
          import("sonner").then(({ toast }) => {
            toast.error("Google sign-in failed. Please try again.");
          });
          setUser(null);
          setToken(null);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // ── Normal page load — restore session via refresh token cookie ───────
      try {
        const response = await authAPI.refresh();
        setUser(response.data.user);
        setToken(response.data.accessToken);
      } catch {
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [setUser, setToken, setIsLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Home & hash-anchored pages */}
            <Route path="/" element={<Index />} />
            <Route path="/timeline" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/partners" element={<Index />} />

            {/* Main pages */}
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/sponsors" element={<Sponsors />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/register" element={<EventRegistration />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
