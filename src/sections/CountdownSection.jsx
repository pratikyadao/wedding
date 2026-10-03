import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../data/config';
import { Clock } from 'lucide-react';

export function CountdownSection() {
  const { wedding } = weddingConfig;
  
  const calculateTimeLeft = () => {
    // Parse the ISO string to handle timezone precisely
    const difference = +new Date(wedding.targetDateISO) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch by only rendering after mount
  if (!hasMounted) return null;

  const isCelebrationTime = Object.keys(timeLeft).length === 0;

  return (
    <section className="relative w-full py-20 sm:py-28 bg-charcoal-base overflow-hidden border-y border-gold-base/20">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27 opacity=%270.03%27/%3E%3C/svg%3E')] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-32 bg-gold-base/10 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center mb-10"
        >
          <Clock className="w-6 h-6 text-gold-base mb-4 opacity-80" />
          <h2 className="font-script text-3xl sm:text-4xl text-gold-base mb-2">Awaiting the Day</h2>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 tracking-widest uppercase">The Countdown</h3>
        </motion.div>

        {isCelebrationTime ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="indian-card bg-white/10 border-gold-base/30 py-12 px-6 sm:p-12"
          >
            <h4 className="font-serif text-4xl sm:text-6xl text-gold-light drop-shadow-lg">
              The Celebration Has Begun!
            </h4>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {Object.entries(timeLeft).map(([interval, value], index) => (
              <motion.div 
                key={interval}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative bg-white/5 backdrop-blur-md border border-gold-base/30 p-6 sm:p-8 rounded-sm shadow-[0_0_30px_rgba(200,155,60,0.05)] overflow-hidden group"
              >
                {/* Decorative corner accents */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold-base/50" />
                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold-base/50" />
                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold-base/50" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold-base/50" />

                {/* Animated Number */}
                <div className="font-serif text-4xl sm:text-6xl text-ivory-50 mb-2 relative h-16 flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={value}
                      initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute"
                    >
                      {String(value).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                
                {/* Unit Label */}
                <div className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-gold-base font-semibold">
                  {interval}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
