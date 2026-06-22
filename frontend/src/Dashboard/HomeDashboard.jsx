import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FastMovingProjects from "./FastMovingProjects";
import LatestPropertyLaunches from "./LatestPropertyLaunches";
import ExclusiveProjects from "./ExclusiveProjects";

export default function HomeDashboard() {
  // Set the default initial tab to show
  const [activeTab, setActiveTab] = useState("fast-moving");

  // Render the matching workspace content dynamically
  const renderContent = () => {
    switch (activeTab) {
      case "fast-moving":
        return <FastMovingProjects />;
      case "latest-launches":
        return <LatestPropertyLaunches />;
      case "exclusive":
        return <ExclusiveProjects />;
      default:
        return <FastMovingProjects />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left Pinned Sidebar panel */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Dynamic Workspace Viewport */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[85vh] p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}