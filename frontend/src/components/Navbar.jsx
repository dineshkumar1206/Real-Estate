import React, { useState, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

export default function Navbar() {
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
    <nav className="w-full bg-[#FFFFFF] sticky top-0 z-50 px-6 py-3 md:px-16 border-b border-orange-100/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Left Side: Logo */}
        <a href="/" className="flex items-center z-10 hover:opacity-90 transition-opacity">
          <img 
            src="/images/logo.webp" 
            alt="Real Estate Logo" 
            className="w-20 h-20 object-contain" 
          />
        </a>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="flex items-center space-x-8 font-medium text-gray-800 pointer-events-auto">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            
            <div className="relative py-2" ref={dropdownRef}>
              <button 
                onClick={handleToggle}
                className={`hover:text-blue-600 font-semibold transition-colors flex items-center gap-1 cursor-pointer outline-none ${
                  isOpen ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                Properties
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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

            <a href="/about" className="hover:text-blue-600 transition-colors">About Us</a>
            <a href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
        </div>

        {/* Right Side: Fixed Login Button */}
        <div className="hidden md:block z-10">
          <a 
            href="/login" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-100"
          >
            Login
          </a>
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
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-screen w-72 bg-[#FFFFFF] shadow-2xl border-l border-orange-100 transform transition-transform duration-300 ease-in-out z-40 md:hidden pt-24 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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

          {/* Fixed Mobile Login Button */}
          <div className="pt-2">
            <a 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}