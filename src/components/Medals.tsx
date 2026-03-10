import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Award } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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

const getDisciplineRank = (totalCompleted: number) => {
  if (totalCompleted >= 200) return { label: "Maestro", emoji: "👑", color: "text-accent" };
  if (totalCompleted >= 100) return { label: "Avanzado", emoji: "⭐", color: "text-accent" };
  if (totalCompleted >= 50) return { label: "Comprometido", emoji: "💎", color: "text-primary" };
  if (totalCompleted >= 20) return { label: "En camino", emoji: "🚀", color: "text-primary" };
  if (totalCompleted >= 5) return { label: "Principiante", emoji: "🌱", color: "text-success" };
  return { label: "Nuevo", emoji: "✨", color: "text-muted-foreground" };
};

const getEarnedBadges = (streak: number) => badges.filter((b) => streak >= b.requiredDays);
const getNextBadge = (streak: number) => badges.find((b) => streak < b.requiredDays);

const Medals = () => {
  const [habits] = useLocalStorage<Habit[]>("habits", []);

  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0);
  const maxStreak = Math.max(0, ...habits.map((h) => h.streak));
  const rank = getDisciplineRank(totalCompletions);
  const earnedBadges = getEarnedBadges(maxStreak);
  const nextBadge = getNextBadge(maxStreak);

  return (
    <div className="space-y-6">
      {/* Rank section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Tu Rango
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-5xl">{rank.emoji}</span>
          <div>
            <p className={`text-2xl font-bold ${rank.color}`}>{rank.label}</p>
            <p className="text-sm text-muted-foreground">
              {totalCompletions} hábitos completados
            </p>
          </div>
        </div>
      </motion.div>

      {/* Streak section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-accent/30 bg-accent/5 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Flame className="h-5 w-5 text-accent" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            Tu Racha Máxima
          </h3>
        </div>
        <p className="text-4xl font-bold text-accent">{maxStreak} días</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Mantén la consistencia para alcanzar tu próxima medalla
        </p>
      </motion.div>

      {/* Next badge */}
      {nextBadge && maxStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-accent/20 bg-accent/5 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Próxima medalla
              </span>
            </div>
            <span className="text-xs font-bold text-accent">
              {maxStreak}/{nextBadge.requiredDays}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">{nextBadge.emoji}</span>
            <div>
              <p className="font-semibold text-foreground">{nextBadge.label}</p>
              <p className="text-xs text-muted-foreground">{nextBadge.description}</p>
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-accent/20">
            <div
              className="h-2 rounded-full bg-accent transition-all"
              style={{ width: `${Math.min(100, (maxStreak / nextBadge.requiredDays) * 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Earned badges */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
            Medallas Obtenidas
          </h3>
          <div className="space-y-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-4"
              >
                <span className="text-3xl">{badge.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{badge.label}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
                <span className="text-xs font-bold text-accent">✓</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All badges section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
          Todas las Medallas
        </h3>
        <div className="space-y-3">
          {badges.map((badge) => {
            const earned = maxStreak >= badge.requiredDays;
            return (
              <div
                key={badge.id}
                className={`flex items-center gap-3 rounded-2xl border p-4 transition-all ${
                  earned ? "border-accent/30 bg-accent/5" : "border-border bg-card opacity-50"
                }`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <div className="flex-1">
                  <p
                    className={`font-semibold ${
                      earned ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {badge.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
                {earned && <span className="text-xs font-bold text-accent">✓</span>}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Medals;
