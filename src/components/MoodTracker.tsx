import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, RefreshCw } from "lucide-react";
import { emotions, getRandomVerseForEmotion, type EmotionVerse } from "@/data/emotion-verses";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useXP } from "@/hooks/useXP";
import XPPopup from "./XPPopup";

interface MoodEmotion {
  emotionId: string;
  verse: EmotionVerse;
  timestamp: number; // When this emotion was logged
}

interface MoodEntry {
  emotions: MoodEmotion[];
  date: string;
}

const MoodTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<EmotionVerse | null>(null);
  const [rawMoodHistory, setMoodHistory] = useLocalStorage<any[]>("mood-history", []);

const moodHistory: MoodEntry[] = Array.isArray(rawMoodHistory)
  ? rawMoodHistory.map((entry) => ({
      date: entry?.date ?? new Date().toISOString().split("T")[0],
      emotions: Array.isArray(entry?.emotions)
        ? entry.emotions
        : entry?.emotionId && entry?.verse
        ? [
            {
              emotionId: entry.emotionId,
              verse: entry.verse,
              timestamp: entry.timestamp ?? Date.now(),
            },
          ]
        : [],
    }))
  : [];
  const [showHistory, setShowHistory] = useState(false);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const { addXP } = useXP();

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = moodHistory.find((e) => e.date === today);
  const todayEmotions = todayEntry?.emotions || [];

  const handleSelectEmotion = (emotionId: string) => {
    setSelectedEmotion(emotionId);
    const verse = getRandomVerseForEmotion(emotionId);
    setCurrentVerse(verse);

    if (verse) {
      const newMoodEmotion: MoodEmotion = { 
        emotionId, 
        verse, 
        timestamp: Date.now() 
      };
      
      setMoodHistory((prev) => {
        const existingEntry = prev.find((e) => e.date === today);
        
        if (existingEntry) {
          // Add to existing day's emotions (avoid duplicates at same timestamp)
          return prev.map((e) =>
            e.date === today
              ? {
                  ...e,
                  emotions: [...e.emotions, newMoodEmotion],
                }
              : e
          );
        } else {
          // Create new day entry
          return [{ emotions: [newMoodEmotion], date: today }, ...prev];
        }
      });

      // Add XP instantly
      addXP(5);
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 2000);
    }
  };

  const handleNewVerse = () => {
    if (!selectedEmotion) return;
    const verse = getRandomVerseForEmotion(selectedEmotion);
    setCurrentVerse(verse);
    if (verse) {
      const newMoodEmotion: MoodEmotion = { 
        emotionId: selectedEmotion, 
        verse, 
        timestamp: Date.now() 
      };
      
      setMoodHistory((prev) => {
        const existingEntry = prev.find((e) => e.date === today);
        
        if (existingEntry) {
          return prev.map((e) =>
            e.date === today
              ? {
                  ...e,
                  emotions: [...e.emotions, newMoodEmotion],
                }
              : e
          );
        } else {
          return [{ emotions: [newMoodEmotion], date: today }, ...prev];
        }
      });
    }
  };

  const activeEmotion = emotions.find((e) => e.id === selectedEmotion);
  const displayVerse = currentVerse || (todayEmotions.length > 0 ? todayEmotions[todayEmotions.length - 1].verse : null);

  const recentHistory = moodHistory.slice(0, 14);

  return (
    <div className="space-y-6">
      {/* Emotion selector */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            ¿Cómo te sientes hoy?
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotion === emotion.id;
            const hasEmotion = todayEmotions.some((e) => e.emotionId === emotion.id);
            return (
              <motion.button
                key={emotion.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectEmotion(emotion.id)}
                className={`flex flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                  isSelected
                    ? "ring-2 ring-primary bg-primary/10"
                    : hasEmotion
                    ? "ring-1 ring-accent/50 bg-accent/5"
                    : "hover:bg-muted"
                }`}
              >
                <span className="text-2xl">{emotion.emoji}</span>
                <span className="text-xs font-medium text-foreground">
                  {emotion.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Verse result */}
      <AnimatePresence mode="wait">
        {(displayVerse && selectedEmotion) && (
          <motion.div
            key={displayVerse.reference}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-primary p-6 shadow-soft"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-foreground/70" />
                <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
                  Palabra para tu {activeEmotion?.label?.toLowerCase()}
                </span>
              </div>
              <button
                onClick={handleNewVerse}
                className="rounded-full p-1.5 text-primary-foreground/60 hover:bg-primary-foreground/10 transition-colors"
                title="Otro versículo"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <p className="font-display text-lg italic leading-relaxed text-primary-foreground">
              "{displayVerse.text}"
            </p>
            <p className="mt-3 text-sm font-semibold text-primary-foreground/80">
              — {displayVerse.reference}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {recentHistory.some((entry) => entry.emotions?.length ?? 0 > 0) && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex w-full items-center justify-between"
          >
            <h3 className="font-display text-base font-semibold text-foreground">
              Historial de emociones
            </h3>
            <span className="text-xs text-muted-foreground">
              {showHistory ? "Ocultar" : "Ver"}
            </span>
          </button>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-4">
                  {recentHistory.map((entry) => {
                    const date = new Date(entry.date + "T12:00:00");
                    const dateStr = date.toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    });
                    
                    return (
                      <div key={entry.date} className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                          {dateStr}
                        </p>
                        <div className="space-y-1.5 pl-2 border-l-2 border-accent/30">
                          {entry.emotions.map((mood) => {
                            const emotion = emotions.find((e) => e.id === mood.emotionId);
                            const time = new Date(mood.timestamp).toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            });
                            return (
                              <div
                                key={mood.timestamp}
                                className="flex items-start gap-2 rounded-lg bg-muted/30 px-3 py-2 hover:bg-muted/50 transition-colors"
                              >
                                <span className="text-lg">{emotion?.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground">
                                    {emotion?.label}
                                  </p>
                                  <p className="truncate text-xs text-muted-foreground">
                                    {mood.verse.reference}
                                  </p>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                                  {time}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* XP Popup */}
      <XPPopup amount={5} isVisible={showXPPopup} />
    </div>
  );
};

export default MoodTracker;
