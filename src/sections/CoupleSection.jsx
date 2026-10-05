import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';

export function CoupleSection() {
  const { couple, wedding, families } = weddingConfig;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative w-full py-24 bg-paper overflow-hidden flex flex-col items-center px-6">
      <div className="absolute inset-4 border border-gold/20 pointer-events-none rounded-sm z-0" />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-md mx-auto relative z-10 text-center flex flex-col items-center"
      >
        <motion.div variants={fadeUp} className="mb-10 w-full flex justify-center">
          <div className="w-16 h-16 border-t border-b border-gold/40 flex items-center justify-center">
            <div className="w-8 h-8 border-l border-r border-gold/40 rotate-45" />
          </div>
        </motion.div>

        <motion.p variants={fadeUp} className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-charcoal/80 mb-8 leading-loose">
          {families.brideSide.parents[0].names} <br/> & <br/> {families.groomSide.parents[0].names}
        </motion.p>
        
        <motion.p variants={fadeUp} className="font-serif italic text-lg text-charcoal mb-8 px-4">
          Joyfully invite you to share in their happiness as they celebrate the marriage of their children
        </motion.p>

        <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl text-emerald mb-2">
          {couple.brideName}
        </motion.h2>
        
        <motion.span variants={fadeUp} className="font-serif text-xl text-gold mb-2">
          &
        </motion.span>
        
        <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl text-emerald mb-10">
          {couple.groomName}
        </motion.h2>

        <motion.div variants={fadeUp} className="w-px h-16 bg-gradient-to-b from-transparent via-gold/50 to-transparent mb-10" />

        <motion.p variants={fadeUp} className="font-serif text-2xl text-charcoal tracking-wide mb-4">
          {wedding.weddingDate}
        </motion.p>

        <motion.p variants={fadeUp} className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-charcoal/70">
          {wedding.weddingTime}
        </motion.p>
        
      </motion.div>
    </section>
  );
}
