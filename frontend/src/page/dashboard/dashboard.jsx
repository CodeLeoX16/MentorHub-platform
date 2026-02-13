import React from "react";
import Sidebar from "../../components/Sidebar";
import DashboardNavbar from "../../components/DashboardNavbar";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="flex">
        {/* Sidebar for desktop / toggled for mobile */}
        <div className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow-md w-64 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <Sidebar />
        </div>

        {/* Content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0 ml-0">
          <div className="flex items-center justify-start mb-4 lg:hidden">
            <button
              aria-label="Open sidebar"
              className="inline-flex items-center gap-2 px-3 py-2 text-gray-800 bg-white border rounded-full shadow-sm hover:shadow-md"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <HiMenuAlt3 size={20} />
              <span className="text-sm font-semibold">Menu</span>
            </button>
          </div>
          {children}
        </main>

        {/* Backdrop for mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-30 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
