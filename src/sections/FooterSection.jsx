import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';
import { Map, MessageCircle } from 'lucide-react';

export function FooterSection() {
  const { couple, wedding, rsvp, socialSharing } = weddingConfig;

  // Format RSVP WhatsApp Link
  const phone = weddingConfig.contactNumbers?.groomSide?.replace(/\D/g,'') || '';
  const rsvpUrl = `https://wa.me/${phone}?text=${encodeURIComponent(rsvp.message || '')}`;

  // Format Share Link
  const shareText = `${socialSharing.text}\n\n${socialSharing.url}`;
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <footer className="relative w-full py-28 sm:py-36 bg-charcoal-base flex flex-col items-center justify-center text-center overflow-hidden border-t border-gold-base/20">
      
      {/* Cinematic Final Background Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-base/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27 opacity=%270.03%27/%3E%3C/svg%3E')] opacity-30 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-6 flex flex-col items-center max-w-2xl mx-auto w-full"
      >
        {/* Monogram Seal */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gold-base/40 flex items-center justify-center text-gold-light font-serif text-xl sm:text-2xl tracking-widest bg-charcoal-base/80 backdrop-blur-sm shadow-[0_0_30px_rgba(200,155,60,0.1)] mb-8 sm:mb-10">
          {couple.groomName[0]}<span className="text-sm mx-1">&</span>{couple.brideName[0]}
        </div>

        {/* Heading */}
        <h2 className="font-script text-5xl sm:text-7xl text-gold-base mb-6 drop-shadow-md">
          See You There
        </h2>

        {/* Names */}
        <h3 className="font-serif text-5xl sm:text-7xl text-ivory-50 mb-6 drop-shadow-2xl flex flex-col sm:block break-words w-full">
          <span>{couple.groomName}</span> 
          <span className="font-script text-4xl sm:text-6xl text-gold-base mx-2 sm:mx-2 my-2 sm:my-0">&</span> 
          <span>{couple.brideName}</span>
        </h3>

        {/* Divider */}
        <div className="w-24 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-base/60 to-transparent mb-8 sm:mb-10" />

        {/* Logistics Details */}
        <div className="flex flex-col gap-3 font-sans text-[0.65rem] sm:text-xs uppercase tracking-[0.3em] text-gold-light/80 font-medium mb-10">
          <p>{wedding.weddingDate}</p>
          <p>{wedding.weddingVenue}</p>
        </div>

        {/* Emotional Message */}
        <p className="font-serif italic text-ivory-100/80 text-[1rem] sm:text-lg leading-relaxed mb-12 sm:mb-16 px-4 max-w-xl">
          "{weddingConfig.welcomeMessage}"
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 w-full">
          {/* Primary Solid Gold Button for RSVP (Conditional) */}
          {rsvp.enabled && (
            <a 
              href={rsvpUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gold-base text-charcoal-base px-8 py-3.5 rounded-sm font-sans text-[0.7rem] uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-500 shadow-[0_0_20px_rgba(200,155,60,0.25)] hover:shadow-[0_0_30px_rgba(200,155,60,0.4)] hover:-translate-y-1"
            >
              <MessageCircle className="w-4 h-4" />
              RSVP via WhatsApp
            </a>
          )}
          
          {/* Share on WhatsApp Button */}
          <a 
            href={shareUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-3.5 rounded-sm font-sans text-[0.7rem] uppercase tracking-[0.2em] font-semibold hover:bg-green-500 transition-all duration-500 shadow-[0_0_20px_rgba(22,163,74,0.25)] hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] hover:-translate-y-1"
          >
            <MessageCircle className="w-4 h-4" />
            Share Invite
          </a>

          {/* Secondary Outline Button for Map */}
          <a 
            href={wedding.googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 border border-gold-base/40 text-ivory-50 px-8 py-3.5 rounded-sm font-sans text-[0.7rem] uppercase tracking-[0.2em] font-semibold hover:bg-gold-base/10 hover:border-gold-base transition-all duration-500 hover:-translate-y-1"
          >
            <Map className="w-4 h-4" />
            View on Map
          </a>
        </div>

      </motion.div>

      {/* Subtle Copyright / Hashtag Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 w-full text-center z-10"
      >
        <p className="font-sans text-[0.5rem] uppercase tracking-[0.5em] text-gold-light/30">
          {socialSharing.hashtag}
        </p>
      </motion.div>
    </footer>
  );
}
