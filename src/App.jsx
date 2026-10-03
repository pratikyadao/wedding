import { HeroSection, CountdownSection, CoupleSection, FamilySection, StorySection, EventsSection, GallerySection, FooterSection } from './sections'
import { AudioPlayer, Navigation } from './components'
import { MotionConfig } from 'framer-motion'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="w-full min-h-screen relative overflow-x-hidden">
        {/* Global Navigation & Background Music */}
        <Navigation />
        <AudioPlayer />
        
        {/* Page Sections with Anchor IDs for Navigation */}
        <div id="home">
          <HeroSection />
          <CountdownSection />
        </div>
        
        <div id="couple">
          <CoupleSection />
          <FamilySection />
        </div>
        
        <div id="story">
          <StorySection />
        </div>
        
        <div id="events">
          <EventsSection />
        </div>
        
        <div id="gallery">
          <GallerySection />
        </div>
        
        <div id="rsvp">
          <FooterSection />
        </div>
      </main>
    </MotionConfig>
  )
}

export default App
