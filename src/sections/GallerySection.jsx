import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function GallerySection() {
  const { gallery } = weddingConfig;
  
  if (!gallery || gallery.length === 0) return null;

  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);

  // Wrap around index
  const imageIndex = Math.abs(page % gallery.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95
      };
    }
  };

  return (
    <section className="relative w-full py-24 bg-charcoal overflow-hidden flex flex-col items-center px-6">
      <div className="absolute inset-4 border border-gold/10 pointer-events-none rounded-sm z-0" />
      
      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl text-gold mb-2">
            Beautiful Moments
          </h2>
          <div className="w-12 h-px bg-gold/30 mx-auto mt-4" />
        </motion.div>

        {/* Portrait Focused Slider */}
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] flex items-center justify-center overflow-hidden rounded-md border border-gold/40 shadow-2xl bg-black">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={page}
              src={gallery[imageIndex].url}
              alt={gallery[imageIndex].caption}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              loading="lazy"
              className="absolute w-full h-full object-cover rounded-md pointer-events-auto cursor-grab active:cursor-grabbing"
            />
          </AnimatePresence>

          {/* Navigation Controls */}
          {!isDragging && (
            <>
              <button 
                className="absolute left-2 p-2 rounded-full bg-charcoal/50 text-gold hover:bg-gold/20 backdrop-blur-md transition-colors z-20"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                className="absolute right-2 p-2 rounded-full bg-charcoal/50 text-gold hover:bg-gold/20 backdrop-blur-md transition-colors z-20"
                onClick={() => paginate(1)}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10 flex flex-col items-center text-center">
            <span className="font-serif italic text-paper text-lg tracking-wide drop-shadow-md">
              {gallery[imageIndex].caption}
            </span>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-[80%]">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newDirection = idx > imageIndex ? 1 : -1;
                setPage([page + (idx - imageIndex), newDirection]);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === imageIndex ? 'bg-gold scale-125' : 'bg-gold/30 hover:bg-gold/60'}`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
