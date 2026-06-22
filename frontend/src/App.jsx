import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './home/Home';
import About from './pages/About';
import CentrePark from './exclusiveProjects/CentrePark';
import PurvaPanorama from './exclusiveProjects/PurvaPanorama';
import HubtownSeasonsEcuador from './fastMovingProjects/HubtownSeasonsEcuador';
import ContactUsPage from './pages/ContactUs';
import Login from './pages/Login'; // Your Login Component
import HomeDashboard from './Dashboard/HomeDashboard';

// Simple Protected Dashboard Component Placeholder
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-blue-400">Admin Dashboard</h1>
      <p className="text-gray-400 mt-2">Welcome back! You have secure access to manage your website.</p>
    </div>
  );
};

// Wrapper Layout to handle visibility
const MainLayout = ({ children }) => {
  const location = useLocation();
  
  // Hide main website elements ONLY when viewing the absolute dashboard viewport panel
  const isDashboard = location.pathname === "/admin";

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar />}
      
      {children}
      
      {!isDashboard && <WhatsAppButton />}
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  const { admin } = useSelector((state) => state.admin);

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Preloader />
      
      <MainLayout>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* Project Pages */}
          <Route path="/centre-park" element={<CentrePark />} />
          <Route path="/purva-panorama" element={<PurvaPanorama />} />
          <Route path="/hubtown-seasons-ecuador" element={<HubtownSeasonsEcuador />} />

          {/* Login Route (Now shows Navbar & Footer as requested) */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/admin" 
            element={admin ? <HomeDashboard /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;