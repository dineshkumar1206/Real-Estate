import React from 'react';
import Container from '../components/Container';

export default function Hero() {
  const locations = [
    'Navi Mumbai', 'Mumbai', 'Delhi', 'Noida', 'Gurgaon', 'Thane', 'Pune'
  ];

  return (
    <section className="w-full bg-[#F3EBE3] py-10 md:py-12 overflow-hidden border-b border-gray-100 font-sans">
      
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-6 md:space-y-8 animate-fade-up-slow delay-preloader-base order-1">

          {/* Location Badges */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
              Prime Locations Covered
            </span>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] md:text-[13px] font-semibold text-slate-700">
              {locations.map((loc, index) => (
                <span
                  key={`${loc}-${index}`}
                  className="inline-flex items-center gap-1 hover:text-[#C0573E] transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C0573E]" />
                  {loc}
                </span>
              ))}
            </div>
          </div>

          {/* Heading - Reverted to solid terracotta accents */}
          <div className="space-y-4">
            <h1 className="text-[34px] sm:text-[40px] md:text-[44px] font-black text-slate-900 leading-[1.15] tracking-tight">
              Find Your <span className="text-[#C0573E]">Dream</span> Home.{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#C0573E]">0% Brokerage</span>
            </h1>
            <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed font-medium">
              Experience the pinnacle of luxury living. We connect you directly to elite properties tailored to your lifestyle, location, and budget.
            </p>
          </div>

          {/* Premium CTA Search */}
          <div className="bg-white/90 backdrop-blur-md border border-white/60 p-3.5 rounded-2xl shadow-lg max-w-xl flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#C0573E]">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Search premium properties, builders..." 
                className="bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none w-full font-semibold"
              />
            </div>
            <button className="bg-gradient-to-r from-[#1a2c5b] to-[#2563EB] hover:from-[#152348] hover:to-[#1d4ed8] text-white font-bold text-sm px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/25 active:scale-98 shrink-0 text-center">
              Explore Collections
            </button>
          </div>
        </div>

        {/* Right Images Layout Column - Restored Original Structure, Alignments, and Animations */}
        <div className="order-2 grid grid-cols-2 gap-x-2.5 gap-y-2.5 md:gap-x-3 md:gap-y-3 items-start w-full md:max-w-[600px] md:ml-auto">
          <div className="col-span-1 overflow-hidden rounded-tl-[36px] sm:rounded-tl-[54px] rounded-bl-[16px] sm:rounded-bl-[20px] group cursor-pointer animate-zoom-slow delay-300">
            <img 
              src="/images/banner-1.jpg" 
              alt="Modern high rise" 
              className="w-full h-[180px] sm:h-[230px] md:h-[270px] lg:h-[300px] object-cover rounded-tl-[36px] sm:rounded-tl-[54px] rounded-bl-[16px] sm:rounded-bl-[20px] transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-105" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"; }}
            />
          </div>
          <div className="col-span-1 overflow-hidden rounded-br-[16px] sm:rounded-br-[20px] group cursor-pointer animate-zoom-slow delay-300">
            <img 
              src="/images/banner-2.jpg" 
              alt="Interior design living room" 
              className="w-full h-[150px] sm:h-[190px] md:h-[220px] lg:h-[250px] object-cover rounded-br-[16px] sm:rounded-br-[20px] transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-105" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"; }}
            />
          </div>
          <div className="col-span-1 mt-0 overflow-hidden rounded-tl-[14px] sm:rounded-tl-[17px] rounded-bl-[32px] sm:rounded-bl-[45px] group cursor-pointer animate-zoom-normal delay-500">
            <img 
              src="/images/banner-3.jpg" 
              alt="Luxury interior" 
              className="w-full h-[150px] sm:h-[190px] md:h-[220px] lg:h-[250px] object-cover rounded-tl-[14px] sm:rounded-tl-[17px] rounded-bl-[32px] sm:rounded-bl-[45px] transform scale-100 transition-transform duration-500 ease-out group-hover:scale-105" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"; }}
            />
          </div>
          <div className="col-span-1 -mt-8 sm:-mt-10 md:-mt-12 overflow-hidden rounded-tr-[8px] sm:rounded-tr-[10px] rounded-br-[28px] sm:rounded-br-[40px] group cursor-pointer animate-zoom-normal delay-700">
            <img 
              src="/images/banner-4.jpg" 
              alt="Modern house exterior" 
              className="w-full h-[180px] sm:h-[230px] md:h-[270px] lg:h-[300px] object-cover rounded-tr-[8px] sm:rounded-tr-[10px] rounded-br-[28px] sm:rounded-br-[40px] transform scale-100 transition-transform duration-500 ease-out group-hover:scale-105" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"; }}
            />
          </div>
        </div>

      </Container>
    </section>
  );
}