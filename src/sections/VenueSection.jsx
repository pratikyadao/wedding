import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function VenueSection() {
  const { wedding } = weddingConfig;

  return (
    <section className="relative w-full py-24 bg-paper overflow-hidden flex flex-col items-center px-6">
      <div className="absolute inset-4 border border-gold/20 pointer-events-none rounded-sm z-0" />
      
      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl text-emerald mb-2">
            The Destination
          </h2>
          <div className="w-12 h-px bg-gold/50 mx-auto mt-4" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="indian-card bg-white p-6 sm:p-8 flex flex-col items-center text-center shadow-lg border border-gold/30 w-full"
        >
          <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-6">
            <MapPin className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-2xl text-emerald mb-2">
            {wedding.weddingVenue}
          </h3>
          
          <p className="font-sans text-[0.65rem] uppercase tracking-widest text-charcoal/80 mb-8 leading-relaxed max-w-[200px]">
            {wedding.venueAddress}
          </p>

          {/* Decorative Map Illustration (Abstract/Minimal) */}
          <div className="w-full h-32 bg-emerald/5 border border-gold/20 mb-8 flex items-center justify-center rounded-sm relative overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
             <Navigation className="w-8 h-8 text-gold opacity-50" />
          </div>

          <a 
            href={wedding.googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-outline w-full text-[0.65rem] flex items-center justify-center gap-2"
          >
            Open in Maps <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
