import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';
import { Calendar, MapPin, Music, Heart, Wine, Sun, Flower2, Gem } from 'lucide-react';

// Map configuration string icons to actual Lucide components
const IconMap = {
  Ring: Gem,
  Sun: Sun,
  Flower2: Flower2,
  Music: Music,
  Heart: Heart,
  Wine: Wine
};

export function EventsSection() {
  const { events, wedding } = weddingConfig;
  
  // Convert events object to array and only keep defined events
  const eventList = Object.values(events).filter(e => e && e.eventName);

  if (eventList.length === 0) return null;

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ivory-50 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-gold-light/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 bg-crimson-base/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-gold-base mb-2">Celebrations</h2>
          <h3 className="font-serif text-3xl sm:text-5xl text-crimson-base tracking-wide">Schedule of Events</h3>
          <div className="divider-gold opacity-60 mt-2">
            <div className="divider-gold-icon" />
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
          {eventList.map((event, index) => {
            const IconComponent = IconMap[event.icon] || Calendar;
            const mapUrl = event.googleMapsUrl || wedding.googleMapsUrl;

            return (
              <EventCard 
                key={index} 
                event={event} 
                Icon={IconComponent} 
                mapUrl={mapUrl}
                index={index} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, Icon, mapUrl, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="indian-card p-6 sm:p-8 flex flex-col h-full group hover:-translate-y-2"
    >
      {/* Corner Flourishes */}
      <div className="corner-flourish corner-tl" />
      <div className="corner-flourish corner-tr" />
      <div className="corner-flourish corner-bl" />
      <div className="corner-flourish corner-br" />

      {/* Top Icon */}
      <div className="w-12 h-12 rounded-full border border-gold-base/30 flex items-center justify-center text-gold-base mx-auto mb-5 group-hover:bg-gold-base/10 group-hover:border-gold-base/50 transition-all duration-500">
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h4 className="font-serif text-2xl sm:text-3xl text-crimson-base mb-3 text-center leading-tight">
        {event.eventName}
      </h4>
      
      {/* Cinematic Framed Image */}
      {event.image && (
        <div className="w-full aspect-[4/3] arch-frame cinematic-img-wrap my-3 border border-gold-base/20 p-1 bg-white/30">
          <img 
            src={event.image} 
            alt={event.eventName}
            loading="lazy"
            className="arch-frame"
          />
        </div>
      )}

      {/* Logistics / Info */}
      <div className="flex flex-col gap-2 w-full text-charcoal-muted font-sans text-[0.65rem] sm:text-xs uppercase tracking-widest text-center mt-3 mb-4">
        <div className="flex items-center justify-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-gold-base" />
          <span>{event.date} • {event.time}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mt-1">
          <MapPin className="w-3.5 h-3.5 text-gold-base shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>
      </div>

      {/* Description */}
      <p className="font-serif italic text-charcoal-muted leading-relaxed text-sm mb-8 text-center flex-1">
        "{event.description}"
      </p>

      {/* Action Button */}
      <a 
        href={mapUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="mt-auto w-full btn-outline py-3 text-[0.7rem] hover:bg-gold-base hover:text-white"
      >
        View Location
      </a>
    </motion.div>
  );
}
