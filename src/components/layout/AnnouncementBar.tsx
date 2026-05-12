import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, X } from 'lucide-react';
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
    <div className="relative bg-secondary/60 text-foreground py-2 px-4 overflow-hidden z-50 border-b border-border/40">
      <div className="flex items-center justify-center gap-2.5">
        <Truck className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.75} />
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.22em] uppercase text-foreground/80"
          >
            {messages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
