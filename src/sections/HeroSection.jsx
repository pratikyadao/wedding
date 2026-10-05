import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { weddingConfig } from '../data/config';
import heroImg from '../assets/hero.png';

export function HeroSection() {
  const { couple, wedding, families } = weddingConfig;

  // Staggered cinematic animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start pt-20 pb-24 overflow-hidden bg-paper text-emerald">
      
      {/* Decorative Frame */}
      <div className="absolute inset-4 border border-gold/30 pointer-events-none rounded-sm z-0" />
      <div className="absolute inset-5 border border-gold/10 pointer-events-none rounded-sm z-0" />

      {/* Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto w-full mt-4"
      >

        {/* Hero Artwork - Using a real couple photograph */}
        <motion.div variants={fadeUpVariants} className="relative w-full aspect-[4/5] max-w-[280px] mb-8 mx-auto arch-frame border-2 border-gold/20 p-1 bg-white">
          <div className="w-full h-full arch-frame overflow-hidden relative">
            <img 
              src="/couple-04.jpg" 
              alt="Dipti and Shantanu" 
              className="w-full h-full object-cover object-top scale-105"
            />
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald/40 via-transparent to-transparent mix-blend-overlay" />
          </div>
        </motion.div>

        {/* The Couple Names with D/O and S/O */}
        <motion.div variants={fadeUpVariants} className="flex flex-col items-center mb-8 w-full">
          {/* Bride */}
          <h1 className="font-serif text-4xl sm:text-5xl text-emerald font-normal tracking-wide leading-tight uppercase mb-1">
            {couple.brideName}
          </h1>
          <p className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-charcoal/70 mb-4">
            D/O {families.brideSide.parents[0].names.replace('Mr. ', '').replace('Mrs. ', '')}
          </p>

          <span className="font-serif text-3xl text-gold my-2">&</span> 

          {/* Groom */}
          <h1 className="font-serif text-4xl sm:text-5xl text-emerald font-normal tracking-wide leading-tight uppercase mt-4 mb-1">
            {couple.groomName}
          </h1>
          <p className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-charcoal/70">
            S/O {families.groomSide.parents[0].names.replace('Mr. ', '').replace('Mrs. ', '')}
          </p>
        </motion.div>

        {/* Invitation Text */}
        <motion.div variants={fadeUpVariants} className="flex flex-col items-center gap-2 mb-12 px-4">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/70 mt-4 leading-relaxed">
            We invite you to celebrate our wedding
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-8 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-emerald/60">
          Scroll to Explore
        </span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
