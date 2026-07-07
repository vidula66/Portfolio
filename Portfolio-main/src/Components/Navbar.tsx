import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumePDF from '../assets/Vidula_Yeole_Resume.pdf';

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed w-full z-[1500] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="relative group" data-hover>
            <span className="font-display text-xl font-black tracking-tighter text-white uppercase italic">
              VIDULA<span className="text-heist-red">_DEV</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-heist-red group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-hover
                className="relative text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-heist-red group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
            href={resumePDF} download="Vidula_Yeole_Resume.pdf"
              data-hover
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full bg-heist-red/10 border border-heist-red/40 text-heist-red hover:bg-heist-red hover:text-white transition-all duration-300"
            >
              RESUME
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45,  y: 7 }  : { rotate: 0, y: 0 }}  className="w-6 h-[2px] bg-heist-red block" />
            <motion.span animate={mobileOpen ? { opacity: 0 }          : { opacity: 1 }}        className="w-6 h-[2px] bg-heist-red block" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}   className="w-6 h-[2px] bg-heist-red block" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[1400] bg-[#0a0a0a]/98 flex flex-col items-center justify-center gap-6 overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 -right-20 w-80 h-80 bg-heist-red/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-heist-red/5  rounded-full blur-[100px]" />
            </div>

            <div className="absolute top-10 left-10">
              <span className="text-[9px] font-mono text-heist-red uppercase tracking-[0.4em] font-bold">Menu_Access</span>
              <div className="mt-1 w-12 h-px bg-heist-red" />
            </div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative text-3xl font-display font-black text-white/50 hover:text-heist-red transition-all duration-300 uppercase italic tracking-tighter group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-heist-red group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;