import { useState, useEffect } from 'react';

export default function Scoreboard() {
  const [topVisibleCount, setTopVisibleCount] = useState(0);
  const [bottomVisibleCount, setBottomVisibleCount] = useState(0);

  const topText = "BALL UP";
  const bottomText = "7.0";

  useEffect(() => {
    // Stage 1: Reveal top text character by character (snap-on)
    if (topVisibleCount < topText.length) {
      const timer = setTimeout(() => {
        setTopVisibleCount(prev => prev + 1);
      }, 350); // 350ms per character
      return () => clearTimeout(timer);
    }
    
    // Stage 2: Reveal bottom text (waits for top)
    if (topVisibleCount === topText.length && bottomVisibleCount < bottomText.length) {
      const timer = setTimeout(() => {
        setBottomVisibleCount(prev => prev + 1);
      }, 400); // slightly slower for dramatic effect
      return () => clearTimeout(timer);
    }
  }, [topVisibleCount, bottomVisibleCount, topText.length, bottomText.length]);

  return (
    <div className="flex flex-col items-center mb-6 mt-1 relative w-full">
      {/* Top Panel (BALL UP) */}
      <ScoreboardPanel 
        text={topText}
        visibleCount={topVisibleCount}
        isComplete={topVisibleCount === topText.length && bottomVisibleCount === bottomText.length}
        color="#66ff00" // Vibrant LED green
        dimColor="#0a1400" // Off-state LED color
        className="w-full max-w-[650px] z-10"
        textClassName="text-[72px] md:text-[110px] tracking-[0.1em]"
      />

      {/* Connection hardware between panels to make them feel stacked */}
      <div className="flex w-full max-w-[400px] justify-between px-10 -mt-[2px] -mb-[2px] z-0">
        <div className="w-[16px] h-[12px] bg-gradient-to-b from-[#444] to-[#111] border-x-2 border-[#000]" />
        <div className="w-[16px] h-[12px] bg-gradient-to-b from-[#444] to-[#111] border-x-2 border-[#000]" />
      </div>

      {/* Bottom Panel (7.0) */}
      <ScoreboardPanel 
        text={bottomText}
        visibleCount={bottomVisibleCount}
        isComplete={topVisibleCount === topText.length && bottomVisibleCount === bottomText.length}
        color="#ff2a00" // Bright LED red
        dimColor="#1a0400" // Off-state LED color
        className="w-[85%] max-w-[450px] z-10"
        textClassName="text-[64px] md:text-[90px] tracking-[0.1em]"
      />
    </div>
  );
}

interface ScoreboardPanelProps {
  text: string;
  visibleCount: number;
  isComplete: boolean;
  color: string;
  dimColor: string;
  className: string;
  textClassName: string;
}

function ScoreboardPanel({ text, visibleCount, isComplete, color, dimColor, className, textClassName }: ScoreboardPanelProps) {
  // Bezel styling: metallic 3D frame matching the reference
  const bezelStyle = {
    background: 'linear-gradient(to bottom, #dcdcdc 0%, #b4b4b4 10%, #555 90%, #222 100%)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.9), inset 0 2px 5px rgba(255,255,255,0.8), inset 0 -2px 5px rgba(0,0,0,0.6)',
    border: '3px solid #000',
    borderTopColor: '#f5f5f5',
    borderLeftColor: '#d5d5d5',
    borderBottomColor: '#111',
    borderRightColor: '#333'
  };

  // The inner black screen casing
  const innerCasingStyle = {
    backgroundColor: '#050505',
    boxShadow: 'inset 0 0 25px rgba(0,0,0,1)'
  };

  // The unified mask applied to both background (off-LEDs) and text (on-LEDs)
  // This physically cuts the entire div into perfect circles
  const maskStyle = {
    WebkitMaskImage: 'radial-gradient(circle, white 55%, transparent 65%)',
    maskImage: 'radial-gradient(circle, white 55%, transparent 65%)',
    WebkitMaskSize: '10px 10px',
    maskSize: '10px 10px',
    backgroundColor: dimColor, // The background renders as dim dots
  };

  return (
    <div className={`p-[6px] rounded-sm ${className}`} style={bezelStyle}>
      <div className="w-full h-full p-2 rounded-sm border border-[#000]" style={innerCasingStyle}>
        
        {/* The masked LED screen area */}
        <div 
          className="relative w-full h-[100px] md:h-[140px] flex items-center justify-center overflow-hidden" 
          style={maskStyle}
        >
          <div className="flex font-['Epilogue'] font-black leading-none uppercase">
            {text.split('').map((char, i) => {
              const isVisible = i < visibleCount;
              return (
                <span 
                  key={i} 
                  className={`${textClassName} ${isVisible && isComplete ? 'animate-[electrical-flicker_4s_infinite_linear]' : ''}`}
                  style={{
                    color: isVisible ? color : 'transparent',
                    textShadow: isVisible ? `0 0 8px ${color}` : 'none',
                    animationDelay: `${i * 0.7}s`
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
