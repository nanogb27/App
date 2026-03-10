import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useXP } from "@/hooks/useXP";

interface XPDisplayProps {
  showAnimation?: boolean;
}

const XPDisplay = ({ showAnimation = false }: XPDisplayProps) => {
  const { totalXP, currentLevel, nextLevel, progressPercent } = useXP();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentLevel.emoji}</span>
          <div>
            <p className="text-sm font-bold text-foreground">{currentLevel.label}</p>
            <p className="text-xs text-muted-foreground">{currentLevel.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-lg font-bold text-accent">{totalXP}</span>
          </div>
          <p className="text-xs text-muted-foreground">XP</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Próximo nivel</span>
          {nextLevel && (
            <span className="text-xs font-medium text-accent">
              {nextLevel.minXP - totalXP} XP restantes
            </span>
          )}
        </div>
        <div className="h-2 w-full rounded-full bg-accent/20">
          <motion.div
            className="h-2 rounded-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {nextLevel && (
        <p className="mt-2 text-xs text-muted-foreground">
          Próximo: {nextLevel.emoji} <span className="font-semibold text-foreground">{nextLevel.label}</span>
        </p>
      )}
    </motion.div>
  );
};

export default XPDisplay;
