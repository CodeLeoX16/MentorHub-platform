import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-no-background.png";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-900">
          
          {/* Brand Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <NavLink to="/" className="inline-flex items-center group">
              <img
                className="h-8 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                src={logo}
                alt="MentorHub logo"
              />
            </NavLink>
            <span className="hidden sm:inline text-slate-700">|</span>
            <p className="text-sm text-slate-400">
              Mentorship that moves your engineering career forward.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <NavLink to="/mentors" className="text-slate-400 hover:text-white transition-colors">
              Find Mentors
            </NavLink>
            <NavLink to="/signup/mentor" className="text-slate-400 hover:text-white transition-colors">
              Become a Mentor
            </NavLink>
            <NavLink to="/booking" className="text-slate-400 hover:text-white transition-colors">
              Book a Session
            </NavLink>
            <a href="/" className="text-slate-400 hover:text-white transition-colors">
              Support
            </a>
          </nav>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MentorHub. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="/" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="/" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;