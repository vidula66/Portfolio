import ScrollFloat from './reactbits/ScrollFloat';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Upturn India Technologies',
    role: 'Web Development Intern',
    period: 'Jan 2026 - Jun 2026',
    description:
      'Completed a 6-month Web Development Internship at Upturn India Technologies. Developed dynamic web applications using PHP, MySQL, HTML, CSS and JavaScript while working on real-world projects.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    color: '#e50914',
    index: '01',
  },

  {
    company: 'K. K. Wagh College, Nashik',
    role: 'BBA(CA) Graduate',
    period: '2023 - 2026',
    description:
      'Completed Bachelor of Business Administration (Computer Applications) with strong knowledge of Java, PHP, Database Management Systems, Web Development and Software Engineering.',
    tags: ['Java', 'PHP', 'MySQL', 'Web Development'],
    color: '#00aaff',
    index: '02',
  },

  {
    company: 'Independent Projects',
    role: 'Full Stack Developer',
    period: '2026 - Present',
    description:
      'Designed and developed projects including Online Voting System, MahaBuildNOC and a modern React Portfolio using PHP, MySQL, React, TypeScript and Tailwind CSS.',
    tags: ['React', 'Tailwind CSS', 'PHP', 'MySQL'],
    color: '#ffc107',
    index: '03',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-20 lg:py-32 px-6 lg:px-16 overflow-hidden bg-transparent">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-heist-red/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollFloat scrollStart={60} stiffness={100} damping={18} className="text-center mb-20">
       <span className="text-xs font-mono text-heist-red uppercase tracking-[0.5em] font-bold">
  PROFESSIONAL JOURNEY
</span>

<h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
  My{' '}
  <span className="text-heist-red italic">Experience</span>
</h2>
        </ScrollFloat>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-gradient-to-b from-heist-red/0 via-heist-red/30 to-heist-red/0" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ScrollFloat key={index} scrollStart={50 + index * 20} stiffness={90} damping={18}>
                <div className={`relative flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-full lg:w-[46%] bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-500"
                  >
                    {/* Gradient accent */}
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 80% 20%, ${exp.color}10, transparent 60%)` }}
                    />
                    {/* Index number watermark */}
                    <div className="absolute -top-4 -right-2 font-display text-[7rem] font-black leading-none pointer-events-none select-none"
                      style={{ color: `${exp.color}06` }}>
                      {exp.index}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: exp.color }} />
                        <span className="text-[9px] font-mono uppercase tracking-[0.4em] font-bold" style={{ color: exp.color }}>
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-1 leading-none group-hover:text-white transition-colors">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-bold uppercase tracking-widest mb-5 italic" style={{ color: exp.color }}>
                        {exp.company}
                      </h4>
                      <p className="text-[13px] text-white/40 leading-relaxed font-mono mb-7 group-hover:text-white/60 transition-colors">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono px-3 py-1 bg-white/5 border border-white/10 text-white/40 rounded-full uppercase tracking-widest group-hover:border-white/20 group-hover:text-white/70 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Centre dot */}
                  <div className="hidden lg:flex w-8 h-8 rounded-full border-2 shrink-0 items-center justify-center z-10"
                    style={{ borderColor: exp.color, backgroundColor: `${exp.color}20` }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                  </div>

                  {/* Empty side spacer */}
                  <div className="hidden lg:block w-[46%]" />
                </div>
              </ScrollFloat>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-32 max-w-4xl mx-auto opacity-20" />
    </section>
  );
};

export default Experience;
