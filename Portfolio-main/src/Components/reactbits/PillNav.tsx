import { motion } from 'framer-motion';
import './PillNav.css';

interface PillNavProps {
  items: { label: string; onClick: () => void; active: boolean }[];
  className?: string;
}

const PillNav = ({ items, className = '' }: PillNavProps) => {
  return (
    <div className={`pill-nav-container ${className}`}>
      {items.map((item, i) => (
        <button
          key={i}
          className={`pill-nav-item ${item.active ? 'active' : ''}`}
          onClick={item.onClick}
        >
          {item.active && (
            <motion.div
              layoutId="pill-bg"
              className="pill-nav-bg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PillNav;
