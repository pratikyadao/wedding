import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { weddingConfig } from '../../data/config';

export default function AudioController({ audioRef, isPlaying, toggleAudio, show }) {
  const { audio } = weddingConfig;
  const [showSpotifyDrawer, setShowSpotifyDrawer] = useState(false);

  return (
    <>
      {/* Audio element with fallback sources */}
      <audio ref={audioRef} loop preload="auto">
        <source src={audio.musicUrl} type="audio/mpeg" />
        <source src={audio.wavUrl || "/audio/jashn-e-bahaaraa.wav"} type="audio/wav" />
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-5 right-4 sm:bottom-7 sm:right-6 z-50 flex flex-col items-end gap-2"
          >
            {/* Spotify Player Embed Drawer */}
            <AnimatePresence>
              {showSpotifyDrawer && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="w-[280px] sm:w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-gold/40 bg-paper p-2 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-gold/20">
                    <span className="font-sans text-[10px] tracking-widest uppercase text-gold font-semibold flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-gold" />
                      Official Spotify Track
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSpotifyDrawer(false)}
                      className="text-charcoal/60 hover:text-charcoal text-xs p-1"
                      aria-label="Close Spotify player"
                    >
                      ✕
                    </button>
                  </div>
                  <iframe
                    src={audio.spotifyEmbedUrl}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl shadow-inner"
                    title="Jashn-E-Bahaaraa on Spotify"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating Audio Bar / Pill */}
            <div className="flex items-center gap-2 bg-paper/90 backdrop-blur-md border border-gold/40 shadow-[0_8px_25px_rgba(0,0,0,0.12)] rounded-full pl-3.5 pr-2 py-1.5 transition-all duration-300 hover:border-gold/70">
              
              {/* Music Soundwave or Disc Icon */}
              <button 
                type="button" 
                onClick={toggleAudio}
                className="flex items-center gap-2 cursor-pointer focus:outline-none"
                title={isPlaying ? "Pause background music" : "Play background music"}
              >
                {isPlaying ? (
                  <div className="flex items-end gap-0.5 h-4 w-3.5">
                    <span className="w-1 bg-gold rounded-full animate-bounce" style={{ height: '70%', animationDuration: '0.6s' }} />
                    <span className="w-1 bg-emerald rounded-full animate-bounce" style={{ height: '100%', animationDuration: '0.9s' }} />
                    <span className="w-1 bg-gold rounded-full animate-bounce" style={{ height: '45%', animationDuration: '0.7s' }} />
                  </div>
                ) : (
                  <Music className="w-4 h-4 text-charcoal/50" />
                )}

                {/* Song & Artist Info */}
                <div className="flex flex-col text-left pr-1 max-w-[130px] sm:max-w-[170px]">
                  <span className="font-serif text-[11px] sm:text-xs text-charcoal font-semibold truncate leading-tight">
                    Jashn-E-Bahaaraa
                  </span>
                  <span className="font-sans text-[8.5px] sm:text-[9.5px] text-gold tracking-wider truncate leading-tight">
                    A.R. Rahman • Flute
                  </span>
                </div>
              </button>

              {/* Spotify Link Icon */}
              <a
                href={audio.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Listen on Spotify"
                className="w-7 h-7 rounded-full bg-[#1DB954]/15 hover:bg-[#1DB954] text-[#1DB954] hover:text-white flex items-center justify-center transition-colors duration-200"
                aria-label="Listen on Spotify"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>

              {/* Drawer Toggle */}
              <button
                type="button"
                onClick={() => setShowSpotifyDrawer(!showSpotifyDrawer)}
                title="Toggle Spotify player"
                className="w-7 h-7 rounded-full hover:bg-gold/15 text-charcoal/60 hover:text-gold flex items-center justify-center transition-colors"
                aria-label="Toggle Spotify preview player"
              >
                {showSpotifyDrawer ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronUp className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Volume / Play Toggle Button */}
              <button
                type="button"
                onClick={toggleAudio}
                className="w-8 h-8 rounded-full bg-emerald text-paper hover:bg-emerald/90 flex items-center justify-center shadow-sm transition-transform active:scale-90"
                aria-label={isPlaying ? "Mute music" : "Play music"}
              >
                {isPlaying ? (
                  <Volume2 className="w-4 h-4 text-gold" />
                ) : (
                  <VolumeX className="w-4 h-4 text-paper/80" />
                )}
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
