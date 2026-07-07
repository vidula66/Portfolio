import { motion } from 'framer-motion';
import { useState } from 'react';
import ScrollFloat from './reactbits/ScrollFloat';
import LaserFlow from './reactbits/LaserFlow';
import ChromaGrid from './reactbits/ChromaGrid';

const Contact = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
});
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <section id="contact" className="relative py-20 lg:py-32 px-6 lg:px-16 overflow-hidden bg-transparent">
      {/* Background with ChromaGrid - Red Highlight */}
      <ChromaGrid className="opacity-20" colorHighlight="rgba(229, 9, 20, 0.3)" />
      
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-heist-red/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header with ScrollFloat */}
        <ScrollFloat scrollStart={60} stiffness={100} damping={18} className="text-center mb-12">
          <span className="text-xs font-mono text-heist-red uppercase tracking-[0.5em] font-bold">Extraction Point</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Join the{' '}
            <span className="text-heist-red italic">
              Heist
            </span>
          </h2>
          <p className="mt-4 text-gray-600 text-xs font-mono max-w-md mx-auto uppercase tracking-widest">
            Ready to initiate a high-level technical operation? Secure a connection below.
          </p>
        </ScrollFloat>

        {/* Contact Form with LaserFlow */}
        <ScrollFloat scrollStart={80} stiffness={90} damping={20}>
          <div className="relative glass-card p-8 md:p-10 border-2 border-heist-red/10 group">
            {/* Laser Borders - Blood Red */}
            <LaserFlow className="left-0 top-0 h-full" color="#e50914" />
            <LaserFlow className="right-0 top-0 h-full" color="#b20710" />
            
            <form
  action="https://formsubmit.co/vidulayeole66@gmail.com"
  method="POST"
  className="space-y-6"
>
  <input type="hidden" name="_captcha" value="false" />
<input type="hidden" name="_subject" value="New Portfolio Contact" />
<input type="hidden" name="_template" value="table" />
<input
  type="hidden"
  name="_next"
  value="http://localhost:5173/#contact"
/>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 font-bold">OPERATIVE_NAME</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Vidula Yeole"
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-[#111] border border-white/5 rounded-none px-4 py-3 text-sm text-white placeholder:text-gray-800 focus:outline-none focus:border-heist-red/50 transition-all duration-300 font-mono"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focused === 'name' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-heist-red origin-left"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 font-bold">ENCRYPTED_EMAIL</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                      placeholder="e.g. yourname@gmail.com"
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-[#111] border border-white/5 rounded-none px-4 py-3 text-sm text-white placeholder:text-gray-800 focus:outline-none focus:border-heist-red/50 transition-all duration-300 font-mono"
                    />
                    <motion.div
                      initial={false}
                      animate={{ scaleX: focused === 'email' ? 1 : 0 }}
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-heist-red origin-left shadow-[0_0_10px_#e50914]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] ml-1 font-bold">MISSION_DETAILS</label>
                <div className="relative">
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Brief the mission objective..."
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-[#111] border border-white/5 rounded-none px-4 py-4 text-sm text-white placeholder:text-gray-800 focus:outline-none focus:border-heist-red/50 transition-all duration-300 resize-none font-mono"
                  />
                  <motion.div
                    initial={false}
                    animate={{ scaleX: focused === 'message' ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-heist-red origin-left"
                  />
                </div>
              </div>

              <button
                type="submit"
                data-hover
                className="w-full group relative py-5 bg-heist-red text-white overflow-hidden font-black text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-[0_10px_30px_rgba(229,9,20,0.2)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Initiate Connection
                </span>
              </button>
            </form>
          </div>
        </ScrollFloat>
      </div>

      <div className="section-divider mt-32 max-w-4xl mx-auto opacity-20" />
    </section>
  );
};

export default Contact;