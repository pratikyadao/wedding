import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rsvpChips = [
  { id: 'food', label: 'Food 🍽️' },
  { id: 'music', label: 'Music 🎵' },
  { id: 'vibes', label: 'Vibes ✨' },
  { id: 'everything', label: 'Everything! 🎉' }
];

export function FooterSection() {
  const [formData, setFormData] = useState({
    name1: '',
    name2: '',
    phone: '',
    song: '',
    advice: '',
    chips: []
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});

  const handleChipToggle = (chipId) => {
    setFormData(prev => {
      const isSelected = prev.chips.includes(chipId);
      if (chipId === 'everything') {
        return { ...prev, chips: isSelected ? [] : ['everything'] };
      } else {
        let newChips = isSelected 
          ? prev.chips.filter(id => id !== chipId) 
          : [...prev.chips.filter(id => id !== 'everything'), chipId];
        return { ...prev, chips: newChips };
      }
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name1.trim()) newErrors.name1 = 'Primary guest name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    
    // Clean API abstraction: simulate network request
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, this would be a fetch call to an API route (e.g. Next.js API or Supabase)
      // await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(formData) });
      setStatus('success');
    } catch (err) {
      console.error('RSVP Submission failed', err);
      setStatus('error');
    }
  };

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
            R.S.V.P
          </h2>
          <div className="w-12 h-px bg-gold/50 mx-auto mt-4" />
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="indian-card bg-emerald/5 p-8 flex flex-col items-center text-center w-full border border-gold/40 shadow-xl rounded-sm"
            >
              <h3 className="font-serif text-3xl text-emerald mb-4">Thank You</h3>
              <p className="font-serif italic text-charcoal/80 leading-relaxed mb-6">
                Your RSVP has been received. We can't wait to celebrate with you.
              </p>
              <p className="font-serif text-lg text-gold">With love,<br/>Dipti & Shantanu</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <form onSubmit={handleSubmit} className="indian-card bg-white p-6 sm:p-8 flex flex-col w-full border border-gold/30 shadow-lg rounded-sm relative">
                {/* Decorative border inside form */}
                <div className="absolute inset-2 border border-gold/10 pointer-events-none rounded-sm" />

                <div className="relative z-10 flex flex-col gap-5 w-full">
                  
                  {/* Name 1 */}
                  <div>
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-1 ml-1">
                      Full Name 1 *
                    </label>
                    <input 
                      type="text" 
                      value={formData.name1}
                      onChange={e => setFormData({...formData, name1: e.target.value})}
                      className={`w-full bg-paper/50 border-b ${errors.name1 ? 'border-red-400' : 'border-gold/30'} py-2 px-3 focus:outline-none focus:border-emerald font-serif text-charcoal transition-colors`}
                      placeholder="Guest 1 Name"
                    />
                    {errors.name1 && <span className="text-[0.6rem] text-red-500 uppercase tracking-wider mt-1">{errors.name1}</span>}
                  </div>

                  {/* Name 2 */}
                  <div>
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-1 ml-1">
                      Full Name 2
                    </label>
                    <input 
                      type="text" 
                      value={formData.name2}
                      onChange={e => setFormData({...formData, name2: e.target.value})}
                      className="w-full bg-paper/50 border-b border-gold/30 py-2 px-3 focus:outline-none focus:border-emerald font-serif text-charcoal transition-colors"
                      placeholder="Optional Guest 2 Name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-1 ml-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={`w-full bg-paper/50 border-b ${errors.phone ? 'border-red-400' : 'border-gold/30'} py-2 px-3 focus:outline-none focus:border-emerald font-serif text-charcoal transition-colors`}
                      placeholder="e.g. +91 9876543210"
                    />
                    {errors.phone && <span className="text-[0.6rem] text-red-500 uppercase tracking-wider mt-1">{errors.phone}</span>}
                  </div>

                  {/* Song Request */}
                  <div>
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-1 ml-1">
                      What gets you on the dance floor?
                    </label>
                    <input 
                      type="text" 
                      value={formData.song}
                      onChange={e => setFormData({...formData, song: e.target.value})}
                      className="w-full bg-paper/50 border-b border-gold/30 py-2 px-3 focus:outline-none focus:border-emerald font-serif text-charcoal transition-colors"
                      placeholder="Song name / Artist"
                    />
                  </div>

                  {/* Advice */}
                  <div>
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-1 ml-1">
                      Advice for Married Life
                    </label>
                    <textarea 
                      rows="2"
                      value={formData.advice}
                      onChange={e => setFormData({...formData, advice: e.target.value})}
                      className="w-full bg-paper/50 border-b border-gold/30 py-2 px-3 focus:outline-none focus:border-emerald font-serif text-charcoal transition-colors resize-none"
                      placeholder="Share your wisdom..."
                    />
                  </div>

                  {/* Checklist */}
                  <div className="mt-2">
                    <label className="block font-sans text-[0.65rem] uppercase tracking-widest text-emerald mb-3 text-center">
                      What are you most excited for?
                    </label>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {rsvpChips.map(chip => (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => handleChipToggle(chip.id)}
                          className={`px-4 py-2 rounded-full font-sans text-[0.65rem] uppercase tracking-widest transition-all duration-300 border ${
                            formData.chips.includes(chip.id) 
                              ? 'bg-emerald text-gold border-emerald shadow-md' 
                              : 'bg-paper/50 text-emerald border-gold/30 hover:border-emerald hover:bg-emerald/5'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 flex justify-center">
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send RSVP'}
                    </button>
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-center text-xs text-red-500 mt-2 uppercase tracking-widest">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
