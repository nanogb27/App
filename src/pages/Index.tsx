import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DailyVerse from "@/components/DailyVerse";
import MoodTracker from "@/components/MoodTracker";
import HabitsTracker from "@/components/HabitsTracker";
import Journal from "@/components/Journal";
import Medals from "@/components/Medals";
import XPDisplay from "@/components/XPDisplay";
import BottomNav from "@/components/BottomNav";

const greetingByTime = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("mood");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="px-5 pb-2 pt-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-medium text-muted-foreground"
        >
          {greetingByTime()} ✨
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-2xl font-bold text-foreground"
        >
          {activeTab === "verse" && "Tu Palabra Diaria"}
          {activeTab === "mood" && "¿Cómo te sientes hoy?"}
          {activeTab === "habits" && "Tus Hábitos"}
          {activeTab === "journal" && "Tu Diario"}
          {activeTab === "medals" && "Tus Medallas"}
        </motion.h1>
        <div className="mt-4">
          <XPDisplay />
        </div>
      </header>

       {/* Content */}
      <main className="flex-1 px-5 pb-24 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === "verse" && (
            <motion.div
              key="verse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DailyVerse />
              
            </motion.div>
          )}

          {activeTab === "mood" && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MoodTracker />
            </motion.div>
          )}

          {activeTab === "habits" && (
            <motion.div
              key="habits"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HabitsTracker />
            </motion.div>
          )}

          {activeTab === "journal" && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Journal />
            </motion.div>
          )}

          {activeTab === "medals" && (
            <motion.div
              key="medals"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Medals />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
