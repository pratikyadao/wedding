import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PearlSeal from './PearlSeal';

export default function EnvelopeOpening({ onOpenComplete, onSealTap }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  const handleSealTap = () => {
    setIsOpen(true);
    if (onSealTap) onSealTap();
    
    // Trigger glow after flap opens
    setTimeout(() => {
      setShowGlow(true);
    }, 800);
    
    // Complete the opening sequence
    setTimeout(() => {
      onOpenComplete();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-emerald overflow-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Intricate Gold Filigree / Background Ornamentation */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="filigree" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 C75 25 25 75 50 100 C75 75 25 25 50 0 Z" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
                <circle cx="50" cy="50" r="2" fill="#D4AF37"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#filigree)" />
          </svg>
        </div>

        {/* Elegant Gold Border */}
        <div className="absolute inset-4 border border-gold/30 rounded-lg pointer-events-none md:max-w-md md:mx-auto md:inset-y-4 md:inset-x-auto md:w-full md:border-x" />

        {/* 3D Envelope Container */}
        <div className="relative w-full max-w-md aspect-[3/4] max-h-[80vh] flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
          
          {/* Main Envelope Body */}
          <div className="absolute inset-4 bg-emerald border border-gold/40 shadow-2xl rounded-sm flex flex-col items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* The Couple Monogram */}
            <div className="absolute top-1/4 text-center">
              <h1 className="font-serif text-5xl text-gold mb-2">D & S</h1>
              <div className="h-px w-24 bg-gold/50 mx-auto" />
            </div>

            {/* The Flap */}
            <motion.div 
              className="absolute top-0 inset-x-0 h-[60%] bg-emerald border-b border-gold/40 origin-top z-20 flex items-end justify-center pb-8 shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
              }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            />
            
            {/* Flap inside (backface) */}
            <motion.div 
              className="absolute top-0 inset-x-0 h-[60%] bg-emerald border-t border-gold/20 origin-top z-10 flex items-start justify-center pt-8"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                backfaceVisibility: 'hidden',
              }}
              animate={{ rotateX: isOpen ? 0 : -180 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Optional: Gold lining on the inside of the flap */}
              <div className="absolute inset-0 bg-gold/10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            </motion.div>

            {/* Pearl Seal */}
            <div className="absolute top-[60%] -mt-12 z-30 transition-opacity duration-500" style={{ opacity: isOpen ? 0 : 1 }}>
              <PearlSeal onClick={handleSealTap} />
            </div>
            
          </div>

          {/* Golden Glow effect */}
          <AnimatePresence>
            {showGlow && (
              <motion.div 
                className="absolute inset-0 z-40 bg-radial from-gold/80 via-gold/40 to-transparent blur-xl mix-blend-screen"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
