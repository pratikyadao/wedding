import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Events', href: '#events' },
  { name: 'Venue', href: '#venue' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'RSVP', href: '#rsvp' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-paper/90 backdrop-blur-md shadow-md border-b border-gold/20 py-3' : 'bg-transparent py-4'}`}
      >
        <div className="max-w-md mx-auto px-6 flex items-center justify-between">
          <div className="font-serif text-xl text-emerald font-bold tracking-widest">
            D & S
          </div>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-emerald hover:text-gold transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-emerald/95 backdrop-blur-lg flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-gold hover:text-paper transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-serif text-3xl sm:text-4xl text-paper hover:text-gold transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <div className="absolute bottom-12 w-12 h-px bg-gold/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
