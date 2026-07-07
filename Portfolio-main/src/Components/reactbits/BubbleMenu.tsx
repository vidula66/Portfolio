import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BubbleMenu.css';

interface BubbleMenuProps {
  items: { icon: React.ReactNode; label: string; onClick: () => void }[];
  className?: string;
}

const BubbleMenu = ({ items, className = '' }: BubbleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bubble-menu-wrapper ${className}`}>
      <motion.button
        className="bubble-trigger"
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <span className="text-2xl">+</span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <div className="bubble-items">
            {items.map((item, i) => (
              <motion.button
                key={i}
                className="bubble-item"
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: -(i + 1) * 60 }}
                exit={{ opacity: 0, scale: 0, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
              >
                <div className="bubble-icon">{item.icon}</div>
                <span className="bubble-label">{item.label}</span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubbleMenu;
