import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Single Project Card ──────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-500/25 group">

      {/* ── Left: Info Panel ── */}
      <div className="flex flex-col justify-between p-6 md:p-8 md:w-[42%] flex-shrink-0">

        {/* Top: name + actions */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3 className="text-[20px] md:text-[22px] font-bold text-gray-900 leading-snug">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <button
                onClick={() => setLiked(!liked)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart
                  size={20}
                  fill={liked ? '#ef4444' : 'none'}
                  stroke={liked ? '#ef4444' : 'currentColor'}
                  strokeWidth={1.8}
                />
              </button>
              <button className="text-gray-400 hover:text-gray-700 transition-colors">
                <Share2 size={19} strokeWidth={1.8} />
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-[14px] mb-6">{project.location}</p>

          {/* Price */}
          <p className="text-orange-500 font-bold text-[20px] md:text-[22px] mb-6">
            {project.price}
          </p>

          {/* Config + Area */}
          <div className="flex items-stretch gap-0 mb-8">
            <div className="pr-5">
              <p className="text-gray-400 text-[12px] mb-1">Configuration</p>
              <p className="text-gray-900 font-semibold text-[15px]">{project.config}</p>
            </div>
            <div className="w-px bg-gray-200 mx-1" />
            <div className="pl-5">
              <p className="text-gray-400 text-[12px] mb-1">Builtup area</p>
              <p className="text-gray-900 font-semibold text-[15px]">{project.area}</p>
            </div>
          </div>
        </div>

        {/* Bottom: CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 font-semibold text-[14px] hover:text-blue-600 transition-colors">
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
          className="bg-[#1a2c5b] hover:bg-[#162348] text-white font-semibold text-[14px] px-6 py-3 rounded-full cursor-pointer transition-colors duration-200">
            Explore now
          </button>
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="relative flex-1 min-h-[220px] md:min-h-0 overflow-hidden">
        {/* Main image */}
        <img
          src={project.image}
          alt={`${project.title} view`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ minHeight: '220px' }}
          onError={(e) => {
            e.target.src = `https://placehold.co/800x480/cbd5e1/64748b?text=${encodeURIComponent(project.title)}`;
          }}
        />
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
      className="w-full bg-gray-50 py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-6">

        {/* Header */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight">
            Exclusive Projects
          </h2>
          <a
            href="#"
            className="flex items-center gap-1 text-blue-600 text-[14px] font-medium hover:underline"
          >
            View all
            <ChevronRight size={16} strokeWidth={2.5} />
          </a>
        </motion.div>

        {/* Card Frame containing slide setup */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={validCurrent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
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
            className="flex items-center justify-center gap-3 mt-2"
          >
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors bg-white shadow-sm"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    validCurrent === i ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 hover:text-blue-600 transition-colors bg-white shadow-sm"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}