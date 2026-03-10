import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, ChevronLeft, Calendar, Lightbulb, ChevronDown, Edit2, Check, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useXP } from "@/hooks/useXP";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import XPPopup from "./XPPopup";

interface JournalEntry {
  id: string;
  date: string;
  timestamp: number;
  content: string;
  displayDate: string;
  title?: string;
}

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateTime = (timestamp: number) => {
  const d = new Date(timestamp);
  const date = d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} a las ${time}`;
};

const today = () => new Date().toISOString().split("T")[0];

const writingPrompts = [
  "🙏 Agradecé que estás vivo hoy. ¿Qué cosas buenas tenés en tu vida?",
  "😊 ¿Qué cosas te hicieron feliz hoy o esta semana?",
  "🎯 ¿Qué metas o sueños estás intentando cumplir?",
  "💭 Si algo te da vueltas en la cabeza, bajalo a tierra acá. Escribirlo libera.",
];

const groupEntriesByDate = (entries: JournalEntry[]) => {
  const grouped: { [key: string]: JournalEntry[] } = {};
  entries.forEach((entry) => {
    if (!grouped[entry.date]) {
      grouped[entry.date] = [];
    }
    grouped[entry.date].push(entry);
  });
  // Sort entries within each date by timestamp (most recent first)
  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => b.timestamp - a.timestamp);
  });
  // Return as array sorted by date (most recent first)
  return Object.entries(grouped)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, entries]) => ({ date, entries }));
};

const Journal = () => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>(
    "journal-entries",
    []
  );
  const [currentText, setCurrentText] = useState("");
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editingTitleValue, setEditingTitleValue] = useState("");
  const [showGuide, setShowGuide] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [showXPPopup, setShowXPPopup] = useState(false);
  const { addDailyDiaryXP } = useXP();

  const groupedEntries = useMemo(() => groupEntriesByDate(entries), [entries]);

  const toggleDateExpanded = (date: string) => {
    const newExpanded = new Set(expandedDates);
    if (newExpanded.has(date)) {
      newExpanded.delete(date);
    } else {
      newExpanded.add(date);
    }
    setExpandedDates(newExpanded);
  };

  const saveEntry = () => {
    if (!currentText.trim()) return;
    const todayStr = today();
    const timestamp = Date.now();
    const entry: JournalEntry = {
      id: timestamp.toString(),
      date: todayStr,
      timestamp: timestamp,
      content: currentText.trim(),
      displayDate: formatDate(todayStr),
      title: `Entrada a las ${new Date(timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`,
    };
    // Always add as a new entry, never overwrite
    setEntries([entry, ...entries]);
    
    // Add XP only once per day
    if (addDailyDiaryXP()) {
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 2000);
    }
    
    // Clear the text after saving
    setCurrentText("");
  };

  const updateEntryTitle = (entryId: string, newTitle: string) => {
    setEntries(
      entries.map((e) =>
        e.id === entryId ? { ...e, title: newTitle } : e
      )
    );
    setEditingTitle(null);
  };

  if (viewingEntry) {
    const isEditingThisTitle = editingTitle === viewingEntry.id;
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={() => setViewingEntry(null)}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver
        </button>
        
        {/* Title section */}
        <div className="mb-4 flex items-center gap-2">
          {isEditingThisTitle ? (
            <>
              <Input
                value={editingTitleValue}
                onChange={(e) => setEditingTitleValue(e.target.value)}
                className="rounded-lg"
                autoFocus
              />
              <button
                onClick={() => updateEntryTitle(viewingEntry.id, editingTitleValue)}
                className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditingTitle(null)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {viewingEntry.title || formatDateTime(viewingEntry.timestamp)}
              </h3>
              <button
                onClick={() => {
                  setEditingTitle(viewingEntry.id);
                  setEditingTitleValue(viewingEntry.title || formatDateTime(viewingEntry.timestamp));
                }}
                className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mb-4">
          {formatDateTime(viewingEntry.timestamp)}
        </p>
        <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">
          {viewingEntry.content}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <XPPopup amount={10} isVisible={showXPPopup} />
      <div>
      <div className="mb-4 flex items-center gap-2">
        <PenLine className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-semibold text-foreground">
          Mi Diario
        </h2>
      </div>

      {/* Writing guide */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">
                    ¿Qué puedo escribir?
                  </span>
                </div>
                <button
                  onClick={() => setShowGuide(false)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Ocultar
                </button>
              </div>
              <ul className="space-y-1.5">
                {writingPrompts.map((prompt, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showGuide && (
        <button
          onClick={() => setShowGuide(true)}
          className="mb-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <Lightbulb className="h-3 w-3" />
          Ver guía de escritura
        </button>
      )}

      <div className="mb-4">
        <p className="mb-2 text-sm capitalize text-muted-foreground">
          {formatDate(today())}
        </p>
        <Textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Empezá agradeciendo por estar vivo hoy..."
          className="min-h-[160px] resize-none rounded-2xl border-border bg-card text-foreground"
        />
        <Button
          onClick={saveEntry}
          disabled={!currentText.trim()}
          className="mt-3 w-full rounded-xl"
        >
          Guardar entrada {currentText.trim() && <span className="ml-2 text-xs">+10 XP (1x/día)</span>}
        </Button>
      </div>

      {entries.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Entradas por fecha
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {groupedEntries.map((group) => {
                const isExpanded = expandedDates.has(group.date);
                return (
                  <motion.div
                    key={group.date}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    {/* Day header - toggleable */}
                    <button
                      onClick={() => toggleDateExpanded(group.date)}
                      className="w-full px-4 py-3 text-left transition-colors hover:bg-secondary flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground capitalize">
                          {formatDate(group.date)}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          ({group.entries.length} {group.entries.length === 1 ? "entrada" : "entradas"})
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                    </button>

                    {/* Entries list - expandable */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-border"
                        >
                          <div className="space-y-1 p-2">
                            {group.entries.map((entry) => (
                              <motion.button
                                key={entry.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={() => setViewingEntry(entry)}
                                className="w-full rounded-xl p-3 text-left transition-colors hover:bg-secondary"
                              >
                                <p className="text-xs font-semibold text-foreground">
                                  {entry.title || `Entrada a las ${new Date(entry.timestamp).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`}
                                </p>
                                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                  {entry.content}
                                </p>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Journal;
