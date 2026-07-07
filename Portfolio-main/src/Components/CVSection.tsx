import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import SpotlightCard from './reactbits/SpotlightCard';
import ScrollFloat from './reactbits/ScrollFloat';
import resume from '../assets/Vidula_Yeole_Resume.pdf';

const highlights = [
  { label: 'Projects', value: '3+', icon: '💻' },
  { label: 'Technologies', value: '7+', icon: '🚀' },
  { label: 'Internship', value: '6 Months', icon: '💼' },
];

const CVSection = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2500);
  };

  return (
    <section id="cv" className="relative py-20 lg:py-32 px-6 lg:px-16 overflow-hidden bg-transparent">
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-heist-red/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollFloat scrollStart={60} stiffness={100} damping={18} className="text-center mb-16">
          <span className="text-xs font-mono text-heist-red uppercase tracking-[0.5em] font-bold">Classified Document</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Technical <span className="text-heist-red italic">Dossier</span>
          </h2>
          <p className="mt-4 text-white/30 text-xs font-mono max-w-md mx-auto uppercase tracking-widest">
           My education, internship, technical skills and projects.
          </p>
        </ScrollFloat>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map((h, i) => (
            <ScrollFloat key={i} scrollStart={40 + i * 15} stiffness={100} damping={18}>
              <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/5 p-6 text-center group hover:bg-white/10 hover:border-heist-red/20 transition-all duration-300 shadow-xl">
                <span className="text-2xl block mb-2">{h.icon}</span>
                <p className="font-display text-3xl font-black text-white tracking-tighter group-hover:text-heist-red transition-colors">{h.value}</p>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mt-1">{h.label}</p>
              </div>
            </ScrollFloat>
          ))}
        </div>

        {/* Main CV card */}
        <SpotlightCard
          className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-10 md:p-14 overflow-hidden relative shadow-2xl"
          spotlightColor="rgba(229, 9, 20, 0.05)"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-heist-red/5 via-transparent to-transparent rounded-[3rem] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            {/* CV doc visual */}
            <div className="relative shrink-0 w-32 h-44 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden group-hover:border-heist-red/30 transition-colors shadow-xl">
              {/* Simulated doc lines */}
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-[70%] h-[3px] rounded-full" style={{ backgroundColor: i === 0 ? '#e50914' : 'rgba(255,255,255,0.06)' }} />
              ))}
              <div className="absolute bottom-3">
                <FaFileDownload className="text-heist-red/30 text-xl" />
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-heist-red animate-pulse" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-mono text-heist-red uppercase tracking-[0.4em] mb-3">Vidula Yeole · BBA(CA) Graduate · MCA Aspirant</p>
              <h3 className="font-display text-3xl md:text-4xl font-black text-white tracking-tighter mb-3 uppercase">
                Resume / CV
              </h3>
              <p className="text-white/40 font-mono text-sm leading-relaxed mb-8 max-w-xl">
                Contains my education, 6-month internship at Upturn India Technologies, technical skills, academic projects, certifications and contact information.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.a
                 href={resume} download="Vidula_Yeole_Resume.pdf"
                  onClick={handleDownload}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-heist-red text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-[0_15px_40px_rgba(229,9,20,0.35)] hover:brightness-110 transition-all w-full sm:w-auto"
                >
                  <FaFileDownload className={downloading ? 'animate-bounce' : ''} />
                  {downloading ? 'Downloading...' : 'Download CV'}
                </motion.a>

                <motion.a
                  href="https://github.com/vidula66"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white/60 font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
                >
                  <FaGithub />
                  GitHub Profile
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/vidula-yeole-b131b3318"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white/60 font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
                >
                  <FaLinkedin />
                  LinkedIn
                </motion.a>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-5 right-8 text-[9px] font-mono text-white/5 uppercase tracking-[0.6em] select-none pointer-events-none">
            CV_VERSION_2026_STABLE_BUILD
          </div>
        </SpotlightCard>
      </div>

      <div className="section-divider mt-32 max-w-4xl mx-auto opacity-20" />
    </section>
  );
};

export default CVSection;
