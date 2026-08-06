import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';

export default function Navbar() {
  const { admin } = useSelector((state) => state.admin);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePropOpen, setIsMobilePropOpen] = useState(false);
  
  const mobileMenuRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleMobilePropToggle = (e) => {
    e.preventDefault();
    setIsMobilePropOpen(!isMobilePropOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-toggle-btn')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 px-5 py-2 md:px-10 border-b border-orange-100/40 shadow-xs transition-all duration-350">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Left Side: Logo */}
        <a href="/" className="flex items-center z-10 hover:scale-102 transition-transform duration-300">
          <img 
            src="/images/logo.png" 
            alt="Real Estate Logo" 
            className="w-32 h-32 md:w-36 md:h-36 object-contain" 
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="flex items-center space-x-6 font-medium text-gray-800 pointer-events-auto">
            <a href="/" className="relative hover:text-blue-600 transition-colors duration-300 py-1 group text-sm">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
            
            <div className="relative py-1" ref={dropdownRef}>
              <button 
                onClick={handleToggle}
                className={`hover:text-blue-600 font-medium transition-colors flex items-center gap-1.5 cursor-pointer outline-none text-sm group pb-0.5 ${
                  isOpen ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                Properties
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="13" 
                  height="13" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : 'rotate-0 text-gray-500 group-hover:text-blue-600'}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-300 z-50 bg-white rounded-xl shadow-lg">
                  <Dropdown />
                </div>
              )}
            </div>

            <a href="/about" className="relative hover:text-blue-600 transition-colors duration-300 py-1 group text-sm">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="/contact" className="relative hover:text-blue-600 transition-colors duration-300 py-1 group text-sm">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        {/* Right Side: Fixed Login/Dashboard Button */}
        <div className="hidden md:block z-10">
          {admin ? (
            <a 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-200/50 hover:shadow-lg active:scale-95 block"
            >
              Dashboard
            </a>
          ) : (
            <a 
              href="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-200/50 hover:shadow-lg active:scale-95 block"
            >
              Login
            </a>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-toggle-btn block md:hidden p-2 pr-1 text-gray-800 hover:text-blue-600 focus:outline-none cursor-pointer z-50 mr-1"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          )}
        </button>

      </div>

      {/* --- MOBILE SLIDEOUT DRAWER --- */}
      {isMobileMenuOpen && (
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-screen w-72 bg-[#FFFFFF] shadow-2xl border-l border-orange-100 z-40 md:hidden pt-24 animate-slide-in"
      >
        <div className="flex flex-col p-6 space-y-5 font-medium text-lg text-gray-800">
          <a 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition-colors pb-2 border-b border-orange-100/30"
          >
            Home
          </a>
          
          {/* Mobile Properties Accordion */}
          <div className="flex flex-col space-y-2 pb-2 border-b border-orange-100/30">
            <button 
              onClick={handleMobilePropToggle}
              className="flex items-center justify-between w-full text-left font-medium hover:text-blue-600 cursor-pointer outline-none text-gray-800"
            >
              <span>Properties</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                className={`transition-transform duration-300 ${isMobilePropOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            
            <div className={`transition-all duration-300 overflow-hidden ${
              isMobilePropOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}>
              <div className="bg-white p-3 rounded-xl border border-orange-100/50 shadow-inner text-base">
                <Dropdown />
              </div>
            </div>
          </div>

          <a 
            href="/about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition-colors pb-2 border-b border-orange-100/30"
          >
            About Us
          </a>
          <a 
            href="/contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-blue-600 transition-colors pb-4"
          >
            Contact Us
          </a>

          {/* Fixed Mobile Login/Dashboard Button */}
          <div className="pt-2">
            {admin ? (
              <a 
                href="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition"
              >
                Dashboard
              </a>
            ) : (
              <a 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
      )}
    </nav>
  );
}