import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heart, Share2, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Single Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden flex flex-col lg:flex-row transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/40 hover:border-indigo-200/50 group relative">
      
      {/* Premium subtle glow accent bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* ── Left: Info Panel ── */}
      <div className="flex flex-col justify-between p-8 sm:p-10 lg:w-[45%] flex-shrink-0 relative z-10 bg-gradient-to-br from-white via-white to-slate-50/50">

        <div>
          {/* Tag and Actions */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-700 text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-orange-500/10">
              <Sparkles size={10} className="animate-pulse" /> Exclusive Collection
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 hover:shadow-xs transition-all duration-300 cursor-pointer"
              >
                <Heart
                  size={18}
                  fill={liked ? '#ef4444' : 'none'}
                  stroke={liked ? '#ef4444' : 'currentColor'}
                  strokeWidth={2}
                />
              </button>
              <button className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 hover:shadow-xs transition-all duration-300 cursor-pointer">
                <Share2 size={17} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-[24px] sm:text-[28px] font-extrabold text-slate-900 leading-snug tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
            {project.title}
          </h3>
          
          {/* Location */}
          <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-6 font-medium">
            <MapPin size={15} className="text-orange-500 shrink-0" />
            {project.location}
          </p>

          {/* Price Tag */}
          <p className="text-[24px] font-black bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-6">
            {project.price}
          </p>

          {/* Config + Area Parameter Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Configuration</p>
              <p className="text-slate-800 font-bold text-sm sm:text-base">{project.config}</p>
            </div>
            <div className="bg-slate-50/80 border border-slate-100 p-4 rounded-2xl">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Builtup Area</p>
              <p className="text-slate-800 font-bold text-sm sm:text-base">{project.area}</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <button className="text-slate-600 font-bold text-sm hover:text-indigo-600 transition-colors py-2 px-3 rounded-xl hover:bg-slate-50 cursor-pointer">
            Contact Us
          </button>
          <button 
            onClick={() => {
              navigate(`/property${project.route}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex-1 bg-gradient-to-r from-[#1a2c5b] to-[#2563EB] hover:from-[#152348] hover:to-[#1d4ed8] text-white font-bold text-sm px-6 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-98 text-center"
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="relative flex-1 min-h-[300px] lg:min-h-0 overflow-hidden bg-slate-950">
        <img
          src={project.image}
          alt={`${project.title} view`}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
          style={{ minHeight: '300px' }}
          onError={(e) => {
            e.target.src = `https://placehold.co/800x480/cbd5e1/64748b?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Soft elegant shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ExclusiveProjects() {
  const { listings } = useSelector((state) => state.projects);
  const projects = listings.filter(p => p.projectType === 'exclusive');

  const [current, setCurrent] = useState(0);

  if (projects.length === 0) {
    return null; // Don't render the section if there are no exclusive projects
  }

  // Ensure current index is valid
  const validCurrent = current >= projects.length ? 0 : current;

  const prev = () => setCurrent((p) => (p - 1 + projects.length) % projects.length);
  const next = () => setCurrent((p) => (p + 1) % projects.length);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.25,
          },
        },
      }}
      className="w-full bg-slate-50/50 py-16 md:py-24 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">

        {/* Header */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between border-b border-slate-100 pb-4"
        >
          <div>
            <span className="text-[11px] font-bold tracking-wider text-orange-500 uppercase block mb-1">
              Curated Masterpieces
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Exclusive Collection
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors"
          >
            View All
            <ChevronRight size={16} strokeWidth={2.5} />
          </a>
        </motion.div>

        {/* Card Frame containing slide setup */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={validCurrent}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <ProjectCard project={projects[validCurrent]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Project navigation dots + arrows */}
        {projects.length > 1 && (
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mt-2 px-2"
          >
            {/* Slide Indicators */}
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    validCurrent === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition-colors bg-white shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition-colors bg-white shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}