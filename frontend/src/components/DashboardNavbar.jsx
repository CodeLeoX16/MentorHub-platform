import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../helper";
import useUserStore from "../store/user";
import { FiLogOut } from "react-icons/fi";

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const onButtonClick = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo Link */}
        <NavLink to="/" className="inline-flex items-center group">
          <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
            MentorHub <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-200 ml-1.5">Dashboard</span>
          </span>
        </NavLink>

        {/* Action Controls */}
        <div>
          <button
            onClick={onButtonClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all duration-200 active:scale-95"
          >
            <span>Log Out</span>
            <FiLogOut className="text-base text-rose-500" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default DashboardNavbar;