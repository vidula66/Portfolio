import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const socials = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/vidula66',
    color: '#ffffff',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vidula-yeole-b131b3318/',
    color: '#0A66C2',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    href: 'mailto:vidulayeole66@gmail.com',
    color: '#e50914',
  },
];

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden bg-transparent">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-heist-red/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-10 bg-heist-red/5 blur-xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-3xl font-black text-white uppercase italic tracking-tighter block mb-1">
              VIDULA<span className="text-heist-red">_DEV</span>
            </a>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">
             Java Full Stack Developer · BBA(CA) Graduate · MCA Aspirant
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                title={label}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
              >
                <Icon className="text-lg" style={{ color }} />
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-heist-red uppercase tracking-widest font-black hover:bg-heist-red/10 hover:border-heist-red/30 transition-all"
          >
            <FaArrowUp />
            Return to Base
          </motion.a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] text-white/20 font-mono uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Vidula Yeole · All Systems Operational
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-heist-red animate-pulse" />
            <p className="text-[9px] text-white/20 font-mono uppercase tracking-[0.3em]">
              Built with React · Three.js · Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
