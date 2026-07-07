import { useState } from 'react';
import { motion } from 'framer-motion';
import './PixelTransition.css';

interface PixelTransitionProps {
  src: string;
  alt?: string;
  className?: string;
}

const PixelTransition = ({ src, alt = '', className = '' }: PixelTransitionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`pixel-transition-container ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ filter: 'blur(20px)', opacity: 0 }}
        animate={isLoaded ? { filter: 'blur(0px)', opacity: 1 } : {}}
        onLoad={() => setIsLoaded(true)}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {!isLoaded && (
        <div className="pixel-overlay">
          <div className="pixel-grid">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="pixel-box"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PixelTransition;
