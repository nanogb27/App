import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X, Flame, Trash2, Trophy, Calendar, ChevronLeft, Award } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useXP } from "@/hooks/useXP";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import XPPopup from "./XPPopup";

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedDates: string[];
  createdAt: string;
}

interface Badge {
  id: string;
  label: string;
  emoji: string;
  description: string;
  requiredDays: number;
}

const badges: Badge[] = [
  { id: "3d", label: "Primeros pasos", emoji: "🌱", description: "3 días seguidos", requiredDays: 3 },
  { id: "7d", label: "Una semana firme", emoji: "💪", description: "7 días seguidos", requiredDays: 7 },
  { id: "14d", label: "Guerrero constante", emoji: "⚔️", description: "14 días seguidos", requiredDays: 14 },
  { id: "21d", label: "Hábito formado", emoji: "🧠", description: "21 días seguidos", requiredDays: 21 },
  { id: "30d", label: "Un mes imparable", emoji: "🔥", description: "30 días seguidos", requiredDays: 30 },
  { id: "60d", label: "Disciplina de élite", emoji: "🏆", description: "60 días seguidos", requiredDays: 60 },
  { id: "90d", label: "Leyenda", emoji: "👑", description: "90 días seguidos", requiredDays: 90 },
];

const today = () => new Date().toISOString().split("T")[0];

const getConsecutiveDays = (dates: string[]) => {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort().reverse();
  const todayStr = today();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;

  let count = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + "T12:00:00");
    const curr = new Date(sorted[i] + "T12:00:00");
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (Math.round(diff) === 1) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

const HabitsTracker = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [newHabit, setNewHabit] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const { addXP } = useXP();

  const addHabit = () => {
    if (!newHabit.trim()) return;
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.trim(),
      streak: 0,
      completedDates: [],
      createdAt: today(),
    };
    setHabits([...habits, habit]);
    setNewHabit("");
    setShowInput(false);
  };

  const toggleHabit = (id: string) => {
    const todayStr = today();
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h;
        const isCompleted = h.completedDates.includes(todayStr);
        const newDates = isCompleted
          ? h.completedDates.filter((d) => d !== todayStr)
          : [...h.completedDates, todayStr];
        
        // Add XP only when marking as complete (not when unchecking)
        if (!isCompleted && newDates.includes(todayStr)) {
          addXP(5);
          setShowXPPopup(true);
          setTimeout(() => setShowXPPopup(false), 2000);
        }
        
        return {
          ...h,
          completedDates: newDates,
          streak: getConsecutiveDays(newDates),
        };
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const isCompletedToday = (habit: Habit) =>
    habit.completedDates.includes(today());

  const completedCount = habits.filter(isCompletedToday).length;

  // Get last 7 days for history
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  if (viewHistory) {
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <button
          onClick={() => setViewHistory(false)}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver
        </button>
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Historial de hábitos
        </h3>
        <div className="space-y-4">
          {last7Days.map((date) => {
            const d = new Date(date + "T12:00:00");
            const label = d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "short" });
            const completedHabits = habits.filter((h) => h.completedDates.includes(date));
            return (
              <div key={date} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold capitalize text-foreground mb-2">{label}</p>
                {completedHabits.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Sin hábitos completados</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {completedHabits.map((h) => (
                      <span key={h.id} className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                        <Check className="h-3 w-3" />
                        {h.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <XPPopup amount={5} isVisible={showXPPopup} />
      <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Mis Hábitos
          </h2>
          {habits.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {completedCount}/{habits.length} completados hoy
            </p>
          )}
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-9 w-9 rounded-xl"
          onClick={() => setShowInput(!showInput)}
        >
          {showInput ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </Button>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex gap-2 overflow-hidden"
          >
            <Input
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="Nuevo hábito..."
              className="rounded-xl"
              autoFocus
            />
            <Button onClick={addHabit} className="rounded-xl">
              Agregar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border p-8 text-center"
        >
          <p className="text-muted-foreground">
            Agrega tu primer hábito para comenzar 🌱
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {habits.map((habit) => {
              const completed = isCompletedToday(habit);
              return (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors ${
                    completed
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-card"
                  }`}
                >
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                      completed
                        ? "bg-success text-success-foreground"
                        : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {completed && <Check className="h-4 w-4" />}
                  </button>
                  <span
                    className={`flex-1 font-medium ${
                      completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {habit.name}
                  </span>
                  {habit.streak > 0 && (
                    <div className="flex items-center gap-1 rounded-lg bg-streak/10 px-2 py-1 text-xs font-bold text-streak">
                      <Flame className="h-3 w-3" />
                      {habit.streak}
                    </div>
                  )}
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-muted-foreground/40 transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
      </div>
    </>
  );
};

export default HabitsTracker;
