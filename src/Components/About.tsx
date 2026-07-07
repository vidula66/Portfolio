import { motion } from 'framer-motion';
import ScrollFloat from './reactbits/ScrollFloat';
import SystemTerminal from './SystemTerminal';
import CardSwap from './reactbits/CardSwap';
import LaserFlow from './reactbits/LaserFlow';


const aboutParagraphs = [
  "I am Vidula Yeole, a BBA(CA) graduate from K. K. Wagh College, Nashik and an MCA Aspirant. I enjoy building modern, user-friendly and database-driven web applications.",

  "My technical skills include Java, Spring Boot, PHP, MySQL, HTML, CSS, JavaScript, React and Tailwind CSS. I have developed projects like Online Voting System, MahaBuildNOC and this Portfolio Website.",

  "I successfully completed a 6-month Web Development Internship at Upturn India Technologies where I worked on real-world web applications using PHP, MySQL and frontend technologies."
];

const stats = [
  { value: '3+', label: 'Projects Completed', icon: '💻' },
  { value: '7+', label: 'Technologies', icon: '🚀' },
  { value: '6', label: 'Months Internship', icon: '💼' },
  { value: 'MCA', label: 'Aspirant', icon: '🎓' },
];

const funFacts = [
  {
    title: "Java Developer",
    text: "Passionate about Java, Spring Boot and backend development."
  },
  {
    title: "Full Stack",
    text: "Experienced in PHP, MySQL, HTML, CSS, JavaScript and React."
  },
  {
    title: "Quick Learner",
    text: "Always learning new technologies and building practical projects."
  },
];

const About = () => {
  return (
    <section id="about" className="relative py-20 lg:py-32 px-6 lg:px-16 overflow-hidden bg-transparent">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-heist-red/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      {/* Security Laser Background */}
      <LaserFlow className="opacity-20 top-0 left-10" color="#e50914" />
      <LaserFlow className="opacity-20 top-0 right-10" color="#e50914" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with ScrollFloat */}
        <ScrollFloat scrollStart={60} stiffness={100} damping={18} className="mb-16 text-center">
          <span className="text-xs font-mono text-heist-red uppercase tracking-[0.4em] font-bold">Confidential Dossier</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            The Strategist{' '}
            <span className="text-heist-red italic underline decoration-white/10 underline-offset-8">
              Behind the Code
            </span>
          </h2>
        </ScrollFloat>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Content */}
          <div className="space-y-6">
            <ScrollFloat scrollStart={80} stiffness={90} damping={20}>
              <div className="glass-card p-8 md:p-10 relative group border-heist-red/20 border-l-4">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-heist-red/10 via-heist-gold/10 to-heist-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm -z-10" />
                <div className="space-y-5">
                  {aboutParagraphs.map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className={`text-base leading-relaxed ${i === 0 ? 'text-white font-medium' : 'text-gray-400'}`}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </ScrollFloat>
            
            {/* Mission Insights with CardSwap */}
            <div className="mt-8 flex items-center gap-6">
              <span className="text-[10px] font-mono text-heist-red uppercase vertical-text tracking-[0.5em] h-32 flex items-center font-bold">Mission_Logs</span>
              <CardSwap 
                cards={funFacts.map((fact, i) => (
                  <div key={i} className="glass-card p-6 border-heist-red/30 bg-heist-red/5 flex flex-col justify-center h-32">
                    <h4 className="text-heist-red font-display font-black text-xs uppercase tracking-widest mb-2">{fact.title}</h4>
                    <p className="text-xs text-gray-500 font-mono italic">{fact.text}</p>
                  </div>
                ))}
                className="h-32 w-full"
              />
            </div>
          </div>

          {/* Tactical Visual with System Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full max-w-md mx-auto"
          >
            <div className="absolute -inset-4 bg-heist-red/10 rounded-full blur-[80px] animate-pulse" />
            <SystemTerminal />
          </motion.div>
        </div>

        {/* Stats Grid - iOS Glassmorphism */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollFloat key={index} scrollStart={40 + index * 20} stiffness={100} damping={18}>
              <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 text-center group hover:bg-white/10 transition-all duration-500 shadow-2xl relative overflow-hidden h-full cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-heist-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />
                <span className="text-3xl mb-4 block group-hover:scale-125 transition-transform duration-300">{stat.icon}</span>
                <h3 className="font-display text-4xl font-black text-white group-hover:text-heist-red transition-all duration-300 tracking-tighter relative z-10">
                  {stat.value}
                </h3>
                <p className="mt-2 text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold relative z-10">
                  {stat.label}
                </p>
              </div>
            </ScrollFloat>
          ))}
        </div>
      </div>

      <div className="section-divider mt-32 max-w-4xl mx-auto opacity-30" />
    </section>
  );
};

export default About;