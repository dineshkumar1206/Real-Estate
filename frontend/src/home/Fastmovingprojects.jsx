import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';

function StatusIcon({ status }) {
  const isReady = status === 'Ready to Move';
  return (
    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
      {isReady ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/><path d="M10 20V8l8-4v16"/><path d="M6 20v-4"/><rect x="14" y="14" width="2" height="6"/>
        </svg>
      )}
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
      className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] bg-white cursor-pointer rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-500/20 transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[190px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = `https://placehold.co/320x200/e2e8f0/94a3b8?text=${encodeURIComponent(project.title)}`;
          }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#374151'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <StatusIcon status={project.status} />
        </div>
      </div>

      <div className="p-4 space-y-1.5">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-1">{project.title}</h3>
        <p className="text-gray-500 text-[13px]">{project.location}</p>
        <p className={`font-bold text-[15px] ${project.priceColor || 'text-[#C0573E]'}`}>{project.price}</p>
        <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-0.5">
          <span>{project.config}</span>
          <span className="w-px h-3 bg-gray-300"></span>
          <span>{project.area}</span>
        </div>
        <p className="text-[12px] text-gray-400 pt-0.5">By {project.builder}</p>
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
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
        ${disabled
          ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
          : 'border-gray-300 text-gray-600 hover:border-black hover:text-black hover:bg-gray-100 bg-white shadow-sm'
        }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left' ? <path d="m15 18-6-6 6-6"/> : <path d="m9 18 6-6-6-6"/>}
      </svg>
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
    const cardWidth = el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 300;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + 16) : (cardWidth + 16), behavior: 'smooth' });
  };

  return (
    <motion.section 
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }}
      className="w-full bg-[#F3EBE3] py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-6">
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight tracking-tight">
            Fast Moving Projects
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <ArrowButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
              <ArrowButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-3 hide-scrollbar"
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