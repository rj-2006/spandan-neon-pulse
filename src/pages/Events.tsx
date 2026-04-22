import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import EventModal from "@/components/EventModal";
import { EventData, events } from "@/data/events";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Coding",
  "Design",
  "Robotics",
  "Innovation",
  "Fun Tech",
  "Creative",
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  const hasFilters = searchTerm || selectedCategory !== "All";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ── Hero Section ── */}
      <section className="pt-28 md:pt-36 pb-12 relative cyber-grid overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(0 0% 3% / 0.5), hsl(0 0% 3%))," +
              "radial-gradient(ellipse 70% 60% at 50% 40%, hsl(78 100% 50% / 0.06) 0%, transparent 60%)",
          }}
        />
        {/* Orbs */}
        <div
          className="absolute -top-20 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "hsl(78 100% 50%)", filter: "blur(100px)", opacity: 0.06 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="section-tag mb-5 mx-auto">May 1–3, 2026</div>
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-5">
              All{" "}
              <span
                style={{
                  background: "var(--gradient-neon)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px hsl(78 100% 50% / 0.4))",
                }}
              >
                Events
              </span>
            </h1>
            <p className="text-muted-foreground font-display text-lg mb-10">
              Explore our diverse range of technical competitions and find your
              battlefield.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl font-display text-sm text-foreground placeholder:text-muted-foreground transition-all outline-none"
                style={{
                  background: "hsl(0 0% 8%)",
                  border: "1px solid hsl(0 0% 16%)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "hsl(78 100% 50% / 0.5)";
                  e.target.style.boxShadow = "0 0 0 3px hsl(78 100% 50% / 0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "hsl(0 0% 16%)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {searchTerm && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <div
        className="sticky top-14 z-40 border-b"
        style={{
          background: "hsl(0 0% 4% / 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "hsl(0 0% 12%)",
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Filter className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5 flex-1">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3.5 py-1.5 rounded-full font-display text-xs whitespace-nowrap transition-all duration-200 shrink-0"
                    style={{
                      background: active ? "hsl(78 100% 50%)" : "hsl(0 0% 9%)",
                      color: active ? "hsl(0 0% 4%)" : "hsl(0 0% 60%)",
                      border: active ? "none" : "1px solid hsl(0 0% 16%)",
                      fontWeight: active ? 700 : 500,
                      boxShadow: active ? "0 0 12px hsl(78 100% 50% / 0.3)" : "none",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {/* Clear button */}
            <AnimatePresence>
              {hasFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  onClick={clearFilters}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display text-xs font-semibold transition-all"
                  style={{
                    background: "hsl(0 84% 60% / 0.1)",
                    border: "1px solid hsl(0 84% 60% / 0.2)",
                    color: "hsl(0 84% 60%)",
                  }}
                >
                  <X className="w-3 h-3" /> Clear
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Result count */}
          <motion.p
            key={filteredEvents.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-display text-muted-foreground mb-8"
          >
            Showing{" "}
            <span className="text-primary font-semibold">{filteredEvents.length}</span>{" "}
            {filteredEvents.length === 1 ? "event" : "events"}
            {selectedCategory !== "All" && (
              <> in <span className="text-foreground font-semibold">{selectedCategory}</span></>
            )}
          </motion.p>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredEvents.map((event, index) => (
                <EventCard
                  key={event.title}
                  {...event}
                  index={index}
                  onViewDetails={() => {
                    setSelectedEvent(event as EventData);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{
                  background: "hsl(0 0% 8%)",
                  border: "1px solid hsl(0 0% 14%)",
                }}
              >
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="font-heading font-bold text-lg mb-2">No events found</p>
              <p className="text-muted-foreground font-display text-sm mb-6">
                No events match your current filters.
              </p>
              <Button
                onClick={clearFilters}
                className="font-display font-semibold"
                style={{ background: "var(--gradient-neon)", color: "hsl(0 0% 4%)", border: "none" }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
