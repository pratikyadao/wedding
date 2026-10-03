import { motion } from 'framer-motion';
import { weddingConfig } from '../data/config';

export function StorySection() {
  const { coupleStory } = weddingConfig;
  if (!coupleStory || coupleStory.length === 0) return null;

  return (
    <section className="relative w-full py-24 sm:py-32 bg-ivory-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
          className="text-center mb-20 sm:mb-28"
        >
          <h2 className="font-script text-4xl sm:text-5xl text-gold-base mb-2">The Journey</h2>
          <h3 className="font-serif text-3xl sm:text-5xl text-crimson-base tracking-wide">Our Story</h3>
          <div className="divider-gold opacity-60 mt-2">
            <div className="divider-gold-icon" />
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center/Left Line */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold-base/30 to-transparent md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="flex flex-col gap-16 md:gap-24">
            {coupleStory.map((story, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Marker Dot (Sits on the vertical line) */}
                  <div className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-ivory-50 border-2 border-gold-base shadow-[0_0_15px_rgba(200,155,60,0.5)] transform -translate-x-1/2 z-20 mt-8 md:mt-0" />

                  {/* Mobile & Desktop Layout Helper */}
                  {isEven ? (
                    <>
                      {/* Left Side Content (Desktop) / Full Width (Mobile) */}
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-16"
                      >
                        <StoryCard story={story} />
                      </motion.div>
                      {/* Right Side Empty */}
                      <div className="hidden md:block w-1/2" />
                    </>
                  ) : (
                    <>
                      {/* Left Side Empty */}
                      <div className="hidden md:block w-1/2" />
                      {/* Right Side Content (Desktop) / Full Width (Mobile) */}
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full md:w-1/2 pl-12 md:pl-16"
                      >
                        <StoryCard story={story} />
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}

function StoryCard({ story }) {
  return (
    <div className="indian-card p-5 sm:p-8 flex flex-col items-center text-center gap-4 relative group hover:border-gold-base/40">
      {/* Corner Flourishes */}
      <div className="corner-flourish corner-tl" />
      <div className="corner-flourish corner-tr" />
      <div className="corner-flourish corner-bl" />
      <div className="corner-flourish corner-br" />

      {/* Date */}
      <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-gold-dark font-semibold">
        {story.date}
      </span>
      
      {/* Title */}
      <h4 className="font-serif text-3xl sm:text-4xl text-crimson-base leading-tight">
        {story.title}
      </h4>
      
      {/* Cinematic Framed Image */}
      <div className="w-full aspect-[4/5] sm:aspect-square arch-frame cinematic-img-wrap my-4 border border-gold-base/20 p-1 bg-white/30">
        <img 
          src={story.image} 
          alt={story.title}
          loading="lazy"
          className="arch-frame"
        />
      </div>
      
      {/* Description */}
      <p className="font-serif italic text-charcoal-muted leading-relaxed text-sm sm:text-base">
        "{story.description}"
      </p>
    </div>
  );
}
