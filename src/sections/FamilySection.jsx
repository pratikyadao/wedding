import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';

export function FamilySection() {
  const { families } = weddingConfig;
  
  if (!families) return null;

  return (
    <section className="relative w-full py-28 sm:py-40 bg-ivory-50 overflow-hidden">
      
      {/* Extremely subtle corner mandalas / decorative textures */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.015]" 
           style={{ backgroundImage: 'radial-gradient(circle, #C89B3C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20 sm:mb-28"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-gold-base mb-3 drop-shadow-sm">With the Blessings Of</h2>
          <h3 className="font-serif text-3xl sm:text-5xl text-crimson-base tracking-wide">Our Families</h3>
          <div className="divider-gold opacity-50 mt-4">
            <div className="divider-gold-icon" />
          </div>
        </motion.div>

        {/* Families Container */}
        <div className="flex flex-col md:flex-row justify-center gap-16 md:gap-4 lg:gap-12 relative">
          
          {/* Groom's Family */}
          <FamilyColumn side={families.groomSide} delay={0.2} />
          
          {/* Desktop Divider */}
          <div className="hidden md:flex flex-col items-center justify-center px-4 lg:px-8 opacity-60">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-gold-base to-transparent" />
          </div>
          
          {/* Mobile Divider */}
          <div className="flex md:hidden items-center justify-center py-4 opacity-40">
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-gold-base to-transparent" />
          </div>

          {/* Bride's Family */}
          <FamilyColumn side={families.brideSide} delay={0.4} />

        </div>
      </div>
    </section>
  );
}

function FamilyColumn({ side, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="flex-1 flex flex-col items-center text-center"
    >
      {/* Side Title */}
      <h4 className="font-script text-4xl sm:text-5xl text-gold-dark mb-10 sm:mb-14 drop-shadow-sm">
        {side.title}
      </h4>
      
      {/* Family Hierarchy */}
      <div className="flex flex-col gap-10 sm:gap-14 w-full">
        <FamilyGroup data={side.grandparents} />
        <FamilyGroup data={side.parents} />
        <FamilyGroup data={side.others} />
      </div>
    </motion.div>
  );
}

function FamilyGroup({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <div className="flex flex-col gap-8">
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-3 group">
          <span className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.35em] text-gold-dark/80 font-semibold transition-colors duration-500 group-hover:text-gold-dark">
            {item.relation}
          </span>
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal-base leading-tight transition-all duration-500 group-hover:text-crimson-base">
            {item.names}
          </p>
        </div>
      ))}
    </div>
  );
}
