import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PearlSeal({ onClick }) {
  const [isTapped, setIsTapped] = useState(false);

  const handleTap = () => {
    if (isTapped) return;
    setIsTapped(true);
    onClick();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 z-50">
      <motion.button
        onClick={handleTap}
        disabled={isTapped}
        className="relative w-24 h-24 rounded-full bg-[#FAF7F2] shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_-4px_10px_rgba(0,0,0,0.1),inset_0_4px_10px_rgba(255,255,255,0.8)] border-2 border-[#D4AF37] flex items-center justify-center cursor-pointer touch-manipulation group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isTapped
            ? "0 0 40px rgba(212,175,55,0.8)"
            : "0 4px 15px rgba(0,0,0,0.5)",
        }}
      >
        <div className="absolute inset-1 rounded-full border border-[#D4AF37]/50" />
        <span className="font-serif text-[#1B382B] text-2xl font-bold tracking-widest relative z-10">
          D&S
        </span>
        
        {/* Subtle shimmer effect */}
        {!isTapped && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.button>
      
      <motion.p
        className="text-[#D4AF37] text-xs tracking-[0.3em] font-sans uppercase"
        animate={{ opacity: isTapped ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to reveal
      </motion.p>
    </div>
  );
}
