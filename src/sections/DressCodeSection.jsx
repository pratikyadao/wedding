import { motion } from 'framer-motion';

const dressCodeData = [
  {
    event: "Carnival & Haldi",
    vibe: "Festive Yellow / Pastel / Floral",
    desc: "Light, breezy, and cheerful yellow & floral attire for sunshine and flower petals.",
    color: "bg-amber-100/20",
    illustration: "🌸",
    avatar: "/avatar-haldi.jpg"
  },
  {
    event: "Sangeet",
    vibe: "Royal Blue & Evening Glamour",
    desc: "Glamorous jewel tones and comfortable ethnic wear for an electric night of dancing.",
    color: "bg-emerald/20",
    illustration: "✨",
    avatar: "/avatar-sangeet.jpg"
  },
  {
    event: "Wedding Ceremony",
    vibe: "Traditional Maharashtrian / Royal Red & Gold",
    desc: "Graceful Paithani sarees, kurtas, and traditional gold elegance for the sacred vows.",
    color: "bg-gold/20",
    illustration: "👑",
    avatar: "/avatar-wedding.jpg"
  },
  {
    event: "Reception",
    vibe: "Royal Formal / Deep Maroon & Velvet Navy",
    desc: "Black-tie formals, regal lehengas, and tuxedos celebrating the grand night in style.",
    color: "bg-charcoal/10",
    illustration: "🥂",
    avatar: "/avatar-reception.jpg"
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
              <div className="w-16 h-20 rounded-md overflow-hidden shrink-0 border border-gold/40 shadow-sm bg-paper/10 flex items-center justify-center">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.event} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{item.illustration}</span>
                )}
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
