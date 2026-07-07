import { useState, useEffect, useRef } from 'react';

const SystemTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    '> LOADING_PORTFOLIO_DATA...',
'> LOADING_PROJECTS...',
'> CONNECTING_TO_GITHUB...',
'> CONNECTING_TO_LINKEDIN...',
'> STATUS: AVAILABLE_FOR_WORK',
'> DEVELOPER: VIDULA_YEOLE',
'> LOCATION: NASHIK',
'> MCA_STATUS: ASPIRANT',
'> EXPERIENCE: 6_MONTHS_INTERNSHIP',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, commands[i % commands.length]]);
      i++;
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black/80 border border-heist-red/30 font-mono text-[10px] md:text-xs p-4 overflow-hidden rounded-lg shadow-2xl relative">
      <div className="absolute top-2 right-4 flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      
      <div className="text-heist-red/60 mb-4 border-b border-heist-red/20 pb-2">
        TERMINAL_ID: VIDULA_DEV_01
      </div>
      
      <div 
        ref={terminalRef}
        className="space-y-1 h-[calc(100%-40px)] overflow-y-auto scrollbar-hide"
      >
        {logs.map((log, index) => (
          <div key={index} className={
  log.includes('STATUS')
    ? 'text-green-400'
    : log.includes('DEVELOPER')
    ? 'text-blue-400'
    : log.includes('LOCATION')
    ? 'text-yellow-400'
    : 'text-heist-red/80'
}>
            {log}
          </div>
        ))}
        <div className="animate-pulse text-white inline-block">_</div>
      </div>
      
      {/* Decorative scanning line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="w-full h-[2px] bg-heist-red animate-scan" />
      </div>
    </div>
  );
};

export default SystemTerminal;
