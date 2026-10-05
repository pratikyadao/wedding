import { motion } from 'framer-motion';

const dressCodeData = [
  {
    event: "Carnival",
    vibe: "Festive / Pastel / Floral",
    desc: "Light, breezy, and colorful attire perfect for a playful afternoon.",
    color: "bg-rose/20",
    illustration: "🌸"
  },
  {
    event: "Sangeet",
    vibe: "Elegant Evening Wear",
    desc: "Glamorous and comfortable for a night of dancing.",
    color: "bg-emerald/20",
    illustration: "✨"
  },
  {
    event: "Wedding",
    vibe: "Traditional / Maharashtrian Attire",
    desc: "Graceful traditional wear for the morning ceremony.",
    color: "bg-gold/20",
    illustration: "👑"
  },
  {
    event: "Reception",
    vibe: "Royal Formal / Evening Glamour",
    desc: "Sophisticated attire to celebrate the evening in style.",
    color: "bg-charcoal/10",
    illustration: "🥂"
  }
];

export function DressCodeSection() {
  return (
    <section className="relative w-full py-24 bg-emerald overflow-hidden flex flex-col items-center px-6">
      <div className="max-w-md mx-auto w-full relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl text-gold mb-2">
            Dress Code
          </h2>
          <div className="w-12 h-px bg-gold/30 mx-auto mt-4" />
        </motion.div>

        <div className="flex flex-col gap-6 w-full">
          {dressCodeData.map((item, index) => (
            <motion.div 
              key={item.event}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center gap-4 bg-paper/5 border border-gold/20 p-4 rounded-sm"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0 ${item.color} border border-gold/30`}>
                {item.illustration}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-[0.55rem] uppercase tracking-widest text-gold mb-1">
                  {item.event}
                </span>
                <h4 className="font-serif text-lg text-paper mb-1 leading-none">
                  {item.vibe}
                </h4>
                <p className="font-serif italic text-paper/70 text-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
