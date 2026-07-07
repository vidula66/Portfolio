import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollStack.css';

interface ScrollStackProps {
  children: React.ReactNode[];
  className?: string;
}

const ScrollStack = ({ children, className = '' }: ScrollStackProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className={`scroll-stack-container ${className}`}>
      {children.map((child, i) => {
        const start = i / children.length;
        const end = (i + 1) / children.length;
        const scale = useTransform(scrollYProgress, [start, end], [1, 0.8]);
        const opacity = useTransform(scrollYProgress, [start, end], [1, 0.5]);

        return (
          <motion.div
            key={i}
            className="scroll-stack-item"
            style={{ 
              scale, 
              opacity,
              zIndex: i,
              position: 'sticky',
              top: '10vh'
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ScrollStack;
