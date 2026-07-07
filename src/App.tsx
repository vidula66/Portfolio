import { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import CustomCursor from './Components/CustomCursor';
import ScrollProgress from './Components/ScrollProgress';
import LoadingScreen from './Components/LoadingScreen';

// Lazy-load all below-fold sections — cuts initial JS parse time significantly
const Global3DBackground = lazy(() => import('./Components/reactbits/Global3DBackground'));
const About      = lazy(() => import('./Components/About'));
const Projects   = lazy(() => import('./Components/Projects'));
const Skills     = lazy(() => import('./Components/Skills'));
const Experience = lazy(() => import('./Components/Experience'));
const Contact    = lazy(() => import('./Components/Contact'));
const CVSection  = lazy(() => import('./Components/CVSection'));
const Footer     = lazy(() => import('./Components/Footer'));
const Dock       = lazy(() => import('./Components/reactbits/Dock'));
const BubbleMenu = lazy(() => import('./Components/reactbits/BubbleMenu'));

// iOS-style Dynamic Island — desktop only
const DynamicIsland = () => (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[2000] pointer-events-none">
    <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl px-6 py-2 rounded-full border border-white/5 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="w-2 h-2 rounded-full bg-heist-red animate-pulse" />
      <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">System: Operational</span>
      <div className="h-4 w-[1px] bg-white/5" />
      <span className="text-[10px] font-mono text-heist-red uppercase tracking-[0.2em]">Heist_Active</span>
    </div>
  </div>
);

function App() {
  const [loaded, setLoaded] = useState(false);
  // Read window size once into state — avoids reading window directly in JSX
  const [dockSize] = useState(() => ({
    magnification: window.innerWidth < 768 ? 40 : 65,
    distance:      window.innerWidth < 768 ? 80 : 150,
    panelHeight:   window.innerWidth < 768 ? 40 : 56,
    baseItemSize:  window.innerWidth < 768 ? 24 : 40,
  }));

  useEffect(() => {
    if (!loaded) return;
    // Lenis smooth scroll — desktop only; native scroll is faster on touch
    if (window.innerWidth < 768) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1,
      infinite: false,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [loaded]);

  const dockItems = [
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#ffc107]">💰</span>, label: 'Intro',    onClick: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#e50914]">🎭</span>, label: 'Dossier', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#ffc107]">📁</span>, label: 'Missions',onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#e50914]">🔫</span>, label: 'Arsenal', onClick: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#ffc107]">📄</span>, label: 'CV',       onClick: () => document.getElementById('cv')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#e50914]">📅</span>, label: 'Record',  onClick: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <span className="text-lg filter drop-shadow-[0_0_5px_#e50914]">📞</span>, label: 'Contact', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const bubbleItems = [
    { icon: <span className="text-sm text-[#0a0a0a] bg-white p-1 rounded shadow-[0_0_10px_white]">GH</span>,        label: 'GitHub',   onClick: () => window.open('https://github.com/TEJASPATIL1357', '_blank') },
    { icon: <span className="text-sm text-white bg-heist-red p-1 rounded shadow-[0_0_10px_#e50914]">LI</span>,      label: 'LinkedIn', onClick: () => window.open('https://www.linkedin.com/in/tejas-patil-024ab0246', '_blank') },
    { icon: <span className="text-sm text-[#0a0a0a] bg-heist-gold p-1 rounded shadow-[0_0_10px_#ffc107]">CV</span>, label: 'Resume',   onClick: () => document.getElementById('cv')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="bg-transparent text-white overflow-x-hidden noise-overlay relative">
      <LoadingScreen onDone={() => setLoaded(true)} />

      <Suspense fallback={null}>
        <Global3DBackground />
      </Suspense>

      {/* Dynamic Island — desktop only */}
      <div className="hidden md:block">
        <DynamicIsland />
      </div>

      {/* Custom cursor — desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <ScrollProgress />
      <Navbar />
      <Hero />

      {/* All below-fold sections lazy loaded */}
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Skills />
        <CVSection />
        <Experience />
        <Contact />
        <Footer />
      </Suspense>

      {/* Dock */}
      <Suspense fallback={null}>
        <Dock
          items={dockItems}
          magnification={dockSize.magnification}
          distance={dockSize.distance}
          panelHeight={dockSize.panelHeight}
          baseItemSize={dockSize.baseItemSize}
        />
      </Suspense>

      {/* Bubble Menu */}
      <Suspense fallback={null}>
        <BubbleMenu items={bubbleItems} />
      </Suspense>
    </div>
  );
}

export default App;