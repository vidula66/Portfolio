import { useRef, useEffect, ReactNode } from 'react';
import { useInView, useSpring, useTransform, motion } from 'framer-motion';

interface ScrollFloatProps {
  children: ReactNode;
  scrollStart?: number;
  scrollEnd?: number;
  stiffness?: number;
  damping?: number;
  className?: string;
}

export default function ScrollFloat({
  children,
  scrollStart = 100,
  scrollEnd: _scrollEnd = 300,
  stiffness = 120,
  damping = 20,
  className = '',
}: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const animatedY = useSpring(isInView ? 0 : scrollStart, { stiffness, damping });
  const animatedOpacity = useSpring(isInView ? 1 : 0, { stiffness, damping });
  const animatedBlur = useSpring(isInView ? 0 : 10, { stiffness, damping });

  useEffect(() => {
    if (isInView) {
      animatedY.set(0);
      animatedOpacity.set(1);
      animatedBlur.set(0);
    }
  }, [isInView, animatedY, animatedOpacity, animatedBlur]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: animatedY,
        opacity: animatedOpacity,
        filter: useTransform(animatedBlur, (v) => `blur(${v}px)`),
      }}
    >
      {children}
    </motion.div>
  );
}
