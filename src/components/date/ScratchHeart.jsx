import { useRef, useEffect, useState } from 'react';

export default function ScratchHeart({ value, onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Setup canvas resolution
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Draw metallic gold texture or solid color
      ctx.fillStyle = '#D4AF37'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some subtle texture (noise)
      for (let i = 0; i < 500; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
      }
    };

    resizeCanvas();
    
    // Scratch logic
    const getPointerPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handlePointerDown = (e) => {
      if (isCompleted) return;
      setIsDrawing(true);
      scratch(e);
    };

    const handlePointerMove = (e) => {
      if (!isDrawing || isCompleted) return;
      scratch(e);
      checkProgress();
    };

    const handlePointerUp = () => {
      setIsDrawing(false);
    };

    const scratch = (e) => {
      const { x, y } = getPointerPos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    let checkTimeout;
    const checkProgress = () => {
      if (checkTimeout) return;
      checkTimeout = setTimeout(() => {
        checkTimeout = null;
        if (isCompleted) return;
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let cleared = 0;
        
        // Sample every 4th pixel for performance
        for (let i = 3; i < pixels.length; i += 16) {
          if (pixels[i] === 0) cleared++;
        }
        
        const totalSamples = pixels.length / 16;
        const percentage = cleared / totalSamples;
        
        if (percentage > 0.4) {
          setIsCompleted(true);
          onComplete();
        }
      }, 100); // Throttle
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('mouseleave', handlePointerUp);
    
    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    canvas.addEventListener('touchend', handlePointerUp);

    return () => {
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('mouseleave', handlePointerUp);
      
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerUp);
    };
  }, [isCompleted, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center bg-white rounded-md overflow-hidden shadow-inner border border-rose/30"
      style={{ clipPath: 'polygon(50% 15%, 85% 0%, 100% 30%, 50% 100%, 0% 30%, 15% 0%)' }}
    >
      <div className="absolute inset-0 flex items-center justify-center font-serif text-xl sm:text-2xl text-emerald font-bold">
        {value}
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-pointer"
        style={{ 
          touchAction: 'none',
          opacity: isCompleted ? 0 : 1,
          transition: 'opacity 1s ease-out'
        }}
      />
    </div>
  );
}
