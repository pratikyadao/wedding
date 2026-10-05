import { useState, useRef, useEffect } from 'react';
import { HeroSection, CountdownSection, CoupleSection, FamilySection, StorySection, EventsSection, GallerySection, FooterSection, VenueSection, DressCodeSection } from './sections';
import { Navigation } from './components';
import { MotionConfig } from 'framer-motion';
import EnvelopeOpening from './components/opening/EnvelopeOpening';
import AudioController from './components/opening/AudioController';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenComplete = () => {
    setIsOpened(true);
  };

  const handleSealTap = () => {
    // Attempt to start audio immediately upon user interaction
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Audio play blocked by browser:", e));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Prevent scrolling when envelope is closed
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpened]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-full min-h-screen relative overflow-x-hidden bg-emerald">
        
        {/* The Mobile Shell Container */}
        <div className="max-w-md mx-auto min-h-screen bg-paper relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {!isOpened && (
            <EnvelopeOpening 
              onOpenComplete={handleOpenComplete} 
              onSealTap={handleSealTap} 
            />
          )}

          {isOpened && (
            <>
              <Navigation />
              
              <div id="home">
                <HeroSection />
                <CoupleSection />
                <CountdownSection />
              </div>
              
              <div id="story">
                <StorySection />
              </div>
              
              <div id="events">
                <EventsSection />
              </div>

              <div id="venue">
                <VenueSection />
                <DressCodeSection />
              </div>
              
              <div id="gallery">
                <GallerySection />
              </div>
              
              <div id="rsvp">
                <FooterSection />
              </div>
            </>
          )}

          <AudioController 
            audioRef={audioRef} 
            isPlaying={isPlaying} 
            toggleAudio={toggleAudio} 
            show={isOpened} 
          />
        </div>
      </main>
    </MotionConfig>
  );
}

export default App;
