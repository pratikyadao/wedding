import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { weddingConfig } from '../data/config';

const navItems = [
  { label: 'Home', href: '#home' },
  ...(weddingConfig.coupleStory && weddingConfig.coupleStory.length > 0 ? [{ label: 'Our Story', href: '#story' }] : []),
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  ...(weddingConfig.rsvp.enabled ? [{ label: 'RSVP', href: '#rsvp' }] : []),
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { couple } = weddingConfig;

  // Handle scroll detection and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Toggle blur/background when scrolled past 50px
      setIsScrolled(window.scrollY > 50);

      // Calculate which section is currently visible
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on a comfortable reading position
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollTo = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-charcoal-base/90 backdrop-blur-md py-4 shadow-lg border-b border-gold-base/10' 
            : 'bg-gradient-to-b from-charcoal-base/60 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo / Initials */}
          <div 
            className="font-serif text-2xl text-gold-light cursor-pointer hover:text-gold-base transition-colors" 
            onClick={() => scrollTo('#home')}
          >
            {couple.groomName[0]} & {couple.brideName[0]}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className={`font-sans text-[0.65rem] uppercase tracking-[0.2em] transition-all duration-300 relative ${
                  activeSection === item.href.substring(1) 
                    ? 'text-gold-base font-semibold' 
                    : 'text-ivory-50/70 hover:text-ivory-50'
                }`}
              >
                {item.label}
                {/* Active Indicator Underline */}
                {activeSection === item.href.substring(1) && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gold-base"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gold-light p-2 -mr-2 hover:text-gold-base transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-charcoal-base/95 flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-gold-light p-3 hover:text-gold-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="w-8 h-8" />
            </button>
            
            <nav className="flex flex-col items-center gap-8 sm:gap-10 overflow-y-auto max-h-[75vh] w-full px-4 scrollbar-hide py-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  onClick={() => scrollTo(item.href)}
                  className={`font-serif text-2xl sm:text-4xl tracking-widest uppercase transition-colors flex-shrink-0 ${
                    activeSection === item.href.substring(1) 
                      ? 'text-gold-base drop-shadow-md' 
                      : 'text-ivory-50 hover:text-ivory-100'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
            
            {/* Decorative bottom element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-16 divider-gold opacity-50"
            >
              <div className="divider-gold-icon" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
