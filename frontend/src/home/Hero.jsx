import React from 'react';
import Container from '../components/Container';

export default function Hero() {
  const locations = [
    'Navi Mumbai', 'Mumbai', 'Delhi', 'Noida', 'Gurgaon', 'Thane', 'Pune'
  ];

  return (
    // Updated background color to warm beige
    <section className="w-full bg-[#F3EBE3] py-6 md:py-8 lg:py-6">
      
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-4 md:space-y-5 animate-fade-up-slow delay-preloader-base order-1">

          {/* Location Tags */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12px] md:text-[13px] font-medium">
            {locations.map((loc, index) => (
              <span
                key={`${loc}-${index}`}
                className="flex items-center gap-0.5 text-gray-700 whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#C0573E">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>
                </svg>
                {loc}
              </span>
            ))}
          </div>

          {/* Heading - Updated with terracotta accent and tight tracking */}
          <h1 className="text-[28px] sm:text-[34px] md:text-[36px] lg:text-[40px] font-bold text-gray-900 leading-tight tracking-tight">
            Find Your <span className="text-[#C0573E]">Dream</span> Home.{' '}
            <span className="text-[#C0573E]">0% Brokerage</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 max-w-md text-sm sm:text-base md:text-base lg:text-lg">
            Discover premium homes tailored to your lifestyle, location, and budget.
          </p>
        </div>

        {/* Right Images Layout Column (Remains unchanged structurally) */}
        <div className="order-2 grid grid-cols-2 gap-x-2.5 gap-y-2.5 md:gap-x-3 md:gap-y-3 items-start w-full md:max-w-[600px] md:ml-auto">
          <div className="col-span-1 overflow-hidden rounded-tl-[36px] sm:rounded-tl-[54px] rounded-bl-[16px] sm:rounded-bl-[20px] group cursor-pointer animate-zoom-slow delay-300">
            <img src="/images/banner-1.jpg" alt="Modern high rise" className="w-full h-[180px] sm:h-[230px] md:h-[270px] lg:h-[300px] object-cover rounded-tl-[36px] sm:rounded-tl-[54px] rounded-bl-[16px] sm:rounded-bl-[20px] transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-105" />
          </div>
          <div className="col-span-1 overflow-hidden rounded-br-[16px] sm:rounded-br-[20px] group cursor-pointer animate-zoom-slow delay-300">
            <img src="/images/banner-2.jpg" alt="Interior design living room" className="w-full h-[150px] sm:h-[190px] md:h-[220px] lg:h-[250px] object-cover rounded-br-[16px] sm:rounded-br-[20px] transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-105" />
          </div>
          <div className="col-span-1 mt-0 overflow-hidden rounded-tl-[14px] sm:rounded-tl-[17px] rounded-bl-[32px] sm:rounded-bl-[45px] group cursor-pointer animate-zoom-normal delay-500">
            <img src="/images/banner-3.jpg" alt="Luxury interior" className="w-full h-[150px] sm:h-[190px] md:h-[220px] lg:h-[250px] object-cover rounded-tl-[14px] sm:rounded-tl-[17px] rounded-bl-[32px] sm:rounded-bl-[45px] transform scale-100 transition-transform duration-500 ease-out group-hover:scale-105" />
          </div>
          <div className="col-span-1 -mt-8 sm:-mt-10 md:-mt-12 overflow-hidden rounded-tr-[8px] sm:rounded-tr-[10px] rounded-br-[28px] sm:rounded-br-[40px] group cursor-pointer animate-zoom-normal delay-700">
            <img src="/images/banner-4.jpg" alt="Modern house exterior" className="w-full h-[180px] sm:h-[230px] md:h-[270px] lg:h-[300px] object-cover rounded-tr-[8px] sm:rounded-tr-[10px] rounded-br-[28px] sm:rounded-br-[40px] transform scale-100 transition-transform duration-500 ease-out group-hover:scale-105" />
          </div>
        </div>

      </Container>
    </section>
  );
}