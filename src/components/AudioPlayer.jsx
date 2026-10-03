import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function AudioPlayer() {
  const { audio } = weddingConfig;
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  if (!audio || !audio.musicUrl) return null;

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Catch prevents unhandled promise rejections if browser blocks playback
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src={audio.musicUrl} loop preload="auto" />
      
      {/* Tooltip to encourage playing music if they haven't interacted yet */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="fixed bottom-8 right-24 sm:right-28 z-50 pointer-events-none"
          >
            <div className="bg-charcoal-base/80 backdrop-blur-md text-ivory-50 px-4 py-2 rounded-md border border-gold-base/30 shadow-lg font-sans text-xs tracking-widest uppercase flex items-center gap-2">
              <Music className="w-3 h-3 text-gold-base" />
              Play Music
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={togglePlay}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3.5 rounded-full bg-white/70 backdrop-blur-md border border-gold-base/40 shadow-[0_8px_32px_rgba(107,28,40,0.15)] flex items-center justify-center text-gold-dark hover:bg-gold-base/10 transition-all duration-300"
        aria-label="Toggle background music"
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="will-change-transform"
          >
            <Disc className="w-6 h-6 text-crimson-base" />
          </motion.div>
        ) : (
          <VolumeX className="w-6 h-6 text-gold-base" />
        )}
      </motion.button>
    </>
  );
}
