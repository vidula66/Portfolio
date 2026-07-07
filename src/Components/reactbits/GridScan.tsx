import './GridScan.css';

const GridScan = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`grid-scan-container ${className}`}>
      <div className="grid-scan-line" />
      <div className="grid-scan-cells">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="grid-scan-cell" />
        ))}
      </div>
    </div>
  );
};

export default GridScan;
