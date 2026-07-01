import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// ─── Sample Data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    image: '/images/Hubtown-Seasons-Ecuador-1.jpg',
    route: '/hubtown-seasons-ecuador',
    status: 'Under Construction',
    title: 'Godrej Varanya- Kharghar',
    location: 'Chembur, Mumbai',
    price: 'Price on request',
    priceColor: 'text-orange-500',
    config: '2,3,4,5,6 BHK Apartment',
    area: 'Area on request',
    builder: 'Hubtown Limited',
  },
  {
    id: 2,
    image: '/images/Rustomjee-Crown-Phase-2.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Under Construction',
    title: 'Today - Citadel Juinagar',
    location: 'Prabhadevi, Mumbai',
    price: '₹ 9.61 Cr Onwards',
    priceColor: 'text-orange-500',
    config: '3,4,5 BHK Apartment',
    area: 'Area on request',
    builder: 'Rustomjee Builders Mumbai',
  },
  {
    id: 3,
    image: '/images/beaumonte-tower-a-elevation-104327837.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Ready to Move',
    title: 'L&T -Thane evara',
    location: 'Sion, Mumbai',
    price: 'Price on request',
    priceColor: 'text-orange-500',
    config: '2,3,4 BHK Apartment',
    area: 'Area on request',
    builder: 'Sheth Creators',
  },
  {
    id: 4,
    image: '/images/l-t-crescent-bay-elevation-154187177.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Ready to Move',
    title: 'Tulsi Sahyadri- Panvel',
    location: 'Parel, Mumbai',
    price: 'Price on request',
    priceColor: 'text-orange-500',
    config: '2,3,4 BHK Apartment',
    area: 'Area on request',
    builder: 'L And T Realty',
  },
  {
    id: 5,
    image: '/images/nextown-coral-images-for-project-36677650.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Under Construction',
    title: 'Marathon Nextown Coral',
    location: 'Dombivali, Mumbai',
    price: '₹ 41.10 L Onwards',
    priceColor: 'text-orange-500',
    config: '1 BHK Apartment',
    area: 'Area on request',
    builder: 'By Marathon Realty',
  },
  {
    id: 6,
    image: '/images/Kalpataru-Magnus.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Ready to Move',
    title: 'Kalpataru Magnus',
    location: 'Bandra East, Mumbai',
    price: '₹ 6.32 Cr Onwards',
    priceColor: 'text-orange-500',
    config: '3,4,5 BHK Apartment',
    area: 'Area on request',
    builder: 'By Kalpataru Group',
  },
  {
    id: 7,
    image: '/images/west-county-dosti-oak-elevation-20523610.jpeg',
    route: '/hubtown-seasons-ecuador',
    status: 'Ready to Move',
    title: 'Dosti West County Oak',
    location: 'Thane West, Mumbai',
    price: 'Price on request',
    priceColor: 'text-orange-500',
    config: '1,2 BHK Apartment',
    area: 'Area on request',
    builder: 'By Dosti Realty Mumbai',
  }
];

// ─── Status Icon ─────────────────────────────────────────────────────────────
function StatusIcon({ status }) {
  const isReady = status === 'Ready to Move';

  return (
    <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full">
      {isReady ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="15.5" r="5.5"/>
          <path d="m21 2-9.6 9.6"/>
          <path d="m15.5 7.5 3 3L22 7l-3-3"/>
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 20h20"/>
          <path d="M10 20V8l8-4v16"/>
          <path d="M6 20v-4"/>
          <rect x="14" y="14" width="2" height="6"/>
        </svg>
      )}
      {status}
    </span>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────
function PropertyCard({ project }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => {
        navigate(project.route);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] bg-white cursor-pointer rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[190px] sm:h-[200px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.src = `https://placehold.co/320x200/e2e8f0/94a3b8?text=${encodeURIComponent(project.title)}`;
          }}
        />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? '#ef4444' : 'none'} stroke={liked ? '#ef4444' : '#374151'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button 
            onClick={(e) => e.stopPropagation()} 
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <StatusIcon status={project.status} />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-1.5">
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-500 text-[13px]">{project.location}</p>
        <p className={`font-bold text-[15px] ${project.priceColor}`}>{project.price}</p>

        {/* Config + Area */}
        <div className="flex items-center gap-2 text-[12px] text-gray-500 pt-0.5">
          <span>{project.config}</span>
          <span className="w-px h-3 bg-gray-300"></span>
          <span>{project.area}</span>
        </div>

        {/* Builder */}
        <p className="text-[12px] text-gray-400 pt-0.5">By {project.builder}</p>
      </div>
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────────────
function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200
        ${disabled
          ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-white'
          : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 bg-white shadow-sm'
        }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {direction === 'left' ? <path d="m15 18-6-6 6-6"/> : <path d="m9 18 6-6-6-6"/>}
      </svg>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FastMovingProjects() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[class*="flex-shrink-0"]')?.offsetWidth || 300;
    el.scrollBy({ left: dir === 'left' ? -(cardWidth + 16) : (cardWidth + 16), behavior: 'smooth' });
  };

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
      className="w-full bg-white py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col gap-6">

        {/* Header Row */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <h2 className="text-[22px] sm:text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight">
            Fast Moving Projects
          </h2>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline"
            >
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </a>

            <div className="flex gap-2">
              <ArrowButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
              <ArrowButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
            </div>
          </div>
        </motion.div>

        {/* Carousel Track */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
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

        {/* View All — mobile only, below carousel */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex sm:hidden justify-center mt-2"
        >
          <a
            href="#"
            className="flex items-center gap-1 text-blue-600 text-sm font-medium border border-blue-200 rounded-full px-5 py-2 hover:bg-blue-50 transition-colors"
          >
            View all projects
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
}