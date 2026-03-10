import { getDailyVerse } from "@/data/bible-verses";
import { motion } from "framer-motion";
import { BookOpen, Check } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useXP } from "@/hooks/useXP";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import XPPopup from "./XPPopup";

const today = () => new Date().toISOString().split("T")[0];

const DailyVerse = () => {
  const verse = getDailyVerse();
  const { addXP } = useXP();
  const [versesRead, setVersesRead] = useLocalStorage<string[]>("verses-read", []);
  const [showXPPopup, setShowXPPopup] = useState(false);

  const todayStr = today();
  const alreadyRead = versesRead.includes(todayStr);

  const handleVerseRead = () => {
    if (!alreadyRead) {
      addXP(15);
      setVersesRead([...versesRead, todayStr]);
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 2000);
    }
  };

  return (
    <>
      <XPPopup amount={15} isVisible={showXPPopup} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <motion.div
          className="rounded-2xl bg-primary p-6 shadow-soft"
        >
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-foreground/70" />
            <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/70">
              Versículo del día
            </span>
          </div>
          <p className="font-display text-lg italic leading-relaxed text-primary-foreground">
            "{verse.text}"
          </p>
          <p className="mt-3 text-sm font-semibold text-primary-foreground/80">
            — {verse.reference}
          </p>
        </motion.div>

        {/* Reflection prompt */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-3">
            Reflexión Diaria
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            Tómate un momento para meditar en este versículo. ¿Qué te dice Dios a través de estas palabras hoy? ¿Cómo puedes aplicarlo a tu vida?
          </p>
          
          {/* Did you read checkbox */}
          <div className="flex items-center gap-3 rounded-xl bg-accent/5 p-4 border border-accent/20">
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">¿Ya leíste el versículo?</p>
              <p className="text-xs text-muted-foreground mt-1">Confirma que reflexionaste en la palabra</p>
            </div>
            <Button
              onClick={handleVerseRead}
              disabled={alreadyRead}
              className="rounded-lg"
              variant={alreadyRead ? "secondary" : "default"}
            >
              {alreadyRead ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Completado
                </>
              ) : (
                <>
                  <span>Sí, reflexioné</span>
                  <span className="ml-2 text-xs font-bold">+15 XP</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DailyVerse;
