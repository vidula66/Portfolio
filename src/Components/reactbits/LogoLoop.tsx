import './LogoLoop.css';

interface LogoLoopProps {
  items: { img: string; name: string }[];
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

const LogoLoop = ({
  items = [],
  duration = 20,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: LogoLoopProps) => {
  return (
    <div className={`logo-loop-container ${className} ${pauseOnHover ? 'pause-on-hover' : ''}`}>
      <div 
        className="logo-loop-inner"
        style={{ 
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal'
        } as React.CSSProperties}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="logo-loop-item">
            <img src={item.img} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
