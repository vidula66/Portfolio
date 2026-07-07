import React from 'react';
import './ChromaGrid.css';

interface ChromaGridProps {
  className?: string;
  gridSize?: number;
  colorHighlight?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({ 
  className = '', 
  gridSize = 40,
  colorHighlight = 'rgba(99, 102, 241, 0.4)'
}) => {
  return (
    <div 
      className={`chroma-grid ${className}`}
      style={{ 
        '--grid-size': `${gridSize}px`,
        '--highlight-color': colorHighlight
      } as React.CSSProperties}
    >
      <div className="chroma-grid-overlay"></div>
    </div>
  );
};

export default ChromaGrid;
