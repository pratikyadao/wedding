import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function CoupleSection() {
  const { couple } = weddingConfig;

  // Fade up animation triggered when scrolling into view
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ivory-50 overflow-hidden">
      
      {/* Background Decorative Mandala/Texture Hint */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-base/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-crimson-base/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-gold-base mb-2">Two Souls</h2>
          <h3 className="font-serif text-3xl sm:text-5xl text-crimson-base tracking-wide">Meet The Couple</h3>
          <div className="divider-gold opacity-60 mt-2">
            <div className="divider-gold-icon" />
          </div>
        </motion.div>

        {/* Couple Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8">
          
          {/* Groom's Side */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex-1 flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-8">
              {/* Decorative Pedestal/Backdrop for Caricature */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold-base/20 to-gold-light/5 rounded-t-full rounded-b-md border border-gold-base/30 shadow-inner" />
              {/* Actual Photograph */}
              <img 
                src="/couple-02.jpg" 
                alt="Groom" 
                className="absolute inset-0 w-full h-full object-cover rounded-t-full rounded-b-md shadow-inner"
              />
            </div>
            
            <h3 className="font-serif text-3xl text-charcoal-base mb-2">{couple.groomFullName}</h3>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark mb-4">The Groom</p>
            <p className="font-serif italic text-charcoal-muted leading-relaxed px-4">
              "The thoughtful dreamer with an infectious smile and a heart full of unyielding devotion."
            </p>
          </motion.div>

          {/* Center Connection (Desktop & Mobile) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex lg:flex-col items-center justify-center gap-4 lg:gap-8 px-4"
          >
            <div className="w-16 h-px lg:w-px lg:h-24 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-gold-base/50 to-transparent" />
            
            <div className="w-12 h-12 rounded-full border border-gold-base/40 flex items-center justify-center bg-white shadow-md shadow-gold-base/10 relative">
              <Heart className="w-4 h-4 text-crimson-base fill-crimson-base/10 animate-pulse will-change-transform" />
              {/* Subtle pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-crimson-base/30 animate-ping opacity-20 will-change-transform" style={{ animationDuration: '3s' }} />
            </div>

            <div className="w-16 h-px lg:w-px lg:h-24 bg-gradient-to-r lg:bg-gradient-to-b from-gold-base/50 via-gold-base/50 to-transparent" />
          </motion.div>

          {/* Bride's Side */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="flex-1 flex flex-col items-center text-center max-w-sm"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-8">
              {/* Decorative Pedestal/Backdrop for Caricature */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold-base/20 to-gold-light/5 rounded-t-full rounded-b-md border border-gold-base/30 shadow-inner" />
              {/* Actual Photograph */}
              <img 
                src="/couple-03.jpg" 
                alt="Bride" 
                className="absolute inset-0 w-full h-full object-cover rounded-t-full rounded-b-md shadow-inner"
              />
            </div>
            
            <h3 className="font-serif text-3xl text-charcoal-base mb-2">{couple.brideFullName}</h3>
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark mb-4">The Bride</p>
            <p className="font-serif italic text-charcoal-muted leading-relaxed px-4">
              "The vibrant storyteller whose laughter lights up every room and brings endless joy to our journey."
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
