import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CardSwap.css';

interface CardSwapProps {
  cards: React.ReactNode[];
  className?: string;
}

const CardSwap = ({ cards, className = '' }: CardSwapProps) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % cards.length);

  return (
    <div className={`card-swap-container ${className}`} onClick={next}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 300, opacity: 0, rotate: 10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          exit={{ x: -300, opacity: 0, rotate: -10 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="card-swap-item"
        >
          {cards[index]}
        </motion.div>
      </AnimatePresence>
      <div className="card-swap-indicator">
        {cards.map((_, i) => (
          <div key={i} className={`indicator-dot ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default CardSwap;
