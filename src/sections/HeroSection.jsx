import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { weddingConfig } from '../data/config';

export function HeroSection() {
  const { couple, wedding, welcomeMessage } = weddingConfig;

  // Staggered cinematic animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-charcoal-base">
      
      {/* 
        Background Image with Cinematic Slow Zoom 
        Uses a very slow scale-down to emulate a high-end camera zoom
      */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        {/* Layered gradients for perfect text readability and luxurious dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-base/30 via-charcoal-base/50 to-charcoal-base/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-base/20 to-transparent z-10 mix-blend-multiply" />
        
        {/* Placeholder High-End Image */}
        <img 
          src="/couple-04.jpg" 
          alt="Wedding Background" 
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Decorative Outer Border Frame (Mobile friendly, elegant bounds) */}
      <div className="absolute inset-3 sm:inset-6 border border-gold-base/20 rounded-sm z-10 pointer-events-none" />
      <div className="absolute inset-4 sm:inset-7 border border-gold-base/10 rounded-sm z-10 pointer-events-none" />

      {/* Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full mt-8 sm:mt-12"
      >
        {/* Subtle Monogram or Crest */}
        <motion.div variants={fadeUpVariants} className="mb-6 sm:mb-10">
          <div className="w-14 h-14 rounded-full border border-gold-light/40 flex items-center justify-center text-gold-light font-serif text-xl tracking-widest bg-charcoal-base/20 backdrop-blur-md shadow-lg shadow-gold-base/5">
            {couple.groomName[0]}<span className="text-sm mx-0.5">&</span>{couple.brideName[0]}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          variants={fadeUpVariants}
          className="font-sans text-[0.6rem] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-gold-light/80 mb-4 sm:mb-6 font-medium"
        >
          The Wedding Celebration Of
        </motion.p>

        {/* The Couple Names */}
        <motion.h1 
          variants={fadeUpVariants}
          className="font-serif text-5xl sm:text-8xl md:text-9xl text-ivory-50 font-normal tracking-wide mb-2 sm:mb-4 leading-tight sm:leading-[1.1] drop-shadow-2xl break-words w-full flex flex-col sm:block justify-center items-center"
        >
          <span>{couple.groomName}</span> 
          <span className="font-script text-4xl sm:text-8xl text-gold-base mx-2 sm:mx-6 my-2 sm:my-0 inline-block transform sm:-translate-y-4">&</span> 
          <span>{couple.brideName}</span>
        </motion.h1>

        {/* Traditional Divider */}
        <motion.div variants={fadeUpVariants} className="divider-gold opacity-70 py-4 sm:py-6">
          <div className="divider-gold-icon bg-transparent border-gold-light" />
        </motion.div>

        {/* Date & Location */}
        <motion.div variants={fadeUpVariants} className="flex flex-col items-center gap-3 sm:gap-4 mt-2 mb-10 sm:mb-12">
          <p className="font-serif text-2xl sm:text-3xl text-ivory-100 tracking-widest">
            {wedding.weddingDate}
          </p>
          <p className="font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] text-gold-light/70">
            {wedding.weddingVenue}
          </p>
          <p className="font-serif italic text-ivory-100/80 text-sm sm:text-lg max-w-md mx-auto mt-4 leading-relaxed px-4">
            "{welcomeMessage}"
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={fadeUpVariants}>
          <button 
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline border-gold-base/60 text-ivory-50 hover:bg-gold-light hover:text-charcoal-base hover:border-gold-light shadow-[0_0_30px_rgba(200,155,60,0.15)] backdrop-blur-md bg-charcoal-base/30"
          >
            Explore Our Story
          </button>
        </motion.div>

      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="absolute bottom-6 sm:bottom-10 z-20 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="font-sans text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.3em] text-gold-light/50 transition-colors duration-500 group-hover:text-gold-light/90">
          Scroll to Discover
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gold-base/60 transition-colors duration-500 group-hover:text-gold-light" />
        </motion.div>
      </motion.div>

    </section>
  );
}
