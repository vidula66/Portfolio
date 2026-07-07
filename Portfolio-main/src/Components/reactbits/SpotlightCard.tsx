import React, { useRef, useState } from "react";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(88, 166, 255, 0.15)" }: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setOpacity(1)}
      onTouchEnd={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-heist-red/20 bg-heist-dark-gray/40 transition-colors duration-300 hover:border-heist-red ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
