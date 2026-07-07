import { motion } from 'framer-motion';
import './LaserFlow.css';

interface LaserFlowProps {
  className?: string;
  color?: string;
}

const LaserFlow = ({ className = '', color = '#e50914' }: LaserFlowProps) => {
  return (
    <div className={`laser-flow-container ${className}`}>
      <motion.div 
        className="laser-beam"
        style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
        animate={{ 
          top: ['-20%', '120%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default LaserFlow;
