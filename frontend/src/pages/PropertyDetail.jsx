import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  CheckCircle2,
  Heart,
  Share2,
  Building2,
  Calendar,
  Layers,
  ArrowLeft,
  Check,
  Dumbbell,
  Waves,
  Trophy,
  Gamepad2,
  Baby,
  Coffee,
  Droplets,
  Phone,
  ShieldCheck
} from "lucide-react";

const AMENITY_ICONS = {
  "Gymnasium": Dumbbell,
  "Swimming Pool": Waves,
  "Sports Facility": Trophy,
  "Indoor Games": Gamepad2,
  "Children's Play Area": Baby,
  "Club House": Building2,
  "Cafeteria": Coffee,
  "Rain Water Harvesting": Droplets,
  "Intercom": Phone,
  "24 X 7 Security": ShieldCheck
};
import ContactForm from "../forms/Contactform";
import { fetchProjects } from "../redux/dashbord-card-1/projectSlice";

// ── Lightbox Component ────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const next = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrent((c) => (c + 1) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <span className="absolute top-5 left-5 text-white/70 text-sm font-medium tracking-wide">
        {current + 1} / {images.length}
      </span>

      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={28} />
      </button>

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        onClick={prev}
      >
        <ChevronLeft size={28} />
      </button>

      <div
        className="max-w-5xl max-h-[80vh] w-full mx-4 sm:mx-10 lg:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[current].src || images[current]}
          alt={images[current].alt || "Gallery Image"}
          className="w-full max-h-[75vh] object-contain rounded"
        />
        {images[current].alt && (
          <p className="text-center text-white/50 text-sm mt-3">
            {images[current].alt}
          </p>
        )}
      </div>

      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
        onClick={next}
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}

// ── Main Page Component ───────────────────────────────────────────────────────
export default function PropertyDetail() {
  const { projectRoute } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listings, isLoading } = useSelector((state) => state.projects);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch listings if store is empty on load
  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, listings.length]);

  // Match current project route path (handles slash prefixes)
  const currentRouteFormatted = projectRoute.startsWith("/") ? projectRoute : "/" + projectRoute;
  const project = listings.find(
    (p) => p.route === currentRouteFormatted || p.route === projectRoute
  );

  // Auto-advance gallery carousel if images exist
  useEffect(() => {
    if (!project?.carouselImages || project.carouselImages.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % project.carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium text-sm">Retrieving Listing Details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white border rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
          <Building2 size={48} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Project Not Found</h2>
          <p className="text-gray-500 mt-2 text-sm">
            The property page you are looking for does not exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Compile image sets
  const mainImage = project.image || "https://placehold.co/1200x800?text=Listing+Cover";
  const gallery = Array.isArray(project.carouselImages) ? project.carouselImages : [];

  const openLightbox = (images, startIndex = 0) => {
    setLightbox({ images, startIndex });
  };

  const closeLightbox = () => setLightbox(null);

  // Helper to parse and prepare amenities list safely
  const getAmenitiesList = (projectData) => {
    if (!projectData?.amenities) return [];
    if (Array.isArray(projectData.amenities)) return projectData.amenities;
    if (typeof projectData.amenities === "string") {
      try {
        const parsed = JSON.parse(projectData.amenities);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return projectData.amenities.split(",").map((a) => a.trim()).filter(Boolean);
      }
    }
    return [];
  };

  const amenitiesList = getAmenitiesList(project);

  // Tabs for details section
  const NAV_TABS = [
    { label: "Overview", id: "overview" },
    { label: "Description", id: "description" },
    { label: "Amenities", id: "amenities", disabled: amenitiesList.length === 0 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 bg-white px-3 py-2 rounded-lg border shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft size={13} /> Back to Listings
        </button>

        {/* ── Photo Gallery Collage ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[380px] overflow-hidden">
          
          {/* Main Visual Display (Left Panel Carousel) */}
          <div className="relative w-full lg:flex-[1.6] h-[260px] sm:h-[340px] lg:h-full rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-950">
            {gallery.length > 0 ? (
              gallery.map((img, idx) => (
                <img
                  key={img.id || idx}
                  src={img.src}
                  alt={img.alt || project.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === carouselIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))
            ) : (
              <img src={mainImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            )}

            {/* Click overlay */}
            <div
              className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors"
              onClick={() => openLightbox(gallery.length > 0 ? gallery : [{ src: mainImage, alt: project.title }], gallery.length > 0 ? carouselIndex : 0)}
            />

            {gallery.length > 1 && (
              <>
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10 transition-all opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((i) => (i - 1 + gallery.length) % gallery.length);
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10 transition-all opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarouselIndex((i) => (i + 1) % gallery.length);
                  }}
                >
                  <ChevronRight size={16} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 px-2 py-1.5 rounded-full backdrop-blur-xs">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCarouselIndex(idx);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === carouselIndex ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-lg z-10 pointer-events-none font-medium">
              {gallery.length > 0 ? gallery.length : 1} {gallery.length > 1 ? "Images" : "Image"}
            </div>
          </div>

          {/* Side Stacked Panels (Right Panels) */}
          <div className="flex flex-row lg:flex-col gap-3 flex-1 h-[120px] sm:h-[160px] lg:h-full shrink-0">
            {/* Top right panel - cover image */}
            <div
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900"
              onClick={() => openLightbox([{ src: mainImage, alt: project.title }], 0)}
            >
              <img
                src={mainImage}
                alt="Main aerial representation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <span className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                Cover Photo
              </span>
            </div>

            {/* Bottom right panel - collage preview */}
            <div
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer group shadow-sm bg-slate-900"
              onClick={() => openLightbox(gallery.length > 0 ? gallery : [{ src: mainImage, alt: project.title }], 0)}
            >
              <img
                src={gallery.length > 0 ? gallery[0].src : mainImage}
                alt="Collage preview"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <span className="text-white text-base sm:text-lg font-bold tracking-wide">
                  {gallery.length > 1 ? `+${gallery.length - 1} More` : "View Gallery"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Header Details ──────────────────────────────────────── */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-200">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-900 mb-1">
              <span className="bg-blue-100 px-2.5 py-1 rounded-full">{project.status}</span>
              {project.reraId && <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full">RERA Approved</span>}
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {project.title}
              </h1>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-1.5 border rounded-full hover:bg-slate-100 transition-colors cursor-pointer ${
                    liked ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-50" : "text-slate-400 border-slate-200 bg-white"
                  }`}
                >
                  <Heart size={16} fill={liked ? "currentColor" : "none"} />
                </button>
                <button className="p-1.5 border border-slate-200 rounded-full bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
              <Building2 size={15} className="text-slate-400" />
              Developer: <span className="text-blue-900 font-semibold">{project.builder}</span>
            </p>

            <p className="text-slate-500 text-sm flex items-center gap-1">
              <MapPin size={15} className="text-slate-400 shrink-0" />
              <span>{project.location}</span>
            </p>
          </div>

          <div className="md:text-right shrink-0 bg-white border border-slate-100 p-4 rounded-2xl shadow-xs self-stretch md:self-auto flex md:flex-col justify-between items-center md:items-end">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Asking Price</p>
              <p className="text-2xl font-black text-orange-600 mt-0.5">{project.price}</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 md:block hidden">Contact builder for EMI details</p>
          </div>
        </div>

        {/* ── Main content grid ───────────────────────────────────── */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left section: Tabs & descriptions */}
          <div className="flex-1 space-y-6 w-full">
            
            {/* Sticky detail tabs */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="flex border-b border-gray-100 bg-slate-50/50">
                {NAV_TABS.map((tab) => {
                  if (tab.disabled) return null;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 px-5 py-4 text-sm font-bold transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-900 bg-white border-b-2 border-blue-900"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {/* Tab content: Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <h3 className="text-base font-extrabold text-slate-900">Project Overview Specifications</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.possessionDate && (
                        <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                          <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg">
                            <CheckCircle2 size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase">Possession Date</p>
                            <p className="text-sm font-bold text-slate-800">{project.possessionDate}</p>
                          </div>
                        </div>
                      )}

                      {project.reraId && (
                        <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                          <div className="p-2.5 bg-green-50 text-green-700 rounded-lg">
                            <Layers size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase">RERA ID</p>
                            <p className="text-sm font-bold text-slate-800">{project.reraId}</p>
                          </div>
                        </div>
                      )}

                      {project.totalApartments && (
                        <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                          <div className="p-2.5 bg-purple-50 text-purple-700 rounded-lg">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase">Total Launched Units</p>
                            <p className="text-sm font-bold text-slate-800">{project.totalApartments} Apts</p>
                          </div>
                        </div>
                      )}

                      {project.launchDate && (
                        <div className="flex items-center gap-3.5 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                          <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase">Launch Timeline</p>
                            <p className="text-sm font-bold text-slate-800">{project.launchDate}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl space-y-2.5 border">
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-500 border-b pb-2">
                        <span>Project Status</span>
                        <span className="text-blue-900">{project.status}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-500 border-b pb-2">
                        <span>Developer / Builder</span>
                        <span className="text-slate-800">{project.builder}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                        <span>Route URL</span>
                        <span className="text-slate-800 text-[10px] bg-white px-2 py-0.5 rounded border">{project.route}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab content: Description */}
                {activeTab === "description" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-extrabold text-slate-900">About {project.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {project.description || "No analytical property descriptions published yet. Please contact the developer directly for detailed information brochures."}
                    </p>
                  </div>
                )}

                {/* Tab content: Amenities */}
                {activeTab === "amenities" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900">Today - {project.title} Amenities</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                      {amenitiesList.map((amenity, idx) => {
                        const IconComponent = AMENITY_ICONS[amenity] || Building2;
                        return (
                          <div
                            key={idx}
                            className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 shadow-xs hover:border-blue-500 hover:bg-blue-50/20 transition-all duration-300 group"
                          >
                            <div className="p-3 bg-slate-50 text-blue-900 rounded-xl group-hover:bg-blue-100 group-hover:text-blue-900 transition-colors">
                              <IconComponent size={24} className="stroke-[1.8]" />
                            </div>
                            <span className="text-xs font-bold text-slate-800">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right section: Sticky callback contact panel */}
          <div className="w-full lg:w-[350px] shrink-0 sticky top-28">
            <ContactForm city={project.location} subtitle={project.title} />
          </div>

        </div>

      </div>

      {/* Lightbox Rendering */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
}
