import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Scramble text effect */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

function useScramble(target: string, trigger: boolean, speed = 40) {
  const [text, setText] = useState(target.replace(/./g, '_'));
  const iter  = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    iter.current = 0;
    const interval = setInterval(() => {
      setText(
        target.split('').map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iter.current) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iter.current += 0.4;
      if (iter.current >= target.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [trigger, target, speed]);

  return text;
}

/* Animated progress bar that fills and stalls dramatically */
function useProgress(running: boolean) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!running) return;
    // Fast to 40 → stall → fast to 80 → stall → snap to 100
    const stages = [
      { target: 42, delay: 0,    speed: 18 },
      { target: 78, delay: 900,  speed: 30 },
      { target: 100,delay: 2200, speed: 12 },
    ];
    stages.forEach(({ target, delay, speed }) => {
      setTimeout(() => {
        const id = setInterval(() => {
          setPct(p => {
            if (p >= target) { clearInterval(id); return p; }
            return Math.min(p + 1, target);
          });
        }, speed);
      }, delay);
    });
  }, [running]);
  return pct;
}

/* Individual terminal line */
const LOGS = [
  '> Initializing runtime environment...',
  '> Loading React modules ✓',
  '> Compiling Three.js scene...',
  '> Injecting holographic shaders ✓',
  '> Calibrating cinematic engine...',
  '> Portfolio ready to deploy ✓',
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible]   = useState(true);
  const [started, setStarted]   = useState(false);
  const [logIdx, setLogIdx]     = useState(0);
  const [exiting, setExiting]   = useState(false);

  const pct     = useProgress(started);
  const line    = useScramble(LOGS[logIdx] ?? '', started, 28);

  // Start everything on mount
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Cycle log lines
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setLogIdx(i => Math.min(i + 1, LOGS.length - 1));
    }, 500);
    return () => clearInterval(id);
  }, [started]);

  // Auto-dismiss when progress hits 100
  useEffect(() => {
    if (pct < 100) return;
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(() => { setVisible(false); onDone(); }, 700);
    }, 600);
    return () => clearTimeout(t);
  }, [pct, onDone]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] bg-[#060606] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Radial dot grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(229,9,20,0.06) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Corner coordinates */}
          {['top-4 left-6', 'top-4 right-6', 'bottom-4 left-6', 'bottom-4 right-6'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} font-mono text-[8px] text-white/10 uppercase tracking-[0.4em]`}>
              {i < 2 ? (i === 0 ? '0000,0000' : `${Date.now() % 9999},${i * 1234}`) : (i === 2 ? 'SYS_LOAD' : 'VIDULA_DEV')}
            </div>
          ))}

          {/* Top scan line */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
            className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-heist-red/80 to-transparent pointer-events-none"
          />

          {/* Main content box */}
          <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8">

            {/* Animated logo / monogram */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0, 0.9, 0.57, 1] }}
              className="mb-8 relative"
            >
              {/* Outer spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border border-dashed border-heist-red/30 absolute inset-0"
              />
              {/* Inner spinning ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border border-heist-red/50 absolute inset-4"
              />
              {/* Centre monogram */}
              <div className="w-24 h-24 rounded-full bg-heist-red/10 border border-heist-red/20 flex items-center justify-center">
                <span className="font-display text-2xl font-black text-heist-red italic tracking-tighter">VY</span>
              </div>
              {/* Pulsing dot */}
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-heist-red animate-ping" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-heist-red" />
            </motion.div>

            {/* Headline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-mono text-[10px] text-heist-red uppercase tracking-[0.6em] mb-2"
            >
              VIDULA_DEV · PORTFOLIO
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="font-display text-3xl font-black text-white uppercase tracking-tighter text-center mb-1"
            >
              Loading Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[11px] text-white/25 font-mono text-center mb-10"
            >
              Hang tight — the developer is deploying something extraordinary ✦
            </motion.p>

            {/* Progress bar */}
            <div className="w-full mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em]">Build Progress</span>
                <motion.span
                  key={pct}
                  initial={{ opacity: 0.5, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-sm font-black text-heist-red"
                >
                  {pct}%
                </motion.span>
              </div>
              <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-heist-red shadow-[0_0_12px_#e50914]"
                  style={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 60, damping: 18 }}
                />
              </div>
            </div>

            {/* Terminal log lines */}
            <div className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 font-mono text-[10px] min-h-[100px]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 text-white/20 text-[9px] tracking-widest">terminal — zsh</span>
              </div>
              {LOGS.slice(0, logIdx + 1).map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-1 ${i === logIdx ? 'text-heist-red' : 'text-white/30'}`}
                >
                  {i === logIdx ? line : log}
                  {i === logIdx && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block ml-0.5 w-1.5 h-3 bg-heist-red align-middle"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
