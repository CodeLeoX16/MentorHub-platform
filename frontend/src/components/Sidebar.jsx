import React from "react";
import { NavLink } from "react-router-dom";
import useUserStore from "../store/user";
import { HiUser, HiCog6Tooth, HiCalendar, HiCreditCard, HiClipboardDocumentList } from "react-icons/hi2";

const Sidebar = () => {
  const { user } = useUserStore();
  const avatarUrl =
    user?.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=6366f1&color=fff&bold=true`;

  const navItems = [
    { to: "/dashboard/profile", label: "Profile", icon: HiUser },
    { to: "/dashboard/services", label: "Services", icon: HiCog6Tooth },
    { to: "/dashboard/schedule", label: "Schedule", icon: HiCalendar },
    { to: "/dashboard/payment", label: "Payment", icon: HiCreditCard },
    { to: "/dashboard/bookings", label: "Bookings", icon: HiClipboardDocumentList },
  ];

  return (
    <aside className="flex flex-col w-full max-w-xs min-h-screen px-5 py-8 overflow-y-auto bg-white border-r border-slate-200/80 shadow-sm">
      
      {/* User Info Header Profile Card */}
      <div className="flex flex-col items-center text-center pb-6 border-b border-slate-100">
        <div className="relative mb-3">
          <img
            className="object-cover w-20 h-20 rounded-full border-2 border-purple-500/30 shadow-md"
            src={avatarUrl}
            alt={`${user?.name || "User"}'s avatar`}
          />
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
        <h4 className="text-base font-bold text-slate-900 truncate max-w-full">
          {user?.name || "User Profile"}
        </h4>
        <p className="text-xs text-slate-500 truncate max-w-full mt-0.5">
          {user?.email || "user@mentorhub.com"}
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col justify-between flex-1 pt-6">
        <nav className="space-y-1.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-purple-50 text-purple-700 shadow-sm border border-purple-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`text-lg shrink-0 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer info or quota section inside sidebar if needed */}
        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
          <p>MentorHub Dashboard</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;