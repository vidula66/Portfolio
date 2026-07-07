import { motion } from 'framer-motion';
import './CardNav.css';

interface CardNavProps {
  items: { icon: React.ReactNode; label: string; onClick: () => void; active: boolean }[];
  className?: string;
}

const CardNav = ({ items, className = '' }: CardNavProps) => {
  return (
    <div className={`card-nav-container ${className}`}>
      {items.map((item, i) => (
        <button
          key={i}
          className={`card-nav-item ${item.active ? 'active' : ''}`}
          onClick={item.onClick}
        >
          <div className="card-nav-icon">{item.icon}</div>
          <span className="card-nav-label">{item.label}</span>
          {item.active && (
            <motion.div
              layoutId="card-nav-indicator"
              className="card-nav-indicator"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default CardNav;
