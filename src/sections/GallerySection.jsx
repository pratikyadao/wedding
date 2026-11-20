import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function GallerySection({ speed = 55 }) {
  const { gallery } = weddingConfig;
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback((e) => {
    if (selectedIdx === null) return;
    if (e.key === 'Escape') {
      setSelectedIdx(null);
    } else if (e.key === 'ArrowLeft') {
      setSelectedIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
    } else if (e.key === 'ArrowRight') {
      setSelectedIdx((prev) => (prev + 1) % gallery.length);
    }
  }, [selectedIdx, gallery.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when Lightbox is active
  useEffect(() => {
    if (selectedIdx !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedIdx]);

  const handleLightboxTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleLightboxTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      setSelectedIdx((prev) => (prev + 1) % gallery.length);
    } else if (diff < -50) {
      setSelectedIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
    setTouchStartX(null);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-paper overflow-hidden flex flex-col items-center">
      
      {/* Decorative Frame Line */}
      <div className="absolute inset-4 border border-gold/20 pointer-events-none rounded-sm z-0" />

      {/* Floating Petal / Ambient Accents in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute -top-10 -right-10 w-44 h-44 text-gold/10" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
        <svg className="absolute -bottom-10 -left-10 w-52 h-52 text-gold/10" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col items-center text-center px-6 mb-10 sm:mb-14">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="font-sans text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.28em] text-gold font-semibold mb-2">
            Memories in Motion
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald mb-3 tracking-wide">
            Beautiful Moments
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto" />
          <p className="font-serif italic text-charcoal/70 text-xs sm:text-sm mt-3 max-w-xs leading-relaxed">
            A continuous cinematic journey through our cherished smiles, adventures, and endless love.
          </p>
        </motion.div>
      </div>

      {/* Continuous Seamless Film-Roll Marquee */}
      <div 
        className="film-roll-container relative w-full overflow-hidden select-none py-3"
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {/* Film Strip Border Accents Top & Bottom */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent pointer-events-none z-10" />

        {/* Soft Champagne-Gold / Ivory Gradient Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-paper via-paper/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-paper via-paper/80 to-transparent z-10" />

        {/* Dual Infinite Tracks moving from Right to Left */}
        <div className="flex w-max">
          
          {/* Track 1: First complete collection */}
          <div className="animate-film-roll flex items-center gap-3.5 sm:gap-5 md:gap-6 pr-3.5 sm:pr-5 md:pr-6 shrink-0">
            {gallery.map((photo, idx) => (
              <FilmRollPhotoCard
                key={`roll-a-${idx}`}
                photo={photo}
                index={idx}
                onSelect={() => setSelectedIdx(idx)}
              />
            ))}
          </div>

          {/* Track 2: Identical duplicate collection for 100% seamless infinite loop */}
          <div 
            className="animate-film-roll flex items-center gap-3.5 sm:gap-5 md:gap-6 pr-3.5 sm:pr-5 md:pr-6 shrink-0" 
            aria-hidden="true"
          >
            {gallery.map((photo, idx) => (
              <FilmRollPhotoCard
                key={`roll-b-${idx}`}
                photo={photo}
                index={idx}
                onSelect={() => setSelectedIdx(idx)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-center gap-3 text-center px-4">
        <span className="w-6 h-px bg-gold/40 hidden sm:inline-block" />
        <p className="font-sans text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.2em] text-charcoal/50">
          Hover to pause &bull; Tap photo to view full size
        </p>
        <span className="w-6 h-px bg-gold/40 hidden sm:inline-block" />
      </div>

      {/* Fullscreen Cinematic Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
          >
            {/* Top Bar: Counter & Close */}
            <div 
              className="w-full max-w-4xl flex items-center justify-between text-paper/80 pt-2 px-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-gold font-semibold">
                  Memories
                </span>
                <span className="font-serif italic text-paper/70 text-sm">
                  {selectedIdx + 1} of {gallery.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIdx(null)}
                className="w-10 h-10 rounded-full border border-gold/30 bg-black/50 text-paper/90 hover:text-white hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-200"
                aria-label="Close photo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Center Area: Photo & Navigation */}
            <div 
              className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto px-4"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleLightboxTouchStart}
              onTouchEnd={handleLightboxTouchEnd}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setSelectedIdx((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold/30 bg-black/60 text-paper/90 hover:text-white hover:border-gold hover:bg-gold/20 flex items-center justify-center transition-all duration-200 z-20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Photo Display with Smooth Fade Transition */}
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[72vh] max-w-full flex items-center justify-center rounded-xl overflow-hidden border border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black/40"
              >
                <img
                  src={gallery[selectedIdx].url}
                  alt={gallery[selectedIdx].caption || `Wedding moment ${selectedIdx + 1}`}
                  className="max-h-[72vh] max-w-[85vw] sm:max-w-[75vw] w-auto h-auto object-contain select-none"
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setSelectedIdx((prev) => (prev + 1) % gallery.length)}
                className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-gold/30 bg-black/60 text-paper/90 hover:text-white hover:border-gold hover:bg-gold/20 flex items-center justify-center transition-all duration-200 z-20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div 
              className="w-full max-w-2xl text-center pb-3 px-4 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif italic text-paper text-base sm:text-xl drop-shadow-md">
                "{gallery[selectedIdx].caption}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

/**
 * Individual Film-Roll Photo Card
 * Sized with consistent height, rounded corners, subtle gold borders and hover elevation
 */
function FilmRollPhotoCard({ photo, index, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="group/card relative cursor-pointer shrink-0 transition-transform duration-500 ease-out hover:-translate-y-1.5 focus:outline-none"
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${photo.caption || `Moment ${index + 1}`}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Outer film frame */}
      <div className="relative h-[230px] sm:h-[280px] md:h-[320px] w-[165px] sm:w-[200px] md:w-[230px] rounded-2xl overflow-hidden border border-gold/30 bg-paper/90 shadow-[0_6px_20px_rgba(0,0,0,0.06)] group-hover/card:shadow-[0_14px_32px_rgba(212,175,55,0.22)] group-hover/card:border-gold/60 transition-all duration-500">
        
        {/* Image */}
        <img
          src={photo.url}
          alt={photo.caption || `Wedding moment ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
        />

        {/* Cinematic gradient & hover caption overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-center">
          <p className="font-serif italic text-paper text-xs sm:text-sm drop-shadow-md line-clamp-2 leading-snug">
            "{photo.caption}"
          </p>
          <span className="font-sans text-[0.55rem] uppercase tracking-widest text-gold mt-1.5 font-semibold">
            Tap to enlarge
          </span>
        </div>
      </div>
    </div>
  );
}
