import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingConfig } from '../../data/config';

export default function AudioController({ audioRef, isPlaying, toggleAudio, show }) {
  const { audio } = weddingConfig;

  return (
    <>
      <audio ref={audioRef} src={audio.musicUrl} loop preload="auto" />
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 rounded-full bg-paper/80 backdrop-blur-md border border-gold/40 shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center text-gold hover:bg-gold/10 transition-all duration-300"
            aria-label="Toggle background music"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
          >
            {isPlaying ? (
              <Volume2 className="w-6 h-6 text-emerald" />
            ) : (
              <VolumeX className="w-6 h-6 text-gold" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
