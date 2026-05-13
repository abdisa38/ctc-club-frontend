import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Code2, Award } from "lucide-react";
import { Button } from "../components/ui/Button";
import developerPhoto from "../../assets/abdisa-developer-photo.jpg";
import presidentPhoto from "../../assets/president-shimelis.jpg";

export function About() {
  return (
    <div className="min-h-screen bg-[#050117] text-white pt-24 sm:pt-32 pb-16 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            Our Mission & Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Building the Future of <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Tech Education</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            CTC Club is a premier learning ecosystem designed to transform beginners into industry-ready tech professionals. With a focus on real-world projects and a thriving builder community, we aim to make high-quality tech education accessible and impactful.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-8"
        >
          <div className="bg-[#0f0a29] border border-slate-800/50 rounded-2xl p-8 hover:border-indigo-500/30 transition-colors">
            <div className="h-12 w-12 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <img
              src={developerPhoto}
              alt="Developer Abdisa Awel"
              className="h-24 w-24 rounded-2xl object-cover border border-indigo-500/30 mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-bold mb-2">Developer</h3>
            <p className="text-indigo-300 font-medium mb-4">Abdisa Awel</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The core architect and full-stack developer behind the CTC Club platform. Abdisa engineered the seamless MERN architecture and crafted the highly engaging and dynamic user interfaces you see.
            </p>
          </div>

          <div className="bg-[#0f0a29] border border-slate-800/50 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
            <div className="h-12 w-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <img
              src={presidentPhoto}
              alt="CTC President Shimelis Solomon"
              className="h-24 w-24 rounded-2xl object-cover border border-purple-500/30 mb-4"
              loading="lazy"
            />
            <h3 className="text-xl font-bold mb-2">CTC President</h3>
            <p className="text-purple-300 font-medium mb-4">Shimelis Solomon</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              The visionary leader guiding the club's direction. Shimelis provided the foundational vision, leadership, and operational strategies to make the CTC Club an impactful hub for tech learners.
            </p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-3xl p-8 md:p-12 text-center space-y-6"
        >
           <h2 className="text-2xl md:text-3xl font-bold">Join the Movement</h2>
           <p className="text-slate-300 max-w-xl mx-auto">
             Whether you're looking to master frontend, conquer backend architecture, or just find a community of like-minded builders, CTC Club is built for you.
           </p>
           <div className="pt-4">
             <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-6 h-auto text-base font-semibold shadow-lg shadow-indigo-500/25">
               <Link to="/register">
                 Start Learning Today <ArrowRight className="ml-2 w-5 h-5" />
               </Link>
             </Button>
           </div>
        </motion.div>

      </div>
    </div>
  );
}