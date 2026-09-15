import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Dropdown, Menu } from "antd";
import { AiOutlineDashboard, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";

import logo from "../assets/logo-no-background.png";
import useUserStore from "../store/user";
import { removeToken } from "../helper";

export const Nav = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const signInBtnClick = () => {
    navigate("/signin");
  };

  const signUpStudentBtnClick = () => {
    navigate("/signup/student");
  };

  const signUpMentorBtnClick = () => {
    navigate("/signup/mentor");
  };

  const onButtonClick = () => {
    removeToken();
    setUser(null);
    navigate("/");
  };

  const closeMobile = () => setMobileOpen(false);

  const menu = (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-2 w-48 text-slate-200">
      <Menu className="bg-transparent border-none">
        <Menu.Item
          key="1"
          icon={<AiOutlineDashboard className="text-purple-400 text-lg" />}
          className="hover:!bg-white/10 !rounded-xl transition-all"
        >
          <NavLink className="text-sm font-medium text-slate-200 hover:text-white" to="/dashboard/profile">
            Dashboard
          </NavLink>
        </Menu.Item>
        <Menu.Divider className="border-slate-700/50 my-1" />
        <Menu.Item
          key="2"
          icon={<FiLogOut className="text-rose-400 text-lg" />}
          className="hover:!bg-rose-500/10 !rounded-xl transition-all"
        >
          <button onClick={onButtonClick} className="w-full text-sm font-medium text-left text-rose-300 hover:text-rose-200">
            Logout
          </button>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="inline-flex items-center group">
          <img
            className="h-9 sm:h-10 w-auto object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            src={logo}
            alt="MentorHub logo"
          />
        </NavLink>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {!user ? (
            <>
              {/* Become a Mentor Button */}
              <button
                onClick={signUpMentorBtnClick}
                className="px-4 py-2 text-sm font-medium text-purple-200 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                Become a Mentor
              </button>

              {/* Sign In Button */}
              <button
                onClick={signInBtnClick}
                className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                Sign in
              </button>

              {/* Sign Up / Get Started Button */}
              <button
                onClick={signUpStudentBtnClick}
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Sign up
              </button>
            </>
          ) : (
            <Dropdown overlay={menu} trigger={["hover"]} placement="bottomRight">
              <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 border border-white/20 shadow-lg text-white hover:scale-105 hover:ring-2 hover:ring-purple-400/50 transition-all duration-200">
                <FaUser className="text-sm" />
              </button>
            </Dropdown>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            aria-label="Toggle navigation"
            className="p-2.5 text-slate-300 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-2 animate-fade-in-up">
          {!user ? (
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  closeMobile();
                  signUpMentorBtnClick();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-medium text-purple-200 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 rounded-xl transition-all active:scale-95"
              >
                Become a Mentor
              </button>

              <button
                onClick={() => {
                  closeMobile();
                  signInBtnClick();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95"
              >
                Sign in
              </button>

              <button
                onClick={() => {
                  closeMobile();
                  signUpStudentBtnClick();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 rounded-xl shadow-md transition-all active:scale-95"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <NavLink
                to="/dashboard/profile"
                onClick={closeMobile}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <AiOutlineDashboard className="text-purple-400 text-lg" />
                Dashboard
              </NavLink>
              
              <button
                onClick={() => {
                  closeMobile();
                  onButtonClick();
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 rounded-xl transition-colors"
              >
                <FiLogOut className="text-rose-400 text-lg" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};