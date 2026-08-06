import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
import { Heart, Building2, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

function StatusIcon({ status }) {
  const isReady = status === 'Ready to Move';
  return (
    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border border-white/10 shadow-sm">
      <span className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-emerald-400 animate-pulse' : 'bg-orange-400 animate-pulse'}`} />
      {status}
    </span>
  );
}

function PropertyCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => {
        navigate(`/property${project.route}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex-shrink-0 w-[290px] sm:w-[310px] md:w-[330px] bg-white cursor-pointer rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-indigo-100/30 hover:border-indigo-100 hover:-translate-y-2 transition-all duration-500 overflow-hidden group relative"
    >
      {/* Premium subtle glow accent bar */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Image frame */}
      <div className="relative overflow-hidden h-[200px] sm:h-[210px] bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = `https://placehold.co/320x210/e2e8f0/94a3b8?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white text-slate-400 hover:text-red-500 transition-colors cursor-pointer active:scale-90"
          >
            <Heart size={15} fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : 'currentColor'} strokeWidth={2.2} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <StatusIcon status={project.status} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Info details */}
      <div className="p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <Building2 size={13} className="text-orange-500" />
            <span>{project.builder}</span>
          </div>
          <h3 className="font-extrabold text-slate-800 text-[16px] sm:text-[17px] leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
          <p className="text-slate-400 text-xs flex items-center gap-1 font-medium">
            <MapPin size={13} className="text-slate-300" />
            {project.location}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
          <span className="font-black text-slate-900 text-base">{project.price}</span>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-1.5 rounded-xl">
            <span>{project.config}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-200"></span>
            <span>{project.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer
        ${disabled
          ? 'border-slate-100 text-slate-300 cursor-not-allowed bg-slate-50'
          : 'border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-white bg-white shadow-xs hover:shadow-md'
        }`}
    >
      {direction === 'left' ? <ChevronLeft size={18} strokeWidth={2.5} /> : <ChevronRight size={18} strokeWidth={2.5} />}
    </button>
  );
}

export default function FastMovingProjects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const { listings } = useSelector((state) => state.projects);
  const projects = listings.filter(p => !p.projectType || p.projectType === 'fast-moving');

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [projects]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 320;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + 24) : (cardWidth + 24), behavior: 'smooth' });
  };

  if (projects.length === 0) return null;

  return (
    <motion.section 
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }}
      className="w-full bg-[#FAF9F6] py-16 md:py-24 border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-end justify-between border-b border-slate-100 pb-4"
        >
          <div>
            <span className="text-[11px] font-bold tracking-wider text-orange-500 uppercase block mb-1">
              Top Demand Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Fast Moving Projects
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <ArrowButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
              <ArrowButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          {projects.map((project) => (
            <PropertyCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}