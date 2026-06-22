import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ⬅️ Imported for home redirection
// import { logoutAdmin } from "../../redux/AdminAuthSlice/AdminAuthSlice"; // ⬅️ Uncommented
import { Flame, Rocket, Gem, LogOut } from "lucide-react"; // ⬅️ Modern Lucide Icons

export default function Sidebar({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize routing trigger

  // Clean menu item layout using Lucide components
  const menuItems = [
    { id: "fast-moving", label: "Fast Moving Projects", icon: Flame },
    { id: "latest-launches", label: "Latest Property Launches", icon: Rocket },
    { id: "exclusive", label: "Exclusive Projects", icon: Gem },
  ];

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // 1. Trigger Redux to clear local states and strip HTTP cookies
      await dispatch(logoutAdmin());
      // 2. Safely bounce user back to the public homepage layout
      navigate("/");
    }
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-5 border-r border-slate-800 shadow-2xl">
      {/* Top Section: Branding & Navigation */}
      <div>
        {/* Modernized Clean Brand Header */}
        <div className="p-4 mb-8 bg-gradient-to-r from-slate-800 to-slate-900/50 rounded-2xl border border-slate-800/60">
          <h2 className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CONNECT YOU
          </h2>
          <p className="text-[10px] text-indigo-300 font-bold tracking-widest uppercase mt-1">
            Real Estate Panel
          </p>
        </div>

        {/* Navigation Link Stack */}
        <nav className="space-y-2.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3.5 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 outline-none cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
                }`}
              >
                <IconComponent 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-100"
                  }`} 
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Premium Logout Component */}
      <div className="pt-5 border-t border-slate-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2.5 bg-rose-950/40 text-rose-400 border border-rose-900/50 py-3.5 rounded-xl font-bold text-sm hover:bg-rose-600 hover:text-white transition-all duration-300 cursor-pointer shadow-md shadow-rose-950/20"
        >
          <LogOut size={16} />
          <span>Logout Panel</span>
        </button>
      </div>
    </div>
  );
}