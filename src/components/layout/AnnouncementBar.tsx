import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AnnouncementBar() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const messages = [
    t.announcement.freeShipping,
    t.announcement.newDrops,
    t.announcement.limitedEdition,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary text-primary-foreground py-2 px-4 text-center overflow-hidden z-50">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs sm:text-sm font-medium tracking-wider uppercase"
        >
          {messages[currentIndex]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
