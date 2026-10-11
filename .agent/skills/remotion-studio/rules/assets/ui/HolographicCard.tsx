
import { useMemo, CSSProperties } from 'react';



interface HolographicCardProps {

  title: string;

  subtitle?: string;

  progress: number; // 0.0 to 1.0 (Driven by Scroll or Frame)

  className?: string;

}



export const HolographicCard = ({ 

  title, 

  subtitle, 

  progress,

  className = '' 

}: HolographicCardProps) => {

  

  // Animations based purely on progress prop

  const rotation = useMemo(() => progress * Math.PI * 0.1, [progress]);

  const opacity = useMemo(() => Math.min(progress * 2, 1), [progress]);

  const scale = useMemo(() => 0.8 + progress * 0.2, [progress]);

  

  const cardStyle: CSSProperties = {

    transform: `perspective(1000px) rotateY(${rotation}rad) scale(${scale})`,

    opacity: opacity,

    // Critical for performance: No CSS transitions here!

    // We let the driver (Remotion/Framer) handle the update loop.

    transition: 'none', 

  };



  return (

    <div 

      className={`

        relative bg-black/50 border border-brand-500 backdrop-blur-md 

        p-8 rounded-xl shadow-2xl ${className}

      `}

      style={cardStyle}

    >

      <div className="relative z-10 text-center">

        <h2 className="text-white text-4xl font-bold mb-2 font-display">{title}</h2>

        {subtitle \&\& <p className="text-brand-300 text-xl font-mono">{subtitle}</p>}

      </div>

      

      {/* Decorative Corners */}

      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-500" />

      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-500" />

    </div>

  );

};

