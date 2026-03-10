import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface XPPopupProps {
  amount: number;
  isVisible: boolean;
}

const XPPopup = ({ amount, isVisible }: XPPopupProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setKey((k) => k + 1);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      key={key}
      initial={{ opacity: 1, y: 0, x: -50 }}
      animate={{ opacity: 0, y: -80, x: 50 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="pointer-events-none fixed bottom-20 right-5 flex items-center gap-2 font-bold text-accent"
    >
      <Zap className="h-5 w-5" />
      <span className="text-lg">+{amount} XP</span>
    </motion.div>
  );
};

export default XPPopup;
