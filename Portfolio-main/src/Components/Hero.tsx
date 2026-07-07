import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import TechOrb3D from './TechOrb3D';
import Resume from '../assets/Vidula_Yeole_Resume.pdf';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOP';

function GlitchLetter({ char, delay }: { char: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let iteration = 0;
    const origChar = char;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (ref.current) {
          if (iteration < 10) { ref.current.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]; iteration++; }
          else { ref.current.textContent = origChar; clearInterval(iv); }
        }
      }, 40);
    }, delay);
    return () => clearTimeout(t);
  }, [char, delay]);
  return <span ref={ref} className="inline-block" style={{ minWidth: char === ' ' ? '0.4em' : undefined }}>{char}</span>;
}

function GlitchName({ text }: { text: string }) {
  return (
    <h1 className="font-display font-black text-[clamp(2.8rem,13vw,7rem)] text-white tracking-[-0.04em] leading-[0.88] uppercase">
      {text.split('').map((char, i) => <GlitchLetter key={i} char={char} delay={800 + i * 60} />)}
    </h1>
  );
}

function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px]">
      <span className="text-heist-red/60">›</span>
      <span className="text-white/40">{text}</span>
    </motion.div>
  );
}

/* ─── Static particle data — no Math.random in render ─── */
const PARTICLES = [
  { x: '8%', y: '70%', s: 2, dur: 4.0, del: 0.0, dy: 120 },
  { x: '22%', y: '55%', s: 3, dur: 5.2, del: 0.8, dy: 100 },
  { x: '38%', y: '80%', s: 2, dur: 3.8, del: 1.6, dy: 130 },
  { x: '52%', y: '40%', s: 2, dur: 4.6, del: 0.3, dy: 110 },
  { x: '68%', y: '65%', s: 3, dur: 3.5, del: 1.2, dy: 90 },
  { x: '82%', y: '30%', s: 2, dur: 5.0, del: 2.0, dy: 120 },
  { x: '14%', y: '20%', s: 2, dur: 4.2, del: 0.5, dy: 100 },
  { x: '75%', y: '85%', s: 3, dur: 3.9, del: 1.7, dy: 140 },
];

const DATA_STREAMS = [
  { x: '15%', delay: '0s', dur: '3.5s' },
  { x: '35%', delay: '1.2s', dur: '4s' },
  { x: '58%', delay: '0.6s', dur: '3s' },
  { x: '78%', delay: '2s', dur: '4.5s' },
  { x: '92%', delay: '0.3s', dur: '3.8s' },
];

/* ─── Rich Hero Background ─── */
function HeroBG({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* 1. Dark base — transparent to let Global3DBackground show through */}
      <div className="absolute inset-0 z-0 bg-transparent" />

      {/* 2. Radar sweep — rotating conic gradient */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg at 40% 50%, transparent 0deg, rgba(229,9,20,0.06) 25deg, rgba(229,9,20,0.12) 35deg, rgba(229,9,20,0.06) 45deg, transparent 70deg, transparent 360deg)',
          animation: 'radarSweep 6s linear infinite',
          willChange: 'transform',
        }} />

      {/* 3. Animated radial glow blobs */}
      <div className="absolute z-[1] pointer-events-none rounded-full"
        style={{
          top: '-10%', left: '50%',
          width: 'min(500px, 130vw)', height: 'min(500px, 130vw)',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(229,9,20,0.18) 0%, rgba(229,9,20,0.04) 55%, transparent 70%)',
          animation: 'bgBlob1 4s ease-in-out infinite',
          willChange: 'transform, opacity',
        }} />
      <div className="absolute z-[1] pointer-events-none rounded-full"
        style={{
          bottom: '5%', right: '-5%',
          width: 'min(300px, 70vw)', height: 'min(300px, 70vw)',
          background: 'radial-gradient(circle, rgba(229,9,20,0.10) 0%, transparent 70%)',
          animation: 'bgBlob2 5.5s ease-in-out infinite',
          willChange: 'transform, opacity',
        }} />
      <div className="absolute z-[1] pointer-events-none rounded-full"
        style={{
          top: '35%', left: '-10%',
          width: 'min(250px, 60vw)', height: 'min(250px, 60vw)',
          background: 'radial-gradient(circle, rgba(0,68,255,0.07) 0%, transparent 70%)',
          animation: 'bgBlob2 7s ease-in-out infinite reverse',
        }} />

      {/* 4. Ripple rings — 3 expanding sonar waves */}
      {[0, 1.2, 2.4].map((delay, i) => (
        <div key={i} className="absolute z-[1] pointer-events-none rounded-full border border-heist-red/30"
          style={{
            top: '50%', left: isMobile ? '50%' : '25%',
            width: '10px', height: '10px',
            transform: 'translate(-50%, -50%)',
            animation: `ripple 3.6s ease-out ${delay}s infinite`,
          }} />
      ))}

      {/* 5. Dot grid */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(229,9,20,0.13) 1px, transparent 1px)',
          backgroundSize: isMobile ? '26px 26px' : '34px 34px',
          animation: 'heroDotPulse 3.5s ease-in-out infinite',
          willChange: 'opacity',
        }} />

      {/* 6. Vertical data stream lines */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {DATA_STREAMS.map((s, i) => (
          <div key={i} className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: s.x, width: '1px' }}>
            <div style={{
              position: 'absolute', width: '100%',
              height: '30%',
              background: 'linear-gradient(to bottom, transparent, rgba(229,9,20,0.5), transparent)',
              animation: `dataStream ${s.dur} linear ${s.delay} infinite`,
              willChange: 'transform',
            }} />
          </div>
        ))}
      </div>

      {/* 7. Floating red particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div key={i}
            animate={{ y: [-p.dy, 0], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.del, ease: 'easeInOut' }}
            className="absolute rounded-full bg-heist-red"
            style={{
              left: p.x, top: p.y,
              width: p.s, height: p.s,
              boxShadow: `0 0 ${p.s * 3}px rgba(229,9,20,0.8)`,
            }} />
        ))}
      </div>

      {/* 8. HUD corner brackets */}
      {/* Top-left */}
      <div className="absolute top-24 left-4 z-[2] pointer-events-none" style={{ animation: 'hudCorner 1.5s ease-out forwards' }}>
        <div className="border-t border-l border-heist-red/40" style={{ width: 'min(40px,8vw)', height: 'min(40px,8vw)' }} />
      </div>
      {/* Top-right */}
      <div className="absolute top-24 right-4 z-[2] pointer-events-none" style={{ animation: 'hudCorner 1.5s ease-out 0.2s both' }}>
        <div className="border-t border-r border-heist-red/40" style={{ width: 'min(40px,8vw)', height: 'min(40px,8vw)' }} />
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-20 left-4 z-[2] pointer-events-none" style={{ animation: 'hudCorner 1.5s ease-out 0.4s both' }}>
        <div className="border-b border-l border-heist-red/40" style={{ width: 'min(40px,8vw)', height: 'min(40px,8vw)' }} />
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-20 right-4 z-[2] pointer-events-none" style={{ animation: 'hudCorner 1.5s ease-out 0.6s both' }}>
        <div className="border-b border-r border-heist-red/40" style={{ width: 'min(40px,8vw)', height: 'min(40px,8vw)' }} />
      </div>

      {/* 9. Animated scan lines */}
      <motion.div animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        className="absolute top-0 left-0 w-1/2 h-[1.5px] z-[4] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(229,9,20,0.9), transparent)', willChange: 'transform' }} />
      <motion.div animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5, delay: 1 }}
        className="absolute top-1/3 left-0 w-1/3 h-px z-[4] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(229,9,20,0.4), transparent)', willChange: 'transform' }} />
      <motion.div animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2, delay: 2 }}
        className="absolute top-2/3 left-0 w-2/5 h-px z-[4] pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(229,9,20,0.25), transparent)', willChange: 'transform' }} />

      {/* 10. Gradient overlay — mobile: vertical / desktop: horizontal */}
      <div className={`absolute inset-0 z-[3] pointer-events-none ${isMobile
          ? 'bg-gradient-to-b from-[#080808]/75 via-transparent to-[#080808]/75'
          : 'bg-gradient-to-r from-[#080808]/90 via-[#080808]/50 to-transparent'
        }`} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none bg-gradient-to-t from-[#080808] to-transparent" />
    </>
  );
}

/* ─── CSS-only animated orb ─── */
function MobileOrb() {
  const pills: { label: string; color: string; wrapStyle: React.CSSProperties }[] = [
    { label: 'React', color: '#61DAFB', wrapStyle: { top: '0%', left: '50%', transform: 'translateX(-50%)' } },
    { label: 'Spring', color: '#6DB33F', wrapStyle: { top: '50%', right: '-2%', transform: 'translateY(-50%)' } },
    { label: 'Java', color: '#f89820', wrapStyle: { bottom: '0%', left: '50%', transform: 'translateX(-50%)' } },
    { label: 'MySQL', color: '#00618A', wrapStyle: { top: '50%', left: '-2%', transform: 'translateY(-50%)' } },
  ];
  return (
    <div className="relative mx-auto flex items-center justify-center"
      style={{ width: 'min(240px, 62vw)', height: 'min(240px, 62vw)' }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-heist-red/30"
        style={{ animation: 'mobileOrbSpin 20s linear infinite', willChange: 'transform' }} />
      <div className="absolute inset-[8%] rounded-full border border-dashed border-white/10"
        style={{ animation: 'mobileOrbSpin 14s linear infinite reverse', willChange: 'transform' }} />
      <div className="absolute inset-[16%] rounded-full border border-heist-red/25"
        style={{ animation: 'mobileOrbPulse 3s ease-in-out infinite' }} />
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,9,20,0.28) 0%, transparent 60%)' }} />
      <div className="relative rounded-full flex items-center justify-center z-10"
        style={{
          width: 'min(86px, 23vw)', height: 'min(86px, 23vw)',
          background: 'radial-gradient(circle at 35% 35%, #ff3040, #e50914 55%, #7a0008)',
          boxShadow: '0 0 35px rgba(229,9,20,0.7), 0 0 70px rgba(229,9,20,0.3)',
          animation: 'mobileOrbPulse 2.6s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}>
        <span className="font-display font-black text-white italic tracking-tighter select-none"
          style={{ fontSize: 'min(17px, 4.8vw)' }}>VY</span>
      </div>
      {pills.map(({ label, color, wrapStyle }, i) => (
        <div key={label} className="absolute" style={wrapStyle}>
          <motion.div animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.8 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            className="rounded-full font-mono font-bold uppercase tracking-widest whitespace-nowrap"
            style={{ fontSize: 'min(8px, 2.2vw)', padding: '3px 8px', border: `1px solid ${color}50`, color, backgroundColor: `${color}18` }}>
            {label}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ─── Hero ─── */
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const yTextRaw = useTransform(scrollY, [0, 600], [0, -120]);
  const opacityRaw = useTransform(scrollY, [0, 450], [1, 0]);
  const yOrb = useTransform(scrollY, [0, 600], [0, -60]);
  const smoothY = useSpring(yOrb, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">

      <HeroBG isMobile={isMobile} />

      {/* ══ CONTENT (z-10+) ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-10 lg:pt-28 lg:pb-20
                      flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-4 lg:gap-0 items-center min-h-[100dvh]">

        {/* LEFT: Text */}
        <motion.div style={isMobile ? {} : { y: yTextRaw, opacity: opacityRaw }}
          className="w-full z-30 relative flex flex-col justify-center">

          {/* Status badge */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 mb-5 rounded-full border border-heist-red/30 bg-heist-red/8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-heist-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-heist-red" />
            </span>
            <span className="text-[8px] sm:text-[10px] font-mono text-heist-red/80 uppercase tracking-[0.25em]">Available for Opportunities</span>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-heist-red/50 text-[10px] sm:text-sm uppercase tracking-[0.4em] mb-1">Hi, I'm</motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="leading-none">
            <GlitchName text="Vidula" />
            <GlitchName text="Yeole" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-4 flex items-center gap-2">
            <div className="w-6 h-px bg-heist-red/50 shrink-0" />
            <p className="text-xs sm:text-base md:text-xl font-display text-white/50 uppercase tracking-widest">
              <Typewriter
  words={['Java Full Stack Developer','Spring Boot Developer','Backend Developer','Open to Work']}
                loop cursor cursorStyle="_" typeSpeed={55} deleteSpeed={35} delaySpeed={1800} />
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-3 text-[10px] sm:text-sm text-white/40 max-w-xs sm:max-w-md leading-[1.8] font-mono">
            BBA(CA) Graduate & MCA Aspirant — building web applications with{' '}
<span className="text-heist-red/70">Java</span>,{' '}
<span className="text-heist-red/70">PHP</span>,{' '}
<span className="text-heist-red/70">MySQL</span> &amp;{' '}
<span className="text-heist-red/70">Spring Boot</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-6 flex flex-col sm:flex-row flex-wrap gap-2.5">
            <a href="#projects" className="flex justify-center items-center gap-2 px-6 py-3 rounded-full bg-heist-red text-white font-black text-[10px] tracking-[0.2em] uppercase shadow-[0_0_24px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] hover:scale-[1.04] transition-all active:scale-95 w-full sm:w-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />View Projects
            </a>
            <a href="#contact" className="flex justify-center items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 hover:text-white transition-all active:scale-95 w-full sm:w-auto">Hire Me</a>
            <a href={Resume} download="Vidula_Yeole_Resume.pdf" className="flex justify-center items-center px-6 py-3 rounded-full bg-white/5 border border-heist-red/25 text-heist-red/70 font-black text-[10px] tracking-[0.2em] uppercase hover:bg-heist-red/10 hover:text-heist-red transition-all active:scale-95 w-full sm:w-auto">Resume ↓</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="mt-7 flex flex-col gap-1">
            <TerminalLine text="$ role: JAVA_FULL_STACK_DEVELOPER" delay={2.4} />
<TerminalLine text="$ stack: Java · PHP · MySQL · Spring Boot" delay={2.6} />
<TerminalLine text="$ status: OPEN_TO_WORK ✓" delay={2.8} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.0, duration: 0.7 }} className="mt-5 flex gap-6">
            {[{ val: '3+', lbl: 'Projects' }, { val: '7+', lbl: 'Technologies' }].map(s => (
              <div key={s.lbl}>
                <p className="font-display text-xl sm:text-2xl font-black text-white tracking-tighter">{s.val}</p>
                <p className="text-[8px] font-mono text-white/25 uppercase tracking-[0.25em]">{s.lbl}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* MOBILE: CSS orb */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }} className="w-full flex justify-center py-6 lg:hidden">
          <MobileOrb />
        </motion.div>

        {/* DESKTOP: Three.js orb */}
        <motion.div style={{ y: smoothY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
          className="hidden lg:flex w-full h-full items-center justify-center relative z-20">
          <div className="absolute inset-0 rounded-full bg-heist-red/8 blur-[160px] animate-pulse pointer-events-none" />
          <div className="w-full lg:min-h-[560px]"><TechOrb3D /></div>
          <div className="absolute inset-8  rounded-full border border-dashed border-heist-red/10 pointer-events-none" style={{ animation: 'mobileOrbSpin 30s linear infinite' }} />
          <div className="absolute inset-16 rounded-full border border-dashed border-white/5  pointer-events-none" style={{ animation: 'mobileOrbSpin 20s linear infinite reverse' }} />
          <div className="absolute top-6 right-4 font-mono text-[8px] text-heist-red/40 uppercase tracking-[0.4em] space-y-1">
            <p className="animate-pulse">● SCAN_ACTIVE</p><p>CORE: INJECTED</p><p>ENV: FULL_STACK</p>
          </div>
          {[
            { label: 'React.js', pos: 'top-[12%] left-[4%]', color: '#61DAFB' },
            { label: 'Spring', pos: 'top-[20%] right-[2%]', color: '#6DB33F' },
            { label: 'Java', pos: 'bottom-[18%] left-[2%]', color: '#f89820' },
            { label: 'MySQL', pos: 'bottom-[12%] right-[4%]', color: '#00618A' },
          ].map(({ label, pos, color }) => (
            <motion.div key={label} animate={{ y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute ${pos} px-3 py-1 rounded-full border text-[9px] font-mono font-bold uppercase tracking-widest pointer-events-none`}
              style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}>
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5" style={{ willChange: 'transform' }}>
          <div className="w-1 h-2 rounded-full bg-heist-red" />
        </motion.div>
        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;