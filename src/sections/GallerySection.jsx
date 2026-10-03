import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function GallerySection() {
  const { gallery } = weddingConfig;
  
  if (!gallery || gallery.length === 0) return null;

  const [activeIndex, setActiveIndex] = useState(null);

  // Keyboard navigation for desktop
  const handleKeyDown = useCallback((e) => {
    if (activeIndex === null) return;
    if (e.key === 'Escape') setActiveIndex(null);
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
  }, [activeIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open to prevent background scrolling
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeIndex]);

  const navigate = (direction) => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      let next = prev + direction;
      if (next < 0) next = gallery.length - 1;
      if (next >= gallery.length) next = 0;
      return next;
    });
  };

  // Mobile swipe gesture support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) navigate(1); // Swiped Left
    if (distance < -minSwipeDistance) navigate(-1); // Swiped Right
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ivory-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-gold-base mb-2">Captured Moments</h2>
          <h3 className="font-serif text-3xl sm:text-5xl text-crimson-base tracking-wide">Photo Gallery</h3>
          <div className="divider-gold opacity-60 mt-2">
            <div className="divider-gold-icon" />
          </div>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {gallery.map((photo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
              className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-sm border border-gold-base/10 shadow-sm bg-white p-1"
              onClick={() => setActiveIndex(index)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                loading="lazy"
                className="w-full h-auto object-cover transform transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
              
              {/* Elegant Hover Overlay */}
              <div className="absolute inset-1 bg-gradient-to-t from-charcoal-base/80 via-charcoal-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="font-serif italic text-ivory-50 text-xl tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-sm">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-base/95 backdrop-blur-md"
            onClick={() => setActiveIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Desktop Navigation */}
            <button 
              className="hidden sm:flex absolute left-8 p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              className="hidden sm:flex absolute right-8 p-4 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Active Image Container (Supports Touch Swiping) */}
            <div 
              className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-12 relative"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={gallery[activeIndex].url} 
                  alt={gallery[activeIndex].caption}
                  className="max-w-full max-h-[85vh] object-contain rounded-sm drop-shadow-2xl pointer-events-none select-none"
                />
              </AnimatePresence>
              
              <motion.p 
                key={`caption-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-10 sm:bottom-12 left-0 right-0 font-serif italic text-ivory-50 text-xl sm:text-2xl tracking-wide text-center px-4 drop-shadow-md"
              >
                {gallery[activeIndex].caption}
              </motion.p>
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="absolute bottom-4 sm:hidden text-ivory-50/40 font-sans text-[0.65rem] uppercase tracking-widest pointer-events-none">
              Swipe to navigate
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
