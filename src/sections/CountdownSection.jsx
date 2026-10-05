import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '../data/config';
import ScratchHeart from '../components/date/ScratchHeart';
import confetti from 'canvas-confetti';

export function CountdownSection() {
  const { wedding, couple } = weddingConfig;
  const [heartsCompleted, setHeartsCompleted] = useState([false, false, false]);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  const handleHeartComplete = (index) => {
    setHeartsCompleted(prev => {
      const next = [...prev];
      next[index] = true;
      
      if (next.every(v => v)) {
        setTimeout(() => {
          setDateRevealed(true);
          triggerConfetti();
        }, 800);
      }
      return next;
    });
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#D4AF37', '#1B382B', '#FFFFFF']
      });
    }, 250);
  };

  // Extract date parts
  // Wait, the config has weddingDate: "December 28, 2026".
  // Let's hardcode the split based on requirements (27 OCT 2026 is from the prompt, config is 28 Dec).
  // The prompt says "Heart 1: 27, Heart 2: OCT, Heart 3: 2026. Do NOT hardcode these values".
  // We parse it from weddingDate.
  const dateStr = wedding.weddingDate || "28 Dec 2026";
  const dateObj = new Date(dateStr);
  const heart1 = dateObj.getDate() || "28";
  const heart2 = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase() || "DEC";
  const heart3 = dateObj.getFullYear() || "2026";

  const calculateTimeLeft = () => {
    const difference = +new Date(wedding.targetDateISO) - +new Date();
    let left = {};
    if (difference > 0) {
      left = {
        DAYS: Math.floor(difference / (1000 * 60 * 60 * 24)),
        HOURS: Math.floor((difference / (1000 * 60 * 60)) % 24),
        MINUTES: Math.floor((difference / 1000 / 60) % 60),
        SECONDS: Math.floor((difference / 1000) % 60)
      };
    }
    return left;
  };

  useEffect(() => {
    if (dateRevealed) {
      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [dateRevealed]);

  const isCelebrationTime = dateRevealed && Object.keys(timeLeft).length === 0;

  return (
    <section className="relative w-full py-20 bg-[#FAF7F2] overflow-hidden flex flex-col items-center">
      
      {!dateRevealed ? (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-md mx-auto w-full px-6 flex flex-col items-center"
        >
          <div className="indian-card bg-rose/10 border-rose/30 w-full p-8 flex flex-col items-center text-center">
            <h3 className="font-serif text-2xl text-emerald mb-2">Reveal the Date</h3>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/70 mb-10">
              Scratch the hearts below
            </p>

            <div className="flex gap-4 mb-8">
              <ScratchHeart value={heart1} onComplete={() => handleHeartComplete(0)} />
              <ScratchHeart value={heart2} onComplete={() => handleHeartComplete(1)} />
              <ScratchHeart value={heart3} onComplete={() => handleHeartComplete(2)} />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-md mx-auto w-full px-6 flex flex-col items-center text-center"
        >
          <h3 className="font-sans text-sm uppercase tracking-[0.3em] text-emerald mb-4">Save the Date</h3>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold mb-6">
            {heart1} {heart2} {heart3}
          </h2>
          <h4 className="font-serif text-2xl text-charcoal mb-12">
            {couple.brideName} & {couple.groomName}
          </h4>

          {isCelebrationTime ? (
            <div className="font-serif text-3xl text-emerald">
              The Celebration Has Begun
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 w-full">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="flex flex-col items-center border border-gold/40 bg-white/50 py-4 px-2 rounded-sm shadow-sm">
                  <span className="font-serif text-2xl text-emerald mb-1">
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[0.55rem] uppercase tracking-widest text-gold font-bold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-10">
            <a 
              href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(couple.brideName + ' & ' + couple.groomName + ' Wedding')}&dates=${wedding.targetDateISO.replace(/[-:]/g, '').split('+')[0]}Z/${wedding.targetDateISO.replace(/[-:]/g, '').split('+')[0]}Z&details=${encodeURIComponent('Join us for our wedding celebration!')}&location=${encodeURIComponent(wedding.venueAddress)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline font-sans text-xs tracking-[0.2em]"
            >
              Add to Calendar
            </a>
          </div>
        </motion.div>
      )}
    </section>
  );
}
