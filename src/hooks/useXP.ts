import { useLocalStorage } from "./useLocalStorage";

interface XPData {
  totalXP: number;
  diaryXPDate: string; // Last date diary XP was earned
}

export const levels = [
  { level: 1, label: "Buscador", minXP: 0, emoji: "🌱", description: "Apenas comenzando tu camino espiritual" },
  { level: 2, label: "Discípulo", minXP: 100, emoji: "📖", description: "Comprometido con el crecimiento" },
  { level: 3, label: "Apóstol", minXP: 300, emoji: "⚔️", description: "Viviendo con propósito y convicción" },
  { level: 4, label: "Sabio Estoico", minXP: 600, emoji: "🧘", description: "Dominas la paz interior" },
  { level: 5, label: "Iluminado", minXP: 1000, emoji: "✨", description: "Tu luz brilla en la oscuridad" },
  { level: 6, label: "Maestro Espiritual", minXP: 1500, emoji: "👑", description: "Eres guía de otros" },
];

export const getLevelByXP = (xp: number) => {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) {
      return levels[i];
    }
  }
  return levels[0];
};

export const getNextLevel = (xp: number) => {
  const currentLevel = getLevelByXP(xp);
  const nextLevelIdx = levels.findIndex((l) => l.level === currentLevel.level) + 1;
  if (nextLevelIdx < levels.length) {
    return levels[nextLevelIdx];
  }
  return null;
};

export const getProgressToNextLevel = (xp: number) => {
  const currentLevel = getLevelByXP(xp);
  const nextLevel = getNextLevel(xp);
  
  if (!nextLevel) return 100;
  
  const levelDiff = nextLevel.minXP - currentLevel.minXP;
  const currentDiff = xp - currentLevel.minXP;
  return Math.min(100, (currentDiff / levelDiff) * 100);
};

export const useXP = () => {
  const [xpData, setXPData] = useLocalStorage<XPData>("xp-data", {
    totalXP: 0,
    diaryXPDate: "",
  });

  const currentLevel = getLevelByXP(xpData.totalXP);
  const nextLevel = getNextLevel(xpData.totalXP);
  const progressPercent = getProgressToNextLevel(xpData.totalXP);

  const addXP = (amount: number) => {
    setXPData((prev) => ({
      ...prev,
      totalXP: prev.totalXP + amount,
    }));
  };

  const addDailyDiaryXP = () => {
    const today = new Date().toISOString().split("T")[0];
    if (xpData.diaryXPDate === today) {
      return false; // Already earned today
    }
    addXP(10);
    setXPData((prev) => ({
      ...prev,
      diaryXPDate: today,
    }));
    return true;
  };

  return {
    totalXP: xpData.totalXP,
    currentLevel,
    nextLevel,
    progressPercent,
    addXP,
    addDailyDiaryXP,
  };
};
