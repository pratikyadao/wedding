import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';
import { MapPin, ExternalLink } from 'lucide-react';

const Illustrations = {
  carnival: "🎡",
  sangeet: "🎵",
  wedding: "👑",
  reception: "🥂"
};

export function EventsSection() {
  const { events, wedding } = weddingConfig;
  const eventList = Object.keys(events).map(key => ({
    id: key,
    ...events[key]
  })).filter(e => e.eventName);

  if (eventList.length === 0) return null;

  return (
    <section className="relative w-full py-24 bg-paper overflow-hidden flex flex-col items-center px-6">
      <div className="absolute inset-4 border border-gold/20 pointer-events-none rounded-sm z-0" />
      
      <div className="max-w-md mx-auto w-full relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-emerald mb-4">
            The Celebration Unfolds
          </h2>
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-charcoal/70">
            All events will be hosted at
          </p>
          <p className="font-serif italic text-emerald text-lg mt-1">
            {wedding.weddingVenue}
          </p>
          <div className="w-12 h-px bg-gold/50 mx-auto mt-6" />
        </motion.div>

        <div className="flex flex-col gap-12 relative w-full">
          {eventList.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }) {
  const illustration = Illustrations[event.id] || "✨";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="indian-card bg-white p-6 sm:p-8 flex flex-col items-center text-center shadow-lg border border-gold/30 relative"
    >
      <div className="text-4xl mb-4">{illustration}</div>
      
      <h3 className="font-serif text-2xl sm:text-3xl text-emerald mb-4">
        {event.eventName}
      </h3>
      
      <div className="font-sans text-[0.65rem] uppercase tracking-widest text-charcoal mb-4 flex flex-col items-center gap-1 border-t border-b border-gold/20 py-3 w-full">
        <span className="font-bold text-gold">{event.date}</span>
        <span>{event.time}</span>
      </div>
      
      <p className="font-serif italic text-charcoal/80 leading-relaxed text-sm px-2">
        "{event.description}"
      </p>
    </motion.div>
  );
}
